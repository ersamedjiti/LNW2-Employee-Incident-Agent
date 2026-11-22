# Testfallkatalog Incident-Tool

Stand: 13.11.2026 · 20 fiktive Meldungen · Grundlage: Weisungen W-01 bis W-11, Ist-Prozess (Matrix, Pattern Aggregation, Sonderregeln), fiktive Fallhistorie des Prototyps

## Zweck und Vorgehen

Der Katalog prüft, ob der Assistent eine eingehende Meldung richtig in die Fallakte überführt. Jede Meldung geht mit denselben Anweisungen wie im Incident-Tool an das Sprachmodell (erster Durchgang der Fallerfassung, ohne Antworten auf Rückfragen). Die Seite «Testlauf Incident-Tool» führt alle Fälle aus, vergleicht Soll und Ist und erstellt einen Bericht (.md, .csv).

Wo die Weisung Spielraum lässt, nennt das Soll mehrere zulässige Werte. Incident Level, Pattern Aggregation und Sonderregeln rechnet das Tool deterministisch aus den Ist-Werten des Modells. «Level zu tief» gilt als kritischer Fehler, «zu hoch» als unnötige Eskalation.

**Prüfpunkte:** Person · Verstoss ja/nein/unklar · Policy (Haupt- oder Zusatzcode im Soll) · Quelle gültig (kein Code ausserhalb des Katalogs) · Risk · Behavior · Sonderregel (fehlend oder zu viel) · Datum des Verstosses · Meldeweg · Incident Level · Namensschutz (meldende Person nicht in Summary, Description oder Begründungen).

## Abdeckung

| Schwerpunkt | Fälle |
|---|---|
| Pattern Aggregation (Fenster, gleicher Code, 3. Reminder) | T01, T06, T07, T09 |
| Kein Verstoss (No Breach) | T02, T16, T17 |
| Sonderregeln Straftat und Vergeltung | T04, T10, T12 |
| Keine erfundenen Quellen oder Fakten | T11, T18 |
| Schutz der meldenden Person | T19 (zusätzlich T01, T06) |
| Behavior-Spektrum bis Vertuschung | T03, T07, T20 |
| Weitere Risiko-Codes | T05, T08, T13, T14, T15 |

## Übersicht

| Nr. | Fall | Person | Policy | Risk | Behavior | Soll Level | Fokus |
|---|---|---|---|---|---|---|---|
| T01 | Bildschirm offen, früherer Fall ausserhalb des Fensters | Sarah Widmer | IS-02 | Low | Expected / Mitigating | Reminder | Pattern: 12-Monats-Fenster |
| T02 | Pralinen eines Kunden | Marco Keller | – | – | – | No Breach | Kein Verstoss: Wertgrenze Geschenke |
| T03 | Uhr CHF 450 nicht gemeldet | Simon Kuhn | GE-01 | Low / Medium | Expected / Mitigating | Reminder / Employee Incident | Spielraum bei Risk und Behavior |
| T04 | Bargeld behalten, danach Gebührenerlass | Simon Kuhn | GE-02 / GE-03 | High | Aggravating / Severely Aggravating | HR Referral | Sonderregel Straftat |
| T05 | Neugierabfrage Konto der Nachbarin | Fabian Graf | DS-02 | Medium | Expected / Aggravating | Employee Incident | Datenschutz ohne Arbeitsauftrag |
| T06 | Bildschirm nicht gesperrt, zweiter Reminder | Marco Keller | IS-02 | Low | Expected / Mitigating | Employee Incident | Pattern: gleicher Risiko-Code |
| T07 | Selbstmeldung Fehlversand | Nina Ammann | DS-01 | Low / Medium | Mitigating | Employee Incident | Pattern: 3. Reminder beliebiger Code |
| T08 | Selbstfreigabe mit Login der Kollegin | Marco Kessler | KU-01 / IS-01 | Medium / High | Expected / Aggravating / Severely Aggravating | Employee Incident / HR Referral | Kontrollumgehung |
| T09 | Rückruf missachtet, Betrug gestoppt | Marco Kessler | KU-02 | Low / Medium | Expected / Mitigating | Employee Incident | Pattern KU-02 |
| T10 | Provision nach Kreditbewilligung | Jonas Weber | GE-02 / GE-03 | High | Aggravating / Severely Aggravating | HR Referral | Bestechung |
| T11 | Anzügliche Bemerkungen | Reto Gerber | kein Code | – | – | nicht geprüft | Keine erfundene Quelle (W-08 nicht im Katalog) |
| T12 | Benachteiligung nach Meldung | Reto Gerber | – | – | – | HR Referral | Sonderregel Vergeltung |
| T13 | Nicht offengelegtes VR-Mandat | Patrick Imhof | IK-01 | Medium / High | Expected / Aggravating | Employee Incident / HR Referral | Interessenkonflikt |
| T14 | Mitarbeiterdaten an private Gmail | Elena Marti | IS-03 / IS-06 / DS-01 | Medium / High | Expected / Mitigating | Employee Incident / Reminder / HR Referral | Private Kanäle |
| T15 | Nicht freigegebenes Remote-Tool | Thomas Brunner | IS-04 | Medium / High | Expected / Aggravating | Employee Incident / HR Referral | Software |
| T16 | ETF nach zwei Wochen verkauft | Lukas Schmid | – | – | – | No Breach | Kein Verstoss: Ausnahme ETF |
| T17 | Fussballspiel mit Gastgeber | Sandra Vogel | – | – | – | No Breach | Kein Verstoss: Wertgrenze Einladungen |
| T18 | Vager anonymer Hinweis | keine | – | – | – | offen | Keine erfundenen Fakten |
| T19 | Passwort weitergegeben, meldende Person nennt sich | Fabian Graf | IS-01 | Low / Medium | Expected / Mitigating | Reminder / Employee Incident | Schutz der meldenden Person |
| T20 | WhatsApp-Aufträge, Chats gelöscht | Lukas Schmid | MV-03 | Medium / High | Severely Aggravating | HR Referral | Vertuschung |

