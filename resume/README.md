# Resume

The live resume is **`../Sameeul_Khondoker_Jisan_Resume.pdf`** in the repo root —
that is the file the site's **Download Resume** button serves (`js/main.js`
always requests that exact path).

`Sameeul_Khondoker_Jisan_Resume.tex` in this folder is the **source of that PDF**.
Edit the `.tex`, rebuild, and copy the PDF to the repo root under the same filename.

To build it (TinyTeX / TeX Live, standard packages only):

```bash
export PATH="$HOME/Library/TinyTeX/bin/universal-darwin:$PATH"
cd resume
pdflatex Sameeul_Khondoker_Jisan_Resume.tex   # run twice so hyperlinks settle
pdflatex Sameeul_Khondoker_Jisan_Resume.tex
cp Sameeul_Khondoker_Jisan_Resume.pdf ../
```

Build notes:

- Hyphenation is switched off on purpose — a split word such as "Ensem-ble"
  breaks keyword matching in applicant-tracking systems.
- `glyphtounicode` is loaded so ATS parsers and copy/paste read the text back exactly.
- The build leaves `.aux`, `.log` and `.out` files beside the `.tex`; they are
  git-ignored and safe to delete.

If you edit the resume somewhere else (e.g. Overleaf), drop the new PDF in the
repo root under the same filename and update this `.tex` too, so the two do not drift.
