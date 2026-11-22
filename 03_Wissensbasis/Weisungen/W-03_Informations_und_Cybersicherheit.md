---
id: W-03
titel: Informations- und Cybersicherheit
version: "1.3"
stand: 2026-11-06
fiktiv: true
---

# W-03 – Informations- und Cybersicherheit

| Angabe | Inhalt |
|---|---|
| Verantwortlich | Chief Information Security Officer (CISO) |
| Fachstelle | Security Operations Center (SOC) / IT-Security-Hotline 5555 |
| Version | 1.3 vom 6. November 2026 |
| In Kraft ab | 1. Januar 2027 |

## 1 Zweck

Diese Weisung legt fest, wie Mitarbeitende Informationen und IT-Mittel der Musterbank AG schützen und wie Sicherheits- und Cybervorfälle gemeldet und bearbeitet werden. Sie dient der Vertraulichkeit, Integrität und Verfügbarkeit von Informationen sowie der operationellen Resilienz der Bank. Sie setzt zudem die Meldepflichten gegenüber der FINMA und dem Bundesamt für Cybersicherheit (BACS) um.

## 2 Geltungsbereich

Die Weisung gilt für alle Personen gemäss Ziff. 2 W-01 sowie für alle Informationen der Bank, unabhängig von ihrer Form, und für alle IT-Mittel, die für die Bank genutzt werden: Arbeitsplatzrechner, Laptops, Smartphones, Tablets, Netzwerke, Cloud-Dienste und von der Bank zugelassene private Geräte («Bring your own device»).

## 3 Rechtliche und regulatorische Grundlagen

- FINMA-Rundschreiben 2023/1 «Operationelle Risiken und Resilienz – Banken», insbesondere zu IKT-Risiken, Cyberrisiken, kritischen Daten und operationeller Resilienz (in Kraft seit 1. Januar 2024; Übergangsfrist für die Anforderungen an die operationelle Resilienz galt bis 1. Januar 2026 und ist abgeschlossen)
- FINMA-Aufsichtsmitteilung 05/2020 «Meldepflicht von Cyber-Attacken gemäss Art. 29 Abs. 2 FINMAG», präzisiert durch Aufsichtsmitteilung 03/2024
- Informationssicherheitsgesetz (ISG, SR 128), Art. 74a–74h: Meldepflicht für Cyberangriffe auf kritische Infrastrukturen, die auch für Banken gilt (in Kraft seit 1. April 2025)
- DSG Art. 8 (Datensicherheit) und Art. 24 (Meldung von Verletzungen der Datensicherheit), siehe W-02
- Art. 47 BankG (Bankkundengeheimnis)

## 4 Begriffe

| Begriff | Bedeutung |
|---|---|
| Informationssicherheitsvorfall | Ereignis, das die Vertraulichkeit, Integrität oder Verfügbarkeit von Informationen oder IT-Mitteln beeinträchtigt oder beeinträchtigen könnte. |
| Cyberangriff | Vorsätzlicher Angriff über digitale Kanäle, z.B. Phishing, Malware, Ransomware, Denial-of-Service, unberechtigtes Eindringen in Systeme. |
| Phishing | Täuschende Nachricht (E-Mail, SMS, Telefon, QR-Code, Messenger), die zur Preisgabe von Zugangsdaten, zum Öffnen schädlicher Inhalte oder zu Zahlungen verleiten soll. |
| Klassifikationsstufen | «Öffentlich», «Intern», «Vertraulich», «Streng vertraulich». Kundendaten gelten mindestens als «Vertraulich». |
| SOC | Security Operations Center: rund um die Uhr erreichbare Einheit des CISO zur Überwachung und Abwehr von Angriffen. |

## 5 Verhaltenspflichten

### 5.1 Zugang und Passwörter

1. Zugangsdaten, Passwörter, PIN und Einmalcodes sind persönlich und dürfen nie weitergegeben werden, auch nicht an Vorgesetzte oder an Personen, die sich als IT-Support ausgeben. Die IT der Musterbank AG fragt nie nach Passwörtern.
2. Passwörter umfassen mindestens 14 Zeichen und werden für keine privaten Dienste verwendet. Für den Fernzugriff ist die Mehrfaktor-Authentisierung zwingend.
3. Der Bildschirm wird beim Verlassen des Arbeitsplatzes gesperrt (Windows-Taste + L).

### 5.2 Umgang mit Informationen

