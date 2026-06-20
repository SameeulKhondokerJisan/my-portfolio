# Sameeul Khondoker Jisan — Portfolio

Personal portfolio of **Sameeul Khondoker Jisan** — IBM-Certified Data Analyst & Data Scientist (Daffodil International University), focused on data analytics, machine learning, predictive modelling, and Explainable AI.

🔗 **Live:** https://sameeulkhondokerjisan.github.io/

## Tech Stack

A hand-built, dependency-free **static web stack** (no framework, no build step) — fast, portable, and deployable straight to GitHub Pages:

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, light/dark theming |
| Behaviour | Vanilla JavaScript (ES6) — theme toggle, scroll reveals, copy-to-clipboard, dual document download |
| Fonts | Google Fonts (Outfit, DM Sans) |
| Hosting | GitHub Pages |

## Project Structure

```
.
├── index.html          # Page structure / content (markup only)
├── css/
│   └── styles.css      # All styling (theme variables, layout, components, light/dark)
├── js/
│   └── main.js         # All interactivity (theme, nav, reveals, downloads, clipboard)
├── CV___Sameeul_Khondoker_Jisan.pdf
├── Resume___Sameeul_Khondoker_Jisan.pdf
├── Profile pic.png
├── jisan-logo.png
├── robots.txt
└── sitemap.xml
```

> A tiny theme-detection script is kept inline in `<head>` on purpose — it sets light/dark mode before first paint to prevent a flash of the wrong theme. All other logic lives in `js/main.js`.

## Features

- **Light & dark themes** with OS-preference detection and a manual toggle (persisted in `localStorage`)
- **Responsive** layout (desktop → tablet → mobile)
- **Download CV & Resume** — one click fetches both PDFs
- **Sections:** Hero · About · Projects · Experience & Learning Path · Skills · Contact
- Accessible, keyboard-navigable, reduced-motion friendly

## Local Development

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

© Sameeul Khondoker Jisan · Dhaka, Bangladesh
