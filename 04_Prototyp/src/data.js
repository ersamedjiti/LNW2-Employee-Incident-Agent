// ===== Fiktive Daten: Musterbank AG (alle Angaben fiktiv) =====

// Katalog der Risiko-Codes (Vorschlag; offener Punkt im Ist-/Soll-Prozess)
const CATALOG = [
  { code: "IS-01", bereich: "Informationssicherheit", name: "Weitergabe von Zugangsdaten", weisung: "W-03", ziffer: "Ziff. 5.1 Nr. 1",
    zitat: "Zugangsdaten, Passwörter, PIN und Einmalcodes sind persönlich und dürfen nie weitergegeben werden, auch nicht an Vorgesetzte oder an Personen, die sich als IT-Support ausgeben.",
    zweck: "Konten und Systeme der Bank vor Missbrauch zu schützen", hinweis: "Geben Sie Zugangsdaten und Einmalcodes nie weiter. Die IT fragt nie nach Passwörtern." },
  { code: "IS-02", bereich: "Informationssicherheit", name: "Bildschirmsperre und Clean Desk", weisung: "W-03", ziffer: "Ziff. 5.1 Nr. 3; Ziff. 5.2 Nr. 2",
    zitat: "Der Bildschirm wird beim Verlassen des Arbeitsplatzes gesperrt (Windows-Taste + L).",
    zweck: "zu verhindern, dass Unbefugte Informationen der Bank einsehen", hinweis: "Sperren Sie den Bildschirm mit Windows-Taste + L, sobald Sie den Arbeitsplatz verlassen, auch für kurze Zeit." },
  { code: "IS-03", bereich: "Informationssicherheit", name: "Geschäftsinformationen auf privaten Kanälen oder Speichern", weisung: "W-03", ziffer: "Ziff. 5.2 Nr. 3",
    zitat: "Geschäftliche Informationen dürfen nicht an private E-Mail-Konten weitergeleitet, auf private Speichermedien kopiert oder in nicht freigegebenen Cloud- oder KI-Diensten gespeichert werden.",
    zweck: "Geschäftsinformationen innerhalb der geschützten Systeme der Bank zu halten", hinweis: "Bearbeiten Sie Geschäftsinformationen nur in den Systemen der Bank. Für Arbeit unterwegs steht der VPN-Zugang zur Verfügung." },
  { code: "IS-04", bereich: "Informationssicherheit", name: "Nicht freigegebene Software", weisung: "W-03", ziffer: "Ziff. 5.3 Nr. 1",
    zitat: "Es darf nur Software verwendet werden, die über den Software-Katalog der Bank bezogen wurde.",
    zweck: "Schadsoftware und unkontrollierte Datenabflüsse zu verhindern", hinweis: "Beziehen Sie Software ausschliesslich über den Software-Katalog der Bank." },
  { code: "IS-05", bereich: "Informationssicherheit", name: "Verspätete Meldung eines Sicherheitsvorfalls", weisung: "W-03", ziffer: "Ziff. 6.2",
    zitat: "Verzögerte oder unterlassene Meldungen gelten dagegen als Pflichtverletzung.",
    zweck: "Angriffe rasch einzudämmen", hinweis: "Melden Sie einen Klick auf einen verdächtigen Link sofort, spätestens innert 30 Minuten, an die IT-Security-Hotline 5555." },
  { code: "IS-06", bereich: "Informationssicherheit", name: "Unverschlüsselte externe Übermittlung", weisung: "W-03", ziffer: "Ziff. 5.2 Nr. 1",
    zitat: "«Vertraulich» und «Streng vertraulich» dürfen nur verschlüsselt extern übermittelt werden.",
    zweck: "vertrauliche Informationen auf dem Übermittlungsweg zu schützen", hinweis: "Versenden Sie vertrauliche Dokumente extern nur verschlüsselt." },
  { code: "DS-01", bereich: "Datenschutz", name: "Fehlversand von Personen- oder Kundendaten", weisung: "W-02", ziffer: "Ziff. 5 Nr. 4; Ziff. 6.1",
    zitat: "Personendaten werden durch technische und organisatorische Massnahmen geschützt (vgl. W-03).",
    zweck: "Kundendaten und das Bankkundengeheimnis zu schützen", hinweis: "Prüfen Sie vor dem Versand von Kundendaten die Empfängeradresse, besonders wenn die Autovervollständigung eine Adresse vorschlägt." },
  { code: "DS-02", bereich: "Datenschutz", name: "Zugriff ohne Arbeitsauftrag (Neugierabfrage)", weisung: "W-02", ziffer: "Ziff. 5 Nr. 3",
    zitat: "Mitarbeitende greifen nur auf Kunden- und Mitarbeitendendaten zu, die sie für ihre konkrete Aufgabe benötigen. […] Neugierabfragen (z.B. Konto von Prominenten, Nachbarn, Familienangehörigen oder Arbeitskolleginnen) sind verboten.",
    zweck: "die Privatsphäre von Kundschaft und Mitarbeitenden zu schützen", hinweis: "Greifen Sie nur auf Daten zu, die Sie für einen konkreten Arbeitsauftrag benötigen." },
  { code: "DS-03", bereich: "Datenschutz", name: "Kundendaten in nicht freigegebenem KI-Dienst", weisung: "W-02", ziffer: "Ziff. 5 Nr. 5",
    zitat: "Öffentlich zugängliche KI-Chatbots und ähnliche Dienste ohne entsprechende Vereinbarung und Freigabe der Bank dürfen nicht für Personendaten, Kundendaten (CID), besonders schützenswerte Personendaten oder sonstige als «Vertraulich» oder «Streng vertraulich» klassifizierte Informationen verwendet werden.",
    zweck: "Kundendaten nicht an Dritte gelangen zu lassen", hinweis: "Verwenden Sie für Personen- und Kundendaten nur die von CISO und Datenschutzberatung freigegebenen KI-Werkzeuge." },
  { code: "GE-01", bereich: "Geschenke und Einladungen", name: "Vorteil über der Wertgrenze ohne Bewilligung", weisung: "W-05", ziffer: "Ziff. 5.2; Ziff. 5.3",
    zitat: "Bewilligungspflichtige Vorteile werden vorgängig über das Formular «Geschenke und Einladungen» in IncidentNet beantragt.",
    zweck: "die Unabhängigkeit der Mitarbeitenden zu schützen", hinweis: "Beantragen Sie Geschenke über CHF 200 und Einladungen über CHF 300 vorgängig über das Formular «Geschenke und Einladungen»." },
  { code: "GE-02", bereich: "Geschenke und Einladungen", name: "Bargeld oder bargeldähnliche Mittel", weisung: "W-05", ziffer: "Ziff. 5.1 Nr. 3",
    zitat: "Bargeld und bargeldähnliche Mittel dürfen weder angenommen noch gewährt werden, unabhängig vom Betrag.",
    zweck: "Bestechung und Interessenkonflikte zu verhindern", hinweis: "Lehnen Sie Bargeld, Gutscheine und Geschenkkarten immer ab." },
  { code: "GE-03", bereich: "Geschenke und Einladungen", name: "Vorteil während Ausschreibung oder Entscheid", weisung: "W-05", ziffer: "Ziff. 5.1 Nr. 4",
    zitat: "Vorteile sind unzulässig während laufender Ausschreibungen, Vertragsverhandlungen oder Kreditentscheide mit dem betreffenden Geschäftspartner.",
    zweck: "Geschäftsentscheide frei von Beeinflussung zu halten", hinweis: "Lehnen Sie während laufender Ausschreibungen oder Verhandlungen jeden Vorteil des betreffenden Geschäftspartners ab." },
  { code: "IK-01", bereich: "Interessenkonflikte", name: "Nicht offengelegter Interessenkonflikt", weisung: "W-04", ziffer: "Ziff. 6",
    zitat: "Nicht offengelegte Interessenkonflikte, auch wenn sie eigene sind und nachträglich erkannt werden",
    zweck: "Kundschaft und Bank vor Interessenkonflikten zu schützen", hinweis: "Legen Sie Interessenkonflikte über das Formular «Offenlegung Interessenkonflikt» offen, vor einem betroffenen Entscheid sofort." },
  { code: "MV-01", bereich: "Marktverhalten", name: "Mitarbeitergeschäft ohne Vorabbewilligung", weisung: "W-06", ziffer: "Ziff. 5.3",
    zitat: "Mitarbeitende in Vertraulichkeitsbereichen holen vor jedem Geschäft in Einzeltiteln (Aktien, Obligationen, Derivate darauf) eine Vorabbewilligung über das Tool «PA-Dealing» ein.",
    zweck: "Insiderhandel und Interessenkonflikte zu verhindern", hinweis: "Holen Sie vor jedem Geschäft in Einzeltiteln die Vorabbewilligung im Tool «PA-Dealing» ein." },
  { code: "MV-02", bereich: "Marktverhalten", name: "Mindesthaltedauer verletzt", weisung: "W-06", ziffer: "Ziff. 5.3",
    zitat: "30 Kalendertage für Einzeltitel und Derivate. Ausnahmen (z.B. Notfall) nur mit Bewilligung von Compliance.",
    zweck: "kurzfristige Spekulation mit Informationsvorsprung zu verhindern", hinweis: "Halten Sie Einzeltitel und Derivate mindestens 30 Kalendertage oder holen Sie vorgängig die Zustimmung von Compliance ein." },
  { code: "MV-03", bereich: "Marktverhalten", name: "Nicht freigegebener Kommunikationskanal", weisung: "W-06", ziffer: "Ziff. 5.4",
    zitat: "Mitarbeitende in Vertraulichkeitsbereichen und im Handel kommunizieren geschäftlich ausschliesslich über die von der Bank freigegebenen Kanäle.",
    zweck: "die vorgeschriebene Aufzeichnung der Geschäftskommunikation sicherzustellen", hinweis: "Nutzen Sie für geschäftliche Kommunikation nur die freigegebenen Kanäle der Bank." },
  { code: "KU-01", bereich: "Kontrollumgehung", name: "Vier-Augen-Prinzip umgangen oder Selbstfreigabe", weisung: "W-10", ziffer: "Ziff. 5 Nr. 2; E-03 Ziff. 3 Nr. 1",
    zitat: "Zahlungen, Stammdatenänderungen (insbesondere Adressen, Kontoverbindungen) und Kreditauszahlungen erfolgen nach dem Vier-Augen-Prinzip.",
    zweck: "Fehler und Betrug im Zahlungsverkehr zu verhindern", hinweis: "Lassen Sie Zahlungen und Stammdatenänderungen immer von einer zweiten Person freigeben." },
  { code: "KU-02", bereich: "Kontrollumgehung", name: "Rückrufprinzip missachtet", weisung: "W-10", ziffer: "Ziff. 5 Nr. 3",
    zitat: "Ungewöhnliche Zahlungsaufträge, Aufträge per E-Mail oder Telefon und geänderte Zahlungsverbindungen werden über eine bekannte, unabhängig ermittelte Telefonnummer verifiziert.",
    zweck: "Zahlungen an Betrüger zu verhindern", hinweis: "Verifizieren Sie geänderte Zahlungsverbindungen immer über eine bekannte, unabhängig ermittelte Telefonnummer." }
];

