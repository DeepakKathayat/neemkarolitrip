# Neem Karoli Trip: how the website is organised

An independent Kainchi Dham trip guide (not the official trust). Static site on GitHub Pages: neemkarolitrip.com

| File | What it holds | Edit it when |
|---|---|---|
| `index.html` | The page text and layout (English + Hindi), the alert bar, the crowd-meter dates | Wording, rules, new sections |
| `style.css` | **All** the design (colours, spacing, phone/tablet/desktop layouts, light/dark) | Look and feel |
| `app.js` | **All** the features (trip planner, Ask the guide, crowd meter, filters, menu, analytics consent) | Behaviour. The "Ask the guide" answers start at `var KB = [` |
| `privacy.html`, `404.html` | Privacy policy, "page not found" | Rarely |
| `fonts/` | Self-hosted fonts (no Google Fonts requests) | Almost never |
| `tools/make-critical.py` | Rebuilds the small first-screen design inside `index.html` | After changing `style.css` (see below) |

## Two things to know

1. **Version number on the links.** `index.html` loads the files as `/style.css?v=20261018` and `/app.js?v=20261018`.
   After changing `style.css` or `app.js`, change that date (YYYYMMDD) in `index.html` so visitors get the new file at once.
2. **First-screen design.** A small copy of the rules the first screen needs sits inside `index.html` (`<style id="critical">`), so the page appears instantly while `style.css` loads. `style.css` is the one real source.
   After changing `style.css`, regenerate that block (it only needs Python + Playwright and a local server of the site):
   `python3 tools/make-critical.py http://localhost:8767/index.html index.html`
   If you forget, nothing breaks: `style.css` always wins once it loads; the first split second may just look slightly different.

## Numbers
Digits and the rupee sign use Mukta Bold everywhere (the heading font only supplies letters). Avoid `ch` units on heading text: the `ch` width follows the digit zero.


## Guide pages

`delhi-to-kainchi-dham.html`, `kainchi-dham-parking-shuttle.html`, `kainchi-dham-timings.html` and `nainital-kathgodam-to-kainchi-dham.html` are **generated**. Do not edit the HTML by hand.

- Edit the text in `tools/guide_content.py` (English and Hindi side by side), then run `python3 tools/build-guides.py` from the repo root.
- The shared design is `guide.css`. Bump the `?v=` date in `tools/build-guides.py` (`VER`) when you change it.
- The builder copies the font block, the "independent guide" notice and the consent banner from `privacy.html` and `index.html`, so those stay in step.
- Each page has Article, BreadcrumbList and FAQPage data built in. New pages also need an entry in `sitemap.xml` and links from the menu and footer in `index.html`.
- The parking page shows a dated **example** traffic plan. Replace it when a newer plan is confirmed.


## Light effects (fx.js)

A small WebGL layer: night-sky glow behind the hero headline, light along the hero river, a soft pointer light on cards, and a gentle shine on the main button and logo.

- **Off for everyone by default.** `FX_DEFAULT = false` in the last part of `app.js`. Try it on your own phone with `neemkarolitrip.com/?fx=1` (remembered on that phone). Turn it off with `/?fx=off`.
- To switch it on for all visitors, set `FX_DEFAULT = true` and bump the `?v=` dates.
- `fx.js` is only downloaded when the phone passes the checks in `app.js`: no reduced motion, no Data Saver, not 2G, not a very low-end phone. It then loads after the page is ready.
- It draws at low resolution, 30 frames a second, only while the hero is on screen and not scrolling. If the phone cannot keep up, it lowers the resolution once, then removes itself and the page looks as before.
- The page looks the same with it off: the CSS sky stays underneath, and all the extra CSS applies only when `html.fx-gl` is set.
- `?fx=force` skips the speed checks (for testing on a computer).
