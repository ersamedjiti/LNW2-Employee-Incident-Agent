---
id: INDEX
titel: Routing-Index Employee Incident Agent
version: "2.4-entwurf"
stand: 2026-11-06
gueltig_ab_basis: 2027-01-01
firma: Musterbank AG
sprache: de-CH
fiktiv: true
---

# Routing-Index – Musterbank AG, Version 2.3

## 1 Zweck und Rang

Der Routing-Index ordnet typische Hinweise auf mögliche Verstösse gegen die Weisungen W-01 bis W-11 der massgebenden Weisungsziffer, dem Meldekanal, der internen Frist, einem Ausgangswert für den Schweregrad und der zuständigen Fachstelle zu.

Der Index ist die technische Umsetzung des Routings. Inhaltlich massgebend ist die jeweilige Weisung; bei Widerspruch geht sie vor. Regeln zum Verhalten des Agenten stehen ausschliesslich in den Leitplanken des Agenten.

## 2 Zentrale Kontakte (fiktiv)

| Kontakt | Stelle | Einsatz |
|---|---|---|
| 144 / 117 / 118 | Notruf | Unmittelbare Gefahr für Leib und Leben, Brand, Überfall |
| 4411 | Sicherheitsdienst | Nach dem Notruf; Bedrohung, Überfall |
| 4444 | Incident Desk / IncidentNet | Standardkanal, spätestens innert 4 Stunden |
| 5555 | IT-Security-Hotline (SOC) | Laufender Cyberangriff, kompromittiertes Gerät oder Konto, Geräteverlust |
| 6666 | Fraud Management | Laufender Betrug zulasten der Bank oder der Kundschaft |
| 4700 | Compliance (inkl. Fachgruppe Marktaufsicht) | Insider-, Markt- und Bestechungsverdacht |
| 4800 | GwG-Fachstelle | Geldwäscherei- und Terrorismusfinanzierungsverdacht; alternativ Formular «GwG-Verdachtsmeldung intern» |
| 4747 / SpeakUp | Meldestelle für Missstände (Compliance) | Vertrauliche oder anonyme Meldungen nach W-07 |
| Präsidium des Prüfungs- und Risikoausschusses | Verwaltungsrat | Verdacht gegen die Leitung Compliance oder ein GL-Mitglied (W-07); **nicht** über 4747 |
| Anlaufstellen nach W-08 Ziff. 6.1 | HR-Vertrauenspersonen, externe Vertrauensstelle, HR-Business-Partner | Belästigung, Mobbing, Diskriminierung |
| HR-Portal | HR | Unfallmeldungen (W-09) |

## 3 Dringlichkeit

1. Unmittelbare Gefahr: Notruf, danach Sicherheitsdienst 4411. Erst danach klassifizieren.
2. Laufender Cyberangriff oder unberechtigter Zugriff: 5555. Laufender Betrug zulasten der Bank oder der Kundschaft: 6666.
3. Geldwäschereiverdacht: direkt an die GwG-Fachstelle (4800 oder Formular), nicht über das allgemeine IncidentNet-Formular; kein Tipping-off.
4. Alle übrigen Vorfälle: IncidentNet bzw. 4444, unverzüglich, spätestens innert 4 Stunden, sofern die Fachweisung keine andere Frist vorsieht (W-01 Ziff. 6.2).

## 4 Externe Meldungen und Aufbewahrung

Über Meldungen an die FINMA und das BACS entscheidet der CRO zusammen mit dem CEO (Einreichung von Cyber-Meldungen durch den CISO), über Strafanzeigen der Rechtsdienst zusammen mit dem CRO nach Anhörung der Fachstelle, über Meldungen an die MROS die GwG-Fachstelle und über Meldungen an den EDÖB die Datenschutzberatung (W-01 Ziff. 8, W-02, W-10).

Vorfallakte: W-01 Ziff. 10, grundsätzlich zehn Jahre ab Abschluss. Untersuchungsakte: W-11 Ziff. 14. Rohdaten aus Kontrollsystemen: dokumentierte Fristen der verantwortlichen Fachstelle, keine pauschale Frist von zehn Jahren.

## 5 Tabelle `incident_index.csv`

Die Datei enthält 56 Falltypen in 15 Spalten (Trennzeichen Semikolon, UTF-8).

| Spalte | Inhalt |
|---|---|
| `id` | Kennung des Falltyps (IDX-nnn) |
| `bereich` | Themenbereich |
| `falltyp` | Kurzbeschreibung des Falltyps |
| `weisung` | Massgebende Weisung(en) |
| `ziffer` | Massgebende Ziffer(n) |
| `ergaenzungsblatt` | Einschlägige Ergänzungsblätter E-00 bis E-04 |
| `dolo_schwerpunkt` | `ja` = typischerweise Prüfung auf dolose Handlung nach E-00; `prüfen` = je nach Sachverhalt; `nein` = in der Regel kein Vorsatzbezug. Der Wert ist **keine** Einordnung des Verhaltens; diese erfolgt im Einzelfall nach E-00 Ziff. 3. |
| `kanal` | Meldekanal nach der Weisung |
| `kontakt` | Telefonnummer bzw. Stelle |
| `interne_frist` | Interne Meldefrist nach der Weisung |
| `schweregrad_ausgangswert` | Ausgangswert aus den Beispielen der Weisungen. Massgebend bleibt das höchste zutreffende Kriterium nach W-01 Ziff. 7. «Einzelfall» bedeutet, dass die Weisungen kein Beispiel nennen. |
| `fachstelle` | Zuständige Fachstelle |
| `nur_pseudonymisiert` | `ja, wenn über W-07` = pseudonymisiert nur bei Meldung über die Meldestelle; `ja` = Erfassung in IncidentNet nur mit Referenznummer, Kategorie und Schweregrad (W-01 Ziff. 10); `nein` = Fallbeschreibung zulässig, verdächtigte Mitarbeitende werden als «betroffene Person» bezeichnet |
| `externe_meldung_entscheid` | Wer über externe Meldungen entscheidet |
| `hinweis` | Abgrenzungen und Besonderheiten |

Schlagworte zur Suche sind bewusst nicht enthalten: Begriffe in einer Fallbeschreibung sind kein Hinweis auf Vorsatz (E-02 Ziff. 4).

## 6 Bekannte Grenzen

- Die Liste ist nicht abschliessend. Fälle ohne passenden Falltyp werden direkt nach der Weisung beurteilt.
- Die Pseudonymisierung folgt W-01 Ziff. 10 und gilt nur für Fälle in den Fachsystemen (W-06 PA-Dealing, W-07, W-08, W-09 HR-Portal, W-10 GwG-Fachstelle). In allen übrigen Fällen, insbesondere bei internem Betrug, wird die verdächtigte mitarbeitende Person nicht mit Namen, sondern als «betroffene Person» (W-11 Ziff. 4) bezeichnet (Entscheid der Projektgruppe vom 6. November 2026).
