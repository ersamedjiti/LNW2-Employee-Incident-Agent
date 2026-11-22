---
id: QK-AENDERUNGEN-2026-11-13
titel: Vorgemerkte Änderungen nach Abgleich mit dem Prototyp
stand: 2026-11-18
status: Gültig bleibt Paket v2.4. Dieses Dokument hält Abweichungen und vorgemerkte Änderungen fest. Der Prototyp wurde am 15. November 2026 erweitert (siehe «Qualitaet_Aenderung_Prototyp_2026-11-15.md»). Was davon vor der Präsentation umgesetzt wird, ist in Ziff. 6 offen.
fiktiv: true
---

# Vorgemerkte Änderungen nach Abgleich mit dem Prototyp

Massgeblich bleiben die Leitplanken v2.4, der Prüfbericht und das CHANGELOG 2.4 sowie das README des Prototyps in der aktuellen Fassung (Stand 15. November 2026). Beim Abgleich von Leitplanken, Ist- und Soll-Prozess, Weisungen und Code des Prototyps am 12. und 13. November 2026 zeigten sich die folgenden Abweichungen. Am 15. November 2026 wurde der Prototyp auf Wunsch des Teams erweitert; diese Änderungen und die daraus folgenden Anpassungen an Ist- und Soll-Prozess stehen in «Qualitaet_Aenderung_Prototyp_2026-11-15.md». Ein erneuter Abgleich am 18. November 2026 führte zu folgenden Änderungen: Ziff. 1 (Zeile «Benachrichtigung» aktualisiert, Zeilen «Nutzerkreis» und «Routing» ergänzt), Ziff. 2 Nr. 3 (aktualisiert), Ziff. 3 Nr. 4 (Stand ergänzt) sowie Nr. 6 und 7 (neu), Ziff. 4 (Stand der README-Punkte, weitere Dokumente), Ziff. 5 (Hinweis zu den Demo- und Testfällen) und Ziff. 6 (neu).

## 1 Abweichungen zwischen Leitplanken v2.4 und Prototyp

Die ersten beiden Punkte nennt das README bereits unter «Bekannte Grenzen».

