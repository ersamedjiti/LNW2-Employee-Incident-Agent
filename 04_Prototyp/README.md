# Prototyp: Incident-Tool

Rollen: Assessors (z. B. Lea Brunner) arbeiten in Compliance und erfassen und bewerten die Fälle. Das Employee Incidents Team ist ein eigenes Team; es steuert den Prozess in der CWB und gibt die Einstufung frei. Das HR Disciplinary Team übernimmt HR Referrals.

| Datei | Inhalt |
|---|---|
| `incident-tool.html` | Der Prototyp als eine Datei. Im Browser öffnen; ohne Anmeldung läuft er im Modus «Vorbereitete Antworten». Mit KI live auf claude.ai: https://claude.ai/artifact/HkfYRsUN48rjz6ZjCsLUmn |
| `testlauf.html` | Testlauf für das Projektteam (20 Testfälle, Soll/Ist-Vergleich). Braucht die KI-Verbindung auf claude.ai: https://claude.ai/artifact/Nnq9T2CFFDHENX2ZuauR64 |
| `Demo_Incident-Tool.mp4` | Aufzeichnung der Demo (3 Minuten, mit Untertiteln, aufgenommen am 21.11.2026 mit dem aktuellen Stand des Tools): Frage und Meldung im Weisungs-Assistenten, Erfassung und Bewertung, Übergabe an die CWB und Freigabe, Mitteilung an die Person, Fall mit Pattern Aggregation, Antworten im Posteingang |
| `Architektur.md` | Architekturskizze Prototyp und Zielbild Echtbetrieb |
| `src/` | Quellcode: `data.js` (fiktive Daten, Katalog), `kb.js` (Wissensbasis), `logic.js` (feste Regeln), `app.js` (Oberfläche, Anweisungen an das Modell), `testcases.js` und `testrun.js` (Testlauf), `shell.html` und `testrun_shell.html` (Layout), `build.py` (baut beide HTML-Dateien) |

Der Name «Assessor-Cockpit» im Folgenden ist der Arbeitstitel; in der Oberfläche heisst das Tool «Incident-Tool».

Stand des Tools: 15.11.2026 · Dokument aktualisiert: 21.11.2026 · Grundlage: Soll-Prozess «KI-Assistent für Assessors» (Fassung 21.11.2026), Ist-Prozess «Employee Incident Management mit KI-Agent»

## Aufbau

Der Prototyp hat zwei Bereiche, die denselben Assistenten und dieselbe Wissensbasis nutzen. Beide gehören zum Soll-Prozess (Teamentscheid vom 21.11.2026):

1. **Weisungs-Assistent (Mitarbeitende):** Chat für Fragen zu den Weisungen W-01 bis W-11 und den Ergänzungsblättern (ohne E-00 und E-02). Jede Antwort nennt Dokument und Ziffer, rechts erscheint der Wortlaut der Weisung. Erkennt der Assistent einen meldepflichtigen Vorfall, bietet er «Als Meldung senden» an, auf Wunsch anonym. Die Meldung landet im Posteingang der Assessors; der Name der meldenden Person wird getrennt vom Fall gespeichert.
2. **Incident-Tool (Assessors):** Posteingang mit drei Ansichten (**Zur Prüfung**, **Antworten**, **Weitergeleitet**) und Meldungen aus Weisungs-Assistent, IncidentNet, Telefon und E-Mail. «Prüfen» öffnet die Fallakte links, der Assistent steht immer rechts daneben: Er liest die Meldung, füllt die Fallakte (Felder mit «KI» markiert) und stellt höchstens eine Rückfrage pro Antwort (insgesamt höchstens drei). Alle Felder sind direkt änderbar. «Fall ohne Meldung erfassen» startet eine leere Fallakte.

**Felder der Fallakte:** Betroffene Person · Wie kam die Meldung (Meldeweg, Selbstmeldung) · Wann kam die Meldung · Wann wurde der Verstoss begangen · Verletzte Policy (Risiko-Code mit Weisungszitat, optional eine zweite) · Incident Summary · Incident Description (Kundschaft, Daten, Systeme, Schaden, Sofortmassnahmen als Text) · Risk Level mit Beschreibung, was die Person getan hat, das ein Risiko darstellte · Behavior Level mit Beschreibung des Verhaltens während des Vorfalls und nach der Entdeckung bzw. Meldung.

