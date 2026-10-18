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
