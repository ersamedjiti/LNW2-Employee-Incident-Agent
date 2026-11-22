# Risiken, Ethik und Datenschutz

Stand: 13.11.2026 · Grundlage: Input KI-Ethik (Modul 2), Ist- und Soll-Prozess, Weisungen W-02, W-03, W-07. Musterbank AG ist fiktiv. Keine Rechtsberatung; die Einordnung ist mit Datenschutzberatung und Rechtsdienst der Bank zu prüfen.

## 1 Ethische Risiken

Der Assistent bereitet Entscheide vor, die arbeitsrechtliche Folgen für Mitarbeitende haben können, bis zum HR Referral. Daraus folgen hohe Anforderungen an Fairness, Transparenz und menschliche Kontrolle.

| Risiko | Warum relevant | Massnahme | Nachweis |
|---|---|---|---|
| **Automation Bias**: Assessor übernimmt Vorschläge ungeprüft | Grösstes Risiko laut Soll-Prozess; Verantwortung würde faktisch ans Modell wandern | Jeden Vorschlag einzeln bestätigen, kein «alles übernehmen»; KI-Felder sichtbar markiert; Abweichung nur mit Begründung; Kennzahl, wie oft Assessors abweichen | Prototyp; Verlauf |
| **Zu tiefe Einstufung** | Ein übersehener Verstoss wiegt schwerer als ein zu vorsichtiger Vorschlag | Im Zweifel das höhere Level; Level aus fester Matrix; Pattern Aggregation im Code | Testlauf: Kennzahl «Level zu tief» |
| **Erfundene Regeln oder Fakten** (Halluzination) | Bewertung ohne Grundlage wäre nicht haltbar | Nur Codes aus dem Katalog; Zitat aus dem Katalog statt vom Modell; nur Fakten aus der Meldung; Unsicherheit anzeigen | Testfälle T11, T18; Prüfpunkt «Quelle gültig» |
| **Ungleichbehandlung** (Bias) | Gleiche Verstösse müssen gleich bewertet werden, unabhängig von Funktion, Abteilung oder Person | Feste Matrix und Regeln; Behavior nur aus Umständen des Falls; Auswertung der Levels nach Abteilung und Funktion; Vergleich ähnlicher Fälle | Stichproben im Pilot |
| **Schutz meldender Personen** | Whistleblowing lebt vom Vertrauen; Vergeltung ist verboten (W-07 Ziff. 9) | Assistent kennt die Identität nicht; Warnung bei identifizierenden Details; keine Angaben in Texten an Betroffene; Sonderregel «Vergeltung» | Testfall T19; Reminder-Prüfung |
| **Missbrauch durch Mitarbeitende** | Jemand nutzt den Weisungs-Assistenten, um einen eigenen Verstoss so zu planen, dass er nicht auffällt | Assistent lehnt Hilfe beim Umgehen ab und zeigt den erlaubten Weg; keine Erkennungsmethoden in der Wissensbasis für Mitarbeitende; kein Zugriff auf Fälle und meldende Personen; Antwort ist keine Bewilligung; die eigentlichen Kontrollen (Vier-Augen-Prinzip, DLP, Überwachung) bleiben unabhängig vom Chatbot | Prototyp (Beispielfrage 6) |
| **Transparenz gegenüber Mitarbeitenden** | Betroffene sollen wissen, dass KI unterstützt, aber Menschen entscheiden | Information im Intranet und an die Personalkommission; Hinweis im Weisungs-Assistenten | Rollout-Plan |
| **Überwachungsgefühl** | Ein Weisungs-Assistent mit Meldefunktion könnte als Kontrollinstrument wahrgenommen werden | Fragen an den Assistenten werden nicht ausgewertet; Meldung nur auf aktiven Klick der Person; auf Wunsch anonym | Prototyp |

## 2 Datenschutz (Schweizer DSG)

