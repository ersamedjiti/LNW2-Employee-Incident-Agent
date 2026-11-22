# Project Charter: KI-Assistent für Employee Incident Management

| Angabe | Inhalt |
|---|---|
| Projekt | KI-Assistent für Assessors und Weisungs-Assistent für Mitarbeitende |
| Organisation | Musterbank AG (fiktiv), Compliance (Assessors) mit Employee Incidents Team und HR Disciplinary Team |
| Stand | 13.11.2026, Version 1.0 (Projektskizze im Rahmen CAS AI Management, LNW 2) |
| Projektteam LNW | Ersa Medjiti, Daniel Di Maio, Natalia Fütterer |
| Zeitrahmen | Konzept und Prototyp bis Dezember 2026; Pilot bis Juni 2027; Rollout bis September 2027 (siehe [Gantt-Chart](Gantt.md)) |

## 1 Ausgangslage

Compliance erhält Meldungen über mögliche Verstösse von Mitarbeitenden über mehrere Kanäle. Assessors übertragen sie von Hand ins Incident-Tool, suchen die passende Regel in 11 Weisungen und 5 Ergänzungsblättern, schätzen Risk und Behavior ein und zählen Wiederholungen in der Fallhistorie. Das kostet Zeit, führt zu uneinheitlichen Einstufungen und gefährdet Fristen. Der Ist-Prozess mit festen Bewertungsregeln (Matrix, Pattern Aggregation, Sonderregeln) ist definiert; der Soll-Prozess beschreibt, wie ein KI-Assistent den Assessor in allen Schritten unterstützt.

## 2 Ziele

| Nr. | Ziel | Messgrösse | Zielwert |
|---|---|---|---|
| Z1 | Schnellere Bearbeitung | Zeit von Meldung bis festgelegtem Incident Level | minus 35 % gegenüber Baseline (Baseline im Pilot messen) |
| Z2 | Einheitliche Bewertung | Streuung der Levels bei vergleichbaren Fällen; Bestätigung bei Stichproben | Stichproben bestätigen ≥ 90 % der Levels |
| Z3 | Keine übersehenen Wiederholungen | Erkannte Patterns bei Stichproben | 100 % |
| Z4 | Sichere Vorschläge | Testlauf: Level zu tief | 0 von 20 Testfällen; keine erfundene Quelle |
| Z5 | Fristen eingehalten | Anteil Fälle innerhalb der Fristen des Ist-Prozesses | ≥ 95 % |
| Z6 | Akzeptanz | Nutzung und Zufriedenheit der Assessors im Pilot | ≥ 4 von 5 |

Die Zielwerte sind Vorschläge des Projektteams und werden nach der Baseline-Messung im Pilot bestätigt.

## 3 Umfang

| Im Projekt | Nicht im Projekt |
|---|---|
| Weisungs-Assistent für Mitarbeitende mit Meldefunktion | Externe Meldungen an Behörden (FINMA, BACS, EDÖB) |
| Fallerfassung mit Assistent: Person, Meldeweg, Daten, Policy, Summary, Description, Risk, Behavior | Entscheid über Disziplinarmassnahmen (bleibt beim Entscheidgremium) |
| Feste Regeln: Matrix, Pattern Aggregation, Sonderregeln, Fristen | Untersuchungen nach W-11 |
| Reminder-E-Mail mit Prüfungen, Übergabe an CWB und HR Employee Relations System | Belästigungsfälle nach W-08 (eigener Prozess, Pseudonymisierung offen) |
| Testlauf und Qualitätssicherung | Ablösung von CWB oder HR-System |
| Ausbaustufe nach Pilot: Texte für Employee Incident und HR-Dossier, Dubletten, Fristen-Erinnerungen, Appeal-Zusammenfassung | |

## 4 Lieferobjekte

| Lieferobjekt | Stand |
|---|---|
| Ist- und Soll-Prozess | erstellt (`02_Prozess`) |
| Wissensbasis und Leitplanken | erstellt (`03_Wissensbasis`) |
| Prototyp Incident-Tool mit Architekturskizze | erstellt (`04_Prototyp`) |
| Testfallkatalog und Testlauf | erstellt (`05_Qualitaet`) |
| Pilotkonzept, Datenschutz-Folgenabschätzung, Entscheid Betriebsmodell | nach LNW (Phase 1) |

## 5 Organisation und Rollen

| Rolle | Wer (fiktiv) | Aufgabe |
|---|---|---|
| Auftraggeber (Sponsor) | Leitung Compliance (Head Compliance) | Budget, Zielsetzung, Vorsitz Lenkungsausschuss |
| Product Owner | Head Employee Incidents | Anforderungen, Priorisierung, Abnahme |
| Projektleitung | Projektteam | Planung, Steuerung, Berichterstattung |
| Fachexperten | 2 Assessors | Anforderungen, Testfälle, Pilotnutzung |
| IT und Architektur | IT-Betrieb, Enterprise Architecture | Integration, Betrieb, KI-Gateway |
| Informationssicherheit | CISO | Sicherheitsanforderungen, Freigabe des KI-Dienstes (W-03 Ziff. 5.5) |
| Datenschutz | Datenschutzberatung (DSB) | Datenschutz-Folgenabschätzung, Bearbeitungsverzeichnis |
| HR | HR Disciplinary Team, HR Business Partner | Schnittstelle HR Referral, Kommunikation an Mitarbeitende |
| Personalvertretung | Personalkommission | Information und Anhörung (Mitarbeitende sind betroffen) |
| Policy Owner | Verantwortliche der Weisungen | Freigabe der Wissensbasis und des Katalogs der Risiko-Codes |

