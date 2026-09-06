# Resume

The live resume is **`../Sameeul_Khondoker_Jisan_Resume.pdf`** in the repo root —
that is the file the site's **Download Resume** button serves.

You maintain that PDF yourself (it is built with TeX Live 2025, elsewhere).
To publish a new version, drop the new PDF in the **repo root** under that exact
filename and commit it. Nothing else needs changing — `js/main.js` always serves
that path.

## About the `.tex` in this folder

`Sameeul_Khondoker_Jisan_Resume.tex` is a reconstruction that was written here
before you uploaded your own PDF, because no LaTeX source existed in the repo at
the time. It is **not** the source of the live PDF and the two have diverged.

Keep it only if it is useful as a reference or fallback. If you maintain your
resume in Overleaf or elsewhere, this file can safely be deleted to avoid two
competing sources of truth.

Known divergence: this `.tex` says **CGPA 3.46**; the uploaded PDF says
**CGPA 3.55**. See the note in the project README about which is correct.

To build it (base LaTeX only, no extra packages needed):

```bash
export PATH="$HOME/Library/TinyTeX/bin/universal-darwin:$PATH"
cd resume
pdflatex Sameeul_Khondoker_Jisan_Resume.tex
```