// Fiktives Mitarbeiterverzeichnis (20 Personen)
const DIRECTORY = [
  { id: "P-10003", name: "Urs Baumann", stufe: "Direktion", funktion: "Leiter Private Banking", abteilung: "Private Banking", lm: "Rolf Zimmermann (GL)", hoeheresMgmt: true },
  { id: "P-10012", name: "Sandra Vogel", stufe: "Kader", funktion: "Teamleiterin", abteilung: "Private Banking Zürich 2", lm: "Urs Baumann" },
  { id: "P-10231", name: "Marco Keller", stufe: "Mitarbeitende", funktion: "Kundenberater", abteilung: "Private Banking Zürich 2", lm: "Sandra Vogel" },
  { id: "P-10455", name: "Sarah Widmer", stufe: "Mitarbeitende", funktion: "Kundenberaterin", abteilung: "Private Banking Zürich 2", lm: "Sandra Vogel" },
  { id: "P-10655", name: "Simon Kuhn", stufe: "Mitarbeitende", funktion: "Kundenberater", abteilung: "Private Banking Bern", lm: "Beat Moser" },
  { id: "P-10044", name: "Reto Gerber", stufe: "Kader", funktion: "Teamleiter", abteilung: "Firmenkunden KMU Ost", lm: "Karin Steiner" },
  { id: "P-10318", name: "Nina Ammann", stufe: "Mitarbeitende", funktion: "Kundenberaterin Firmenkunden", abteilung: "Firmenkunden KMU Ost", lm: "Reto Gerber" },
  { id: "P-10081", name: "Daniela Frei", stufe: "Kader", funktion: "Leiterin Kreditadministration", abteilung: "Kredit Firmenkunden", lm: "Karin Steiner" },
  { id: "P-10512", name: "Jonas Weber", stufe: "Mitarbeitende", funktion: "Kreditspezialist", abteilung: "Kredit Firmenkunden", lm: "Daniela Frei" },
  { id: "P-10090", name: "Claudia Rossi", stufe: "Kader", funktion: "Leiterin Einkauf", abteilung: "Einkauf und Lieferantenmanagement", lm: "Martin Schaller" },
  { id: "P-10577", name: "Stefan Meier", stufe: "Mitarbeitende", funktion: "Einkäufer IT", abteilung: "Einkauf und Lieferantenmanagement", lm: "Claudia Rossi" },
  { id: "P-10061", name: "Patrick Imhof", stufe: "Direktion", funktion: "Head Trading", abteilung: "Handel", lm: "Martin Schaller" },
  { id: "P-10402", name: "Lukas Schmid", stufe: "Mitarbeitende", funktion: "Händler Aktien", abteilung: "Handel", lm: "Patrick Imhof" },
  { id: "P-10070", name: "Andrea Lang", stufe: "Kader", funktion: "Teamleiterin Zahlungsverkehr", abteilung: "Operations", lm: "Martin Schaller" },
  { id: "P-10466", name: "Marco Kessler", stufe: "Mitarbeitende", funktion: "Spezialist Zahlungsverkehr", abteilung: "Operations", lm: "Andrea Lang" },
  { id: "P-10622", name: "Fabian Graf", stufe: "Lernende", funktion: "Lernender KV", abteilung: "Operations", lm: "Andrea Lang" },
  { id: "P-10095", name: "Thomas Brunner", stufe: "Kader", funktion: "Leiter IT-Betrieb", abteilung: "IT-Betrieb", lm: "Martin Schaller" },
  { id: "P-10601", name: "Elena Marti", stufe: "Mitarbeitende", funktion: "Systemadministratorin", abteilung: "IT-Betrieb", lm: "Thomas Brunner" },
  { id: "P-10533", name: "Laura Fischer", stufe: "Mitarbeitende", funktion: "Compliance-Analystin", abteilung: "Compliance", lm: "Michael Huber" },
  { id: "P-10640", name: "Petra Huber", stufe: "Mitarbeitende", funktion: "HR Business Partner", abteilung: "HR", lm: "Susanne Roth" }
];

