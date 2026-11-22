---
id: QK-V2.1-2026-11-06
titel: Prüfbericht Version 2.1
version: "2.4"
datum: 2026-11-06
dokumenttyp: Fachliche Qualitätskontrolle, keine Rechtsprüfung
ersetzt: KRITISCHE_SELBSTPRUEFUNG.md (Version 2.0)
sprache: de-CH
fiktiv: true
---

# Prüfbericht – Employee Incident Agent, Version 2.4

## 1 Gegenstand

Geprüft wurden die Ergänzungsblätter E-00 bis E-04, die Leitplanken des Agenten, der Routing-Index, CHANGELOG und Selbstprüfung der Version 2.0 sowie deren Übereinstimmung mit den Weisungen W-01 bis W-11 (Version 1.1) und der Projektskizze vom 5. November 2026.

## 2 Ergebnis

Version 2.0 war gegenüber dem ersten Entwurf deutlich verbessert (Umfang aller Weisungen, Definition doloser Handlungen, Trennung von Schweregrad und Sanktionskategorie, Datenschutzgrenzen). Es bestanden jedoch Widersprüche mit Auswirkungen auf Routing und Einstufung. Diese sind in Version 2.1 behoben (Ziff. 3). Offene Punkte, die einen Entscheid der Projektgruppe oder eine Quellenprüfung erfordern, sind in Ziff. 4 aufgeführt.

## 3 Behobene Mängel

| Nr. | Mangel in Version 2.0 | Korrektur in Version 2.1 |
|---|---|---|
| 1 | Index leitete Verdachtsfälle gegen Compliance-Leitung oder GL an 4747, also an Compliance selbst | Routing an das Präsidium des Prüfungs- und Risikoausschusses nach W-07, in allen Dokumenten |
| 2 | Agent durfte Sanktionskategorien A–D nennen; Widerspruch zur Projektskizze; Leitplanken in sich widersprüchlich (Ziff. 2.4 vs. 3.7) | A–D aus allen Agentenausgaben entfernt; nur erschwerende und mildernde Umstände |
| 3 | Pseudonymisierung nach W-01 Ziff. 10 fehlte in Leitplanken und Index | Eigene Ziffer in den Leitplanken; Spalte `nur_pseudonymisiert` im Index |
| 4 | Incident-Entwurf, Freigabe und Quellenpflicht aus der Projektskizze fehlten | In den Leitplanken ergänzt |
| 5 | Abgrenzung Eventualvorsatz – bewusste Fahrlässigkeit fehlte | In E-00 Ziff. 2 ergänzt |
| 6 | E-00 enthielt Agentenanweisungen entgegen dem eigenen Kopfvermerk | In die Leitplanken verschoben |
| 7 | Verweis auf nicht gelieferte `incident_index.csv` als «verbindliche» Quelle | CSV aus den Weisungen neu erstellt; Index als technische Umsetzung mit Vorrang der Weisung bezeichnet |
| 8 | Normalkanal 4444 und Anlaufstellen nach W-08 fehlten im Routing; «laufender Zahlungsbetrug» enger als W-01 | Ergänzt bzw. an W-01 angeglichen |
| 9 | W-10 nannte «VSB 27; ersetzt die VSB 20; in Kraft ab 1. Januar 2027» | Nicht belegbar (Recherche 6. November 2026); auf VSB 20 mit Prüfhinweis zurückgesetzt |
| 10 | Selbstprüfung bezeichnete die nicht gelieferte CSV als «technisch geprüft» | Selbstprüfung durch diesen Bericht ersetzt |
| 11 | Formfehler: Tabellen mit abweichender Spaltenzahl; fehlerhafte Listennummerierung in W-10 | Bereinigt |

## 4 Offene Punkte

