---
id: CHANGELOG
titel: Änderungsprotokoll Weisungen Musterbank AG
version: "2.4"
datum: 2026-11-06
---
# CHANGELOG – Weisungen Musterbank AG
## Version 1.1 – 5. November 2026
Korrigierte fiktive Basisweisungen: YAML-Metadaten, sprechende Dateinamen, Meldekanäle, KI-Regeln, VSB 27 und übergreifende Verweise. Die v1.1-Texte W-01 bis W-11 werden inhaltlich unverändert übernommen. Bekannte offene Punkte: keine vollständige Neuverifikation aller GwG-/Aufsichtsverweise; keine BCM-, Operations- oder weiteren Detailweisungen.
## Version 1.2 – verworfener Dolo-only-Entwurf, 6. November 2026
E-01 bis E-04 ergänzt, W-09 archiviert und Dolo-Index erstellt. Nach fachlicher Gegenprüfung verworfen: Rollenwiderspruch, fehlende Definition, falsche DSG-Zuordnung, unklare Begriffe und vermischte Inhaltsarten.
## Version 2.0 – 6. November 2026 (Europe/Berlin)
- W-09 aktiv; Archiv-Metadaten entfernt; W-01/W-11-Verweise bestätigt.
- Neues E-00: dolose Handlung inkl. Eventualvorsatz, Indizien, Abgrenzungen, S1–S4 und A–D-Vorschlagslogik, Label und Meldekanäle.
- E-01 bis E-04 vollständig harmonisiert: Agent beurteilt vorläufig; Weisungsvorrang; Beziehungen/Lebensstil als Hinweis statt Beweis; externe Entscheide gemäss W-01; getrennte Aufbewahrung; Begriffe erklärt.
- Rechtliche Korrekturen: DSG Art. 8/32, ArGV 3 Art. 26 Abs. 2, Neugierabfrage nicht automatisch Art. 47 BankG.
- Agentenregeln separat `Leitplanken_Agent.md`; E-Blätter auf Bankregeln beschränkt.
- Spesen, Beschaffung, Bestechung und Urkundenfälschung in E-00 ergänzt.
- Vollständiger `incident_index` statt Dolo-only-Index; Scope-Notiz zur Projektskizze; Selbstprüfung erneuert.
- Alte `incident_index_dolo.*`, alte E-Versionen und frühere ZIP ersetzt; neue PDFs und `musterbank_weisungen_v2.zip`.

## Version 2.1 – 6. November 2026 (fachliche Nachprüfung)
- **Sanktionskategorien A–D:** aus allen Agentenausgaben entfernt (E-00, Leitplanken, Index). Grundlage: Projektskizze («schlägt keine Sanktionen vor»). Erfasst werden nur erschwerende und mildernde Umstände nach W-11 Ziff. 9.4.
- **Meldeweg W-07 korrigiert:** Verdacht gegen Leitung Compliance oder GL-Mitglieder geht an das Präsidium des Prüfungs- und Risikoausschusses, nicht an die Meldestelle 4747 (E-00 bis E-04, Leitplanken, Index).
- **Pseudonymisierung nach W-01 Ziff. 10** in E-00, Leitplanken und Index (Spalte `nur_pseudonymisiert`) aufgenommen.
- **E-00:** bewusste Fahrlässigkeit als Abgrenzung zum Eventualvorsatz ergänzt; Orientierung an Art. 12 StGB; Kurzform «Dolo» definiert; Anweisungen an den Agenten in die Leitplanken verschoben; Beispiel für Kategorie B präzisiert.
- **E-01 bis E-04:** Meldetabellen vereinheitlicht; Verweis auf nicht existierenden «Kontrollplan» bzw. «Aufbewahrungsplan» durch festzulegende bzw. dokumentierte Fristen der Fachstelle ersetzt; Begünstigungsverbot in E-03 präzisiert; Begriffe vereinheitlicht.
- **Leitplanken:** Nutzerkreis auf Incident Desk und Fachstellen beschränkt; Konfidenzstufen definiert; Quellenpflicht und Vorsichtsregel («im Zweifel höherer Schweregrad») ergänzt; Incident-Entwurf mit Freigabe nach W-01 Ziff. 6.3; Protokollierung der Agentenausgaben; Ausschluss aus der Vektorsuche.
- **Routing-Index:** neu erstellte `incident_index.csv` (54 Falltypen, 15 Spalten), da die in Version 2.0 genannte CSV nicht vorlag; Schweregrade nur als Ausgangswerte aus Weisungsbeispielen, sonst «Einzelfall»; keine Schlagwortspalte.
- **W-10 Version 1.2:** «VSB 27» nicht belegbar, ersetzt durch VSB 20 mit Prüfhinweis; Nummerierung der Listen und Tabelle in Ziff. 9 redaktionell bereinigt.
- `KRITISCHE_SELBSTPRUEFUNG.md` (Version 2.0) wird durch `PRUEFBERICHT_v2.1.md` ersetzt. Nicht gelieferte Dateien der Version 2.0 (Scope-Notiz, ZIP) sind nicht Bestandteil des Pakets.

