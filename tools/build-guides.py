#!/usr/bin/env python3
"""Builds the guide pages from tools/guide_content.py.
Run from the repo root:  python3 tools/build-guides.py
Each guide is written twice: an English page (/<slug>.html) and a Hindi page (/hi/<slug>.html),
linked with hreflang so Google shows each searcher the right language. A bilingual copy of the
timings page is also written to tools/news-shell.tmpl as the page shell for tools/build-news.py.
It also reads the font block, the independent-guide notice and the consent banner from
index.html and privacy.html so the guide pages always match them."""
import html, json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from guide_content import PAGES, NAMES, UPDATED, UPDATED_ISO

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()
VER = "2026110503"
SITE = "https://neemkarolitrip.com"

priv = rd("privacy.html")
fonts = re.search(r"<style>\s*(/\* Fonts hosted.*?)</style>", priv, re.S).group(1).strip()
idx = rd("index.html")
disclaimer = re.search(r'<div class="disclaimer">(.*?)</div>', idx, re.S).group(1).strip()
consent = re.search(r'(<div class="consent" id="consent".*?</div>\s*</div>)', idx, re.S).group(1)
brand_svg = re.search(r'<a class="brand" href="/">\s*(<svg.*?</svg>)', priv, re.S).group(1)

MODE = "both"   # "en", "hi" or "both" (bilingual shell for the news page)
def two(en, hi, tag="div"):
    if MODE == "en": return '<%s lang="en">%s</%s>' % (tag, en, tag)
    if MODE == "hi": return '<%s lang="hi">%s</%s>' % (tag, hi, tag)
    return '<%s lang="en">%s</%s>\n<%s lang="hi">%s</%s>' % (tag, en, tag, tag, hi, tag)
def sp(en, hi):
    if MODE == "en": return en
    if MODE == "hi": return hi
    return '<span lang="en">%s</span><span lang="hi">%s</span>' % (en, hi)
def only(htm):
    """Drop the other language's <span|p|div lang="..">..</..> blocks from shared bilingual markup."""
    if MODE == "both": return htm
    other = "hi" if MODE == "en" else "en"
    for tag in ("span", "p", "div"):
        htm = re.sub(r'<%s lang="%s">.*?</%s>' % (tag, other, tag), "", htm, flags=re.S)
    if MODE == "hi":
        # links to other guides inside Hindi text go to their Hindi pages
        for slug in NAMES:
            htm = htm.replace('href="/%s.html' % slug, 'href="/hi/%s.html' % slug)
        # ...except the language switch, which must keep pointing at the English page
        htm = re.sub(r'href="/hi/([\w-]+\.html)" hreflang="en"', r'href="/\1" hreflang="en"', htm)
    return htm
def url_of(slug, lang):
    return "%s/%s%s.html" % (SITE, "hi/" if lang == "hi" else "", slug)
def path_of(slug, lang):
    return "/%s%s.html" % ("hi/" if lang == "hi" else "", slug)
def plain(s): return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()
def esc(s): return html.escape(s, quote=True)