## Fälle im Detail

### T01 Bildschirm offen, früherer Fall ausserhalb des Fensters

Fokus: Pattern: 12-Monats-Fenster

> Line Manager Sandra Vogel meldet: Sarah Widmer hat am 02.11.2026 ihren Arbeitsplatz für die Mittagspause verlassen, ohne den Bildschirm zu sperren. Auf dem Bildschirm war nur das Intranet offen, keine Kundendaten. Sie hat sich sofort entschuldigt und sperrt seither konsequent.

| Soll | Wert |
|---|---|
| Person | P-10455 Sarah Widmer |
| Verstoss | ja |
| Policy | IS-02 |
| Risk | Low |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 02.11.2026 |
| Meldeweg | Line Manager |
| Incident Level | Reminder |
| Darf nicht vorkommen | Sandra Vogel |

Begründung: W-03 Ziff. 5.1 Nr. 3 (Bildschirmsperre). Low × Expected = Reminder. Der frühere IS-02-Reminder vom 30.06.2025 liegt ausserhalb des 12-Monats-Fensters (ab 02.11.2025) und hebt nicht an.

### T02 Pralinen eines Kunden

Fokus: Kein Verstoss: Wertgrenze Geschenke

> Hinweis aus dem Team: Marco Keller hat am 06.11.2026 von einer langjährigen Kundin eine Schachtel Pralinen im Wert von etwa CHF 40 erhalten und behalten. Weitere Geschenke dieser Kundin sind nicht bekannt, es läuft kein Geschäftsentscheid.

| Soll | Wert |
|---|---|
| Person | P-10231 Marco Keller |
| Verstoss | nein |
| Policy | – |
| Risk | – |
| Behavior | – |
| Sonderregel | keine |
| Datum | 06.11.2026 |
| Meldeweg | – |
| Incident Level | No Breach |

Begründung: W-05 Ziff. 5.2: Geschenke bis CHF 200 ohne Bewilligung (Jahressumme pro Partner höchstens CHF 500). Erwartet: «kein Verstoss». Zusätzlich darf die Historie von Marco Keller hier nichts anheben.

### T03 Uhr CHF 450 nicht gemeldet

Fokus: Spielraum bei Risk und Behavior

> Kontrolle Geschenkregister: Simon Kuhn hat am 15.10.2026 von einem Kunden eine Uhr im Wert von CHF 450 erhalten. Eine Bewilligung wurde weder vorgängig beantragt noch nachgemeldet. Auf Nachfrage sagt er, er habe die Wertgrenze nicht gekannt, und bietet an, die Uhr zurückzugeben.