// Fallhistorie (Datum = Information der Person, Start des 12-Monats-Fensters)
const HISTORY = [
  { ref: "INC-2024-00877", person: "P-10231", code: "DS-01", level: "Reminder", informed: "2024-09-12", status: "abgeschlossen", titel: "E-Mail mit Kundendaten an falschen internen Empfänger" },
  { ref: "INC-2026-00142", person: "P-10231", code: "IS-02", level: "Reminder", informed: "2026-02-03", status: "abgeschlossen", titel: "Bildschirm im Kundenbereich nicht gesperrt" },
  { ref: "INC-2026-00655", person: "P-10231", code: "IS-03", level: "Reminder", informed: "2026-08-20", status: "Appeal hängig", titel: "Präsentation an private E-Mail-Adresse weitergeleitet" },
  { ref: "INC-2026-00301", person: "P-10466", code: "KU-02", level: "Reminder", informed: "2026-04-02", status: "abgeschlossen", titel: "Geänderte Zahlungsverbindung ohne Rückruf erfasst" },
  { ref: "INC-2026-00210", person: "P-10318", code: "IS-03", level: "Reminder", informed: "2026-03-10", status: "abgeschlossen", titel: "Offerte an privates E-Mail-Konto gesendet" },
  { ref: "INC-2026-00488", person: "P-10318", code: "GE-01", level: "Reminder", informed: "2026-06-22", status: "abgeschlossen", titel: "Konzerteinladung über CHF 300 nicht beantragt" },
  { ref: "INC-2025-01102", person: "P-10577", code: "GE-01", level: "Reminder", informed: "2025-12-01", status: "abgeschlossen", titel: "Geschenkkorb eines Lieferanten nicht gemeldet" },
  { ref: "INC-2026-00390", person: "P-10402", code: "MV-01", level: "Employee Incident", informed: "2026-05-14", status: "abgeschlossen", titel: "Aktienkauf ohne Vorabbewilligung" },
  { ref: "INC-2025-00954", person: "P-10455", code: "IS-02", level: "Reminder", informed: "2025-06-30", status: "abgeschlossen", titel: "Kundendossier auf dem Pult liegen gelassen" }
];

