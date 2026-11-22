# Testbericht Incident-Tool

Lauf vom 13.11.2026 15:51 · Modellstufe «default» · 20 von 20 Fällen ausgewertet

Jede Meldung wurde mit denselben Anweisungen wie im Incident-Tool (erster Durchgang der Fallerfassung, ohne Antwort auf Rückfragen) an das Sprachmodell geschickt. Incident Level, Pattern Aggregation und Sonderregeln rechnet das Tool deterministisch aus den Ist-Werten.

## Kennzahlen

| Kennzahl | Wert |
|---|---|
| Fälle bestanden | 18 von 20 |
| Level zu tief | 0 |
| Level zu hoch | 0 |
| Level offen (Bewertung fehlt) | 0 |
| Rückfragen gestellt | 8 |
| Fehler | 0 |
| Ø Antwortzeit | 12.0 s |

## Trefferquote je Prüfpunkt

| Prüfpunkt | Treffer | Quote |
|---|---|---|
| Person | 20/20 | 100% |
| Verstoss | 20/20 | 100% |
| Policy | 15/15 | 100% |
| Quelle gültig | 20/20 | 100% |
| Risk | 17/17 | 100% |
| Behavior | 16/17 | 94% |
| Sonderregel | 20/20 | 100% |
| Datum | 18/18 | 100% |
| Meldeweg | 11/12 | 92% |
| Incident Level | 19/19 | 100% |
| Namensschutz | 3/3 | 100% |

## Übersicht

| Nr. | Fall | Soll Level | Ist Level | Ergebnis | Abweichungen |
|---|---|---|---|---|---|
| T01 | Bildschirm offen, früherer Fall ausserhalb des Fensters | Reminder | Reminder | bestanden | – |
| T02 | Pralinen eines Kunden | No Breach | No Breach | bestanden | – |
| T03 | Uhr CHF 450 nicht gemeldet | Reminder / Employee Incident | Reminder | bestanden | – |
| T04 | Bargeld behalten, danach Gebührenerlass | HR Referral | HR Referral | bestanden | – |
| T05 | Neugierabfrage Konto der Nachbarin | Employee Incident | Employee Incident | bestanden | – |
| T06 | Bildschirm nicht gesperrt, zweiter Reminder | Employee Incident | Employee Incident | bestanden | – |
| T07 | Selbstmeldung Fehlversand | Employee Incident | Employee Incident | bestanden | – |
| T08 | Selbstfreigabe mit Login der Kollegin | Employee Incident / HR Referral | Employee Incident | bestanden | – |
| T09 | Rückruf missachtet, Betrug gestoppt | Employee Incident | Employee Incident | nicht bestanden | Meldeweg |
| T10 | Provision nach Kreditbewilligung | HR Referral | HR Referral | nicht bestanden | Behavior |
| T11 | Anzügliche Bemerkungen | – | Reminder | bestanden | – |
| T12 | Benachteiligung nach Meldung | HR Referral | HR Referral | bestanden | – |
| T13 | Nicht offengelegtes VR-Mandat | Employee Incident / HR Referral | Employee Incident | bestanden | – |
| T14 | Mitarbeiterdaten an private Gmail | Employee Incident / Reminder / HR Referral | Employee Incident | bestanden | – |
| T15 | Nicht freigegebenes Remote-Tool | Employee Incident / HR Referral | Employee Incident | bestanden | – |
| T16 | ETF nach zwei Wochen verkauft | No Breach | No Breach | bestanden | – |
| T17 | Fussballspiel mit Gastgeber | No Breach | No Breach | bestanden | – |
| T18 | Vager anonymer Hinweis | offen | offen | bestanden | – |
| T19 | Passwort weitergegeben, meldende Person nennt sich | Reminder / Employee Incident | Employee Incident | bestanden | – |
| T20 | WhatsApp-Aufträge, Chats gelöscht | HR Referral | HR Referral | bestanden | – |

## Abweichungen im Detail

### T09 Rückruf missachtet, Betrug gestoppt

Fokus: Pattern KU-02

> Fraud Management meldet: Marco Kessler hat am 03.11.2026 auf E-Mail-Anweisung eine geänderte Zahlungsverbindung eines Firmenkunden erfasst, ohne den Kunden über die hinterlegte Nummer zurückzurufen. Die Zahlung über CHF 40'000 wurde vom Fraud Management vor der Ausführung gestoppt, es entstand kein Schaden. Er kooperiert.

| Prüfpunkt | Soll | Ist |
|---|---|---|
| Meldeweg | Kontrolle | – |

Begründung Soll: W-10 Ziff. 5 Nr. 3 (Rückrufprinzip). Wird Low gewählt: Reminder → Pattern: 2. Reminder KU-02 (INC-2026-00301, 02.04.2026) → Employee Incident. Bei Medium × Expected direkt Employee Incident.

Level-Berechnung: Matrix: Medium × Expected

### T10 Provision nach Kreditbewilligung

Fokus: Bestechung

> Anonymer Hinweis über SpeakUp: Jonas Weber soll am 21.10.2026, zwei Tage nach der Bewilligung eines Kredits, vom Geschäftsführer der Kreditnehmerin CHF 2'000 als «Provision» auf sein Privatkonto erhalten haben.

| Prüfpunkt | Soll | Ist |
|---|---|---|
| Behavior | Aggravating / Severely Aggravating | Expected |

Begründung Soll: W-05 Ziff. 5.1 Nr. 3 und 4, Ziff. 7 (S2). Verdacht auf Bestechung und persönliche Bereicherung → Sonderregel «straftat» → HR Referral.

Level-Berechnung: Sonderregel geht der Matrix vor