1. **Erledigt (Entscheid der Projektgruppe vom 6. November 2026):** Für interne Betrugsfälle ist keine Pseudonymisierung vorgesehen; die verdächtigte mitarbeitende Person wird als «betroffene Person» (W-11 Ziff. 4) bezeichnet. Umgesetzt in E-00, Leitplanken und Routing-Index (Version 2.2). Die Projektskizze nennt W-10 noch allgemein bei der Pseudonymisierung und sollte auf «W-10 GwG-Fachstelle» präzisiert werden. Ursprünglicher Punkt – W-01 Ziff. 10 erfasst nur Fälle in Fachsystemen (bei W-10 die GwG-Fachstelle). Die Projektskizze nennt W-10 allgemein. Die Projektgruppe sollte entscheiden, ob interne Betrugsfälle über IncidentNet ebenfalls nur pseudonymisiert geführt werden, und W-01 oder die Skizze entsprechend anpassen.
2. **Erledigt (Entscheid der Projektgruppe vom 6. November 2026):** Das Fallbeispiel der 82-jährigen Kundin wurde aus W-10 Anhang A gestrichen. Die Potenzialkennzeichnung ist zudem als Begriff und Regel in W-01 Ziff. 4 und 7 aufgenommen. Ursprünglicher Punkt – W-10 Ziff. 9 definiert eine Potenzialkennzeichnung S2 ab CHF 100'000. Das Fallbeispiel der 82-jährigen Kundin verwendet eine «Potenzialkennzeichnung S3», die nicht definiert ist. W-01 kennt die Potenzialkennzeichnung nicht. Empfehlung: Regel in W-01 Ziff. 7 aufnehmen oder das Beispiel anpassen.
3. **Erledigt (6. November 2026):** Alle Weisungen wurden als Version 1.2 neu erzeugt; die Nummerierung ist bereinigt, die Inhalte der Version 1.1 sind übernommen. W-01 Ziff. 10 wurde um die Bezeichnung «betroffene Person» ergänzt (Entscheid zu Punkt 1). Ursprünglicher Punkt – In mehreren Weisungen (insbesondere W-11) sind nummerierte Listen durchgehend mit «1.» gesetzt. Verweise wie «W-11 Ziff. 7.4.3» sind dadurch im Dokument nicht auffindbar. Empfehlung: PDFs aus der Quelle neu erzeugen.
4. **Rechtsverweise:** Gezielt nachgeprüft wurden in Version 2.0 nur DSG Art. 8 und 32 sowie ArGV 3 Art. 26. Weitere Verweise (insbesondere GwG nach der Revision vom 1. Oktober 2026, FINMA-Meldefristen) sind vor der Präsentation am geltenden Text zu prüfen.
5. **VSB:** Falls die Projektgruppe über eine Quelle zu einer Nachfolgeregelung der VSB 20 verfügt, ist W-10 Ziff. 3 entsprechend anzupassen.

## 5 Verbleibende Risiken im Bankkontext

- **Datenschutz und Arbeitsrecht:** Die Dokumente legitimieren keine konkrete Überwachung. Datenquellen, Datenschutz-Folgenabschätzung, Informationspflichten und Aufbewahrungsfristen sind projektspezifisch zu prüfen.
- **Konfidenz:** Auch ordinale Konfidenzangaben eines Sprachmodells können Genauigkeit vortäuschen. Eine Kalibrierung mit Testfällen ist erforderlich.
- **Fehleinstufung von Vorsatz:** Falsch positive Einordnungen können Mitarbeitende unberechtigt belasten. Die Testfälle sollten deshalb gezielt nicht dolose Fälle (u.a. W-09) enthalten.
- **Technik:** Ein Laufzeittest der Wissensbasis (Abruf der richtigen Ziffern) und fachliche Testfälle stehen aus.

## 6 Gesamtprüfung vom 6. November 2026 (Version 2.3)

Nach den Anpassungen der Versionen 2.1 und 2.2 wurden alle 19 Dateien unabhängig geprüft (rund 100 Querverweise einzeln abgeglichen). Die Befunde wurden vollständig umgesetzt:

