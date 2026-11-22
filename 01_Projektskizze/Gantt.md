# Gantt-Chart: von der Projektskizze bis zum Rollout

Stand: 13.11.2026 · Planung des Projektteams für die fiktive Musterbank AG. Phase 0 ist der Leistungsnachweis; die Phasen 1 bis 4 sind die vorgeschlagene Umsetzung in der Bank. Meilensteine und Gremien: [Project Charter](Project_Charter.md).

![Gantt-Chart](bilder/Gantt.png)

| Phase | Zeitraum | Ergebnis | Meilenstein |
|---|---|---|---|
| 0 Konzept und Prototyp | Okt – Dez 2026 | Canvas, Ist-/Soll-Prozess, Wissensbasis, Prototyp, Testlauf, Repository | M3 Präsentation 04.12.2026 |
| 1 Vorbereitung | Jan – Mär 2027 | Betriebsmodell entschieden, Datenschutz-Folgenabschätzung, Katalog der Risiko-Codes, Anbindung Verzeichnis und Historie, Personalkommission informiert | M4 Freigabe Pilot 31.03.2027 |
| 2 Pilot | Apr – Jun 2027 | 2 Assessors arbeiten 8 Wochen mit dem Assistenten; Baseline und Kennzahlen; Stichproben | M5 Go/No-Go 30.06.2027 |
| 3 Rollout | Jul – Sep 2027 | Schnittstellen CWB und HR-System, Review Interne Revision, Einführung für alle Assessors und Weisungs-Assistent im Intranet | M6 30.09.2027 |
| 4 Ausbaustufe | Okt – Dez 2027 | Texte für Employee Incident und HR-Dossier, Dubletten, Fristen-Erinnerungen, Appeal-Zusammenfassung | – |

Kritischer Pfad: Entscheid Betriebsmodell → Datenschutz-Folgenabschätzung → Freigabe Pilot. Ohne freigegebenen KI-Dienst dürfen nach W-03 Ziff. 5.5 und W-02 Ziff. 5 Nr. 5 keine echten Fall- oder Kundendaten an ein Sprachmodell gehen.

<details><summary>Quelle des Diagramms (Mermaid)</summary>

```mermaid
gantt
  title KI-Assistent Employee Incident Management · Musterbank AG (fiktiv)
  dateFormat YYYY-MM-DD
  axisFormat %b %y
  tickInterval 1month
  section 0 · Konzept und Prototyp (LNW)
  Use Case, Job Insight Canvas, AI Canvas   :done, a1, 2026-10-20, 2026-11-02
  Ist- und Soll-Prozess                     :done, a2, 2026-11-01, 2026-11-06
  Wissensbasis und Leitplanken              :done, a3, 2026-11-03, 2026-11-10
  Prototyp Incident-Tool                    :done, a4, 2026-11-07, 2026-11-13
  Testlauf und Nachschärfen                 :active, a5, 2026-11-16, 2026-11-27
  Repository und Präsentation               :a6, 2026-11-16, 2026-12-03
  M3 Präsentation LNW 2                     :milestone, m3, 2026-12-04, 0d
  section 1 · Vorbereitung
  Entscheid Betriebsmodell Sprachmodell     :b1, 2027-01-04, 2027-01-29
  Datenschutz-Folgenabschätzung             :b2, 2027-01-11, 2027-02-26
  Katalog Risiko-Codes festlegen            :b3, 2027-01-11, 2027-02-19
  Leitplanken angleichen, Wissensbasis      :b4, 2027-02-01, 2027-03-05
  Anbindung Verzeichnis und Fallhistorie    :b5, 2027-02-15, 2027-03-26
  Information Personalkommission            :b6, 2027-03-01, 2027-03-19
  M4 Freigabe Pilot                         :milestone, m4, 2027-03-31, 0d
  section 2 · Pilot
  Schulung Pilot-Assessors                  :c1, 2027-04-01, 2027-04-14
  Pilotbetrieb mit 2 Assessors              :c2, 2027-04-15, 2027-06-11
  Stichproben und Kennzahlen                :c3, 2027-04-15, 2027-06-18
  Pilotauswertung                           :c4, 2027-06-14, 2027-06-30
  M5 Go/No-Go Rollout                       :milestone, m5, 2027-06-30, 0d
  section 3 · Rollout
  Schnittstellen CWB und HR-System          :d1, 2027-07-01, 2027-08-27
  Review Interne Revision                   :d2, 2027-08-02, 2027-08-27
  Rollout Assessors und Weisungs-Assistent  :d3, 2027-08-30, 2027-09-30
  M6 Rollout abgeschlossen                  :milestone, m6, 2027-09-30, 0d
  section 4 · Ausbaustufe
  Texte EI und HR-Dossier, Dubletten, Fristen, Appeal :e1, 2027-10-01, 2027-12-17
```

</details>