def build(pg):
    UPDATED, UPDATED_ISO = pg.get("updated", (globals()["UPDATED"], globals()["UPDATED_ISO"]))
    slug = pg["slug"]; L = "hi" if MODE == "hi" else "en"; url = url_of(slug, L)
    en_h1, hi_h1 = pg["h1"]
    title = pg.get("title_hi", pg["title"]) if L == "hi" else pg["title"]
    desc = pg.get("desc_hi", pg["desc"]) if L == "hi" else pg["desc"]
    faqs = pg["faq"]
    ld = [
        {"@context": "https://schema.org", "@type": "Article", "headline": hi_h1 if L == "hi" else en_h1,
         "description": desc, "inLanguage": (["en", "hi"] if MODE == "both" else L), "dateModified": UPDATED_ISO,
         "mainEntityOfPage": url, "image": SITE + "/og-image.jpg",
         "author": {"@type": "Organization", "name": "Neem Karoli Trip", "url": SITE + "/"},
         "publisher": {"@type": "Organization", "name": "Neem Karoli Trip", "url": SITE + "/"}},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "कैंची धाम ट्रिप गाइड" if L == "hi" else "Kainchi Dham Trip Guide", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": NAMES[slug][1 if L == "hi" else 0], "item": url}]},
        {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in ([(f[2], f[3]) for f in faqs] if L == "hi" else [(f[0], f[1]) for f in faqs])]},
    ]
    ld_html = "\n".join('<script type="application/ld+json">%s</script>' % json.dumps(x, ensure_ascii=False) for x in ld)

    quick = two("<h2>Short answer</h2><ul>%s</ul>" % "".join("<li>%s</li>" % e for e, _ in pg["quick"]),
                "<h2>संक्षेप में</h2><ul>%s</ul>" % "".join("<li>%s</li>" % h for _, h in pg["quick"]))
    secs = []
    for he, hh, be, bh in pg["sections"]:
        secs.append('<section class="card">\n%s\n</section>' % two("<h2>%s</h2>\n%s" % (he, be), "<h2>%s</h2>\n%s" % (hh, bh)))
    faq_en = "".join("<h3>%s</h3><p>%s</p>" % (q, a) for q, a, _, _ in faqs)  # noqa
    faq_hi = "".join("<h3>%s</h3><p>%s</p>" % (q, a) for _, _, q, a in faqs)
    faq = '<section class="card">\n%s\n</section>' % two("<h2>Common questions</h2>" + faq_en, "<h2>आम सवाल</h2>" + faq_hi)
    more = "".join('<li><a href="%s">%s</a></li>' % (path_of(s, L) if MODE != "both" else "/%s.html" % s, sp(*NAMES[s])) for s in pg["related"])
    more += '<li><a href="/#planner">%s</a></li><li><a href="/#status">%s</a></li>' % (
        sp("Free trip cost planner", "मुफ़्त ट्रिप कॉस्ट प्लानर"), sp("Latest rules (updated daily)", "ताज़ा नियम (रोज़ अपडेट)"))
    more_html = '<section class="card more"><h2>%s</h2><ul>%s</ul></section>' % (sp("More guides", "और गाइड"), more)
    if MODE == "both":
        alts = ""
        langsw = ('<div class="lang" role="group" aria-label="Language / भाषा">\n'
                  '      <button type="button" data-set-lang="hi" aria-pressed="false">हिंदी</button>\n'
                  '      <button type="button" data-set-lang="en" aria-pressed="true">English</button>\n    </div>')
        langjs = BOTH_JS
    else:
        alts = ('<link rel="alternate" hreflang="en" href="%s">\n<link rel="alternate" hreflang="hi" href="%s">\n'
                '<link rel="alternate" hreflang="x-default" href="%s">') % (url_of(slug, "en"), url_of(slug, "hi"), url_of(slug, "en"))
        langsw = ('<nav class="lang" aria-label="Language / भाषा">\n'
                  '      <a href="%s" hreflang="hi" lang="hi" data-to-lang="hi"%s>हिंदी</a>\n'
                  '      <a href="%s" hreflang="en" lang="en" data-to-lang="en"%s>English</a>\n    </nav>') % (
                  path_of(slug, "hi"), ' aria-current="page"' if L == "hi" else "", path_of(slug, "en"), ' aria-current="page"' if L == "en" else "")
        langjs = ('  /* This page is in one language; remember it so the home page opens in the same language. */\n'
                  '  try { localStorage.setItem("nkt-lang", "%s"); } catch(e){}\n'
                  '  document.querySelectorAll("[data-to-lang]").forEach(function(a){ a.addEventListener("click", function(){ try { localStorage.setItem("nkt-lang", a.getAttribute("data-to-lang")); } catch(e){} }); });') % L
    srcs = "".join('<li><a href="%s" target="_blank" rel="noopener">%s</a></li>' % (esc(u), esc(t)) for t, u in pg["sources"])

    return """<!doctype html>
<html lang="%(hl)s" data-lang="%(hl)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(url)s">
%(alts)s
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#1F3B2D">
<script>(function(){ try { var t = localStorage.getItem("nkt-theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch(e){} })();</script>
<meta property="og:type" content="article">
<meta property="og:site_name" content="Neem Karoli Trip">
<meta property="og:locale" content="%(loc)s">
<meta property="og:locale:alternate" content="%(loc2)s">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(url)s">
<meta property="og:image" content="%(site)s/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/mukta-400-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/yatra-one-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>
%(fonts)s
</style>
<link rel="stylesheet" href="/guide.css?v=%(ver)s">
%(ld)s
</head>
<body>
<header class="bar">
  <div class="wrap">
    <a class="brand" href="/">
      %(svg)s
      <span lang="en">Neem Karoli Trip</span><span lang="hi">नीम करोली ट्रिप</span>
    </a>
    %(langsw)s
  </div>
</header>

<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">%(crumb_home)s</a> › %(crumb_here)s</nav>
  <h1>%(h1)s</h1>
  <p class="updated">%(updated)s</p>
  <div class="lead">%(intro)s</div>
  <div class="quick">
%(quick)s
  </div>
  <div class="cta">
    <a class="btn primary" href="/#planner">%(cta1)s</a>
    <a class="btn" href="/#status">%(cta2)s</a>
  </div>

%(secs)s

%(faq)s

%(more)s
</main>

<footer>
  <div class="wrap">
    <div class="disclaimer">
      %(disclaimer)s
    </div>
    <h2>%(src_h)s</h2>
    <ul>%(srcs)s</ul>
    <p><a href="/">%(back)s</a> · <a href="/privacy.html">%(privacy)s</a><button type="button" class="linkbtn" data-consent-open>%(consent_btn)s</button></p>
    <p>© 2026 neemkarolitrip.com</p>
  </div>
</footer>

%(consent)s

<script>
(function(){
%(langjs)s

  /* Google Analytics: loads ONLY after the visitor taps Accept (same choice as the home page, key nkt-consent). */
  var GA_ID = "G-2941KYJBNX", KEY = "nkt-consent", box = document.getElementById("consent"), loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", {analytics_storage:"denied", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied"});
  function load(){
    if (loaded) return; loaded = true;
    gtag("consent", "update", {analytics_storage:"granted"});
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID; document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, {allow_google_signals:false, allow_ad_personalization_signals:false});
  }
  function choose(v){ try { localStorage.setItem(KEY, v); } catch(e){} box.hidden = true; if (v === "granted") load(); }
  var c = null; try { c = localStorage.getItem(KEY); } catch(e){}
  if (c === "granted") load(); else if (c !== "denied") setTimeout(function(){ box.hidden = false; }, 1200);
  document.querySelectorAll("[data-consent]").forEach(function(b){ b.addEventListener("click", function(){ choose(b.getAttribute("data-consent")); }); });
  document.querySelectorAll("[data-consent-open]").forEach(function(b){ b.addEventListener("click", function(){ box.hidden = false; }); });
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || !loaded) return;
    if (/whatsapp|instagram|youtube|facebook/.test(a.hostname)) gtag("event", "social_click", {network:a.hostname.replace("www.","")});
  });
})();
</script>
</body>
</html>
""" % dict(
        hl=("en" if MODE == "both" else L), alts=alts, loc=("hi_IN" if L == "hi" else "en_IN"), loc2=("en_IN" if L == "hi" else "hi_IN"),
        langsw=langsw, langjs=langjs,
        title=esc(title), desc=esc(desc), url=url, site=SITE, fonts=fonts, ver=VER, ld=ld_html, svg=brand_svg,
        crumb_home=sp("Kainchi Dham guide", "कैंची धाम गाइड"), crumb_here=sp(NAMES[slug][0], NAMES[slug][1]),
        h1=sp(en_h1, hi_h1), updated=sp("Last checked " + UPDATED[0], "अंतिम जाँच " + UPDATED[1]),
        intro=two(pg["intro"][0], pg["intro"][1], "p"), quick=quick,
        cta1=sp("Plan my trip", "मेरी ट्रिप प्लान करें"), cta2=sp("See latest rules", "ताज़ा नियम देखें"),
        secs="\n\n".join(secs), faq=faq, more=more_html, disclaimer=only(disclaimer),
        src_h=sp("Sources", "स्रोत"), srcs=srcs, back=sp("← Back to the Kainchi Dham guide", "← कैंची धाम गाइड पर वापस जाएँ"),
        privacy=sp("Privacy Policy", "गोपनीयता नीति"), consent_btn=sp("Analytics choice", "एनालिटिक्स की पसंद"), consent=only(consent))