1. Informationen werden gemäss ihrer Klassifikation behandelt. «Vertraulich» und «Streng vertraulich» dürfen nur verschlüsselt extern übermittelt werden.
2. Clean-Desk-Regel: Vertrauliche Unterlagen werden nach Arbeitsende eingeschlossen; Ausdrucke werden sofort am Drucker abgeholt.
3. Geschäftliche Informationen dürfen nicht an private E-Mail-Konten weitergeleitet, auf private Speichermedien kopiert oder in nicht freigegebenen Cloud- oder KI-Diensten gespeichert werden.
4. Wechseldatenträger (USB-Sticks, externe Festplatten) sind technisch gesperrt. Ausnahmen bewilligt der CISO.

### 5.3 Geräte und Software

1. Es darf nur Software verwendet werden, die über den Software-Katalog der Bank bezogen wurde.
2. Sicherheitsupdates dürfen nicht verzögert oder unterdrückt werden.
3. Mobile Geräte der Bank werden auf Reisen nie unbeaufsichtigt gelassen. Bei Reisen in Länder, die auf der Risikoliste des CISO stehen, werden Reisegeräte verwendet.
4. Arbeiten in öffentlichen Räumen erfolgt nur mit Blickschutzfilter und über die VPN-Verbindung der Bank.

### 5.4 Phishing und Social Engineering

1. Verdächtige E-Mails werden über die Schaltfläche «Phishing melden» in Outlook gemeldet und nicht weitergeleitet, geöffnet oder beantwortet.
2. Telefonische Anfragen nach internen Informationen oder Zahlungsfreigaben werden über eine bekannte, unabhängig ermittelte Nummer zurückgerufen (Rückrufprinzip).
3. Zahlungsaufforderungen, die angeblich von der Geschäftsleitung stammen und Eile oder Geheimhaltung verlangen («CEO-Fraud»), werden nie ohne Rückfrage ausgeführt (siehe W-10).

### 5.5 Generative KI und nicht freigegebene Cloud-Dienste

Geschäftliche Informationen dürfen nicht in nicht freigegebene Cloud- oder KI-Dienste kopiert oder dort verarbeitet werden (vgl. auch W-02). Bei Verdacht auf Datenabfluss über solche Dienste: sofort IT-Security-Hotline 5555, danach IncidentNet; bei Personendaten zusätzlich die Datenschutzberatung informieren lassen.

## 6 Meldung von Vorfällen

### 6.1 Was ist zu melden?

- Klick auf einen Link oder Öffnen eines Anhangs in einer verdächtigen Nachricht
- Eingabe von Zugangsdaten auf einer verdächtigen Website
- Ungewöhnliches Systemverhalten (Pop-ups, verschlüsselte Dateien, Lösegeldforderung, unerklärliche Verlangsamung)
- Verlust oder Diebstahl eines Geräts, einer Badge oder eines Tokens
- Verdacht, dass ein Konto oder Gerät durch Dritte genutzt wird
- Feststellung, dass Informationen ohne Berechtigung zugänglich sind (z.B. falsche Ordnerfreigabe)
- Unbekannte Personen in gesicherten Zonen, fremde Geräte an Netzwerkanschlüssen
- Meldungen von Dienstleistern über Sicherheitsvorfälle

### 6.2 Kanal, Fristen und Sofortmassnahmen

| Ereignis | Sofortmassnahme durch Mitarbeitende | Kanal | Frist |
|---|---|---|---|
| Verdächtige E-Mail ohne Interaktion | Nicht öffnen; Schaltfläche «Phishing melden» | Outlook-Schaltfläche | sofort |
| Link geklickt, Anhang geöffnet oder Zugangsdaten eingegeben | Gerät nicht ausschalten, Netzwerkkabel ziehen bzw. WLAN deaktivieren | IT-Security-Hotline 5555, danach IncidentNet | sofort, spätestens innert 30 Minuten |
| Lösegeldforderung, verschlüsselte Dateien | Gerät nicht ausschalten, vom Netz trennen, nichts bezahlen, nichts löschen | IT-Security-Hotline 5555 | sofort |
| Verlust oder Diebstahl eines Geräts | Fernsperre über Hotline auslösen lassen; bei Diebstahl Anzeige bei der Polizei | IT-Security-Hotline 5555, danach IncidentNet | sofort, spätestens innert 1 Stunde |
| Verlust von Badge oder Token | Sperrung veranlassen | Empfang/Sicherheitsdienst und Hotline 5555 | sofort |
| Übrige Sicherheitsvorfälle | – | IncidentNet, Kategorie «Informationssicherheit» | spätestens innert 4 Stunden |