// Beispielmeldungen mit vorbereiteten Antworten (für den Offline-Modus)
const PRESETS = [
  {
    id: "A", ref: "INC-2026-01187", label: "Bildschirm nicht gesperrt", sub: "Meldung Line Manager · Demo-Szenario Pattern", received: "2026-11-10T09:12",
    text: "Anruf von Sandra Vogel (Teamleiterin PB Zürich 2): Marco Keller hat am 28.10. über Mittag seinen Arbeitsplatz verlassen, ohne den Bildschirm zu sperren. Sein Outlook war offen. In der Zeit war eine Reinigungskraft von extern im Raum. Sie hat den Bildschirm um 12:40 gesperrt und ihn nach der Pause angesprochen, er hat sich entschuldigt.",
    capture: {
      kurztitel: "Bildschirm beim Verlassen des Arbeitsplatzes nicht gesperrt",
      sachverhalt: "Am 28.10.2026 gegen 12:15 verliess die betroffene Person ihren Arbeitsplatz im Grossraumbüro für die Mittagspause, ohne den Bildschirm zu sperren. Sichtbar war das geöffnete Outlook-Postfach. In dieser Zeit hielt sich eine externe Person eines Dienstleisters im Raum auf. Der Bildschirm wurde um 12:40 gesperrt.",
      kundschaft: "Nicht bekannt", daten: "E-Mails im Outlook-Postfach (Inhalt nicht bekannt)", systeme: "Arbeitsplatzrechner, Outlook",
      sofortmassnahmen: "Bildschirm um 12:40 durch die vorgesetzte Person gesperrt; betroffene Person nach der Pause angesprochen",
      schaden_chf: 0, schaden: "Kein Schaden bekannt (Beinahe-Vorfall)", beweismittel: "Keine genannt",
      vorfall_datum: "2026-10-28", kenntnis_datum: "2026-10-28", meldeweg: "Line Manager", selbstmeldung: false,
      person_kandidaten: [
        { personalnummer: "P-10231", grund: "Name «Marco Keller» steht in der Meldung; die meldende Teamleiterin ist seine Line Managerin.", sicherheit: "hoch" },
        { personalnummer: "P-10466", grund: "Ähnlicher Name (Marco Kessler), aber andere Abteilung (Operations).", sicherheit: "niedrig" }
      ],
      rueckfragen: [{"id": "q1", "frage": "Waren auf dem Bildschirm Kundendaten sichtbar?", "grund": "Entscheidet zwischen Risk Level Low (keine Kundendaten) und Medium (Kundendaten einzelner Personen).", "feld": "kundschaft", "pflicht": true, "optionen": ["Nein, nur interne E-Mails", "Ja, Kundendaten sichtbar", "Unbekannt"], "erwartet": "Nein, nur interne E-Mails", "uebernahme": {"Nein, nur interne E-Mails": "Keine; nur interne E-Mails sichtbar (Angabe Line Manager)"}}, {"id": "q2", "frage": "Konnte die externe Person den Bildschirm von ihrem Standort aus einsehen?", "grund": "Beeinflusst, ob ein Beinahe-Vorfall oder eine Offenlegung vorliegt.", "feld": "sachverhalt", "pflicht": false, "optionen": ["Ja", "Nein", "Unbekannt"]}, {"id": "q3", "frage": "Weshalb wurde der Vorfall erst 13 Tage später gemeldet?", "grund": "Meldefrist 4 Stunden nach W-01 Ziff. 6.2.", "feld": "sachverhalt", "pflicht": false, "optionen": null}],
      rueckfrage_entwurf: "Guten Tag\n\nVielen Dank für Ihre Meldung vom 10.11.2026. Für die Erfassung benötigen wir noch zwei Angaben:\n\n1. Konnte die externe Person den Bildschirm von ihrem Standort aus einsehen?\n2. Waren unter den sichtbaren E-Mails solche mit der Klassifikation «Vertraulich» oder höher?\n\nFreundliche Grüsse\nCompliance",
      identifizierende_details: []
    },
    assess: {
      verstoss: "ja", verstoss_begruendung: "Der Bildschirm wurde beim Verlassen des Arbeitsplatzes nicht gesperrt. Das ist durch die Beobachtung der vorgesetzten Person belegt.",
      regeln: [{ code: "IS-02", begruendung: "Der Arbeitsplatz wurde für rund 25 Minuten ohne Bildschirmsperre verlassen." }],
      risk: { level: "Low", begruendung: "Beinahe-Vorfall ohne Schaden; nach Angaben der Meldung waren nur interne E-Mails und keine Kundendaten sichtbar." },
      behavior: { level: "Expected", umstaende: [
        { text: "Einmaliges Versäumnis, kein Hinweis auf bewusste Umgehung", richtung: "neutral" },
        { text: "Hat sich nach dem Gespräch entschuldigt", richtung: "mildernd" }
      ], begruendung: "Gewöhnlicher Fehler; die Entschuldigung allein reicht nicht für Mitigating, da keine Selbstmeldung und keine aktive Mithilfe vorliegen." },
      sonderregeln: [],
      konfidenz: { stufe: "mittel", begruendung: "Der Sachverhalt ist von der vorgesetzten Person beobachtet. Offen ist, ob die externe Person Einsicht hatte; das kann das Risk Level ändern." },
      offene_fragen: ["Konnte die externe Person den Bildschirm einsehen? Wären Kundendaten sichtbar gewesen, wäre Risk Level Medium zu prüfen."]
    }
  },
  {
    id: "B", ref: "INC-2026-01142", label: "E-Mail an falschen Empfänger", sub: "Selbstmeldung · 3. Reminder innert 12 Monaten", received: "2026-11-06T16:40",
    text: "Nina Ammann aus dem Team Firmenkunden KMU Ost meldet sich selbst: Sie hat heute um 16:05 eine Excel-Liste mit Namen, Adressen und Kreditlimiten von drei Firmenkunden an eine falsche externe Adresse geschickt. Die Autovervollständigung hat eine ähnliche Adresse vorgeschlagen. Die Datei war nicht verschlüsselt. Sie hat sofort den Incident Desk angerufen und den Empfänger nicht selbst kontaktiert.",
    capture: {
      kurztitel: "Kundendaten per E-Mail an falschen externen Empfänger versandt",
      sachverhalt: "Am 06.11.2026 um 16:05 versandte die betroffene Person eine unverschlüsselte Excel-Liste mit Firmennamen, Adressen und Kreditlimiten von drei Firmenkunden an einen falschen externen Empfänger. Ursache war eine von der Autovervollständigung vorgeschlagene ähnliche Adresse. Die Person informierte sofort den Incident Desk und kontaktierte den Empfänger nicht selbst.",
      kundschaft: "Drei Firmenkunden", daten: "Firmennamen, Adressen, Kreditlimiten (Kundendaten, mindestens «Vertraulich»)", systeme: "Outlook",
      sofortmassnahmen: "Incident Desk sofort telefonisch informiert; Empfänger nicht selbst kontaktiert",
      schaden_chf: null, schaden: "Nicht bekannt; Risikobeurteilung der Datenschutzberatung ausstehend", beweismittel: "Versandte E-Mail im Postfach der betroffenen Person",
      vorfall_datum: "2026-11-06", kenntnis_datum: "2026-11-06", meldeweg: "Selbstmeldung", selbstmeldung: true,
      person_kandidaten: [{ personalnummer: "P-10318", grund: "Selbstmeldung von Nina Ammann, Funktion und Abteilung stimmen überein.", sicherheit: "hoch" }],
      rueckfragen: [{"id": "q1", "frage": "Liegt die Risikobeurteilung der Datenschutzberatung schon vor?", "grund": "Bei hohem Risiko wäre das Risk Level neu zu prüfen (W-02 Ziff. 7).", "feld": "schaden", "pflicht": true, "optionen": ["Noch nicht", "Ja, kein hohes Risiko", "Ja, hohes Risiko"], "erwartet": "Noch nicht", "uebernahme": {"Noch nicht": "Nicht bekannt; Risikobeurteilung der Datenschutzberatung ausstehend"}}, {"id": "q2", "frage": "An welche Organisation ging die E-Mail?", "grund": "Hilft der Datenschutzberatung bei der Risikobeurteilung.", "feld": "sachverhalt", "pflicht": false, "optionen": null}],
      rueckfrage_entwurf: "Guten Tag Frau Ammann\n\nVielen Dank für Ihre rasche Meldung. Bitte teilen Sie uns noch mit, an welche Organisation die E-Mail ging, sofern Ihnen das bekannt ist. Den Kontakt mit dem Empfänger koordiniert der Incident Desk mit der Datenschutzberatung; bitte nehmen Sie weiterhin keinen eigenen Kontakt auf.\n\nFreundliche Grüsse\nCompliance",
      identifizierende_details: []
    },
    assess: {
      verstoss: "ja", verstoss_begruendung: "Kundendaten wurden an einen unberechtigten externen Empfänger offengelegt; die Datei war zudem nicht verschlüsselt.",
      regeln: [
        { code: "DS-01", begruendung: "Versand von Kundendaten an einen falschen externen Empfänger." },
        { code: "IS-06", begruendung: "Die Liste mit Kreditlimiten (mindestens «Vertraulich») wurde unverschlüsselt extern versandt." }
      ],
      risk: { level: "Medium", begruendung: "Kundendaten einzelner Personen betroffen (drei Firmenkunden). Kein Hinweis auf Aussenwirkung in grösserem Umfang." },
      behavior: { level: "Mitigating", umstaende: [
        { text: "Selbstmeldung am selben Tag", richtung: "mildernd" },
        { text: "Incident Desk sofort informiert, Empfänger nicht eigenmächtig kontaktiert", richtung: "mildernd" },
        { text: "Unverschlüsselter Versand vertraulicher Daten", richtung: "belastend" }
      ], begruendung: "Die entlastenden Umstände überwiegen: sofortige Selbstmeldung und korrektes Verhalten danach." },
      sonderregeln: [],
      konfidenz: { stufe: "hoch", begruendung: "Mehrere konkrete, übereinstimmende Angaben aus der Selbstmeldung." },
      offene_fragen: ["Ergebnis der Risikobeurteilung der Datenschutzberatung; bei hohem Risiko wäre das Risk Level neu zu prüfen."]
    }
  },
  {
    id: "C", ref: "INC-2026-01121", label: "Formel-1-Einladung eines Lieferanten", sub: "Hinweis Mitarbeitende · Sonderregel", received: "2026-11-04T10:05",
    text: "Eine Mitarbeiterin aus dem Einkauf hat mir erzählt, dass Stefan Meier vom 31.10. bis 2.11. am Formel-1-Rennen in Austin war, eingeladen von der Datacore AG. Flug und Hotel hat Datacore bezahlt. Datacore ist in der laufenden Ausschreibung für die neue Storage-Infrastruktur, und Stefan leitet das Bewertungsteam. Er hat es ihr am Montag in der Kaffeeküche erzählt, als nur die beiden dort waren. Sie möchte anonym bleiben.",
    capture: {
      kurztitel: "Einladung eines Anbieters zu Formel-1-Rennen während laufender Ausschreibung",
      sachverhalt: "Die betroffene Person nahm vom 31.10. bis 02.11.2026 an einem Formel-1-Rennen in Austin (USA) teil. Flug und Hotel wurden nach ihren eigenen Angaben von der Datacore AG bezahlt. Die Datacore AG ist Anbieterin in der laufenden Ausschreibung zur Erneuerung der Storage-Infrastruktur; die betroffene Person leitet das Bewertungsteam. Eine Bewilligung ist der meldenden Person nicht bekannt.",
      kundschaft: "Keine", daten: "Keine", systeme: "Keine; betroffen ist das Ausschreibungsverfahren Storage-Infrastruktur",
      sofortmassnahmen: "Keine bekannt",
      schaden_chf: null, schaden: "Nicht bezifferbar; Wert der Einladung unbekannt", beweismittel: "Keine genannt; Spesen- und Bewilligungsregister prüfen",
      vorfall_datum: "2026-10-31", kenntnis_datum: "2026-11-03", meldeweg: "Mitarbeitende (Hinweis)", selbstmeldung: false,
      person_kandidaten: [{ personalnummer: "P-10577", grund: "Name «Stefan Meier» und Funktion im IT-Einkauf stimmen überein.", sicherheit: "hoch" }],
      rueckfragen: [{"id": "q1", "frage": "Liegt eine Bewilligung für die Reise vor (W-05 Ziff. 5.3)?", "grund": "Reisen und Übernachtungen sind immer bewilligungspflichtig; eine Bewilligung würde die Bewertung stark ändern.", "feld": "sachverhalt", "pflicht": true, "optionen": ["Nicht bekannt", "Ja", "Nein"], "erwartet": "Nicht bekannt"}, {"id": "q2", "frage": "Wie hoch ist der geschätzte Wert der Einladung?", "grund": "Relevant für Wertgrenzen und Risk Level.", "feld": "schaden", "pflicht": false, "optionen": null}],
      rueckfrage_entwurf: "Guten Tag\n\nVielen Dank für Ihren Hinweis. Ihre Identität wird vertraulich behandelt. Falls Ihnen bekannt: Wurde die Einladung im Team oder gegenüber der Leitung Einkauf offengelegt? Weitere Abklärungen übernimmt Compliance; bitte stellen Sie selbst keine Nachforschungen an.\n\nFreundliche Grüsse\nCompliance",
      identifizierende_details: [{ text: "Er hat es ihr am Montag in der Kaffeeküche erzählt, als nur die beiden dort waren.", neutral: "Die betroffene Person hat im Arbeitsumfeld selbst von der Reise erzählt." }]
    },
    assess: {
      verstoss: "ja", verstoss_begruendung: "Nach den Angaben wurde ein erheblicher Vorteil eines Anbieters während einer laufenden Ausschreibung angenommen. Die Angaben stammen aus zweiter Hand und sind zu verifizieren.",
      regeln: [
        { code: "GE-03", begruendung: "Annahme einer Einladung der Datacore AG während der laufenden Ausschreibung, in der die Person das Bewertungsteam leitet." },
        { code: "GE-01", begruendung: "Reisen und Übernachtungen sind nach W-05 Ziff. 5.2 immer bewilligungspflichtig; eine Bewilligung ist nicht bekannt." }
      ],
      risk: { level: "High", begruendung: "Verdacht auf Bestechung im Zusammenhang mit einem konkreten Vergabeentscheid; erhebliches Reputationsrisiko." },
      behavior: { level: "Aggravating", umstaende: [
        { text: "Leitung des Bewertungsteams: Vertrauensstellung im Vergabeverfahren", richtung: "belastend" },
        { text: "Keine Bewilligung bekannt", richtung: "belastend" },
        { text: "Hat selbst offen von der Reise erzählt (kein Hinweis auf Vertuschung)", richtung: "mildernd" }
      ], begruendung: "Belastende Umstände überwiegen. Für Severely Aggravating fehlen Hinweise auf Absicht oder Vertuschung; Vorsatz wird nicht aus dem Sachverhalt abgeleitet (Leitplanken Ziff. 4)." },
      sonderregeln: [{ typ: "straftat", begruendung: "Verdacht auf Bestechung (sich bestechen lassen im privaten Sektor, vgl. W-05 Ziff. 3 und Anhang A, vergleichbarer Fall). Die strafrechtliche Beurteilung bleibt Rechtsdienst und CRO vorbehalten." }],
      konfidenz: { stufe: "mittel", begruendung: "Konkrete Angaben passen zu W-05 Ziff. 5.1 Nr. 4, stammen aber aus zweiter Hand; eine Bewilligung ist nicht ausgeschlossen." },
      offene_fragen: ["Liegt eine Bewilligung durch GL-Mitglied und Compliance vor?", "Wert der Einladung", "Wer entscheidet über den Zuschlag?"]
    }
  }
  ,{"id": "D", "ref": "INC-2026-01203", "label": "Weinflasche von Kunde", "sub": "Hinweis · kein Verstoss", "received": "2026-11-09T14:30", "text": "Eine Kollegin aus dem Team Bern hat gemeldet, dass Simon Kuhn letzte Woche von einem langjährigen Kunden eine Flasche Wein bekommen hat, geschätzt etwa CHF 60. Sie war unsicher, ob er das hätte melden müssen. Laut Simon läuft mit dem Kunden gerade kein Kreditentscheid oder Ähnliches.", "capture": {"kurztitel": "Geschenk eines Kunden (Flasche Wein, ca. CHF 60)", "sachverhalt": "Die betroffene Person erhielt in der Woche vom 02.11.2026 von einem langjährigen Kunden eine Flasche Wein im geschätzten Wert von rund CHF 60. Nach ihren Angaben ist mit dem Kunden kein Geschäftsentscheid hängig. Die meldende Person war unsicher, ob das Geschenk meldepflichtig ist.", "kundschaft": "Ein Kunde (Schenkender); keine Kundendaten betroffen", "daten": "Keine", "systeme": "Keine", "sofortmassnahmen": "Keine", "schaden_chf": 0, "schaden": "Kein Schaden", "beweismittel": "Keine genannt", "vorfall_datum": "2026-11-04", "kenntnis_datum": "2026-11-06", "meldeweg": "Mitarbeitende (Hinweis)", "selbstmeldung": false, "person_kandidaten": [{"personalnummer": "P-10655", "grund": "Name «Simon Kuhn» und Team Bern stimmen überein.", "sicherheit": "hoch"}], "rueckfragen": [{"id": "q1", "frage": "Hat derselbe Kunde Simon Kuhn dieses Jahr schon andere Geschenke gemacht?", "grund": "Ohne Bewilligung zulässig sind Geschenke bis CHF 200, solange die Summe pro Kunde und Jahr CHF 500 nicht übersteigt (W-05 Ziff. 5.2).", "feld": "sachverhalt", "pflicht": true, "optionen": ["Nein, nur dieses", "Ja, weitere", "Unbekannt"], "erwartet": "Nein, nur dieses", "uebernahme": {"Nein, nur dieses": "Nach Angaben der betroffenen Person das einzige Geschenk dieses Kunden im laufenden Jahr"}}], "identifizierende_details": []}, "assess": {"verstoss": "nein", "verstoss_begruendung": "Ein Geschenk im Wert von rund CHF 60 ist nach W-05 Ziff. 5.2 ohne Bewilligung zulässig (Einzelgeschenk bis CHF 200, Summe pro Geschäftspartner und Jahr höchstens CHF 500). Ein Geschäftsentscheid mit dem Kunden ist nicht hängig (W-05 Ziff. 5.1 Nr. 4). W-05 Anhang A nennt eine Flasche Wein für rund CHF 60 ausdrücklich als zulässig.", "regeln": [{"code": "GE-01", "begruendung": "Geprüft: Wertgrenzen für Geschenke"}], "risk": null, "behavior": null, "sonderregeln": [], "konfidenz": {"stufe": "hoch", "begruendung": "Wert und Umstände sind konkret genannt und passen eindeutig zu W-05 Ziff. 5.2."}, "offene_fragen": []}}
  ,{"id": "E", "ref": "", "label": "Kundendaten in ChatGPT", "sub": "Meldung aus dem Weisungs-Assistenten", "received": "", "text": "Ein Kollege aus der Kreditabteilung, Jonas Weber, hat mir heute erzählt, dass er die Bilanz und die Kreditlimite einer Firmenkundin in ChatGPT kopiert hat, damit es ihm die Zusammenfassung für den Kreditantrag schreibt. Ist das erlaubt? Was soll ich tun?", "capture": {"kurztitel": "Kundendaten einer Firmenkundin in öffentlichem KI-Chatbot verarbeitet", "sachverhalt": "Nach einem Hinweis aus dem Weisungs-Assistenten kopierte die betroffene Person Bilanzzahlen und die Kreditlimite einer Firmenkundin in den öffentlichen KI-Dienst ChatGPT, um eine Zusammenfassung für einen Kreditantrag erstellen zu lassen. Die betroffene Person hat dies im Arbeitsumfeld selbst erzählt.", "kundschaft": "Eine Firmenkundin", "daten": "Bilanzzahlen und Kreditlimite (Kundendaten, mindestens «Vertraulich»)", "systeme": "ChatGPT (nicht freigegebener KI-Dienst)", "sofortmassnahmen": "Keine bekannt", "schaden_chf": null, "schaden": "Nicht bekannt; möglicher Datenabfluss an einen externen Anbieter", "beweismittel": "Keine genannt", "vorfall_datum": "heute", "kenntnis_datum": "heute", "meldeweg": "Mitarbeitende (Hinweis)", "selbstmeldung": false, "person_kandidaten": [{"personalnummer": "P-10512", "grund": "Name «Jonas Weber» und Kreditabteilung stimmen überein.", "sicherheit": "hoch"}], "rueckfragen": [{"id": "q1", "frage": "Wurde der Name der Firmenkundin mit eingegeben?", "grund": "Entscheidet, ob identifizierbare Kundendaten (CID) offengelegt wurden; bei möglichem Datenabfluss ist zusätzlich die IT-Security-Hotline 5555 beizuziehen (W-02 Ziff. 6).", "feld": "sachverhalt", "pflicht": true, "optionen": ["Ja, mit Firmennamen", "Nein, anonymisiert", "Unbekannt"], "erwartet": "Ja, mit Firmennamen", "uebernahme": {"Ja, mit Firmennamen": "Der Firmenname der Kundin wurde mit eingegeben (identifizierbare Kundendaten)"}}, {"id": "q2", "frage": "Wurde die betroffene Person zur Regel für KI-Tools geschult?", "grund": "Fehlende Schulung wäre ein mildernder Umstand.", "feld": "sachverhalt", "pflicht": false, "optionen": ["Ja, geschult", "Nein, nicht geschult", "Unbekannt"]}], "identifizierende_details": []}, "assess": {"verstoss": "ja", "verstoss_begruendung": "Kundendaten wurden in einen nicht freigegebenen öffentlichen KI-Dienst eingegeben.", "regeln": [{"code": "DS-03", "begruendung": "Kundendaten (CID) in einem nicht freigegebenen öffentlichen KI-Dienst verarbeitet."}, {"code": "IS-03", "begruendung": "Geschäftsinformationen in einem nicht freigegebenen KI-Dienst gespeichert."}], "risk": {"level": "Medium", "begruendung": "Kundendaten einer einzelnen Firmenkundin wurden an einen externen Anbieter offengelegt; ein Datenabfluss ist nicht auszuschliessen."}, "behavior": {"level": "Expected", "umstaende": [{"text": "Wollte eine Arbeitsaufgabe schneller erledigen, kein Hinweis auf Eigennutz", "richtung": "neutral"}, {"text": "Hat offen davon erzählt, kein Hinweis auf Vertuschung", "richtung": "mildernd"}, {"text": "Vertrauliche Kundendaten bewusst in einen externen Dienst kopiert", "richtung": "belastend"}], "begruendung": "Weder entlastende noch belastende Umstände überwiegen; der Schulungsstand ist offen."}, "sonderregeln": [], "konfidenz": {"stufe": "mittel", "begruendung": "Angaben aus zweiter Hand; Umfang der eingegebenen Daten unbestätigt."}, "offene_fragen": ["Umfang der eingegebenen Daten", "Schulungsstand der betroffenen Person zu W-02 Ziff. 5 Nr. 5"]}}
];

