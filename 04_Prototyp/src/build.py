"""Baut die beiden HTML-Dateien des Prototyps aus den Quelldateien.
Aufruf im Ordner src:  python3 build.py
Ergebnis: ../incident-tool.html und ../testlauf.html (je eine Datei, ohne Server lauffähig)."""
import pathlib
here = pathlib.Path(__file__).parent
rd = lambda n: (here / n).read_text(encoding="utf-8")
wrap = lambda body: '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>\n' + body + '</body></html>\n'

# Incident-Tool
js = "\n".join(rd(f) for f in ["data.js", "kb.js", "logic.js", "app.js"])
(here.parent / "incident-tool.html").write_text(wrap(rd("shell.html") + "<script>\n" + js + "</script>\n"), encoding="utf-8")

# Testlauf: übernimmt capturePrompt() unverändert aus app.js
a = rd("app.js")
cp = a[a.index("function capturePrompt()"):a.index("\nfunction applyAI")].strip()
tr = rd("testrun.js").replace("// __CAPTURE_PROMPT__", "// aus app.js übernommen (unverändert)\n" + cp)
js = "\n".join(rd(f) for f in ["data.js", "kb.js", "logic.js", "testcases.js"]) + "\n" + tr
(here.parent / "testlauf.html").write_text(wrap(rd("testrun_shell.html") + "\n<script>\n" + js + "\n</script>\n"), encoding="utf-8")
print("incident-tool.html und testlauf.html gebaut")