Die sofortige Meldung eines eigenen Fehlers (z.B. eines Phishing-Klicks) wird zugunsten der meldenden Person berücksichtigt (W-01 Ziff. 5.6). Ein einzelner, sofort gemeldeter Phishing-Klick führt in der Regel zu keinen arbeitsrechtlichen Massnahmen. Verzögerte oder unterlassene Meldungen gelten dagegen als Pflichtverletzung.

## 7 Klassifizierung und Eskalation

Das SOC nimmt die Meldung entgegen, leitet die technische Eindämmung ein und klassifiziert den Vorfall in Abstimmung mit dem Incident Desk nach W-01:

| Schweregrad | Beispiele | Eskalation |
|---|---|---|
| S1 | Ransomware auf Servern; erfolgreicher Angriff auf Zahlungsverkehr, E-Banking oder kritische Daten; Ausfall kritischer Funktionen; Datenabfluss in grösserem Umfang | CISO, CRO und CEO sofort; der CEO entscheidet über den Krisenstab; Prüfung Meldung BACS und FINMA; bei Beteiligung eines GL-Mitglieds an das Präsidium des Prüfungs- und Risikoausschusses statt an den CEO (W-01 Ziff. 7) |
| S2 | Kompromittiertes Benutzerkonto; Malware auf einem Endgerät; Verlust eines Geräts mit unverschlüsselten Daten | CISO und zuständiges GL-Mitglied innert 4 Stunden; Prüfung externer Meldepflichten |
| S3 | Phishing-Klick mit oder ohne Eingabe von Zugangsdaten, sobald das SOC eine Kompromittierung von Gerät und Konto ausgeschlossen hat (bis dahin S2); abgewehrter gezielter Angriff | SOC im ordentlichen Prozess |
| S4 | Gemeldete Phishing-Mail ohne Interaktion; Verlust eines verschlüsselten, gesperrten Geräts | Dokumentation |

Ein Vorfall mit unklarem Ausmass wird vorsorglich mindestens als S2 behandelt, bis eine Kompromittierung ausgeschlossen ist.

## 8 Externe Meldungen

Über Meldungen an FINMA und BACS entscheidet der CRO zusammen mit dem CEO auf Antrag des CISO (W-01 Ziff. 8); die Einreichung erfolgt durch den CISO oder seine Stellvertretung. Über die Meldung an den EDÖB entscheidet die DSB (W-02). Mitarbeitende nehmen von sich aus keinen Kontakt mit Behörden, Medien oder Angreifern auf.

| Empfänger | Grundlage | Frist und Ablauf |
|---|---|---|
| FINMA | Art. 29 Abs. 2 FINMAG; Aufsichtsmitteilungen 05/2020 und 03/2024 | Für meldepflichtige Cyber-Attacken nach den Kriterien der Aufsichtsmitteilungen: Erstinformation mit erster Einschätzung der Kritikalität innert 24 Stunden ab Entdeckung; vollständige Meldung über die Erhebungs- und Gesuchsplattform (EHP) innert 72 Stunden; bei Kritikalität «mittel» oder höher abschliessender Bericht mit Ursachenanalyse |
| BACS | Art. 74a–74h ISG | Meldung meldepflichtiger Cyberangriffe innert 24 Stunden nach Entdeckung über das Meldeformular des BACS; fehlende Angaben werden nachgereicht |
| EDÖB | Art. 24 DSG | So rasch als möglich, wenn Personendaten mit voraussichtlich hohem Risiko betroffen sind (Entscheid durch DSB, W-02) |
| Polizei / Staatsanwaltschaft | – | Strafanzeige nach Entscheid von Rechtsdienst und CRO (W-01 Ziff. 8) |

Die Bank untersteht damit einer doppelten Meldepflicht gegenüber FINMA und BACS. Der CISO klärt vor jeder Meldung anhand der aktuellen Vorgaben von FINMA und BACS, ob die Erstinformation an die FINMA über das Meldeformular des BACS erfolgen kann. Dienstleister der Bank sind vertraglich verpflichtet, die Bank über Sicherheitsvorfälle in ausgelagerten Funktionen sofort zu informieren.

