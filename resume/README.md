# Resume source

`Sameeul_Khondoker_Jisan_Resume.tex` is the source of the resume served by the
site's **Download Resume** button.

## Rebuild after editing

```bash
export PATH="$HOME/Library/TinyTeX/bin/universal-darwin:$PATH"
cd resume
pdflatex Sameeul_Khondoker_Jisan_Resume.tex
cp Sameeul_Khondoker_Jisan_Resume.pdf ../Sameeul_Khondoker_Jisan_Resume.pdf
```

The copy step matters: `js/main.js` serves the PDF from the **repo root**, not
from this folder. Editing the `.tex` alone changes nothing on the live site.

Uses base LaTeX only (no `titlesec` / `enumitem` / `microtype`), so it builds on
a minimal TinyTeX install without extra packages.