| Schritt | Assistent (Sprachmodell) | Tool (feste Regeln, ohne KI) | Assessor |
|---|---|---|---|
| 1 Fallakte | Felder aus dem Gespräch füllen; Policy, Risk Level, Behavior Level und Sonderregeln vorschlagen; Konfidenz und offene Fragen | Zitat aus dem Katalog, Matrix, Pattern Aggregation (12-Monats-Fenster), Fristen | Policy, Risk und Behavior einzeln bestätigen oder mit Begründung ändern; Sonderregeln bestätigen oder verwerfen; Incident Level aus der Matrix festlegen oder übersteuern. Danach startet automatisch die Pattern Aggregation: Das Tool zeigt die geprüfte Fallhistorie und schlägt gegebenenfalls eine Höherstufung vor, die der Assessor bestätigt oder mit Begründung verwirft. |
| 2 Bearbeiten | E-Mail an die Person nach Vorlage: Reminder bzw. Mitteilung Employee Incident (fliesst ins Year-End-Gespräch ein), beide mit dem allgemeinen Hinweis, dass wiederholte Verstösse höher eingestuft werden können; Anfrage an den Policy Owner ohne Personenangaben | Übergabe zur Prüfung an das Zielsystem mit Ticketnummer; Rückmeldung des Employee Incidents Teams bzw. von HR (in der Demo per Knopf simuliert); Prüfungen der E-Mail: ≤170 Wörter, keine Drohung und kein Hinweis auf frühere Fälle, Hinweis zu Wiederholungen, keine Angaben zur meldenden Person, Referenz, Erhaltsbestätigung | Reminder und Employee Incident gehen zur Prüfung an die «CWB – Compliance Work Bench». Erst wenn das Employee Incidents Team die Einstufung freigibt oder ändert, schreibt der Assessor die E-Mail und gibt sie frei; das Datum der Information geht an die CWB zurück. Ein HR Referral geht an das «HR Employee Relations System»: Übernimmt HR, führt HR das Disziplinarverfahren und informiert die Person; hält HR die Einstufung für zu hoch, leitet HR den Fall an die CWB weiter, das Employee Incidents Team legt die endgültige Einstufung fest und der Assessor schreibt die E-Mail. Angaben zur meldenden Person werden nie übermittelt. |
| 3 Verlauf | – | Protokoll aller Vorschläge und Entscheide, Kennzahlen | – |

Matrix: Risk High führt immer zum HR Referral, unabhängig vom Behavior Level (Teamentscheid vom 15.11.2026).

Designentscheid: Das Sprachmodell beurteilt nur, was Urteilsvermögen braucht. Matrix, Pattern Aggregation, Fristen und Regel-Zitate rechnet bzw. liefert das Tool deterministisch. Ein vom Modell genannter Code, der nicht im Katalog steht, wird als «ohne Quelle» markiert und kann nicht übernommen werden.

## Demo-Ablauf mit zwei Rollen

1. **Weisungs-Assistent (Mitarbeiterin Sarah Widmer):** Sie fragt, ob ein Kollege Kundendaten in ChatGPT kopieren durfte (Beispielfrage 5). Der Assistent antwortet mit Ziffer (W-02 Ziff. 5 Nr. 5), erkennt einen meldepflichtigen Vorfall und bietet «Als Meldung senden» an, auf Wunsch anonym. Ihr Name wird getrennt vom Fall gespeichert.
2. **Incident-Tool (Assessor Lea Brunner):** Die Meldung erscheint im **Posteingang** (mit Zähler oben). Daneben liegen vier weitere Meldungen aus Telefon, E-Mail und IncidentNet (Beispiele A–D). Mit «Prüfen» liest der Assistent die Meldung, füllt die Fallakte aus und stellt Rückfragen.
3. Danach: Bewertung bestätigen, Incident Level, Pattern Aggregation, Übergabe zur Prüfung an die CWB bzw. an HR. Der Posteingang hat drei Ansichten: **Zur Prüfung** (offene Meldungen), **Antworten** (Rückmeldungen aus CWB und HR) und **Weitergeleitet** (übergebene Fälle mit Ticket, Level, Status und Zuständigkeit). Ein Fall bleibt dort offen, bis die Rückmeldung kommt; mit «E-Mail schreiben» geht der Assessor zurück in den Fall.
4. **Antworten im Posteingang:** Der Tab «Antworten» sammelt die Rückmeldungen aus CWB und HR. Drei Beispielfälle liegen bereit: das Employee Incidents Team ist **nicht einverstanden** und stuft einen Reminder zum Employee Incident hoch (Elena Marti); **HR hält ein HR Referral für zu hoch** und leitet es an die CWB weiter, das Employee Incidents Team legt Employee Incident fest (Thomas Brunner); das Employee Incidents Team ist **einverstanden** (Fabian Graf, Reminder). «E-Mail an … schreiben» öffnet den Fall mit fertigem Entwurf; nach der Freigabe wandert er unter «Weitergeleitet».
5. **Rückmeldung selbst auslösen** (Kasten «Demo · Antwort simulieren»): Employee Incidents Team «Einverstanden» oder «Andere Einstufung»; bei HR «HR übernimmt den Fall» oder «zu hoch eingestuft → an CWB». Danach entwirft der Assistent die passende E-Mail, der Assessor gibt sie frei, der Status wechselt auf «Abgeschlossen · E-Mail versendet».
6. **Policy Owner fragen:** Ist der Assistent unsicher (Konfidenz niedrig, Verstoss unklar) oder der Assessor, bereitet «Anfrage an Policy Owner» in der Fallakte eine E-Mail an die Stelle vor, der die Weisung gehört (aus dem Kopf der Weisung, z. B. W-03 → CISO). Personennamen werden entfernt; enthält der Text trotzdem einen Namen, warnt das Tool vor dem Senden.