## 9 Zuständigkeiten

| Rolle | Aufgaben |
|---|---|
| Mitarbeitende | Verhaltenspflichten einhalten, Vorfälle sofort melden, Sofortmassnahmen treffen, jährliche Sicherheitsschulung und Phishing-Simulationen absolvieren |
| Vorgesetzte | Einhaltung im Team sicherstellen; Berechtigungen bei Funktionswechsel und Austritt anpassen lassen |
| CISO | Verantwortung für diese Weisung; Sicherheitsstrategie; Antrag und Einreichung externer Cyber-Meldungen (Entscheid durch CRO mit CEO, W-01 Ziff. 8); Lagebild an GL |
| SOC | Überwachung rund um die Uhr; Analyse, Eindämmung, Forensik |
| IT-Betrieb | Wiederherstellung von Systemen und Daten; Umsetzung technischer Massnahmen |
| DSB | Beurteilung datenschutzrechtlicher Auswirkungen (W-02) |
| Geschäftsleitung | Krisenführung bei S1; Entscheid über Geschäftsunterbrechung und Kommunikation |

## 10 Dokumentation und Aufbewahrung

Das SOC dokumentiert jeden Vorfall mit Zeitstempeln (Entdeckung, Meldung, Eindämmung, externe Meldungen), betroffenen Systemen und Massnahmen. Technische Beweismittel (Logfiles, Abbilder von Datenträgern) werden forensisch gesichert. Es gilt die Aufbewahrungsdauer gemäss W-01.

## 11 Verstösse und Konsequenzen

Verstösse werden im Verfahren nach W-11 untersucht; die möglichen Massnahmen richten sich nach W-11 Ziff. 8 und 9. Als schwere Verstösse gelten insbesondere die Weitergabe von Zugangsdaten, das bewusste Umgehen von Sicherheitsmassnahmen, das Installieren nicht bewilligter Software und das Verschweigen eines Vorfalls. Das wiederholte Nichtbestehen von Phishing-Simulationen führt zu obligatorischen Nachschulungen.

## 12 Schlussbestimmungen

Version 1.3 vom 6. November 2026 (Gesamtprüfung: Kriterium für die Rückstufung nach Phishing vereinheitlicht; Zuständigkeit für Cyber-Meldungen; zweite Gesamtprüfung: Einstufung Geräteverlust; Meldepflicht FINMA präzisiert; Eskalation bei Beteiligung der GL). Version 1.2 vom 6. November 2026 (Neuerstellung der Dokumentdatei: Nummerierung der Listen bereinigt; inhaltlich unverändert gegenüber Version 1.1 vom 5. November 2026). Diese Weisung wird mindestens jährlich durch den CISO überprüft, zusätzlich nach jedem S1-Vorfall. Technische Detailvorgaben sind in Standards des CISO geregelt.

## Anhang A – Fallbeispiele zur Einordnung

| Fall | Einordnung |
|---|---|
| Eine Mitarbeiterin erhält eine E-Mail «Ihr Postfach ist voll» und meldet sie über die Schaltfläche, ohne zu klicken. | S4; korrektes Verhalten; Dokumentation durch SOC. |
| Ein Mitarbeiter gibt auf einer gefälschten Microsoft-Login-Seite sein Passwort ein und bemerkt den Fehler eine Stunde später. | Sofort Hotline 5555; Passwort wird zurückgesetzt, Sitzungen werden beendet; S2, bis das SOC eine Kompromittierung von Gerät und Konto ausgeschlossen hat, danach S3; Prüfung Datenzugriffe. |
| Auf mehreren Servern erscheinen verschlüsselte Dateien und eine Lösegeldforderung. | S1; Krisenstab; Meldung an BACS innert 24 Stunden und an FINMA (Erstinformation innert 24 Stunden, Meldung über EHP innert 72 Stunden); Prüfung EDÖB-Meldung. |
| Ein Kundenberater verliert sein Smartphone der Bank im Restaurant. | Sofort Hotline 5555 (Fernlöschung); S2 bei unverschlüsselten Daten, S4 bei verschlüsseltem und gesperrtem Gerät (W-03 Ziff. 7). |
| Ein Anrufer gibt sich als IT-Support aus und verlangt den Einmalcode, um «ein Update zu installieren». | Social-Engineering-Versuch; keinen Code nennen; Meldung an Hotline 5555; S3. |
