# Sameeul Khondoker Jisan — Portfolio

Personal portfolio of **Sameeul Khondoker Jisan** — Data Scientist · Data Analyst. IBM-certified ×6 (Data Science, Data Analytics, Machine Learning, Deep Learning, AI Engineering, Generative AI Engineering), Daffodil International University.

🔗 **Live:** https://sameeulkhondokerjisan.github.io/my-portfolio/

## Tech Stack

A hand-built, dependency-free **static web stack** (no framework, no build step) — fast, portable, and deployable straight to GitHub Pages:

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, grid, flexbox, light/dark theming |
| Behaviour | Vanilla JavaScript (ES6) — theme toggle, scroll reveals, copy-to-clipboard, resume download, contact form |
| Fonts | Google Fonts (Space Grotesk, Inter, JetBrains Mono) |
| Hosting | GitHub Pages |

## Project Structure

```
.
├── index.html          # Page structure / content (markup only)
├── css/
│   └── styles.css      # All styling (theme variables, layout, components, light/dark)
├── js/
│   └── main.js         # All interactivity (theme, nav, reveals, download, clipboard, contact form)
├── Sameeul_Khondoker_Jisan_Resume.pdf
├── Profile pic.png
├── jisan-logo.png
├── robots.txt
└── sitemap.xml
```

> A tiny theme-detection script is kept inline in `<head>` on purpose — it sets light/dark mode before first paint to prevent a flash of the wrong theme. All other logic lives in `js/main.js`.

## Features

- **Light & dark themes** with OS-preference detection and a manual toggle (persisted in `localStorage`)
- **Responsive** layout (desktop → tablet → mobile)
- **Resume download** — one click, no redirects
- **Working contact form** — submissions post to [Web3Forms](https://web3forms.com) and land in my inbox, with a `mailto:` fallback if the request fails. Set `WEB3FORMS_KEY` in `js/main.js`.
- **Sections:** Hero · About · Skills · Career Roadmap · Projects · Experience & Certifications · Contact
- Accessible, keyboard-navigable, reduced-motion friendly

## Local Development

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

© Sameeul Khondoker Jisan · Dhaka, Bangladesh