| Thema | Einordnung | Umsetzung |
|---|---|---|
| Besonders schützenswerte Personendaten | Daten über administrative oder strafrechtliche Verfolgungen und Sanktionen sind besonders schützenswert (Art. 5 lit. c DSG); Verdacht auf Straftat kommt in Fällen vor | Zugriff nur für Assessor und Employee Incidents Team; Protokollierung; Aufbewahrung nach Ist-Prozess |
| Datenschutz-Folgenabschätzung | Voraussichtlich erforderlich wegen hohem Risiko für die betroffenen Personen (Art. 22 DSG) | In Phase 1 mit der Datenschutzberatung, vor dem Pilot |
| Automatisierte Einzelentscheidung | Art. 21 DSG verlangt Information und das Recht auf Überprüfung durch eine natürliche Person, wenn eine Entscheidung ausschliesslich automatisiert ist | Keine automatisierte Entscheidung: Der Assessor bestätigt jeden Vorschlag und legt das Level fest. Das Design stellt das technisch sicher. |
| Bekanntgabe an Dritte / Auftragsbearbeitung | Fallbeschreibungen gehen an ein Sprachmodell | Nur freigegebener Dienst (W-02 Ziff. 5 Nr. 5, W-03 Ziff. 5.5); Vertrag zur Auftragsbearbeitung; keine Speicherung und kein Training mit Bankdaten; Datenhaltung Schweiz/EU |
| Datenminimierung | Das Modell braucht nicht alle Angaben | Keine Identität der meldenden Person, nur «Selbstmeldung ja/nein»; Verzeichnis nur Name, Funktion, Abteilung, Line Manager |
| Bankkundengeheimnis | Fallbeschreibungen können Kundendaten enthalten (Art. 47 BankG) | Kundendaten in der Description nur soweit nötig; Prüfung, ob Kundennamen vor dem Modellaufruf pseudonymisiert werden (Ausbau) |

Im Prototyp sind alle Personen, Fälle und Kunden fiktiv. Es werden keine echten Daten verarbeitet.

## 3 Aufsicht und Governance

Die FINMA-Aufsichtsmitteilung 08/2024 «Governance und Risikomanagement beim Einsatz von künstlicher Intelligenz» (18.12.2024) nennt sieben Bereiche: Governance, Inventar und Risikoklassifizierung, Datenqualität, Tests und laufende Überwachung, Dokumentation, Erklärbarkeit sowie unabhängige Überprüfung. Wie das Projekt sie umsetzt, steht im [Project Charter](Project_Charter.md), Abschnitt 6.

## 4 Projektrisiken

| Risiko | W | A | Massnahme | Verantwortlich |
|---|---|---|---|---|
| Betriebsmodell des Sprachmodells nicht rechtzeitig entschieden | mittel | hoch | Entscheid als erster Punkt im Lenkungsausschuss; Pilot nur mit freigegebenem Dienst | Sponsor |
| Katalog der Risiko-Codes fehlt oder ändert sich | mittel | hoch | Vorschlag aus dem Prototyp als Basis; Freigabe durch Policy Owner; Pattern Aggregation hängt davon ab | Product Owner |
| Qualität der Vorschläge im Echtbetrieb tiefer als im Test | mittel | mittel | Testfälle mit echten, anonymisierten Fällen ergänzen; Stichproben; Go/No-Go nach Pilot | Kernteam |
| Integration in Verzeichnis, Historie, CWB, HR-System aufwendiger als geplant | mittel | mittel | Pilot mit manuellem Abgleich; Schnittstellen in Phase 3 | IT |
| Weisungen werden überarbeitet | hoch | mittel | Wissensbasis aus Dokumentenmanagement; Testlauf nach jeder Änderung | Product Owner |
| Widerstand von Assessors (Angst vor Ersatz) oder Personalkommission | niedrig | mittel | Assessors als Fachexperten im Projekt; Nutzen als Entlastung; frühe Information | Projektleitung |
| Modell- oder Anbieterwechsel verändert das Verhalten | mittel | mittel | Testlauf als Abnahme; Änderungsfreigabe KI | Kernteam |

W = Wahrscheinlichkeit, A = Auswirkung

## Quellen

- FINMA-Aufsichtsmitteilung 08/2024: https://www.finma.ch/de/news/2024/12/20241218-mm-finma-am-08-24/
- Bundesgesetz über den Datenschutz (DSG), SR 235.1: https://www.fedlex.admin.ch/eli/cc/2022/491/de
- Ist-Prozess, Soll-Prozess, Weisungen W-02, W-03, W-07 (`02_Prozess`, `03_Wissensbasis`)
