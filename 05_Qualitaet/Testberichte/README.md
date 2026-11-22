# Testberichte

Hier liegen die Berichte der Testläufe (`Testbericht_JJJJ-MM-TT.md` und `.csv`), erstellt mit [`04_Prototyp/testlauf.html`](../../04_Prototyp/testlauf.html) bzw. dem Online-Testlauf.

## So wird getestet

1. Testlauf auf claude.ai öffnen, Modell «Standard (wie im Tool)» wählen, **Alle Fälle starten**. Beim ersten Aufruf die Nutzung der KI erlauben.
2. Nach dem Lauf Bericht (.md) und Tabelle (.csv) herunterladen und hier ablegen.
3. Mindestens drei Läufe machen, weil Sprachmodelle leicht unterschiedlich antworten. Im Bericht zählt vor allem **«Level zu tief»** (Fall unterschätzt) und **«Quelle gültig»** (kein erfundener Code).
4. Bei Abweichungen: Ursache notieren (Anweisung, Wissensbasis, Katalog oder Soll zu streng), Anweisung anpassen, erneut testen, Änderung im CHANGELOG festhalten.

## Abnahmekriterien (Vorschlag)

| Kriterium | Ziel |
|---|---|
| Level zu tief | 0 Fälle |
| Quelle gültig | 100 % |
| Namensschutz | 100 % |
| Incident Level im Soll-Bereich | ≥ 85 % |
| Verstoss ja/nein/unklar | ≥ 90 % |

## Übersicht der Läufe

| Datum | Modellstufe | Bestanden | Level im Soll | Zu tief | Zu hoch | Bemerkung |
|---|---|---|---|---|---|---|
| 13.11.2026 | default | 18 von 20 | 19/19 | 0 | 0 | [Bericht](Testbericht_2026-11-13.md) · [CSV](Testbericht_2026-11-13.csv); Lauf vor der Prototyp-Änderung vom 15.11.2026; Abweichungen bei Behavior (1) und Meldeweg (1) |

## Selbsttest der Testlauf-Seite (13.11.2026)

Bevor die Testlauf-Seite echte Ergebnisse liefert, wurde ihre Auswertung mit simulierten Antworten geprüft. Die Simulation gab für die meisten Fälle das Soll zurück und baute absichtlich Fehler ein. Die Seite hat alle erkannt:

| Eingebauter Fehler | Fall | Erkannt als |
|---|---|---|
| Kein Verstoss als Reminder eingestuft | T02 | Verstoss, Risk, Behavior, Incident Level falsch; «zu hoch» |
| Erfundener Code «BE-01» | T11 | Quelle gültig: nein |
| Name der meldenden Person in der Description | T19 | Namensschutz: nein |
| Vertuschung als «Expected» eingestuft | T20 | Behavior und Incident Level falsch; «zu tief» |
| Risk und Behavior fehlen, Sonderregel Vergeltung vorhanden | T12 | Level HR Referral über Sonderregel: bestanden |
| KI-Aufruf mit Fehler (rate_limited) | T15 | als Fehler ausgewiesen, nicht als bestanden gezählt |

Ergebnis: Auswertung, Kennzahlen und Export (.md, .csv) funktionieren. Der erste echte Lauf mit dem Sprachmodell folgte am 13.11.2026 (siehe Übersicht); weitere Läufe nach der Prototyp-Änderung vom 15.11.2026 stehen aus.
