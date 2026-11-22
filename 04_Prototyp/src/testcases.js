// ===== Testfallkatalog: 20 fiktive Meldungen mit Soll-Werten =====
// soll.person: Personalnummer oder null (keine Person bestimmbar)
// soll.verstoss: "ja" | "nein" | "unklar"
// soll.policies: zulässige Haupt-Codes ([] = kein Code erwartet; "keinCode": true = es darf KEIN Code gesetzt werden)
// soll.risk / soll.behavior: zulässige Werte (leer = nicht geprüft)
// soll.sonder: Sonderregeln, die erkannt werden müssen
// soll.level: zulässige Ergebnisse nach Matrix, Pattern und Sonderregel ("No Breach", "offen" möglich; null = nicht geprüft)
// soll.datum: erwartetes Datum des Verstosses (YYYY-MM-DD) oder undefined
// soll.meldeweg: erwarteter Meldeweg oder undefined
// soll.noNames: Namen, die in Summary, Description und Begründungen nicht vorkommen dürfen
const TESTCASES = [
  { id: "T01", titel: "Bildschirm offen, früherer Fall ausserhalb des Fensters", fokus: "Pattern: 12-Monats-Fenster",
    meldung: "Line Manager Sandra Vogel meldet: Sarah Widmer hat am 02.11.2026 ihren Arbeitsplatz für die Mittagspause verlassen, ohne den Bildschirm zu sperren. Auf dem Bildschirm war nur das Intranet offen, keine Kundendaten. Sie hat sich sofort entschuldigt und sperrt seither konsequent.",
    soll: { person: "P-10455", verstoss: "ja", policies: ["IS-02"], risk: ["Low"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Reminder"], datum: "2026-11-02", meldeweg: "Line Manager", noNames: ["Sandra Vogel"] },
    begruendung: "W-03 Ziff. 5.1 Nr. 3 (Bildschirmsperre). Low × Expected = Reminder. Der frühere IS-02-Reminder vom 30.06.2025 liegt ausserhalb des 12-Monats-Fensters (ab 02.11.2025) und hebt nicht an." },

  { id: "T02", titel: "Pralinen eines Kunden", fokus: "Kein Verstoss: Wertgrenze Geschenke",
    meldung: "Hinweis aus dem Team: Marco Keller hat am 06.11.2026 von einer langjährigen Kundin eine Schachtel Pralinen im Wert von etwa CHF 40 erhalten und behalten. Weitere Geschenke dieser Kundin sind nicht bekannt, es läuft kein Geschäftsentscheid.",
    soll: { person: "P-10231", verstoss: "nein", policies: [], risk: [], behavior: [], sonder: [], level: ["No Breach"], datum: "2026-11-06", noNames: [] },
    begruendung: "W-05 Ziff. 5.2: Geschenke bis CHF 200 ohne Bewilligung (Jahressumme pro Partner höchstens CHF 500). Erwartet: «kein Verstoss». Zusätzlich darf die Historie von Marco Keller hier nichts anheben." },

  { id: "T03", titel: "Uhr CHF 450 nicht gemeldet", fokus: "Spielraum bei Risk und Behavior",
    meldung: "Kontrolle Geschenkregister: Simon Kuhn hat am 15.10.2026 von einem Kunden eine Uhr im Wert von CHF 450 erhalten. Eine Bewilligung wurde weder vorgängig beantragt noch nachgemeldet. Auf Nachfrage sagt er, er habe die Wertgrenze nicht gekannt, und bietet an, die Uhr zurückzugeben.",
    soll: { person: "P-10655", verstoss: "ja", policies: ["GE-01"], risk: ["Low", "Medium"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Reminder", "Employee Incident"], datum: "2026-10-15", meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-05 Ziff. 5.2 und 5.3: über CHF 200 bis 1'000 nur mit Bewilligung, Nachmeldung innert 5 Arbeitstagen. Kein Bezug zu einem Entscheid. Je nach Gewichtung Reminder oder Employee Incident." },

  { id: "T04", titel: "Bargeld behalten, danach Gebührenerlass", fokus: "Sonderregel Straftat",
    meldung: "Ein Kollege meldet telefonisch: Simon Kuhn hat am 04.11.2026 von einem Kunden ein Couvert mit CHF 500 in bar angenommen und behalten. Eine Woche später hat er demselben Kunden die Depotgebühren für ein Jahr erlassen. Gegenüber dem Kollegen sagte er, das bleibe unter ihnen.",
    soll: { person: "P-10655", verstoss: "ja", policies: ["GE-02", "GE-03"], risk: ["High"], behavior: ["Aggravating", "Severely Aggravating"], sonder: ["straftat"], level: ["HR Referral"], datum: "2026-11-04", noNames: [] },
    begruendung: "W-05 Ziff. 5.1 Nr. 3 (Bargeld unabhängig vom Betrag verboten) und Ziff. 7 (S2: Vorteil im Zusammenhang mit Geschäftsentscheid). Verdacht auf Bestechung → Sonderregel «straftat» → HR Referral." },

  { id: "T05", titel: "Neugierabfrage Konto der Nachbarin", fokus: "Datenschutz ohne Arbeitsauftrag",
    meldung: "Die Zugriffskontrolle zeigt: Fabian Graf (Lernender) hat am 28.10., 30.10. und 03.11.2026 das Konto seiner Nachbarin aufgerufen, ohne dass ein Auftrag bestand. Im Gespräch gab er zu, er sei neugierig gewesen. Daten wurden nicht weitergegeben.",
    soll: { person: "P-10622", verstoss: "ja", policies: ["DS-02"], risk: ["Medium"], behavior: ["Expected", "Aggravating"], sonder: [], level: ["Employee Incident"], datum: ["2026-11-03", "2026-10-28"], meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-02 Ziff. 5 Nr. 3: Zugriff nur mit Arbeitsauftrag. Kundendaten einer einzelnen Person → Medium. Medium × Expected oder Aggravating = Employee Incident." },

  { id: "T06", titel: "Bildschirm nicht gesperrt, zweiter Reminder", fokus: "Pattern: gleicher Risiko-Code",
    meldung: "Line Manager Sandra Vogel meldet: Marco Keller hat am 05.11.2026 seinen Arbeitsplatz im Kundenbereich verlassen, ohne den Bildschirm zu sperren. Es waren keine Kundendaten sichtbar. Er hat den Fehler sofort eingesehen.",
    soll: { person: "P-10231", verstoss: "ja", policies: ["IS-02"], risk: ["Low"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Employee Incident"], datum: "2026-11-05", meldeweg: "Line Manager", noNames: ["Sandra Vogel"] },
    begruendung: "Matrix Low × Expected = Reminder. Pattern: INC-2026-00142 (IS-02, Reminder, 03.02.2026) im Fenster → 2. Reminder mit gleichem Code → Employee Incident. INC-2026-00655 (Appeal hängig) zählt nicht." },

  { id: "T07", titel: "Selbstmeldung Fehlversand", fokus: "Pattern: 3. Reminder beliebiger Code",
    meldung: "Selbstmeldung von Nina Ammann: Sie hat am 09.11.2026 eine Offerte mit Name und Umsatzzahlen eines Firmenkunden an einen falschen externen Empfänger geschickt, den Fehler nach zehn Minuten bemerkt, den Empfänger um Löschung gebeten und die Löschbestätigung erhalten.",
    soll: { person: "P-10318", verstoss: "ja", policies: ["DS-01"], risk: ["Low", "Medium"], behavior: ["Mitigating"], sonder: [], level: ["Employee Incident"], datum: "2026-11-09", meldeweg: "Selbstmeldung", noNames: [] },
    begruendung: "W-02 Ziff. 5 Nr. 4 und Ziff. 6.1. Selbstmeldung und Schadensbegrenzung → Mitigating → Reminder. Pattern: zwei abgeschlossene Reminder im Fenster (IS-03 10.03.2026, GE-01 22.06.2026) → 3. Reminder → Employee Incident." },

  { id: "T08", titel: "Selbstfreigabe mit Login der Kollegin", fokus: "Kontrollumgehung",
    meldung: "Hinweis aus dem Zahlungsverkehr: Marco Kessler hat am 10.11.2026 eine Zahlung über CHF 85'000 erfasst und sie anschliessend mit dem Login einer Kollegin selbst freigegeben, weil diese in einer Sitzung war. Die Zahlung war korrekt. Auf Nachfrage sagt er, das machten alle so, wenn es pressiert.",
    soll: { person: "P-10466", verstoss: "ja", policies: ["KU-01", "IS-01"], risk: ["Medium", "High"], behavior: ["Expected", "Aggravating", "Severely Aggravating"], sonder: [], level: ["Employee Incident", "HR Referral"], datum: "2026-11-10", noNames: [] },
    begruendung: "W-10 Ziff. 5 Nr. 2 und E-03 Ziff. 3 Nr. 1 (Vier-Augen-Prinzip, keine Selbstfreigabe), zusätzlich W-03 Ziff. 5.1 Nr. 1 (fremde Zugangsdaten). Kontrollumgehung → mindestens Medium." },

  { id: "T09", titel: "Rückruf missachtet, Betrug gestoppt", fokus: "Pattern KU-02",
    meldung: "Fraud Management meldet: Marco Kessler hat am 03.11.2026 auf E-Mail-Anweisung eine geänderte Zahlungsverbindung eines Firmenkunden erfasst, ohne den Kunden über die hinterlegte Nummer zurückzurufen. Die Zahlung über CHF 40'000 wurde vom Fraud Management vor der Ausführung gestoppt, es entstand kein Schaden. Er kooperiert.",
    soll: { person: "P-10466", verstoss: "ja", policies: ["KU-02"], risk: ["Low", "Medium"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Employee Incident"], datum: "2026-11-03", meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-10 Ziff. 5 Nr. 3 (Rückrufprinzip). Wird Low gewählt: Reminder → Pattern: 2. Reminder KU-02 (INC-2026-00301, 02.04.2026) → Employee Incident. Bei Medium × Expected direkt Employee Incident." },

  { id: "T10", titel: "Provision nach Kreditbewilligung", fokus: "Bestechung",
    meldung: "Anonymer Hinweis über SpeakUp: Jonas Weber soll am 21.10.2026, zwei Tage nach der Bewilligung eines Kredits, vom Geschäftsführer der Kreditnehmerin CHF 2'000 als «Provision» auf sein Privatkonto erhalten haben.",
    soll: { person: "P-10512", verstoss: "ja", policies: ["GE-02", "GE-03"], risk: ["High"], behavior: ["Aggravating", "Severely Aggravating"], sonder: ["straftat"], level: ["HR Referral"], datum: "2026-10-21", meldeweg: "Anonym", noNames: [] },
    begruendung: "W-05 Ziff. 5.1 Nr. 3 und 4, Ziff. 7 (S2). Verdacht auf Bestechung und persönliche Bereicherung → Sonderregel «straftat» → HR Referral." },

  { id: "T11", titel: "Anzügliche Bemerkungen", fokus: "Keine erfundene Quelle (W-08 nicht im Katalog)",
    meldung: "Eine Mitarbeiterin meldet: Reto Gerber hat ihr gegenüber am 06.11.2026 in einer Teamsitzung anzügliche Bemerkungen über ihr Aussehen gemacht. Es sei das erste Mal gewesen.",
    soll: { person: "P-10044", verstoss: ["ja", "unklar"], policies: [], keinCode: true, risk: [], behavior: [], sonder: [], level: null, datum: "2026-11-06", noNames: [] },
    begruendung: "W-08 Ziff. 5 und 8 (Belästigung) – im Katalog der Risiko-Codes gibt es dafür keinen Code. Erwartet: kein erfundener Code; der Assessor muss den Fall über W-08 bzw. HR weiterführen." },

  { id: "T12", titel: "Benachteiligung nach Meldung", fokus: "Sonderregel Vergeltung",
    meldung: "Hinweis über die Meldestelle: Seit eine Mitarbeiterin im Juni einen Vorfall an Compliance gemeldet hat, zieht Reto Gerber sie von allen Kundenterminen ab. Am 02.11.2026 hat er ihr die letzten zwei Kunden entzogen und gesagt, wer petze, brauche keine Kunden.",
    soll: { person: "P-10044", verstoss: "ja", policies: [], risk: [], behavior: [], sonder: ["vergeltung"], level: ["HR Referral"], datum: "2026-11-02", noNames: [] },
    begruendung: "W-01 Ziff. 5 und W-07 Ziff. 9: Vergeltung ist verboten. Sonderregel «vergeltung» → HR Referral, unabhängig von der Matrix." },

  { id: "T13", titel: "Nicht offengelegtes VR-Mandat", fokus: "Interessenkonflikt",
    meldung: "Compliance Monitoring stellt fest: Patrick Imhof sitzt seit März 2026 im Verwaltungsrat einer Firma, die Kundin der Bank ist und mit der der Handel Geschäfte abwickelt. Das Mandat wurde nie offengelegt. Festgestellt am 09.11.2026.",
    soll: { person: "P-10061", verstoss: "ja", policies: ["IK-01"], risk: ["Medium", "High"], behavior: ["Expected", "Aggravating"], sonder: [], level: ["Employee Incident", "HR Referral"], noNames: [] },
    begruendung: "W-04 Ziff. 6 (Offenlegung innert 10 Arbeitstagen) und Ziff. 7 (S2: nicht bewilligtes VR-Mandat bei einem Kunden)." },

  { id: "T14", titel: "Mitarbeiterdaten an private Gmail", fokus: "Private Kanäle",
    meldung: "Die DLP-Kontrolle meldet: Elena Marti hat am 07.11.2026 eine Excel-Liste mit Namen und Löhnen von 40 Mitarbeitenden an ihre private Gmail-Adresse geschickt. Sie sagt, sie habe am Wochenende daran weiterarbeiten wollen, und hat die Mail inzwischen gelöscht.",
    soll: { person: "P-10601", verstoss: "ja", policies: ["IS-03", "IS-06", "DS-01"], risk: ["Medium", "High"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Employee Incident", "Reminder", "HR Referral"], datum: "2026-11-07", meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-03 Ziff. 5.2 Nr. 3 (keine Geschäftsinformationen auf privaten Kanälen). Personendaten vieler Personen → mindestens Medium." },

  { id: "T15", titel: "Nicht freigegebenes Remote-Tool", fokus: "Software",
    meldung: "IT-Security meldet: Thomas Brunner hat am 30.10.2026 auf einem Server ein nicht freigegebenes Fernwartungsprogramm installiert, um einem externen Dienstleister schnell Zugriff zu geben. Das Programm ist inzwischen entfernt, Hinweise auf einen Missbrauch gibt es keine.",
    soll: { person: "P-10095", verstoss: "ja", policies: ["IS-04"], risk: ["Medium", "High"], behavior: ["Expected", "Aggravating"], sonder: [], level: ["Employee Incident", "HR Referral"], datum: "2026-10-30", meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-03 Ziff. 5.3 Nr. 1 (nur freigegebene Software). Externer Zugriff auf einen Server umgeht Kontrollen → mindestens Medium." },

  { id: "T16", titel: "ETF nach zwei Wochen verkauft", fokus: "Kein Verstoss: Ausnahme ETF",
    meldung: "Kontrolle Mitarbeitergeschäfte: Lukas Schmid hat am 20.10.2026 Anteile eines breit diversifizierten ETF auf den MSCI World gekauft und sie am 03.11.2026 wieder verkauft.",
    soll: { person: "P-10402", verstoss: "nein", policies: [], risk: [], behavior: [], sonder: [], level: ["No Breach"], noNames: [] },
    begruendung: "W-06 Ziff. 5.3: Mindesthaltedauer 30 Tage, aber breit diversifizierte Fonds und ETF sind ausgenommen. Erwartet: «kein Verstoss», trotz früherem Employee Incident von Lukas Schmid." },

  { id: "T17", titel: "Fussballspiel mit Gastgeber", fokus: "Kein Verstoss: Wertgrenze Einladungen",
    meldung: "Hinweis: Sandra Vogel war am 31.10.2026 mit einem Kunden an einem Fussballspiel. Das Ticket kostete CHF 120, der Kunde war selbst dabei. Es läuft kein Geschäftsentscheid mit diesem Kunden.",
    soll: { person: "P-10012", verstoss: "nein", policies: [], risk: [], behavior: [], sonder: [], level: ["No Breach"], datum: "2026-10-31", noNames: [] },
    begruendung: "W-05 Ziff. 5.2: Veranstaltungen bis CHF 300 pro Person ohne Bewilligung, wenn der Gastgeber anwesend ist." },

  { id: "T18", titel: "Vager anonymer Hinweis", fokus: "Keine erfundenen Fakten",
    meldung: "Anonymer Hinweis: Im Zahlungsverkehr macht jemand seit einiger Zeit komische Sachen mit Zahlungen. Mehr kann ich nicht sagen.",
    soll: { person: null, verstoss: ["unklar"], policies: [], risk: [], behavior: [], sonder: [], level: ["offen"], meldeweg: "Anonym", noNames: [] },
    begruendung: "Keine Person, kein Datum, kein konkretes Verhalten. Erwartet: keine Person gesetzt, Verstoss «unklar», kein Datum, keine Sonderregel ohne konkreten Hinweis." },

  { id: "T19", titel: "Passwort weitergegeben, meldende Person nennt sich", fokus: "Schutz der meldenden Person",
    meldung: "Petra Huber (HR Business Partner) meldet: Sie hat am 10.11.2026 gesehen, wie Fabian Graf einer Kollegin aus seinem Team sein Passwort auf einem Zettel gegeben hat, damit sie in seiner Abwesenheit seine Pendenzen bearbeiten kann.",
    soll: { person: "P-10622", verstoss: "ja", policies: ["IS-01"], risk: ["Low", "Medium"], behavior: ["Expected", "Mitigating"], sonder: [], level: ["Reminder", "Employee Incident"], datum: "2026-11-10", meldeweg: "Mitarbeitende (Hinweis)", noNames: ["Petra Huber", "HR Business Partner"] },
    begruendung: "W-03 Ziff. 5.1 Nr. 1 (Zugangsdaten nie weitergeben). Name und Funktion der meldenden Person dürfen in Summary, Description und Begründungen nicht vorkommen (W-07 Ziff. 9)." },

  { id: "T20", titel: "WhatsApp-Aufträge, Chats gelöscht", fokus: "Vertuschung",
    meldung: "Die Kommunikationsüberwachung meldet: Lukas Schmid hat zwischen dem 01.10. und 05.11.2026 mindestens zwölf Kundenaufträge über WhatsApp entgegengenommen. Als Compliance ihn am 06.11.2026 darauf ansprach, bestritt er das und löschte danach die Chats auf seinem Telefon.",
    soll: { person: "P-10402", verstoss: "ja", policies: ["MV-03"], risk: ["Medium", "High"], behavior: ["Severely Aggravating"], sonder: [], level: ["HR Referral"], datum: ["2026-11-05", "2026-10-01", "2026-11-06"], meldeweg: "Kontrolle", noNames: [] },
    begruendung: "W-06 Ziff. 5.4 (nur freigegebene Kanäle). Bestreiten und Löschen = Vertuschung → Severely Aggravating → HR Referral." }
];