## 6 Governance

**Gremien und Entscheide**

| Gremium | Zusammensetzung | Rhythmus | Entscheidet über |
|---|---|---|---|
| Lenkungsausschuss | Head Compliance (Vorsitz), Head Employee Incidents, CISO, DSB, Leitung HR, IT | monatlich, bei Bedarf | Budget, Phasenfreigaben (Go/No-Go Pilot und Rollout), Betriebsmodell des Sprachmodells, Risiken |
| Kernteam | Product Owner, Projektleitung, Assessors, IT | wöchentlich | Backlog, Testergebnisse, Anpassungen an Anweisungen |
| Änderungsfreigabe KI | Product Owner, ein Assessor, CISO bzw. DSB je nach Thema | bei jeder Änderung | Anweisungen an das Modell, Modellwechsel, Katalog der Risiko-Codes, Wissensbasis |

**KI-Governance (angelehnt an FINMA-Aufsichtsmitteilung 08/2024)**

| Erwartung FINMA | Umsetzung im Projekt |
|---|---|
| Governance mit klaren Verantwortlichkeiten | Product Owner verantwortet die Anwendung; Änderungsfreigabe KI; Lenkungsausschuss |
| Inventar und Risikoklassifizierung | Eintrag im KI-Inventar der Bank; Einstufung als wesentliche Anwendung, da Personendaten und arbeitsrechtliche Folgen |
| Datenqualität | Wissensbasis nur aus gültigen Weisungen; Katalog durch Policy Owner freigegeben; Historie mit Appeal-Status |
| Tests und laufende Überwachung | Testlauf mit 20 Fällen vor jeder Änderung; Stichproben; Kennzahlen zu Abweichungen |
| Dokumentation | Repository: Zweck, Daten, Modell, Anweisungen, Tests, Änderungsprotokoll |
| Erklärbarkeit | Jeder Vorschlag mit Begründung und Zitat; Level aus fester Matrix nachvollziehbar |
| Unabhängige Überprüfung | Review durch Interne Revision oder 2nd Line Risk vor Rollout |

**Grundsätze für den Betrieb**

- Der Assistent entscheidet nie: Jede Bewertung bestätigt ein Assessor (Human in the Loop).
- Weicht der Assessor ab, begründet er das; Vorschlag und Entscheid bleiben gespeichert.
- Ohne Assistent arbeitet Compliance manuell nach denselben Regeln weiter.
- Änderungen an Anweisungen oder Modell gehen erst nach bestandenem Testlauf live.

## 7 Meilensteine

| Meilenstein | Datum |
|---|---|
| M1 Ist- und Soll-Prozess abgenommen | 06.11.2026 ✓ |
| M2 Prototyp lauffähig, Testfallkatalog erstellt | 13.11.2026 ✓ |
| M3 Präsentation LNW 2 | 04.12.2026 |
| M4 Freigabe Pilot (Betriebsmodell, Datenschutz-Folgenabschätzung, Katalog) | 31.03.2027 |
| M5 Pilotauswertung, Go/No-Go Rollout | 30.06.2027 |
| M6 Rollout abgeschlossen | 30.09.2027 |

## 8 Risiken (Auszug)

Vollständige Liste mit Massnahmen: [Risiken, Ethik und Datenschutz](Risiken_Ethik_Datenschutz.md).

| Risiko | Wahrscheinlichkeit | Auswirkung | Massnahme |
|---|---|---|---|
| Assessors übernehmen Vorschläge ungeprüft | mittel | hoch | Einzelbestätigung, Stichproben, Kennzahl Abweichungen |
| Modell stuft zu tief ein | mittel | hoch | Im Zweifel höher; Testlauf; Level durch feste Regeln |
| Kein Entscheid zum Betriebsmodell | mittel | hoch | Früh im Lenkungsausschuss; Pilot nur mit freigegebenem Dienst |
| Ablehnung durch Mitarbeitende oder Personalvertretung | niedrig | mittel | Frühe Information, Transparenz, kein automatischer Entscheid |
| Weisungen ändern sich | hoch | mittel | Wissensbasis aus dem Dokumentenmanagement; Testlauf nach jeder Änderung |

## 9 Annahmen und offene Entscheide

- Katalog der Risiko-Codes wird von Compliance festgelegt (Prototyp: Vorschlag mit 18 Codes).
- Betriebsmodell des Sprachmodells: Anbieter mit Datenschutzvertrag oder eigener Betrieb (Entscheid M4).
- Leitplanken v2.4 werden an das Bewertungsmodell Risk/Behavior/Incident Level angeglichen (siehe `05_Qualitaet/Vorgemerkte_Aenderungen.md`).
- Häufigkeit der Stichproben und Schwelle für die Überprüfung der Anweisungen legt das Employee Incidents Team im Pilot fest.
