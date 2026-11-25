# Resume

The live resume is **`../Sameeul_Khondoker_Jisan_Resume.pdf`** in the repo root.
Every **Resume** / **Download Resume** link on the site points at it (plain
`download` links in `index.html`).

`Sameeul_Khondoker_Jisan_Resume.tex` in this folder is the LaTeX source of that
PDF (two pages: Data Analytics | Data Science | Software Engineering). To update
the resume, edit the `.tex`, rebuild it and copy the PDF to the repo root under
the same filename (TinyTeX / TeX Live, standard packages only):

```bash
export PATH="$HOME/Library/TinyTeX/bin/universal-darwin:$PATH"
cd resume
pdflatex Sameeul_Khondoker_Jisan_Resume.tex   # run twice so hyperlinks settle
pdflatex Sameeul_Khondoker_Jisan_Resume.tex
cp Sameeul_Khondoker_Jisan_Resume.pdf ../
```

Build notes for the `.tex`:

- Hyphenation is switched off on purpose: a split word such as "classifi-cation"
  breaks keyword matching in applicant-tracking systems.
- `lmodern` (scalable Type 1 fonts) and `glyphtounicode` are loaded so ATS
  parsers and copy/paste read the text back exactly.
- The build leaves `.aux`, `.log` and `.out` files beside the `.tex`; they are
  git-ignored and safe to delete.
