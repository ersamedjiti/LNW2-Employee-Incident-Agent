---
id: E-01
titel: Berechtigungs- und Privilegienmanagement
dokumenttyp: Ergänzungsblatt
bezug: W-03, W-10, E-00
version: "2.3"
stand: 2026-11-06
status: Genehmigt durch die Geschäftsleitung (fiktiv)
fiktiv: true
---

# E-01 – Berechtigungs- und Privilegienmanagement

## 1 Zweck und Geltungsbereich

Das Blatt konkretisiert Vergabe, Nutzung, Kontrolle und Entzug von Systemberechtigungen, privilegierten Zugängen, Vollmachten und Zeichnungsrechten. Es gilt für Personen nach W-01 Ziff. 2 sowie für Systeme der Bank und freigegebene Drittsysteme. Bei Widersprüchen geht die Weisung vor.

Technische Alarme und fehlerhafte Berechtigungen sind kein Beweis für Vorsatz. Routinefehler werden im Berechtigungs- bzw. Sicherheitsprozess behandelt; konkrete Hinweise auf Missbrauch oder Verschleierung werden zusätzlich nach E-00 und W-11 behandelt.

## 2 Rahmenbedingungen und Begriffe

Massgebend sind W-01, W-03, W-07, W-10 und W-11 sowie Art. 328 und 328b OR und DSG Art. 6, 8, 19 und 31. DSG Art. 8 regelt die Datensicherheit. ArGV 3 Art. 26 Abs. 1 verbietet Überwachungs- und Kontrollsysteme, die das Verhalten der Arbeitnehmenden am Arbeitsplatz überwachen sollen; nach Abs. 2 sind Systeme, die aus anderen Gründen erforderlich sind, so zu gestalten, dass Gesundheit und Bewegungsfreiheit nicht beeinträchtigt werden.

| Begriff | Bedeutung |
|---|---|
| Berechtigungsverwaltung (IAM) | Organisationseinheit für Identitäten und Zugriffsrechte im Bereich des CISO bzw. IT-Betriebs. |
| Erforderliche Berechtigung | Minimaler Zugriff nur für die konkrete Aufgabe und Dauer (Need-to-know). |
| Neuprüfung bei Funktionswechsel | Bisherige und neue Rechte werden geprüft, statt ungeprüft summiert. |
| Periodische Rechtebestätigung | Linien- und Systemverantwortliche bestätigen risikorelevante Rechte nach dem Kontrollplan gemäss Ziff. 4. |
| Notfallkonto | Besonders kontrolliertes Konto für echte Betriebs- oder Sicherheitsstörungen, nicht für die allgemeine Arbeit. |

## 3 Grundregeln

1. Zugänge sind persönlich; gemeinsame interaktive Administratorkonten sind verboten. Servicekonten haben benannte Verantwortliche und werden nicht interaktiv genutzt.
2. Antrag, Genehmigung, technische Umsetzung und Kontrolle werden risikobasiert getrennt. Niemand gibt eine eigene risikorelevante Berechtigung oder einen eigenen Auftrag endgültig frei.
3. Unvereinbare Rollen, beispielsweise Erfassen und Freigeben derselben Zahlung, werden technisch verhindert oder durch dokumentierte, zeitlich begrenzte Ausgleichskontrollen überwacht.
4. Verwaltungszugänge werden vom Arbeitsplatzkonto getrennt, mit starker Authentisierung geschützt, protokolliert und nur zeitlich begrenzt erhöht.
5. Funktionswechsel führen zur Neuprüfung der Rechte; nach einem Austritt werden nicht mehr benötigte Rechte unverzüglich deaktiviert.
6. Änderungen von Vollmachten und Zeichnungsbefugnissen unterliegen dem Vier-Augen-Prinzip und einer unabhängigen Plausibilitätsprüfung.

## 4 Kontrollplan und Notfälle

Die fachlich verantwortlichen Stellen führen einen Kontrollplan mit Rechteklassen, Prüfintervallen, Systemverantwortlichen, Datenquellen, Schwellenwerten, Empfängerkreisen und Speicherfristen. Dieses Blatt nennt keine gesetzlichen Kontrollintervalle.

Notfallkonten werden nur bei einem echten Notfall genutzt und unverzüglich unabhängig nachkontrolliert. Eine möglicherweise unberechtigte Transaktion wird ausschliesslich durch die prozessverantwortliche Fachstelle bzw. das Fraud Management (intern 6666) gestoppt; bei Sicherheitsgefahr wird zusätzlich die IT-Security-Hotline 5555 beigezogen. Meldende führen keine eigenen Abschaltungen, Tests oder Ermittlungen durch.

## 5 Warnsignale und Abgrenzung