// Policy Owner je Weisung (aus dem Kopf der Weisungen W-01 bis W-11; E-Mail-Adressen fiktiv)
const POLICY_OWNERS = {
  "W-01": { titel: "Rahmenweisung Vorfallmeldung und Eskalation", verantwortlich: "Chief Risk Officer (CRO)", team: "Incident Desk (Operational Risk Management)", mail: "incident-desk@musterbank.example" },
  "W-02": { titel: "Datenschutz", verantwortlich: "Datenschutzberaterin / Datenschutzberater (DSB)", team: "Datenschutzberatung", mail: "datenschutz@musterbank.example" },
  "W-03": { titel: "Informations- und Cybersicherheit", verantwortlich: "Chief Information Security Officer (CISO)", team: "Office of the CISO", mail: "ciso-office@musterbank.example" },
  "W-04": { titel: "Verhaltenskodex und Interessenkonflikte", verantwortlich: "Leiterin / Leiter Compliance", team: "Compliance", mail: "compliance@musterbank.example" },
  "W-05": { titel: "Geschenke und Einladungen", verantwortlich: "Leiterin / Leiter Compliance", team: "Compliance", mail: "compliance@musterbank.example" },
  "W-06": { titel: "Marktverhaltensregeln", verantwortlich: "Leiterin / Leiter Compliance", team: "Compliance, Fachgruppe Marktaufsicht", mail: "marktaufsicht@musterbank.example" },
  "W-07": { titel: "Meldung von Missständen (Whistleblowing)", verantwortlich: "Leiterin / Leiter Compliance", team: "Meldestelle für Missstände", mail: "meldestelle@musterbank.example" },
  "W-08": { titel: "Mitarbeiterverhalten", verantwortlich: "Leiterin / Leiter Human Resources (HR)", team: "HR", mail: "hr-employee-relations@musterbank.example" },
  "W-09": { titel: "Arbeitssicherheit", verantwortlich: "Leiterin / Leiter Human Resources (HR)", team: "Fachstelle Arbeitssicherheit und Gesundheitsschutz", mail: "arbeitssicherheit@musterbank.example" },
  "W-10": { titel: "Betrugs- und Geldwäscheprävention", verantwortlich: "Leiterin / Leiter Compliance", team: "GwG-Fachstelle und Fraud Management", mail: "fraud-gwg@musterbank.example" },
  "W-11": { titel: "Untersuchungs- und Sanktionsverfahren", verantwortlich: "Leitung HR und Leitung Compliance (gemeinsam)", team: "HR und Compliance", mail: "hr-compliance@musterbank.example" }
};