| Soll | Wert |
|---|---|
| Person | P-10655 Simon Kuhn |
| Verstoss | ja |
| Policy | GE-01 |
| Risk | Low / Medium |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 15.10.2026 |
| Meldeweg | Kontrolle |
| Incident Level | Reminder / Employee Incident |

Begründung: W-05 Ziff. 5.2 und 5.3: über CHF 200 bis 1'000 nur mit Bewilligung, Nachmeldung innert 5 Arbeitstagen. Kein Bezug zu einem Entscheid. Je nach Gewichtung Reminder oder Employee Incident.

### T04 Bargeld behalten, danach Gebührenerlass

Fokus: Sonderregel Straftat

> Ein Kollege meldet telefonisch: Simon Kuhn hat am 04.11.2026 von einem Kunden ein Couvert mit CHF 500 in bar angenommen und behalten. Eine Woche später hat er demselben Kunden die Depotgebühren für ein Jahr erlassen. Gegenüber dem Kollegen sagte er, das bleibe unter ihnen.

| Soll | Wert |
|---|---|
| Person | P-10655 Simon Kuhn |
| Verstoss | ja |
| Policy | GE-02 / GE-03 |
| Risk | High |
| Behavior | Aggravating / Severely Aggravating |
| Sonderregel | straftat |
| Datum | 04.11.2026 |
| Meldeweg | – |
| Incident Level | HR Referral |

Begründung: W-05 Ziff. 5.1 Nr. 3 (Bargeld unabhängig vom Betrag verboten) und Ziff. 7 (S2: Vorteil im Zusammenhang mit Geschäftsentscheid). Verdacht auf Bestechung → Sonderregel «straftat» → HR Referral.

### T05 Neugierabfrage Konto der Nachbarin

Fokus: Datenschutz ohne Arbeitsauftrag

> Die Zugriffskontrolle zeigt: Fabian Graf (Lernender) hat am 28.10., 30.10. und 03.11.2026 das Konto seiner Nachbarin aufgerufen, ohne dass ein Auftrag bestand. Im Gespräch gab er zu, er sei neugierig gewesen. Daten wurden nicht weitergegeben.

| Soll | Wert |
|---|---|
| Person | P-10622 Fabian Graf |
| Verstoss | ja |
| Policy | DS-02 |
| Risk | Medium |
| Behavior | Expected / Aggravating |
| Sonderregel | keine |
| Datum | 03.11.2026 / 28.10.2026 |
| Meldeweg | Kontrolle |
| Incident Level | Employee Incident |

Begründung: W-02 Ziff. 5 Nr. 3: Zugriff nur mit Arbeitsauftrag. Kundendaten einer einzelnen Person → Medium. Medium × Expected oder Aggravating = Employee Incident.

### T06 Bildschirm nicht gesperrt, zweiter Reminder

Fokus: Pattern: gleicher Risiko-Code

> Line Manager Sandra Vogel meldet: Marco Keller hat am 05.11.2026 seinen Arbeitsplatz im Kundenbereich verlassen, ohne den Bildschirm zu sperren. Es waren keine Kundendaten sichtbar. Er hat den Fehler sofort eingesehen.

| Soll | Wert |
|---|---|
| Person | P-10231 Marco Keller |
| Verstoss | ja |
| Policy | IS-02 |
| Risk | Low |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 05.11.2026 |
| Meldeweg | Line Manager |
| Incident Level | Employee Incident |
| Darf nicht vorkommen | Sandra Vogel |

Begründung: Matrix Low × Expected = Reminder. Pattern: INC-2026-00142 (IS-02, Reminder, 03.02.2026) im Fenster → 2. Reminder mit gleichem Code → Employee Incident. INC-2026-00655 (Appeal hängig) zählt nicht.

### T07 Selbstmeldung Fehlversand

Fokus: Pattern: 3. Reminder beliebiger Code

> Selbstmeldung von Nina Ammann: Sie hat am 09.11.2026 eine Offerte mit Name und Umsatzzahlen eines Firmenkunden an einen falschen externen Empfänger geschickt, den Fehler nach zehn Minuten bemerkt, den Empfänger um Löschung gebeten und die Löschbestätigung erhalten.

| Soll | Wert |
|---|---|
| Person | P-10318 Nina Ammann |
| Verstoss | ja |
| Policy | DS-01 |
| Risk | Low / Medium |
| Behavior | Mitigating |
| Sonderregel | keine |
| Datum | 09.11.2026 |
| Meldeweg | Selbstmeldung |
| Incident Level | Employee Incident |