| Beobachtung | Mögliche andere Erklärung | Fachliche Prüfung |
|---|---|---|
| Selbstfreigabe oder umgangene Funktionstrennung | Rollenfehler, Notfall, fehlerhafter Workflow | Auftrag, Konfiguration und Absicht prüfen; bei Hinweisen auf Vorsatz Compliance, bei Betrugsverdacht Fraud Management (W-10) |
| Rechte nach Funktionswechsel oder Austritt | Verzögerter HR-Prozess, laufende Übergabe, verbleibende Arbeitstage bis zum Austritt | IAM; Prüfung nach E-00 nur bei missbräuchlicher Nutzung |
| Nutzung fremder Anmeldedaten | Fehlzuordnung, unerlaubte gemeinsame Nutzung | CISO und IAM; gegebenenfalls Verfahren nach W-11 |
| Viele privilegierte Aktionen | Stapelverarbeitung, Migration, Notfall | Autorisierte technische Klärung |
| Protokollierung deaktiviert | Wartung, Systemfehler | CISO sofort; Hinweis auf Verschleierung nach E-00 prüfen |

Private Beziehungen und Lebensstil sind keine Beweise. Private Beziehungen können nach W-04 offenlegungspflichtig sein; ein auffälliger Lebensstil ist nach W-10 lediglich ein mögliches Warnsignal. Eine vertiefte personenbezogene Abklärung setzt einen konkreten Anlass, Verhältnismässigkeit und einen Entscheid nach W-11 voraus.

## 6 Meldung, Schutz und Zuständigkeiten

| Situation | Kanal | Frist |
|---|---|---|
| Laufender unberechtigter Zugriff oder mögliche Kompromittierung | IT-Security-Hotline 5555, danach IncidentNet | sofort, spätestens innert 30 Minuten |
| Laufende unberechtigte Transaktion | Fraud Management 6666 | sofort |
| Verdacht auf Missbrauch von Berechtigungen | IncidentNet, Kategorie «Compliance» oder «Betrug» (reine Sicherheitsereignisse: «Informationssicherheit») | unverzüglich, spätestens innert 4 Stunden |
| Beteiligung der vorgesetzten Person oder Wunsch nach Vertraulichkeit | Meldestelle nach W-07 (4747, SpeakUp) | so rasch als möglich |
| Verdacht gegen die Leitung Compliance oder ein GL-Mitglied | Präsidium des Prüfungs- und Risikoausschusses (W-07) | so rasch als möglich |

Für die Meldung genügen Zeitpunkt, System, Auffälligkeit, eigene Wahrnehmung und der sichere Ablageort vorhandener Belege. Eigene Protokollabfragen oder Beweisbeschaffungen sind nicht zulässig. Sofortmassnahmen und vertiefte Abklärungen folgen W-11 unter Einbezug von CISO, HR, Datenschutzberatung und Rechtsdienst.

Über Meldungen an die FINMA entscheidet der CRO zusammen mit dem CEO; über Strafanzeigen der Rechtsdienst zusammen mit dem CRO nach Anhörung der Fachstelle (W-01 Ziff. 8, W-11 Ziff. 8.2). Spezialgesetzliche Meldepflichten bleiben vorbehalten.

## 7 Nachweise und Aufbewahrung

Anträge, Genehmigungen, periodische Bestätigungen, Ausnahmen, Alarmbeurteilungen und Entscheide werden nachvollziehbar und zugangsbeschränkt geführt. Belastende und entlastende Umstände werden gleichermassen dokumentiert.

Die Vorfallakte folgt W-01 Ziff. 10 (grundsätzlich 10 Jahre ab Abschluss), Untersuchungsakten folgen W-11 Ziff. 14. Rohdaten aus Sicherheitskontrollen folgen den im Kontrollplan festgelegten, zweckgebundenen Fristen und werden nicht pauschal zehn Jahre gespeichert. Eine vom Rechtsdienst angeordnete Sicherungspflicht geht der ordentlichen Löschung vor.

## 8 Beispiele

| Fall | Einordnung |
|---|---|
| Ein Administrator erteilt sich zusätzliche Rechte und fragt danach Kundenkonten ab. | Möglicher Missbrauch von Berechtigungen; E-01 und E-04; Prüfung durch die Fachstelle. |
| Eine Mitarbeiterin meldet selbst, dass ihre alte Rolle nach dem Wechsel noch aktiv ist; sie hat sie nicht genutzt. | Prozessvorfall; kein Hinweis auf Vorsatz. |
| Ein Notfallkonto wird bei einem Systemausfall gemäss Notfallprozess genutzt und nachkontrolliert. | Zulässiger Prozess; allein aus der Nutzung folgt kein Hinweis auf Vorsatz. |
| Die vorgesetzte Person verlangt das Administratorpasswort eines Mitarbeiters. | Keine Weitergabe; Meldung nach W-03 bzw. vertraulich nach W-07; keine Konfrontation. |