## Schutz vor Missbrauch des Weisungs-Assistenten

Der Assistent erklärt Regeln und den erlaubten Weg (Bewilligung, Offenlegung, Meldung). Er hilft nicht dabei, Regeln oder Kontrollen zu umgehen, Vorfälle zu verschleiern oder unter einer Wertgrenze zu bleiben, und nennt keine Erkennungs- oder Kontrollmethoden. Beschreibt jemand einen eigenen Verstoss, weist er auf die Selbstmeldung hin (W-01 Ziff. 5.6). Er hat keinen Zugriff auf Fälle und meldende Personen und beantwortet Fragen wie «Wurde ich gemeldet?» nicht inhaltlich. Seine Antwort ist keine Bewilligung. Die Ergänzungsblätter E-00 (Abgrenzung Vorsatz, Indizien) und E-02 (Kommunikationsüberwachung) sind im Weisungs-Assistenten ausgeblendet, weil sie Hinweise zur Erkennung enthalten; im Incident-Tool für Assessors bleiben sie verfügbar. Beispielfrage 6 zeigt die Ablehnung in der Demo (Geschenk aufteilen, um unter der Wertgrenze zu bleiben).

Chatverläufe werden im Echtbetrieb nicht laufend ausgewertet, damit Mitarbeitende offen fragen. Einsicht nur bei konkretem Verdacht im Verfahren nach W-11; ausgewertet werden nur Themen ohne Personenbezug.

## Wissensbasis

62 verdichtete Auszüge aus W-01 bis W-11 und E-00 bis E-04, je mit Dokument und Ziffer, dazu der Katalog der 18 Risiko-Codes mit dem Wortlaut der Weisung. Zu jeder Frage sucht der Browser die passendsten Auszüge (Stichwortsuche mit Synonymen) und gibt nur diese dem Sprachmodell mit (einfaches Retrieval-Augmented Generation). Im Echtbetrieb wäre das eine Vektorsuche über die Originaldokumente. Die Leitplanken sind bewusst nicht Teil der Wissensbasis, sondern stecken in den Anweisungen an das Modell.

Im Tool steht die Wissensbasis im Bereich «Weisungs-Assistent» rechts neben dem Chat:
- **Passende Weisungsstelle:** Zu jeder Antwort zeigt das Tool rechts die zitierte Stelle mit dem Wortlaut der Weisung und dem Auszug. Weitere zitierte Stellen lassen sich anklicken, ebenso die Quellen unter der Antwort im Chat.
- **Weisungen durchsuchen:** Eine normale Stichwortsuche mit Hervorhebung, unabhängig vom Chat, dazu Filter nach Dokument und der Katalog der Risiko-Codes. Zum schnellen Überfliegen, ohne den Assistenten zu fragen.
- In der Fallakte öffnen Quellen und «Weisung anzeigen» ein Seitenpanel; «In der Wissensbasis anzeigen» springt zur Stelle.

## Zwei Betriebsarten

- **KI live:** Aufrufe an Claude über das Artifact (Zustimmung beim ersten Aufruf). Funktioniert auch mit eigenen Meldungen.
- **Vorbereitete Antworten:** Hinterlegte Antworten für die Beispielfragen im Weisungs-Assistenten und die Meldungen im Posteingang (Fälle A–E). Damit läuft die Demo auch ohne Netz oder KI-Verbindung.

## Demo-Szenarien