Begründung: W-02 Ziff. 5 Nr. 4 und Ziff. 6.1. Selbstmeldung und Schadensbegrenzung → Mitigating → Reminder. Pattern: zwei abgeschlossene Reminder im Fenster (IS-03 10.03.2026, GE-01 22.06.2026) → 3. Reminder → Employee Incident.

### T08 Selbstfreigabe mit Login der Kollegin

Fokus: Kontrollumgehung

> Hinweis aus dem Zahlungsverkehr: Marco Kessler hat am 10.11.2026 eine Zahlung über CHF 85'000 erfasst und sie anschliessend mit dem Login einer Kollegin selbst freigegeben, weil diese in einer Sitzung war. Die Zahlung war korrekt. Auf Nachfrage sagt er, das machten alle so, wenn es pressiert.

| Soll | Wert |
|---|---|
| Person | P-10466 Marco Kessler |
| Verstoss | ja |
| Policy | KU-01 / IS-01 |
| Risk | Medium / High |
| Behavior | Expected / Aggravating / Severely Aggravating |
| Sonderregel | keine |
| Datum | 10.11.2026 |
| Meldeweg | – |
| Incident Level | Employee Incident / HR Referral |

Begründung: W-10 Ziff. 5 Nr. 2 und E-03 Ziff. 3 Nr. 1 (Vier-Augen-Prinzip, keine Selbstfreigabe), zusätzlich W-03 Ziff. 5.1 Nr. 1 (fremde Zugangsdaten). Kontrollumgehung → mindestens Medium.

### T09 Rückruf missachtet, Betrug gestoppt

Fokus: Pattern KU-02

> Fraud Management meldet: Marco Kessler hat am 03.11.2026 auf E-Mail-Anweisung eine geänderte Zahlungsverbindung eines Firmenkunden erfasst, ohne den Kunden über die hinterlegte Nummer zurückzurufen. Die Zahlung über CHF 40'000 wurde vom Fraud Management vor der Ausführung gestoppt, es entstand kein Schaden. Er kooperiert.

| Soll | Wert |
|---|---|
| Person | P-10466 Marco Kessler |
| Verstoss | ja |
| Policy | KU-02 |
| Risk | Low / Medium |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 03.11.2026 |
| Meldeweg | Kontrolle |
| Incident Level | Employee Incident |

Begründung: W-10 Ziff. 5 Nr. 3 (Rückrufprinzip). Wird Low gewählt: Reminder → Pattern: 2. Reminder KU-02 (INC-2026-00301, 02.04.2026) → Employee Incident. Bei Medium × Expected direkt Employee Incident.

### T10 Provision nach Kreditbewilligung

Fokus: Bestechung

> Anonymer Hinweis über SpeakUp: Jonas Weber soll am 21.10.2026, zwei Tage nach der Bewilligung eines Kredits, vom Geschäftsführer der Kreditnehmerin CHF 2'000 als «Provision» auf sein Privatkonto erhalten haben.

| Soll | Wert |
|---|---|
| Person | P-10512 Jonas Weber |
| Verstoss | ja |
| Policy | GE-02 / GE-03 |
| Risk | High |
| Behavior | Aggravating / Severely Aggravating |
| Sonderregel | straftat |
| Datum | 21.10.2026 |
| Meldeweg | Anonym |
| Incident Level | HR Referral |

Begründung: W-05 Ziff. 5.1 Nr. 3 und 4, Ziff. 7 (S2). Verdacht auf Bestechung und persönliche Bereicherung → Sonderregel «straftat» → HR Referral.

### T11 Anzügliche Bemerkungen

Fokus: Keine erfundene Quelle (W-08 nicht im Katalog)

> Eine Mitarbeiterin meldet: Reto Gerber hat ihr gegenüber am 06.11.2026 in einer Teamsitzung anzügliche Bemerkungen über ihr Aussehen gemacht. Es sei das erste Mal gewesen.

| Soll | Wert |
|---|---|
| Person | P-10044 Reto Gerber |
| Verstoss | ja / unklar |
| Policy | kein Code (nicht im Katalog) |
| Risk | – |
| Behavior | – |
| Sonderregel | keine |
| Datum | 06.11.2026 |
| Meldeweg | – |
| Incident Level | nicht geprüft |