## Version 2.2 – 6. November 2026
- Entscheid der Projektgruppe zu Prüfbericht v2.1 Ziff. 4.1: Interne Betrugsfälle werden nicht pseudonymisiert. Die verdächtigte mitarbeitende Person wird in Fallbeschreibung und Incident-Entwurf als «betroffene Person» (W-11 Ziff. 4) bezeichnet, ohne Namen. Pseudonymisierung nach W-01 Ziff. 10 bleibt auf die Fachsysteme beschränkt.
- Umgesetzt in E-00 Ziff. 5, Leitplanken Ziff. 6 und Routing-Index (Ziff. 6, Spaltenbeschreibung, IDX-092).
- Entscheid zu Prüfbericht v2.1 Ziff. 4.2: Fallbeispiel «82-jährige Kundin» aus W-10 Anhang A gestrichen (nicht definierte Potenzialkennzeichnung S3); Routing-Index IDX-098 angepasst.
- Entscheid zu Prüfbericht v2.1 Ziff. 4.3: Alle Weisungen W-01 bis W-11 als **Version 1.2** neu erzeugt. Nummerierte Listen bereinigt (Verweise wie «W-11 Ziff. 7.4.3» wieder auffindbar); Angaben zu Verantwortung, Fachstelle, Version und Inkrafttreten im Kopf jeder Weisung. Inhalte der Version 1.1 übernommen; W-01 Ziff. 10 um die Bezeichnung «betroffene Person» ergänzt; W-10 wie oben (VSB 20, Fallbeispiel gestrichen).
- Potenzialkennzeichnung in W-01 aufgenommen (Begriff in Ziff. 4, Regel in Ziff. 7): eigenes Merkmal neben dem Schweregrad für Beinahe-Vorfälle und abgewehrte Versuche, sofern die Fachweisung es vorsieht (derzeit W-10 Ziff. 9). Nachgeführt in E-00 und Leitplanken.

## Version 2.3 – 6. November 2026 (Gesamtprüfung)
- Unabhängige Gesamtprüfung aller Dokumente; alle Befunde umgesetzt (Details: Prüfbericht Ziff. 6).
- Weisungen W-01 bis W-03 und W-05 bis W-11 als Version 1.3; W-04 unverändert Version 1.2.
- Ergänzungsblätter E-00 bis E-04 einheitlich Version 2.3, Status genehmigt (fiktiv).
- Leitplanken und Routing-Index Version 2.3; CSV mit 56 Falltypen ist neu die Quelle (`src/make_csv.py` nicht mehr massgebend).

## Version 2.4 – 6. November 2026 (zweite Gesamtprüfung)
- 21 Einzelpunkte aus der zweiten unabhängigen Prüfung umgesetzt (Details: Prüfbericht Ziff. 7). Weisungen bleiben Version 1.3 (Ergänzungen in den Schlussbestimmungen vermerkt); Leitplanken, E-00 und Routing-Index aktualisiert.