| Thema | Leitplanken v2.4 | Prototyp und Ist-/Soll-Prozess | Vorgemerkte Änderung |
|---|---|---|---|
| Bewertungsmodell | Schweregrad S1–S4 und Einordnung Versehen, Fahrlässigkeit, Vorsatz als Agentenausgabe (Ziff. 2) | Risk Level, Behavior Level, Matrix, Incident Level, Pattern Aggregation | Leitplanken an die Bewertungsregeln des Soll-Prozesses angleichen; S1–S4 bleibt Merkmal des Vorfalls nach W-01 Ziff. 7 |
| Benachrichtigung | Keine Benachrichtigung betroffener Personen (Ziff. 7.2) | Reminder-E-Mail bzw. Mitteilung Employee Incident an die betroffene Person, Kopie an den Line Manager (simuliert). Der Assessor schreibt und gibt sie frei, nachdem das Employee Incidents Team die Einstufung freigegeben oder geändert hat. Beim HR Referral informiert HR die Person. | «Keine Benachrichtigung ohne Freigabe durch den Assessor»; bei Untersuchungen gilt W-11 Ziff. 7.3 (Information erst, wenn die Abklärung nicht mehr gefährdet ist) |
| Nutzerkreis | Incident Desk und autorisierte Fachstellen; der Prototyp richtet sich nicht direkt an meldende Mitarbeitende (Ziff. 1 Nr. 1 und 2) | Assessor im Incident-Tool. Zusätzlich gibt es im Weisungs-Assistenten eine Rolle für Mitarbeitende (Sarah Widmer) mit der Funktion «Als Meldung senden». | Assessors als primäre Nutzende; Incident Desk und Fachstellen wie bisher. **Klarstellung vom 18.11.2026:** Der Agent unterstützt den Assessor, nicht meldende Personen. Ziff. 1 Nr. 2 der Leitplanken bleibt deshalb bestehen; anzupassen ist der Prototyp oder seine Beschreibung (siehe Ziff. 3 Nr. 6). |
| Personenbezug | Keine Namen von Mitarbeitenden (Ziff. 6) | Assistent schlägt die betroffene Person aus dem Verzeichnis vor, Assessor bestätigt; Reminder spricht sie mit Namen an | Freitext weiterhin ohne Namen (W-01 Ziff. 10); Zuordnung durch den Assessor als zuständige Fachstelle |
| Zielsystem | Incident-Entwurf für IncidentNet (Ziff. 5) | Simulierte Übergabe an die fiktiven Systeme «CWB – Compliance Work Bench» und «HR Employee Relations System» | IncidentNet (W-01 Ziff. 10) und Übergabe an das HR Disciplinary Team (Soll-Prozess, Phase 3) |
| Routing | Massgebend ist der Routing-Index (`incident_index.md` und `incident_index.csv`) (Ziff. 9) | Der Prototyp verwendet den Routing-Index nicht. Fälle gehen je nach Incident Level an das Employee Incidents Team (CWB) oder an HR. Ob zusätzlich eine andere Fachstelle zuständig ist (z. B. Datenschutzberatung, GwG-Fachstelle, Fraud Management) oder ein Fall nach W-01 Ziff. 10 nur pseudonymisiert erfasst werden darf, zeigt das Tool nicht mit festen Regeln an. Das Sprachmodell erwähnt solche Stellen höchstens, wenn sie in den gefundenen Weisungsauszügen stehen (z. B. die Datenschutzberatung in Fall B). | **Entscheid offen** (siehe Ziff. 6): entweder festhalten, dass der Routing-Index für den Assessor-Agenten nicht gilt, und Leitplanken Ziff. 9 anpassen; oder den Index im Prototyp für Hinweise auf zuständige Fachstellen und Pseudonymisierung nutzen (Ziff. 3 Nr. 7) |

## 2 Inhaltliche Präzisierungen für die nächste Überarbeitung

1. **Entscheid über Massnahmen:** Soll-Prozess (Phase 3) und Ist-Dokument nennen ein «Entscheidgremium». Nach W-11 Ziff. 9 entscheidet über Massnahmen der Kategorien B–D der Sanktionsausschuss (Ziff. 9.1), daneben gelten Ziff. 9.2 und 9.3. Klärung durch das Team.
2. **Frühere Verwarnungen und Dienstzeit (W-11 Ziff. 9.4):** Nicht ins Behavior Level aufnehmen; frühere Verwarnungen wirken nur über die Pattern Aggregation, beide Umstände würdigen die zuständigen Stellen im Verfahren nach W-11 Ziff. 9.
3. **Hinweise auf Wiederholungen:** Seit dem 15. November 2026 enthalten Reminder und Mitteilung Employee Incident den allgemeinen Satz «Bei wiederholten Verstössen kann ein künftiger Fall höher eingestuft werden.» In Texten an die betroffene Person bleiben frühere Fälle und konkrete Folgen ausgeschlossen. Das Übergabedossier für das HR Disciplinary Team darf zugeordnete frühere Fälle enthalten (Soll-Prozess, Phase 3).
4. **Kundendaten:** In den Leitplanken auf E-04 Ziff. 3 Nr. 7 verweisen (keine Kundennamen, Konto- oder Depotnummern, Saldi, Transaktionslisten, Ausweise, Bildschirmfotos oder vollständigen Akten im Agenten).
5. **E-00 Ziff. 6:** Die Übergabe eines Verdachts auf dolose Handlung verlangt einen Schweregrad nach dem höchsten Kriterium. Klären, wer ihn ergänzt, wenn die Agentenausgabe ihn nicht enthält.
6. **Aufbewahrung:** Das Ist-Dokument nennt 20 Jahre. Massgebend sind W-01 Ziff. 10 (10 Jahre ab Abschluss) und W-11 Ziff. 14 (2 Jahre bei Verfahren ohne Massnahme).
7. **Soll-Dokument:** Es verweist noch auf den Ist-Prozess als Ort der Geschäftsregeln; an den Teamentscheid anpassen, dass der Soll-Prozess massgeblich ist.

