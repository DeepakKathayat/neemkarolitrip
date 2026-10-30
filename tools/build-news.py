#!/usr/bin/env python3
"""Builds news.html and the homepage "Latest news" strip from tools/news_content.py.
Run from the repo root:  python3 tools/build-news.py
Uses kainchi-dham-timings.html (built by build-guides.py) as the page shell, so run build-guides.py first."""
import html, json, os, re, sys, datetime
sys.path.insert(0, os.path.dirname(__file__))
from news_content import POSTS, CATS
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(p): return open(os.path.join(ROOT, p), encoding="utf-8").read()
def wr(p, s): open(os.path.join(ROOT, p), "w", encoding="utf-8").write(s)
esc = lambda s: html.escape(s, quote=True)
SITE = "https://neemkarolitrip.com"; VER = "20261031"
EN_M = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
HI_M = "जनवरी फ़रवरी मार्च अप्रैल मई जून जुलाई अगस्त सितंबर अक्टूबर नवंबर दिसंबर".split()
def sp(en, hi): return '<span lang="en">%s</span><span lang="hi">%s</span>' % (en, hi)
def dates(iso):
    d = datetime.date.fromisoformat(iso)
    return "%d %s %d" % (d.day, EN_M[d.month-1], d.year), "%d %s %d" % (d.day, HI_M[d.month-1], d.year)
POSTS.sort(key=lambda p: p["date"], reverse=True)

def card(p):
    de, dh = dates(p["date"]); ce, ch = CATS[p["cat"]]
    srcs = " · ".join('<a class="src" href="%s" target="_blank" rel="noopener">%s</a>' % (esc(u), sp(esc(e), esc(h))) for e, h, u in p["src"])
    return ('<article class="card post" id="%s" data-cat="%s">\n<p class="post-meta"><span class="pill">%s</span> <time datetime="%s">%s</time></p>\n'
            '<h2>%s</h2>\n<p lang="en">%s</p><p lang="hi">%s</p>\n<p class="post-tip"><strong>%s</strong> %s</p>\n<p class="post-src">%s</p>\n'
            '<p class="post-act"><a href="%s">%s</a> <button type="button" class="linkbtn" data-share="%s">%s</button></p>\n</article>') % (
        p["id"], p["cat"], sp(ce, ch), p["date"], sp(de, dh), sp(esc(p["title"][0]), esc(p["title"][1])),
        esc(p["body"][0]), esc(p["body"][1]), sp("Tip:", "सुझाव:"), sp(esc(p["tip"][0]), esc(p["tip"][1])), srcs,
        p["more"], sp("Read the full guide →", "पूरी गाइड पढ़ें →"), p["id"], sp("Share", "शेयर करें"))

tabs = '<button type="button" class="tab" data-filter="all" aria-pressed="true">%s</button>' % sp("All", "सभी") + "".join(
    '<button type="button" class="tab" data-filter="%s" aria-pressed="false">%s</button>' % (k, sp(*v)) for k, v in CATS.items())
main = '''<main class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="/">%s</a> › %s</nav>
  <h1>%s</h1>
  <p class="updated">%s</p>
  <p class="lead" lang="en">Short, sourced updates for people planning a Kainchi Dham visit. Every post links to the news report it comes from.</p>
  <p class="lead" lang="hi">कैंची धाम की यात्रा करने वालों के लिए छोटी, स्रोत-सहित ख़बरें। हर पोस्ट में उस समाचार का लिंक है जिससे वह ली गई है।</p>
  <div class="tabs" role="group" aria-label="Filter / फ़िल्टर">%s</div>
  <div id="posts">
%s
  </div>
  <p class="note">%s</p>
</main>''' % (sp("Kainchi Dham guide", "कैंची धाम गाइड"), sp("News", "ख़बरें"), sp("Kainchi Dham News &amp; Updates", "कैंची धाम ख़बरें और अपडेट"),
   sp("Latest post: " + dates(POSTS[0]["date"])[0], "ताज़ा पोस्ट: " + dates(POSTS[0]["date"])[1]), tabs, "\n".join(card(p) for p in POSTS),
   sp("Neem Karoli Trip is an independent guide. These posts summarise public news reports and do not speak for the temple trust or the administration. Rules change often, so check the <a href=\"/#status\">latest rules</a> before you travel.",
      "नीम करोली ट्रिप एक स्वतंत्र गाइड है। ये पोस्ट सार्वजनिक समाचारों का सार हैं और मंदिर ट्रस्ट या प्रशासन की ओर से नहीं हैं। नियम अक्सर बदलते हैं, इसलिए यात्रा से पहले <a href=\"/#status\">ताज़ा नियम</a> देखें।"))

