# Sameeul Khondoker Jisan — Portfolio

Personal portfolio of **Sameeul Khondoker Jisan**: data analytics, data science and software engineering. Data Science Intern at Codio AI Solution; B.Sc. in Software Engineering (Major in Data Science), Daffodil International University; six IBM Professional Certificates. Python · SQL · Excel · Power BI · Tableau · Java.

🔗 **Live:** https://sameeulkhondokerjisan.github.io/my-portfolio/

## Tech Stack

A hand-built, dependency-free **static web stack** (no framework, no build step) — fast, portable, and deployable straight to GitHub Pages:

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — design tokens (custom properties), grid, flexbox, light/dark theming, mobile-first breakpoints |
| Behaviour | Vanilla JavaScript (ES6): theme toggle, mobile menu, scroll reveals, KPI counters, project filters, copy-to-clipboard, contact form |
| Fonts | Google Fonts (Bricolage Grotesque, Inter, IBM Plex Mono) |
| Hosting | GitHub Pages |

## Project Structure

```
.
├── index.html          # Page structure / content (markup only)
├── css/
│   └── styles.css      # All styling ("Insight" design tokens, layout, components, light/dark)
├── js/
│   └── main.js         # All interactivity (theme, nav, reveals, counters, project filters, clipboard, contact form)
├── img/
│   └── projects/       # 960×540 WebP previews of each case study's Power BI / Tableau dashboard
├── resume/
│   ├── README.md       # where the resume PDF comes from
│   └── Sameeul_Khondoker_Jisan_Resume.tex   # LaTeX source of the current resume
├── Sameeul_Khondoker_Jisan_Resume.pdf       # current resume (built from that source), served by the Download Resume button
├── icons/
│   ├── favicon-32.png, favicon-192.png, icon-512.png, apple-touch-icon.png   # browser-tab / home-screen icons
│   └── logo-body.png, logo-bar.png   # J logo split into two masks, recoloured per theme in CSS
├── jisan_portfolio.png  # 1200×630 social share card (Open Graph / Twitter)
├── Profile pic.png
├── jisan-logo.png       # original logo artwork (source for the icons)
├── 404.html             # "page not found" page (GitHub Pages serves it for any missing path)
├── site.webmanifest     # home-screen name + icons for Android
├── robots.txt
└── sitemap.xml
```

> A tiny theme-detection script is kept inline in `<head>` on purpose — it sets light/dark mode before first paint to prevent a flash of the wrong theme. All other logic lives in `js/main.js`.

## Features

- **Light & dark themes** with OS-preference detection and a manual toggle (persisted in `localStorage`)
- **Responsive** layout, checked from 320px phones up to 1920px desktops — no sideways scroll, no overlapping elements
- **Resume download** — plain `download` links, so they work even without JavaScript
- **Working contact form** — messages are relayed straight to my Gmail inbox by [FormSubmit](https://formsubmit.co) (no API key, no account). Falls back to a pre-filled Gmail compose link if the relay is unreachable. One-time setup: submit the form once after deploying and click the confirmation email FormSubmit sends.
- **Sections:** Hero (analyst snapshot dashboard) · About · Projects · Experience & Education · Research · Skills · Certifications & Awards · Contact
- **Projects:** six case studies with dashboard previews, data, method and result for each, filterable by tool (Power BI, Tableau) and method (causal inference, machine learning); machine learning and software engineering projects below
- **Verified content:** facts come from the current resume (`Sameeul_Khondoker_Jisan_Resume.pdf`), the project repositories' READMEs and results, and the Coursera certificates (each card links to its verification page). Update them together
- Accessible, keyboard-navigable, reduced-motion friendly

## Local Development

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

© Sameeul Khondoker Jisan · Dhaka, Bangladesh