## 3 Vorgemerkte Änderungen am Prototyp

Diese Punkte erfordern eine Codeänderung. Nr. 1 bis 5 sind wie bisher erst nach der Präsentation vorgesehen; Stand 15. November 2026 sind sie im Code offen. Ob Nr. 6 und 7 vor der Präsentation umgesetzt werden, ist in Ziff. 6 offen.

1. **Katalogquellen:** DS-01 auf W-02 Ziff. 6.1 korrigieren (heute «Ziff. 5 Nr. 4; Ziff. 6.1»), IK-01 auf W-04 Ziff. 5.3 Nr. 2 (heute «Ziff. 6»); Zitate entsprechend anpassen.
2. **Zielsysteme:** Fiktive Systemnamen durch IncidentNet bzw. die Übergabe an das HR Disciplinary Team ersetzen.
3. **Namensverbot:** In die Anweisungen an das Sprachmodell aufnehmen, dass Namen von Kundschaft und weiteren Mitarbeitenden nicht in Fallbeschreibung, Summary, Begründungen oder Entwürfe übernommen werden. Die vorbereiteten Antworten halten das bereits ein.
4. **Schutz der meldenden Person:** Eigenes Feld, getrennt von der Fallakte gespeichert; Name vor der Übergabe an das Modell automatisch schwärzen; das Modell erhält nur «Selbstmeldung ja/nein» und eine pseudonyme Kennung (Soll-Prozess, «Datenzugriffe»). Stand 15.11.2026: Bei Meldungen aus dem Weisungs-Assistenten wird der Name der meldenden Person weder in die Fallakte noch an das Sprachmodell übergeben. Gespeichert wird er aber nicht; die getrennte Speicherung ist nur als Hinweistext simuliert. Bei allen übrigen Meldungen erhält das Modell den vollständigen Meldungstext, einschliesslich allfälliger Namen. Entfällt die Mitarbeiterrolle (Nr. 6), ist der Punkt im Prototyp nicht umgesetzt.
5. **Speicherung:** Fälle und Verlauf über die Sitzung hinaus speichern (README, «Bekannte Grenzen»).
6. **Nutzerkreis Mitarbeitende:** Nach der Klarstellung vom 18.11.2026 (Ziff. 1) gehört die Rolle für Mitarbeitende nicht zum Auftrag des Agenten. **Entscheid offen** (siehe Ziff. 6):
   - a) Weisungs-Assistent nur noch als Werkzeug des Assessors (die Funktion «Als Incident erfassen» ist vorhanden); Rolle Sarah Widmer und «Als Meldung senden» entfernen; Demo-Eröffnung und Demo-Fall E anpassen.
   - b) Code unverändert lassen und die Mitarbeiterrolle in allen Dokumenten und in der Präsentation als «Ausblick, nicht Teil des Agenten» kennzeichnen.
7. **Routing-Index (nur falls so entschieden, siehe Ziff. 1):** Hinweis an den Assessor, wenn neben dem Employee-Incident-Verfahren eine andere Fachstelle zuständig ist oder der Fall nur pseudonymisiert erfasst werden darf.

## 4 Präzisierungen in Dokumenten

### README des Prototyps (Stand 15.11.2026)

