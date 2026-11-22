# KI-Assistent für Employee Incident Management

**CAS AI Management 2026 · Modul 2 · Leistungsnachweis 2 (KI-Projektskizze mit Prototyp)**
Team: Ersa Medjiti, Daniel Di Maio, Natalia Fütterer · Präsentation: 04.12.2026 · Stand Repository: 21.11.2026

> Alle Personen, Fälle, Weisungen und die Musterbank AG sind fiktiv. Es werden keine echten Daten verarbeitet.

## Worum es geht

Wenn Mitarbeitende einer Bank gegen interne Weisungen verstossen, erfasst ein Assessor von Compliance den Fall, bewertet Risiko und Verhalten, prüft Wiederholungen und legt das Incident Level fest: **Reminder**, **Employee Incident** oder **HR Referral**. Heute geschieht das von Hand; das kostet Zeit und führt zu uneinheitlichen Einstufungen.

Unser Prototyp zeigt einen KI-Assistenten mit zwei Rollen, die beide zum Soll-Prozess gehören:

- **Weisungs-Assistent für Mitarbeitende:** beantwortet Fragen zu den Weisungen mit Ziffer, erkennt meldepflichtige Vorfälle und leitet sie auf Wunsch anonym an Compliance weiter.
- **Incident-Tool für Assessors:** liest die Meldung, füllt die Fallakte aus und schlägt Policy, Risk Level und Behavior Level mit Begründung vor. Matrix und Pattern Aggregation rechnet das Tool mit festen Regeln. Der Assessor bestätigt jeden Vorschlag und übergibt den Fall zur Prüfung an die «CWB – Compliance Work Bench» bzw. das «HR Employee Relations System». Erst nach der Freigabe durch das Employee Incidents Team schreibt er die E-Mail an die Person; ein HR Referral übernimmt HR. Bei Unsicherheit bereitet der Assistent eine Anfrage an den Policy Owner vor.

**Leitidee:** Das Sprachmodell schlägt vor, feste Regeln rechnen, der Mensch entscheidet.

**Auf einen Blick:** Die [KI-Projektskizze (PDF, zwei Seiten)](01_Projektskizze/KI-Projektskizze_Employee_Incident_Agent.pdf) fasst auf Seite 1 Problem, Lösung, Daten, Ziele, Risiken, Bewertung und Weg zum Rollout zusammen; Seite 2 vergleicht die Alternativen und schätzt die Wirtschaftlichkeit.

## Prototyp ausprobieren

| Weg | Wofür | Voraussetzung |
|---|---|---|
| **1 · Video:** [`04_Prototyp/Demo_Incident-Tool.mp4`](04_Prototyp/Demo_Incident-Tool.mp4) (3 Minuten, mit Untertiteln) | Ganzer Ablauf ohne eigenes Klicken | – |
| **2 · Datei öffnen:** [`04_Prototyp/incident-tool.html`](04_Prototyp/incident-tool.html) herunterladen und im Browser öffnen | Ganze Demo im Modus «Vorbereitete Antworten», ohne Anmeldung und ohne Internet für die Logik | Moderner Browser (Chrome, Edge, Safari, Firefox) |
| **3 · Online mit KI live:** Link zum Claude-Artefakt (siehe unten) | Eigene Fragen und Meldungen mit dem Sprachmodell | Freigabe durch das Team, Anmeldung bei claude.ai |

**Demo in 3 Minuten (Weg 2, entspricht dem Video):**
1. Tab **Weisungs-Assistent**: Beispielfrage 5 anklicken (Kollege kopiert Kundendaten in ChatGPT). Der Assistent antwortet mit W-02 Ziff. 5 Nr. 5 und bietet «Als Meldung senden» an. Senden.
2. Tab **Incident-Tool**: Rolle wechselt zur Assessorin Lea Brunner. Die neue Meldung liegt im Posteingang. «Prüfen» öffnet die Fallakte; der Assistent füllt sie aus und stellt Rückfragen.
3. Policy, Risk und Behavior einzeln bestätigen, Incident Level festlegen und den Fall zur Prüfung an die CWB übergeben. Im Kasten «Demo · Antwort simulieren» gibt das Employee Incidents Team die Einstufung frei; danach entwirft der Assistent die Mitteilung an die Person (Employee Incident fliesst ins Year-End-Gespräch ein), das Tool prüft sie automatisch, Lea gibt sie frei.
4. Für die **Pattern Aggregation**: die Meldung zu Marco Keller (Bildschirm nicht gesperrt) öffnen. Die Matrix ergibt einen Reminder; das Tool findet einen Reminder mit gleichem Code vom 03.02.2026 und schlägt einen Employee Incident vor.
5. Im Posteingang unter **Antworten** liegen drei Beispielfälle mit Rückmeldung: Employee Incidents Team einverstanden, Employee Incidents Team nicht einverstanden, HR leitet an die CWB weiter. «E-Mail an … schreiben» öffnet den fertigen Entwurf.