page = rd("kainchi-dham-timings.html")
title = "Kainchi Dham News and Updates | Neem Karoli Trip"
desc = "Latest sourced updates on Kainchi Dham: registration plans, weekend traffic and shuttle rules, rate lists and crowd levels. English and Hindi."
url = SITE + "/news.html"
page = re.sub(r"<title>.*?</title>", "<title>%s</title>" % esc(title), page, flags=re.S)
page = re.sub(r'(<meta name="description" content=")[^"]*', r"\g<1>" + esc(desc), page)
page = re.sub(r'(<link rel="canonical" href=")[^"]*', r"\g<1>" + url, page)
page = re.sub(r'(<meta property="og:title" content=")[^"]*', r"\g<1>" + esc(title), page)
page = re.sub(r'(<meta property="og:description" content=")[^"]*', r"\g<1>" + esc(desc), page)
page = re.sub(r'(<meta property="og:url" content=")[^"]*', r"\g<1>" + url, page)
page = page.replace('og:type" content="article"', 'og:type" content="website"')
arts = [{"@type": "NewsArticle", "headline": p["title"][0], "datePublished": p["date"], "dateModified": p["date"], "inLanguage": ["en", "hi"],
         "mainEntityOfPage": "%s/news.html#%s" % (SITE, p["id"]), "image": SITE + "/og-image.jpg",
         "author": {"@type": "Organization", "name": "Neem Karoli Trip", "url": SITE + "/"},
         "publisher": {"@type": "Organization", "name": "Neem Karoli Trip", "url": SITE + "/"}} for p in POSTS]
ld = [{"@context": "https://schema.org", "@type": "CollectionPage", "name": title, "url": url, "description": desc},
      {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Kainchi Dham Trip Guide", "item": SITE + "/"},
          {"@type": "ListItem", "position": 2, "name": "News", "item": url}]}] + [dict(a, **{"@context": "https://schema.org"}) for a in arts]
ld_html = "\n".join('<script type="application/ld+json">%s</script>' % json.dumps(x, ensure_ascii=False) for x in ld)
page = re.sub(r'(<script type="application/ld\+json">.*?</script>\s*)+', lambda m: ld_html + "\n", page, count=1, flags=re.S)
page = re.sub(r"<main class=\"wrap\">.*?</main>", lambda m: main, page, flags=re.S)
page = page.replace("</footer>", "</footer>", 1)
# footer sources list -> remove guide-specific sources
head, foot = page.split("<footer", 1)
foot = re.sub(r"<h2>.{0,200}?</h2>\s*<ul>.*?</ul>", "", foot, count=1, flags=re.S)
page = head + "<footer" + foot
page = page.replace("</script>\n</body>", '''</script>
<script>
(function(){
  var tabs = document.querySelectorAll(".tab"), posts = document.querySelectorAll(".post");
  function show(f){ tabs.forEach(function(t){ t.setAttribute("aria-pressed", String(t.getAttribute("data-filter") === f)); });
    posts.forEach(function(p){ p.hidden = !(f === "all" || p.getAttribute("data-cat") === f); }); }
  tabs.forEach(function(t){ t.addEventListener("click", function(){ show(t.getAttribute("data-filter")); }); });
  document.querySelectorAll("[data-share]").forEach(function(b){ b.addEventListener("click", function(){
    var u = location.origin + "/news.html#" + b.getAttribute("data-share"), h = b.closest(".post").querySelector("h2");
    var t = h ? (h.querySelector("[lang=\\"" + document.documentElement.getAttribute("data-lang") + "\\"]") || h).textContent : "";
    if (navigator.share) { navigator.share({title: t, url: u}).catch(function(){}); }
    else { window.open("https://wa.me/?text=" + encodeURIComponent(t + " " + u), "_blank", "noopener"); } }); });
  if (location.hash) { var el = document.getElementById(location.hash.slice(1)); if (el) { posts.forEach(function(p){ p.hidden = false; }); el.scrollIntoView(); } }
})();
</script>
</body>''', 1)
page = page.replace("/guide.css?v=", "/guide.css?v=")
wr("news.html", page)

# homepage strip
top = POSTS[:3]
li = "".join('<li><a href="/news.html#%s"><time datetime="%s">%s</time> <span>%s</span></a></li>' % (p["id"], p["date"], sp(*dates(p["date"])), sp(esc(p["title"][0]), esc(p["title"][1]))) for p in top)
strip = ('<!-- NEWS-STRIP:START (generated by tools/build-news.py, do not edit by hand) -->\n<section id="news" class="news-strip"><div class="wrap">\n'
         '<h2>%s</h2>\n<ul>%s</ul>\n<p><a class="btn" href="/news.html">%s</a></p>\n</div></section>\n<!-- NEWS-STRIP:END -->') % (
    sp("Latest news", "ताज़ा ख़बरें"), li, sp("All news and updates →", "सभी ख़बरें और अपडेट →"))
idx = rd("index.html")
if "NEWS-STRIP:START" in idx:
    idx = re.sub(r"<!-- NEWS-STRIP:START.*?NEWS-STRIP:END -->", lambda m: strip, idx, flags=re.S)
else:
    marker = "<section id=\"status\">"
    i = idx.index(marker); j = idx.rfind("<!--", 0, i)
    idx = idx[:j] + strip + "\n\n" + idx[j:]
wr("index.html", idx)
print("built news.html with", len(POSTS), "posts")
