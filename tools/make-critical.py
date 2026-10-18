#!/usr/bin/env python3
"""
Builds the small "first-screen design" that sits inside index.html (the <style id="critical"> block).

Why: style.css is a separate file, and a browser has to download it before it can paint anything,
which delays the first screen by about a quarter of a second on a slow phone. This script copies
only the rules that the first screen needs into index.html so the page paints immediately,
while the full style.css still loads right after and stays the one complete source of the design.

Run it after you change style.css (needs Python + Playwright + a local web server of the site):
    python3 tools/make-critical.py http://localhost:8767/index.html index.html
Safe to run again at any time; it replaces the old block.
"""
import asyncio, re, sys
from playwright.async_api import async_playwright

URL = sys.argv[1]
TARGET = sys.argv[2]

JS = r"""
() => {
  const sheet = [...document.styleSheets].find(s => s.href && s.href.indexOf('style.css') > -1);
  if (!sheet) return null;
  const H = innerHeight * 1.25;
  const els = [...document.querySelectorAll('*')].filter(e => {
    const r = e.getBoundingClientRect();
    return (r.width === 0 && r.height === 0) || (r.top < H && r.bottom > -50);
  });
  const STATE = /:(hover|active|focus|focus-visible|focus-within|visited|checked|disabled|target|indeterminate|placeholder-shown|-webkit-[a-z-]+)\b/;
  const PSEUDO_EL = /::?(before|after|first-line|first-letter|selection|placeholder|marker|-webkit-[a-z-]+|-moz-[a-z-]+)(\([^)]*\))?/g;
  function parts(sel){ // split a selector list on top-level commas
    const out=[]; let d=0, cur='';
    for (const ch of sel){ if (ch==='('||ch==='[') d++; if (ch===')'||ch===']') d--; if (ch===','&&d===0){out.push(cur);cur='';} else cur+=ch; }
    if (cur.trim()) out.push(cur); return out;
  }
  function hit(sel){
    for (const raw of parts(sel)){
      if (STATE.test(raw)) continue;
      let p = raw.replace(PSEUDO_EL,'').trim();
      if (!p || /[>+~]$/.test(p)) continue;
      try { for (const e of els) if (e.matches(p)) return true; } catch(e){}
    }
    return false;
  }
  const names = new Set();
  function walk(rules, path, out){
    [...rules].forEach((r, i) => {
      const key = path + '/' + i;
      if (r.type === 1){ if (hit(r.selectorText)) out.push(key); }
      else if (r.type === 4){ if (/print/.test(r.media.mediaText) && !/screen/.test(r.media.mediaText)) return; walk(r.cssRules, key, out); }
      else if (r.type === 12){ walk(r.cssRules, key, out); }
    });
  }
  const hits = []; walk(sheet.cssRules, '', hits);
  return {hits: hits, top: sheet.cssRules.length};
}
"""

CONTEXTS = []
for (w, h) in [(360, 740), (390, 844), (768, 1024), (1280, 800), (1536, 864)]:
    for lang in ('en', 'hi'):
        for theme in ('light', 'dark'):
            CONTEXTS.append((w, h, lang, theme, 'denied', True))
CONTEXTS += [(390, 844, 'en', 'light', None, True), (1280, 800, 'hi', 'dark', None, True),
             (390, 844, 'en', 'light', 'denied', False), (1280, 800, 'en', 'light', 'denied', False)]  # last two: JavaScript off

async def main():
    keys = set(); tops = set()
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for (w, h, lang, theme, consent, js) in CONTEXTS:
            ctx = await b.new_context(viewport={'width': w, 'height': h}, java_script_enabled=True)
            init = "localStorage.setItem('nkt-lang','%s');localStorage.setItem('nkt-theme','%s');" % (lang, theme)
            if consent: init += "localStorage.setItem('nkt-consent','%s');" % consent
            await ctx.add_init_script(init)
            await ctx.route("**/googletagmanager.com/**", lambda r: r.abort())
            pg = await ctx.new_page()
            if not js:
                # capture the page as it is BEFORE the scripts run: block app.js
                await ctx.route("**/app.js*", lambda r: r.abort())
            await pg.goto(URL); await pg.wait_for_timeout(1800 if js else 600)
            got = await pg.evaluate(JS)
            if got: keys.update(got['hits']); tops.add(got['top'])
            await ctx.close()
        await b.close()
    return keys, tops

keys, tops = asyncio.run(main())
css = open('style.css', encoding='utf-8').read()

# Re-walk style.css text with a tiny parser so the output keeps the original formatting and order.
def split_rules(text):
    out = []; i = 0; n = len(text)
    while i < n:
        # skip whitespace and comments
        m = re.compile(r'\s+|/\*.*?\*/', re.S).match(text, i)
        if m: i = m.end(); continue
        start = i; d = 0; instr = None
        while i < n:
            ch = text[i]
            if instr:
                if ch == '\\': i += 1
                elif ch == instr: instr = None
            elif ch in '"\'': instr = ch
            elif ch == '{': d += 1
            elif ch == '}':
                d -= 1
                if d == 0: i += 1; break
            elif ch == ';' and d == 0: i += 1; break
            i += 1
        out.append(text[start:i].strip())
    return out

def inner(rule):
    a = rule.index('{'); return rule[:a].strip(), rule[a + 1:rule.rindex('}')]

def build_css(text, path, keys):
    res = []
    for i, r in enumerate(split_rules(text)):
        key = path + '/' + str(i)
        if r.startswith('@media') or r.startswith('@supports'):
            head, body = inner(r)
            if head.startswith('@media') and 'print' in head and 'screen' not in head: continue
            sub = build_css(body, key, keys)
            sub_css = [s for s in sub if not isinstance(s, tuple)]
            if sub_css: res.append(head + '{' + ''.join(sub_css) + '}')
        elif r.startswith('@keyframes') or r.startswith('@-webkit-keyframes'):
            res.append(('KF', r))
        elif key in keys:
            res.append(r)
    return res

# keys use the browser's own rule numbering (comments are not rules), which matches split_rules numbering.
items = build_css(css, '', keys)
assert len(split_rules(css)) in tops, 'rule numbering mismatch: %s vs %s' % (len(split_rules(css)), tops)
sel = [x for x in items if not isinstance(x, tuple)]
kfs = {re.match(r'@(?:-webkit-)?keyframes\s+([\w-]+)', x[1]).group(1): x[1] for x in items if isinstance(x, tuple)}
used = set(re.findall(r'animation(?:-name)?\s*:\s*([^;}]*)', ''.join(sel)))
used_names = set(w for u in used for w in re.findall(r'[A-Za-z_][\w-]*', u))
crit = ''.join(sel) + ''.join(v for k, v in kfs.items() if k in used_names)
crit = re.sub(r'\s*\n\s*', '', crit)

html = open(TARGET, encoding='utf-8').read()
block = '<style id="critical">/* AUTO-GENERATED by tools/make-critical.py: the rules the first screen needs. Edit style.css, then re-run the tool. */\n' + crit + '\n</style>'
if '<style id="critical">' in html:
    html = re.sub(r'<style id="critical">.*?</style>', lambda m: block, html, flags=re.S)
else:
    # place it right before the stylesheet link
    html = re.sub(r'(<link rel="stylesheet" href="/style\.css[^>]*>)', lambda m: block + '\n' + m.group(1), html, count=1)
open(TARGET, 'w', encoding='utf-8').write(html)
print('critical rules:', len(sel), '| keyframes:', len([k for k in kfs if k in used_names]), '| bytes:', len(crit.encode()))