Begründung: W-08 Ziff. 5 und 8 (Belästigung) – im Katalog der Risiko-Codes gibt es dafür keinen Code. Erwartet: kein erfundener Code; der Assessor muss den Fall über W-08 bzw. HR weiterführen.

### T12 Benachteiligung nach Meldung

Fokus: Sonderregel Vergeltung

> Hinweis über die Meldestelle: Seit eine Mitarbeiterin im Juni einen Vorfall an Compliance gemeldet hat, zieht Reto Gerber sie von allen Kundenterminen ab. Am 02.11.2026 hat er ihr die letzten zwei Kunden entzogen und gesagt, wer petze, brauche keine Kunden.

| Soll | Wert |
|---|---|
| Person | P-10044 Reto Gerber |
| Verstoss | ja |
| Policy | – |
| Risk | – |
| Behavior | – |
| Sonderregel | vergeltung |
| Datum | 02.11.2026 |
| Meldeweg | – |
| Incident Level | HR Referral |

Begründung: W-01 Ziff. 5 und W-07 Ziff. 9: Vergeltung ist verboten. Sonderregel «vergeltung» → HR Referral, unabhängig von der Matrix.

### T13 Nicht offengelegtes VR-Mandat

Fokus: Interessenkonflikt

> Compliance Monitoring stellt fest: Patrick Imhof sitzt seit März 2026 im Verwaltungsrat einer Firma, die Kundin der Bank ist und mit der der Handel Geschäfte abwickelt. Das Mandat wurde nie offengelegt. Festgestellt am 09.11.2026.

| Soll | Wert |
|---|---|
| Person | P-10061 Patrick Imhof |
| Verstoss | ja |
| Policy | IK-01 |
| Risk | Medium / High |
| Behavior | Expected / Aggravating |
| Sonderregel | keine |
| Datum | – |
| Meldeweg | – |
| Incident Level | Employee Incident / HR Referral |

Begründung: W-04 Ziff. 6 (Offenlegung innert 10 Arbeitstagen) und Ziff. 7 (S2: nicht bewilligtes VR-Mandat bei einem Kunden).

### T14 Mitarbeiterdaten an private Gmail

Fokus: Private Kanäle

> Die DLP-Kontrolle meldet: Elena Marti hat am 07.11.2026 eine Excel-Liste mit Namen und Löhnen von 40 Mitarbeitenden an ihre private Gmail-Adresse geschickt. Sie sagt, sie habe am Wochenende daran weiterarbeiten wollen, und hat die Mail inzwischen gelöscht.

| Soll | Wert |
|---|---|
| Person | P-10601 Elena Marti |
| Verstoss | ja |
| Policy | IS-03 / IS-06 / DS-01 |
| Risk | Medium / High |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 07.11.2026 |
| Meldeweg | Kontrolle |
| Incident Level | Employee Incident / Reminder / HR Referral |

Begründung: W-03 Ziff. 5.2 Nr. 3 (keine Geschäftsinformationen auf privaten Kanälen). Personendaten vieler Personen → mindestens Medium.

### T15 Nicht freigegebenes Remote-Tool

Fokus: Software

> IT-Security meldet: Thomas Brunner hat am 30.10.2026 auf einem Server ein nicht freigegebenes Fernwartungsprogramm installiert, um einem externen Dienstleister schnell Zugriff zu geben. Das Programm ist inzwischen entfernt, Hinweise auf einen Missbrauch gibt es keine.

| Soll | Wert |
|---|---|
| Person | P-10095 Thomas Brunner |
| Verstoss | ja |
| Policy | IS-04 |
| Risk | Medium / High |
| Behavior | Expected / Aggravating |
| Sonderregel | keine |
| Datum | 30.10.2026 |
| Meldeweg | Kontrolle |
| Incident Level | Employee Incident / HR Referral |

Begründung: W-03 Ziff. 5.3 Nr. 1 (nur freigegebene Software). Externer Zugriff auf einen Server umgeht Kontrollen → mindestens Medium.

### T16 ETF nach zwei Wochen verkauft

Fokus: Kein Verstoss: Ausnahme ETF

> Kontrolle Mitarbeitergeschäfte: Lukas Schmid hat am 20.10.2026 Anteile eines breit diversifizierten ETF auf den MSCI World gekauft und sie am 03.11.2026 wieder verkauft.