| Punkt | Stand |
|---|---|
| Wissensbasis: 62 statt 60 Auszüge | erledigt |
| Beispielfälle und Beispielfragen: Unter «Zwei Betriebsarten» stehen «vier Beispielfragen» und «drei Beispielfälle». Im Code sind es sechs vorbereitete Antworten auf Beispielfragen und fünf Beispielfälle (A–E). | offen |
| Fallakte: Felder sind nur bis zur Festlegung des Levels änderbar (README sagt noch «Alle Felder sind direkt änderbar») | offen |
| Fristen: Der Prototyp rechnet sie als vorläufige Fristen nach dem Ist-Prozess | offen |
| Fallstrick: Das Sprachmodell erhält das fiktive Mitarbeiterverzeichnis mit Namen und schlägt Personalnummern vor | offen (stand im README vom 13.11.2026, fehlt im README vom 15.11.2026) |
| «Bekannte Grenzen» um Nutzerkreis (Ziff. 1, Ziff. 3 Nr. 6) und Routing-Index (Ziff. 1) ergänzen; gleich im Abschnitt «Grenzen» des Repository-README | offen |
| Aussage «Die Leitplanken … stecken in den Anweisungen an das Modell» präzisieren: Die Anweisungen beruhen vor allem auf den Bewertungsregeln des Ist-/Soll-Prozesses; die Leitplanken v2.4 sind darin nur teilweise abgebildet (z. B. fehlt die Definition der Konfidenz nach Leitplanken Ziff. 3). | offen |

### Weitere Dokumente

1. **Architekturskizze** (Tabelle «Schutzmechanismen im Prototyp»): «Identität getrennt vom Fall» ist als Massnahme im Prototyp genannt, ist aber nur teilweise umgesetzt (siehe Ziff. 3 Nr. 4). Als Zielbild bzw. Ausbaustufe kennzeichnen. Die **KI-Projektskizze** (Feld 5 «Risiken und Ethik») nennt dieselbe Massnahme, ohne zwischen Prototyp und Zielbild zu unterscheiden; auch dort präzisieren.
2. **Mitarbeitende als Nutzende:** KI-Projektskizze (Feld 1, Persona Sarah Widmer), README, Repository-README, Übersicht und Architekturskizze nennen Mitarbeitende als Nutzende. «Risiken, Ethik und Datenschutz» enthält die Risiken «Missbrauch durch Mitarbeitende» und «Überwachungsgefühl», das AI Canvas den Weisungs-Assistenten als Eingangskanal für Meldungen. Nach dem Entscheid zu Ziff. 3 Nr. 6 anpassen.
3. **Übersicht Prototyp:** nennt die Datei `app3.js`, README und Architekturskizze nennen `app.js`. Vereinheitlichen.

## 5 Arbeitsregel bis zur Umsetzung

Assessors geben Meldungen ohne den Namen der meldenden Person ein, nur mit ihrer Rolle (zum Beispiel «Anruf der Line Managerin»).

Hinweis: Demo-Fall A («Anruf von Sandra Vogel …») und Testfall T01 («Line Manager Sandra Vogel meldet …») halten diese Regel nicht ein. In Fall A ist der Vorname zugleich hinterlegt, damit die Prüfung der Reminder-E-Mail ihn erkennt. Entweder die Texte anpassen oder in der Demo bewusst als Beispiel für die Lücke nach Ziff. 3 Nr. 4 zeigen.

## 6 Offene Entscheide des Teams

| Nr. | Frage | Bezug |
|---|---|---|
| 1 | Werden die Leitplanken vor der Präsentation angeglichen? Das README sagt unter «Bekannte Grenzen» «vor der Präsentation anzugleichen»; dieses Dokument sah bisher keine Umsetzung vor der Präsentation vor. Eine der beiden Aussagen ist anzupassen. | Ziff. 1, README |
| 2 | Mitarbeiterrolle entfernen (a) oder als Ausblick kennzeichnen (b)? | Ziff. 3 Nr. 6 |
| 3 | Routing-Index für den Assessor-Agenten streichen oder im Prototyp nutzen? | Ziff. 1, Ziff. 3 Nr. 7 |

## 7 Entscheide vom 21.11.2026

- Ziff. 6 Nr. 2: Der Weisungs-Assistent für Mitarbeitende gehört zum Soll-Prozess (weder entfernen noch als Ausblick kennzeichnen). Nachgeführt in Soll-Prozess (Fassung 21.11.2026), KI-Projektskizze, README, Prototyp-README und Architekturskizze.