Weitere Szenarien (No Breach, Verdacht auf Straftat, Selbstmeldung) und alle Funktionen: [`04_Prototyp/README.md`](04_Prototyp/README.md).

**Online-Links (Claude-Artefakte, vom Team freigegeben):**
- Incident-Tool: https://claude.ai/artifact/HkfYRsUN48rjz6ZjCsLUmn
- Testlauf (für das Projektteam): https://claude.ai/artifact/Nnq9T2CFFDHENX2ZuauR64

## Aufbau des Repositorys

| Ordner | Inhalt |
|---|---|
| [`01_Projektskizze`](01_Projektskizze) | [KI-Projektskizze mit Alternativen und Wirtschaftlichkeit (PDF)](01_Projektskizze/KI-Projektskizze_Employee_Incident_Agent.pdf) · [Job Insight Canvas, Entscheidungskaskade, Problemdefinition](01_Projektskizze/Job_Insight_Canvas.md) · [AI Canvas mit Bewertung](01_Projektskizze/AI_Canvas.md) · [Project Charter mit Governance](01_Projektskizze/Project_Charter.md) · [Gantt-Chart](01_Projektskizze/Gantt.md) · [Risiken, Ethik und Datenschutz](01_Projektskizze/Risiken_Ethik_Datenschutz.md) |
| [`02_Prozess`](02_Prozess) | Ist-Prozess «Employee Incident Management mit KI-Agent» (Geschäftsregeln) · [Soll-Prozess «KI-Assistent für Assessors»](02_Prozess/Soll-Prozess%20KI-Assistent%20f%C3%BCr%20Assessors.docx) (Fassung 21.11.2026) |
| [`03_Wissensbasis`](03_Wissensbasis) | Weisungen W-01 bis W-11, Ergänzungsblätter E-00 bis E-04, Leitplanken des Agenten, Incident-Index |
| [`04_Prototyp`](04_Prototyp) | [Incident-Tool](04_Prototyp/incident-tool.html) · [Testlauf](04_Prototyp/testlauf.html) · [Architekturskizze](04_Prototyp/Architektur.md) · [Demo-Video](04_Prototyp/Demo_Incident-Tool.mp4) · Quellcode in `src` |
| [`05_Qualitaet`](05_Qualitaet) | [Testfallkatalog mit 20 Fällen](05_Qualitaet/Testfaelle.md) · [Testberichte](05_Qualitaet/Testberichte) · Prüfbericht · CHANGELOG · vorgemerkte Änderungen |
| [`06_Praesentation`](06_Praesentation) | [Präsentation LNW 2](06_Praesentation/LNW2_Employee_Incident_Agent.pptx) (15 Folien mit Sprechernotizen) |

## Vorgehen und Bezug zu Modul 2

| Methode aus Modul 2 | Wo im Repository |
|---|---|
| Design Thinking (Double Diamond): Entdecken und Definieren | Job Insight Canvas, Problemdefinition und Lösungsprämisse |
| Prozessbeschreibung und Entscheidungskaskade (kompliziert vs. komplex) | Job Insight Canvas, Abschnitt Entscheidungskaskade; Ist-Prozess |
| KI Canvas mit Bewertung (Wünschbarkeit, Machbarkeit, Wirtschaftlichkeit) | AI Canvas; KI-Projektskizze |
| Mit KI verfeinern (BMAD: Project Brief, PRD) | Soll-Prozess als Anforderungsdokument; Prototyp iterativ mit Claude gebaut |
| KI-Ethik | Risiken, Ethik und Datenschutz; Schutzmechanismen in der Architektur |
| Projektplanung und Governance | Project Charter, Gantt-Chart |
| Qualitätssicherung | Testfallkatalog, Testlauf mit Soll/Ist-Vergleich, Prüfbericht |

## Technik in Kürze

Eine einzelne HTML-Datei ohne Server. Wissensbasis mit 62 Auszügen und Stichwortsuche (einfaches Retrieval-Augmented Generation), Sprachmodell Claude über die Artefakt-Schnittstelle, feste Regeln in JavaScript. Details und Zielbild für den Echtbetrieb: [Architekturskizze](04_Prototyp/Architektur.md). Neu bauen: `python3 04_Prototyp/src/build.py`.

## Grenzen

Prototyp mit fiktiven Daten, ohne Anmeldung und ohne Speicherung über die Sitzung hinaus. Der Katalog der Risiko-Codes ist ein Vorschlag. Die Leitplanken v2.4 sind noch an das Bewertungsmodell anzugleichen (siehe `05_Qualitaet/Vorgemerkte_Aenderungen.md`). Für den Echtbetrieb offen: Betrieb des Sprachmodells, Datenschutz-Folgenabschätzung, Schnittstellen.
