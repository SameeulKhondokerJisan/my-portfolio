# Sameeul Khondoker Jisan — Portfolio

Personal portfolio of **Sameeul Khondoker Jisan** — Data Scientist · Data Analyst · Software Engineer · Machine Learning Engineer. B.Sc. in Software Engineering (Major in Data Science), Daffodil International University; IBM-certified ×6 (Data Science, Data Analytics, Machine Learning, Deep Learning, AI Engineering, Generative AI Engineering).

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
├── resume/
│   └── Sameeul_Khondoker_Jisan_Resume.tex   # LaTeX source of the resume PDF
├── Sameeul_Khondoker_Jisan_Resume.pdf       # served by the Download Resume button
├── jisan_portfolio.png  # 1200×630 social share card (Open Graph / Twitter)
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
- **Working contact form** — messages are relayed straight to my Gmail inbox by [FormSubmit](https://formsubmit.co) (no API key, no account). Falls back to a pre-filled Gmail compose link if the relay is unreachable. One-time setup: submit the form once after deploying and click the confirmation email FormSubmit sends.
- **Sections:** Hero · About · Skills · Career Roadmap · Projects (data science + software engineering) · Experience & Certifications · Contact
- **Resume-driven content** — the site mirrors `resume/Sameeul_Khondoker_Jisan_Resume.tex`; update both together
- Accessible, keyboard-navigable, reduced-motion friendly

## Local Development

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

© Sameeul Khondoker Jisan · Dhaka, Bangladesh
