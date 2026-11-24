# Resume

The live resume is **`../Sameeul_Khondoker_Jisan_Resume.pdf`** in the repo root.
Every **Resume** / **Download Resume** link on the site points at it (plain
`download` links in `index.html`).

The current PDF is the two-page November 2026 resume. It is built from a LaTeX
source kept outside this repository, so to update it, rebuild it there and copy
the new PDF to the repo root under the same filename.

`Sameeul_Khondoker_Jisan_Resume.tex` in this folder is the source of the
**earlier one-page resume (October 2026)**. It is kept for reference and no
longer matches the PDF. To keep the source here again, replace it with the
current `.tex` and build it like this (TinyTeX / TeX Live, standard packages only):

```bash
export PATH="$HOME/Library/TinyTeX/bin/universal-darwin:$PATH"
cd resume
pdflatex Sameeul_Khondoker_Jisan_Resume.tex   # run twice so hyperlinks settle
pdflatex Sameeul_Khondoker_Jisan_Resume.tex
cp Sameeul_Khondoker_Jisan_Resume.pdf ../
```

Build notes for the `.tex`:

- Hyphenation is switched off on purpose: a split word such as "Ensem-ble"
  breaks keyword matching in applicant-tracking systems.
- `glyphtounicode` is loaded so ATS parsers and copy/paste read the text back exactly.
- The build leaves `.aux`, `.log` and `.out` files beside the `.tex`; they are
  git-ignored and safe to delete.