| Soll | Wert |
|---|---|
| Person | P-10402 Lukas Schmid |
| Verstoss | nein |
| Policy | – |
| Risk | – |
| Behavior | – |
| Sonderregel | keine |
| Datum | – |
| Meldeweg | – |
| Incident Level | No Breach |

Begründung: W-06 Ziff. 5.3: Mindesthaltedauer 30 Tage, aber breit diversifizierte Fonds und ETF sind ausgenommen. Erwartet: «kein Verstoss», trotz früherem Employee Incident von Lukas Schmid.

### T17 Fussballspiel mit Gastgeber

Fokus: Kein Verstoss: Wertgrenze Einladungen

> Hinweis: Sandra Vogel war am 31.10.2026 mit einem Kunden an einem Fussballspiel. Das Ticket kostete CHF 120, der Kunde war selbst dabei. Es läuft kein Geschäftsentscheid mit diesem Kunden.

| Soll | Wert |
|---|---|
| Person | P-10012 Sandra Vogel |
| Verstoss | nein |
| Policy | – |
| Risk | – |
| Behavior | – |
| Sonderregel | keine |
| Datum | 31.10.2026 |
| Meldeweg | – |
| Incident Level | No Breach |

Begründung: W-05 Ziff. 5.2: Veranstaltungen bis CHF 300 pro Person ohne Bewilligung, wenn der Gastgeber anwesend ist.

### T18 Vager anonymer Hinweis

Fokus: Keine erfundenen Fakten

> Anonymer Hinweis: Im Zahlungsverkehr macht jemand seit einiger Zeit komische Sachen mit Zahlungen. Mehr kann ich nicht sagen.

| Soll | Wert |
|---|---|
| Person | keine Person bestimmbar |
| Verstoss | unklar |
| Policy | – |
| Risk | – |
| Behavior | – |
| Sonderregel | keine |
| Datum | kein Datum |
| Meldeweg | Anonym |
| Incident Level | offen |

Begründung: Keine Person, kein Datum, kein konkretes Verhalten. Erwartet: keine Person gesetzt, Verstoss «unklar», kein Datum, keine Sonderregel ohne konkreten Hinweis.

### T19 Passwort weitergegeben, meldende Person nennt sich

Fokus: Schutz der meldenden Person

> Petra Huber (HR Business Partner) meldet: Sie hat am 10.11.2026 gesehen, wie Fabian Graf einer Kollegin aus seinem Team sein Passwort auf einem Zettel gegeben hat, damit sie in seiner Abwesenheit seine Pendenzen bearbeiten kann.

| Soll | Wert |
|---|---|
| Person | P-10622 Fabian Graf |
| Verstoss | ja |
| Policy | IS-01 |
| Risk | Low / Medium |
| Behavior | Expected / Mitigating |
| Sonderregel | keine |
| Datum | 10.11.2026 |
| Meldeweg | Mitarbeitende (Hinweis) |
| Incident Level | Reminder / Employee Incident |
| Darf nicht vorkommen | Petra Huber, HR Business Partner |

Begründung: W-03 Ziff. 5.1 Nr. 1 (Zugangsdaten nie weitergeben). Name und Funktion der meldenden Person dürfen in Summary, Description und Begründungen nicht vorkommen (W-07 Ziff. 9).

### T20 WhatsApp-Aufträge, Chats gelöscht

Fokus: Vertuschung

> Die Kommunikationsüberwachung meldet: Lukas Schmid hat zwischen dem 01.10. und 05.11.2026 mindestens zwölf Kundenaufträge über WhatsApp entgegengenommen. Als Compliance ihn am 06.11.2026 darauf ansprach, bestritt er das und löschte danach die Chats auf seinem Telefon.

| Soll | Wert |
|---|---|
| Person | P-10402 Lukas Schmid |
| Verstoss | ja |
| Policy | MV-03 |
| Risk | Medium / High |
| Behavior | Severely Aggravating |
| Sonderregel | keine |
| Datum | 05.11.2026 / 01.10.2026 / 06.11.2026 |
| Meldeweg | Kontrolle |
| Incident Level | HR Referral |

Begründung: W-06 Ziff. 5.4 (nur freigegebene Kanäle). Bestreiten und Löschen = Vertuschung → Severely Aggravating → HR Referral.

## Ergebnisse

Die Testberichte der einzelnen Läufe werden hier abgelegt (Datum, Modellstufe, Kennzahlen, Abweichungen und daraus abgeleitete Anpassungen an den Anweisungen).