| Fall | Meldung | Erwartetes Ergebnis |
|---|---|---|
| A (Demo aus dem Soll-Prozess) | Line Manager: Marco Keller hat Bildschirm nicht gesperrt (28.10.2026) | Matrix Low × Expected = Reminder; Pattern: 2. Reminder IS-02 (INC-2026-00142 vom 03.02.2026) → Employee Incident. INC-2024-00877 ausserhalb Fenster, INC-2026-00655 Appeal hängig → zählen nicht |
| B | Selbstmeldung Nina Ammann: Kundendaten an falschen Empfänger | Medium × Mitigating = Reminder; Pattern: 3. Reminder beliebiger Code → Employee Incident. Mit Übersteuerung auf Reminder lässt sich der E-Mail-Entwurf zeigen |
| C | Hinweis: Stefan Meier an Formel-1-Rennen eines Anbieters während Ausschreibung | High × Aggravating = HR Referral; Sonderregel «Verdacht auf Straftat»; Warnung zu identifizierendem Detail der meldenden Person |
| E | Weisungs-Assistent: Kollege Jonas Weber hat Kundendaten in ChatGPT kopiert | Meldung aus dem Chat in den Posteingang; DS-03, Risk Medium, Behavior Expected → Employee Incident; keine Vorfälle in der Fallhistorie |
| D | Hinweis: Simon Kuhn erhielt von einem Kunden eine Flasche Wein (ca. CHF 60) | Assistent schlägt «kein Verstoss» vor (W-05 Ziff. 5.2, Wertgrenze CHF 200). Der Assessor schliesst den Fall als «No Breach» ab; er wird trotzdem an die CWB übergeben und dort als «No Breach» dokumentiert. |

Fallstrick zum Zeigen: In Fall A schlägt der Assistent auch «Marco Kessler» (ähnlicher Name) vor. Wählt der Assessor die falsche Person, greift das Pattern nicht. Darum bestätigt der Assessor die Person.

## Fiktive Datengrundlage

- Mitarbeiterverzeichnis: 20 Personen
- Fallhistorie: 9 frühere Fälle
- Katalog der Risiko-Codes (Vorschlag, offener Punkt im Ist-/Soll-Prozess): 18 Codes

| Code | Name | Quelle |
|---|---|---|
| IS-01 | Weitergabe von Zugangsdaten | W-03 Ziff. 5.1 Nr. 1 |
| IS-02 | Bildschirmsperre und Clean Desk | W-03 Ziff. 5.1 Nr. 3; Ziff. 5.2 Nr. 2 |
| IS-03 | Geschäftsinformationen auf privaten Kanälen oder Speichern | W-03 Ziff. 5.2 Nr. 3 |
| IS-04 | Nicht freigegebene Software | W-03 Ziff. 5.3 Nr. 1 |
| IS-05 | Verspätete Meldung eines Sicherheitsvorfalls | W-03 Ziff. 6.2 |
| IS-06 | Unverschlüsselte externe Übermittlung | W-03 Ziff. 5.2 Nr. 1 |
| DS-01 | Fehlversand von Personen- oder Kundendaten | W-02 Ziff. 5 Nr. 4; Ziff. 6.1 |
| DS-02 | Zugriff ohne Arbeitsauftrag (Neugierabfrage) | W-02 Ziff. 5 Nr. 3 |
| DS-03 | Kundendaten in nicht freigegebenem KI-Dienst | W-02 Ziff. 5 Nr. 5 |
| GE-01 | Vorteil über der Wertgrenze ohne Bewilligung | W-05 Ziff. 5.2; 5.3 |
| GE-02 | Bargeld oder bargeldähnliche Mittel | W-05 Ziff. 5.1 Nr. 3 |
| GE-03 | Vorteil während Ausschreibung oder Entscheid | W-05 Ziff. 5.1 Nr. 4 |
| IK-01 | Nicht offengelegter Interessenkonflikt | W-04 Ziff. 6 |
| MV-01 | Mitarbeitergeschäft ohne Vorabbewilligung | W-06 Ziff. 5.3 |
| MV-02 | Mindesthaltedauer verletzt | W-06 Ziff. 5.3 |
| MV-03 | Nicht freigegebener Kommunikationskanal | W-06 Ziff. 5.4 |
| KU-01 | Vier-Augen-Prinzip umgangen oder Selbstfreigabe | W-10 Ziff. 5 Nr. 2; E-03 Ziff. 3 Nr. 1 |
| KU-02 | Rückrufprinzip missachtet | W-10 Ziff. 5 Nr. 3 |

## Bewusst nicht im Prototyp (Ausbaustufe gemäss Soll-Prozess)

Fragen für die Stellungnahme, Year-End-Zusammenfassung und HR-Übergabedossier, Antwort des Policy Owners in der Fallakte, Dubletten und ähnliche Fälle, Fristen-Erinnerungen und Abschlussvermerk, Appeal und Wiedereröffnung, Fragefeld, übergreifende Muster.

## Bekannte Grenzen

- Das Bewertungsmodell folgt dem Ist-/Soll-Prozess (Risk/Behavior/Incident Level). Die Leitplanken v2.4 arbeiten noch mit S1–S4 und verbieten in Ziff. 7.2 Benachrichtigungen an betroffene Personen. Das ist vor der Präsentation anzugleichen.
- Zugeordnete frühere Fälle werden im Prototyp nicht dauerhaft gespeichert; jeder Fall startet mit der fiktiven Ausgangshistorie.
- Keine Persistenz; der Verlauf gilt für die geöffnete Sitzung.