BOTH_JS = '''  function setLang(l){
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l === "hi" ? "hi" : "en");
    document.querySelectorAll("[data-set-lang]").forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-set-lang") === l)); });
    try { localStorage.setItem("nkt-lang", l); } catch(e){}
  }
  document.querySelectorAll("[data-set-lang]").forEach(function(b){ b.addEventListener("click", function(){ setLang(b.getAttribute("data-set-lang")); }); });
  var saved = null;
  try { saved = localStorage.getItem("nkt-lang"); } catch(e){}
  if (!saved && (navigator.language || "").toLowerCase().indexOf("hi") === 0) saved = "hi";
  setLang(saved === "hi" ? "hi" : "en");'''

os.makedirs(os.path.join(ROOT, "hi"), exist_ok=True)
for pg in PAGES:
    for MODE in ("en", "hi"):
        out = os.path.join(ROOT, ("hi" if MODE == "hi" else ""), pg["slug"] + ".html")
        open(out, "w", encoding="utf-8").write(only(build(pg)))
        print("wrote", os.path.relpath(out, ROOT), os.path.getsize(out), "bytes")
MODE = "both"
shell = [pg for pg in PAGES if pg["slug"] == "kainchi-dham-timings"][0]
open(os.path.join(ROOT, "tools", "news-shell.tmpl"), "w", encoding="utf-8").write(build(shell))
print("wrote tools/news-shell.tmpl")