| Bereich | Korrektur |
|---|---|
| Routing-Index | Sanktionskategorien aus der CSV entfernt; Fallbezeichnungen neutral («mutmassliche», «Verdacht auf»); Fundstellen vervollständigt; Einträge an die Weisungen angeglichen; Amtsträger-Fall und Gewalt/Übergriff aufgeteilt (56 Falltypen) |
| Begriffe | «Betroffene Person» nur für die beschuldigte Person (W-11 Ziff. 4); für Opfer «belästigte Person» (W-08 Ziff. 5) |
| Zuständigkeiten | FINMA- und BACS-Meldungen überall: Entscheid CRO mit CEO; Strafanzeigen überall: Rechtsdienst mit CRO; Vorabklärung bei internem Betrug durch Fraud Management, Untersuchung durch Interne Revision (Entscheid Projektgruppe) |
| Pseudonymisierung | Einheitliche Liste der Fachsysteme in W-01 Ziff. 7 und 10; Spalte `nur_pseudonymisiert` mit Wert «ja, wenn über W-07»; Incident-Entwurf ohne Namen, Kurzentwurf bei Fachsystem-Fällen |
| Schweregrade | Schwellen eindeutig abgegrenzt (ab CHF 100'000 bis unter CHF 1 Mio.); Potenzialkennzeichnung S1 ab CHF 1 Mio. (Entscheid Projektgruppe); Rückstufung nach Phishing einheitlich |
| Verfahren | Ausstand der Leitung Compliance, wenn Compliance untersucht hat; Fristen bei fristloser Kündigung auf zwei Arbeitstage gestrafft; Fristbeginn und Empfänger von Verzögerungsmeldungen vereinheitlicht |
| Marktverdacht | Verdacht gegen Mitarbeitende: IncidentNet oder Telefon 4700, vertraulich über W-07 (Entscheid Projektgruppe) |
| Rechtsaussagen | Art. 9 Abs. 1 lit. c GwG (Terrorlisten nach Art. 22a GwG); Art. 102 Abs. 2 StGB (Strafbarkeit bei aktiver Bestechung); UVG-Kürzung als Hinweis statt Massnahme |
| Status | Ergänzungsblätter als genehmigt gekennzeichnet (fiktiv), einheitlich Version 2.3 (Entscheid Projektgruppe) |
| Fallbeispiele | Vorverurteilende Formulierungen neutralisiert; Bewerberinnen-Beispiel durch internen Beförderungsfall ersetzt (Entscheid Projektgruppe) |

Nicht geändert wurde die Schwelle von CHF 10 Mrd. für die Verbindlichkeit des FINMA-Rundschreibens 2010/1; sie wurde in der Recherche vom 5. November 2026 bestätigt.

## 7 Zweite Gesamtprüfung vom 6. November 2026 (Version 2.4)

Eine zweite unabhängige Prüfung aller Dokumente ergab keine grundlegenden Mängel mehr, aber 21 Einzelpunkte. Umgesetzt wurden:

| Bereich | Korrektur |
|---|---|
| Eskalation | Bei Beteiligung eines GL-Mitglieds wird statt des CEO das Präsidium des Prüfungs- und Risikoausschusses informiert (W-01, W-03, W-05, W-06, W-10); CRO bei S2 informiert |
| Leitplanken | Fachsystem-Fälle: gegenüber dem Incident Desk nur Kanal und Frist, inhaltliche Beurteilung nur durch berechtigte Fachstellen; Meldewege bei Marktverdacht nach Kundschaft und Mitarbeitenden getrennt |
| Begriffe | «Betroffene Person» in W-11 Ziff. 4 von DSG-Begriff und «belästigter Person» abgegrenzt; Restverwendungen korrigiert |
| Schweregrade | Phishing-Kriterium in W-01 an W-03 angeglichen; Geräteverlust einheitlich; Offenlegung von Kundendaten an Unbefugte mindestens S2 (W-02 Ziff. 7) |
| Verfahren | Untersuchungsleitung für Verstösse gegen W-01, W-07 und W-11 Ziff. 15 (Compliance mit HR); symmetrischer Ausstand im Sanktionsausschuss; Kategorie A erst nach Anhörung; Gewährung von Bestechungsgeldern in Kategorie D |
| Regeln | Neue W-06 Ziff. 5.4 (Kommunikationskanäle) als Grundlage für E-02; KI-Regeln in W-02 zusammengeführt |
| Routing-Index | Vertraulicher Weg über W-07 bei internem Betrug und Bestechung ergänzt; Werte und Fundstellen angeglichen |
| Rechtsaussagen | Stand der BankG-Revision neutral formuliert; FINMA-Meldepflicht für Cyber-Attacken an die Kriterien der Aufsichtsmitteilungen gebunden |

Nicht übernommen: Der Hinweis, der Vorbehalt «erhebliche Vermögenswerte» stehe nicht in Art. 9a GwG. Er steht in Art. 9a Abs. 2 GwG (in Kraft seit 1. Januar 2023; Prüfung am Gesetzestext vom 6. November 2026). Alle 252 Querverweise wurden nach den Korrekturen automatisiert erneut geprüft und lösen auf.

