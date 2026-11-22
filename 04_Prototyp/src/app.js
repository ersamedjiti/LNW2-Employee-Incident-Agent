// ===== Incident-Tool v3: Weisungs-Assistent + Fallakte mit Assistent rechts =====
const ASSESSOR = "Lea Brunner";
const MELDEWEGE = ["Selbstmeldung", "Line Manager", "Kontrolle", "Mitarbeitende (Hinweis)", "Anonym"];
const PRESET_EXTRA = {
  A: { kurz: "Ihr Bildschirm beim Verlassen des Arbeitsplatzes nicht gesperrt war", reporterName: "Sandra" },
  B: { kurz: "eine E-Mail mit Kundendaten an einen falschen externen Empfänger versandt wurde", reporterName: "" },
  C: { kurz: "Sie eine Einladung eines Anbieters während einer laufenden Ausschreibung angenommen haben", reporterName: "" }
};
const JUDGED = ["policy", "risk", "behavior"];
const LABELS = { personId: "Betroffene Person", meldeweg: "Wie kam die Meldung", eingang: "Wann kam die Meldung", vorfall_datum: "Wann wurde der Verstoss begangen", policy: "Verletzte Policy", policy2: "Weitere Policy", summary: "Incident Summary", description: "Incident Description", risk: "Risk Level", risk_desc: "Risiko-Beschreibung", behavior: "Behavior Level", behavior_desc: "Verhaltens-Beschreibung" };
const SUGGEST = [
  "Darf ich ein Geschenk von einem Kunden über CHF 200 annehmen?",
  "Ich habe auf einen Phishing-Link geklickt. Was muss ich tun?",
  "Darf ich Kundendaten in ChatGPT eingeben?",
  "Wie kann ich etwas anonym melden?",
  "Ein Kollege aus der Kreditabteilung, Jonas Weber, hat mir heute erzählt, dass er die Bilanz und die Kreditlimite einer Firmenkundin in ChatGPT kopiert hat, damit es ihm die Zusammenfassung für den Kreditantrag schreibt. Ist das erlaubt? Was soll ich tun?",
  "Ein Kunde will mir eine Uhr für CHF 600 schenken. Kann ich sie als zwei Geschenke zu CHF 300 annehmen, damit ich nichts beantragen muss?"
];
const EMPLOYEE = { name: "Sarah Widmer", rolle: "Kundenberaterin" };
const CANNED = {
  [SUGGEST[0]]: { text: "Ein Geschenk **bis CHF 200** dürfen Sie ohne Bewilligung annehmen, solange die Summe pro Geschäftspartner und Jahr **CHF 500** nicht übersteigt (W-05 Ziff. 5.2).\n\n- **Über CHF 200 bis CHF 1'000:** nur mit Bewilligung durch Ihre vorgesetzte Person zusammen mit Compliance. Beantragen Sie sie vorgängig über das Formular «Geschenke und Einladungen» in IncidentNet. Wurde Ihnen das Geschenk direkt überreicht, melden Sie es innert 5 Arbeitstagen nach (W-05 Ziff. 5.3).\n- **Über CHF 1'000:** verboten.\n- **Bargeld, Gutscheine oder Geschenkkarten:** nie, unabhängig vom Betrag (W-05 Ziff. 5.1 Nr. 3).\n\nLäuft mit diesem Kunden gerade ein Kreditentscheid oder eine Verhandlung, ist jedes Geschenk unzulässig (W-05 Ziff. 5.1 Nr. 4).", sources: ["W-05 Ziff. 5.2", "W-05 Ziff. 5.3", "W-05 Ziff. 5.1"] },
  [SUGGEST[1]]: { text: "Handeln Sie sofort (W-03 Ziff. 6.2):\n\n1. **Gerät nicht ausschalten**, aber vom Netz trennen (Kabel ziehen bzw. WLAN aus).\n2. **IT-Security-Hotline 5555** anrufen, sofort, spätestens innert 30 Minuten.\n3. Danach den Vorfall in **IncidentNet** erfassen.\n\nHaben Sie Zugangsdaten eingegeben, gilt der Vorfall als S2, bis das SOC eine Kompromittierung ausgeschlossen hat (W-03 Ziff. 7). Ein sofort gemeldeter einzelner Klick führt in der Regel zu keinen arbeitsrechtlichen Massnahmen; eine verzögerte Meldung gilt dagegen als Pflichtverletzung (W-03 Ziff. 6.2).", sources: ["W-03 Ziff. 6.2", "W-03 Ziff. 7"] },
  [SUGGEST[2]]: { text: "Nein. Öffentliche KI-Chatbots wie ChatGPT dürfen ohne Vereinbarung und Freigabe der Bank **nicht für Personendaten, Kundendaten (CID)** oder als «Vertraulich» klassifizierte Informationen genutzt werden (W-02 Ziff. 5 Nr. 5). Erlaubt sind nur KI-Werkzeuge, die vom CISO und der Datenschutzberatung freigegeben sind.\n\nIst es bereits passiert, melden Sie es als Vorfall: bei möglichem Datenabfluss zuerst die IT-Security-Hotline 5555, danach IncidentNet, Kategorie «Datenschutz» (W-03 Ziff. 5.5, W-02 Ziff. 6).", sources: ["W-02 Ziff. 5 Nr. 5", "W-02 Ziff. 6"] },
  [SUGGEST[3]]: { text: "Anonym melden können Sie über das **externe Meldeportal «SpeakUp»**. Es ist rund um die Uhr erreichbar, die Kommunikation läuft über ein anonymes Postfach (W-07 Ziff. 6).\n\n- **Vertraulich, aber nicht anonym:** Meldestelle bei Compliance, intern 4747 oder speakup@musterbank.example.\n- **Betrifft es die Leitung Compliance oder ein GL-Mitglied:** direkt an das Präsidium des Prüfungs- und Risikoausschusses, im Portal mit Auswahl «Verwaltungsrat».\n\nIhre Identität wird ohne Ihre Zustimmung niemandem offengelegt, und Vergeltung ist verboten (W-07 Ziff. 9). Mit einer Meldung nach W-07 ist Ihre Meldepflicht nach W-01 erfüllt.", sources: ["W-07 Ziff. 6", "W-07 Ziff. 9"] },
  [SUGGEST[5]]: { text: "Dabei kann ich nicht helfen. Ein Geschenk aufzuteilen, um unter der Wertgrenze zu bleiben, umgeht die Regel und wäre selbst ein Verstoss.\n\nAuch aufgeteilt bräuchten Sie eine **Bewilligung**: Jedes Geschenk läge über CHF 200, und zusammen überschreiten sie die Jahressumme von CHF 500 pro Geschäftspartner. Über CHF 200 bis CHF 1'000 bewilligt Ihre vorgesetzte Person zusammen mit Compliance (W-05 Ziff. 5.2).\n\n**So gehen Sie richtig vor:** Beantragen Sie die Uhr vorgängig über das Formular «Geschenke und Einladungen» in IncidentNet. Wurde sie Ihnen bereits überreicht, melden Sie sie innert 5 Arbeitstagen nach; Compliance entscheidet über Behalten, Rückgabe oder Spende (W-05 Ziff. 5.3). Läuft mit dem Kunden gerade ein Kredit- oder Vertragsentscheid, lehnen Sie ab (W-05 Ziff. 5.1 Nr. 4).\n\nBei Unsicherheit hilft Compliance unter 4700. Meine Antwort ist keine Bewilligung.", sources: ["W-05 Ziff. 5.2", "W-05 Ziff. 5.3", "W-05 Ziff. 5.1"] },
  [SUGGEST[4]]: { incident: true, text: "Nein, das ist nicht erlaubt. Öffentliche KI-Chatbots wie ChatGPT dürfen **nicht für Kundendaten (CID)** oder vertrauliche Informationen verwendet werden (W-02 Ziff. 5 Nr. 5).\n\nDas ist ein Vorfall, der gemeldet werden muss: unverzüglich, spätestens innert 4 Stunden (W-02 Ziff. 6). **Ermitteln Sie nicht selbst** und konfrontieren Sie Ihren Kollegen nicht (W-01 Ziff. 5).\n\nIch kann Ihre Schilderung direkt als Meldung an Compliance weiterleiten, auf Wunsch anonym.", sources: ["W-02 Ziff. 5 Nr. 5", "W-02 Ziff. 6", "W-01 Ziff. 5"] }
};

const S = {
  ai: null, aiStatus: "pending", mode: "offline", tab: "chat", ui: {}, chat: [], queue: [], qItem: null, caseOpen: false,
  phase: 1, maxPhase: 1, preset: null, ref: null, busy: null, error: null,
  f: {}, kiF: {}, prop: {}, conf: {}, cands: [], sonder: [], konf: null, offen: [], patternDec: null,
  cchat: [], qCount: 0, script: null, levelSet: null, baseSet: null, patternRes: null, closedNoViolation: null, rem: null, handover: null, review: null, po: null, log: []
};

const $ = sel => document.querySelector(sel);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const person = id => DIRECTORY.find(p => p.id === id);
const cat = code => CATALOG.find(c => c.code === code);
const now = () => new Date();
const fmtT = d => fmtD(d) + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
const lvlClass = l => l === "Reminder" || l === "No Breach" ? "lv-rem" : l === "Employee Incident" ? "lv-ei" : l === "HR Referral" ? "lv-hr" : "";
const levelPill = (l, small) => l ? `<span class="lvl ${lvlClass(l)}${small ? " sm" : ""}">${esc(l)}</span>` : "";
const wait = ms => new Promise(r => setTimeout(r, ms));
let MID = 0;
function log(actor, action, detail) { S.log.push({ at: now(), actor, action, detail: detail || "" }); }

async function initAI() {
  try {
    const sample = window.claude && window.claude.use ? await window.claude.use("sample") : null;
    if (sample) { S.ai = sample; S.aiStatus = "ready"; S.mode = "live"; } else S.aiStatus = "off";
  } catch (e) { S.aiStatus = "off"; }
  render();
}
function errText(e) {
  const m = { not_granted: "Die KI-Nutzung wurde nicht erlaubt. Der Prototyp wechselt zu den vorbereiteten Antworten.", sampling_disabled: "Die KI ist für dieses Konto nicht verfügbar. Der Prototyp wechselt zu den vorbereiteten Antworten.", rate_limited: "Zu viele Anfragen in kurzer Zeit. Bitte in einer Minute erneut versuchen.", invalid_json: "Die Antwort des Assistenten war nicht im erwarteten Format. Bitte nochmals senden.", refused: "Der Assistent hat diese Anfrage abgelehnt.", session_expired: "Bitte erneut bei Claude anmelden." };
  return m[e && e.code] || "Der Assistent ist gerade nicht erreichbar. Bitte erneut versuchen oder die vorbereiteten Antworten verwenden.";
}
function aiFail(e) { if (e && (e.code === "not_granted" || e.code === "sampling_disabled")) { S.aiStatus = "off"; S.mode = "offline"; } }

// ---------- Antworttexte ----------
function md(t) {
  const lines = esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").split("\n");
  let h = "", list = null; const close = () => { if (list) { h += `</${list}>`; list = null; } };
  lines.forEach(l => {
    const ul = l.match(/^\s*[-•]\s+(.*)/), ol = l.match(/^\s*\d+\.\s+(.*)/);
    if (ul) { if (list !== "ul") { close(); h += "<ul>"; list = "ul"; } h += `<li>${ul[1]}</li>`; }
    else if (ol) { if (list !== "ol") { close(); h += "<ol>"; list = "ol"; } h += `<li>${ol[1]}</li>`; }
    else { close(); if (l.trim()) h += `<p>${l}</p>`; }
  });
  close(); return h;
}
function splitAnswer(t) {
  const i = t.search(/\n?\s*QUELLEN\s*:/i);
  const body = (i >= 0 ? t.slice(0, i) : t).trim(), tail = i >= 0 ? t.slice(i) : "";
  return { body: body.replace(/\n?\s*INCIDENT\s*:.*$/i, "").trim(), src: [...new Set(tail.match(/[WE]-\d{2}(?: Ziff\. [\d.\-]+(?: Nr\. \d+)?)?/g) || [])], incident: /INCIDENT\s*:\s*ja/i.test(tail) };
}
// Für Mitarbeitende nicht sichtbar: Ergänzungsblätter mit Hinweisen zur Erkennung und Überwachung (Need-to-know)
const EMP_HIDDEN = ["E-00", "E-02"];
function policyPrompt(question, context) {
  const cards = retrieve(question + " " + (context ? context.slice(0, 300) : ""), 7, context ? [] : EMP_HIDDEN);
  return `Du bist der Weisungs-Assistent der Musterbank AG (fiktive Bank, Prototyp). Du beantwortest Fragen zu den internen Weisungen W-01 bis W-11 und den Ergänzungsblättern E-00 bis E-04.

REGELN
- Stütze dich nur auf die AUSZÜGE unten. Nenne zu jeder Regel Dokument und Ziffer in Klammern, z. B. (W-05 Ziff. 5.2).
- Decken die Auszüge die Frage nicht ab, sag das offen und nenne die zuständige Stelle (z. B. Compliance 4700, Incident Desk 4444). Nichts erfinden.
- Schweizer Hochdeutsch (ss statt ß), freundlich und knapp: 2 bis 6 Sätze oder eine kurze Liste. **Fett** für das Wichtigste.
- Keine Sanktionen oder Massnahmen gegen konkrete Personen vorschlagen, keine Personen beurteilen.
- Beschreibt die fragende Person einen konkreten Vorfall, nenne Meldeweg und Frist.

GRENZEN (gehen allem anderen vor)
- Du erklärst Regeln und den erlaubten Weg (Bewilligung einholen, offenlegen, melden). Du hilfst nie dabei, eine Regel oder Kontrolle zu umgehen, einen Vorfall zu verschleiern, Spuren oder Nachrichten zu löschen, unter einer Wertgrenze oder Meldeschwelle zu bleiben (z. B. ein Geschenk aufteilen) oder unentdeckt zu bleiben.
- Bei einer solchen Frage: freundlich und klar ablehnen, ohne Vorwurf. Dann die Regel mit Ziffer nennen und den erlaubten Weg zeigen. Nenne keine Erkennungs- oder Kontrollmethoden, Schwellen von Überwachungssystemen oder Lücken.
- Beschreibt die Person einen eigenen Verstoss oder plant ihn: Hinweis, dass eine rasche Selbstmeldung zu ihren Gunsten berücksichtigt wird (W-01 Ziff. 5.6), und Meldeweg nennen. Setze dann INCIDENT: ja.
- Du hast keinen Zugriff auf Fälle, Meldungen oder Fallhistorien. Fragen wie «Wurde ich gemeldet?», «Wer hat gemeldet?» oder «Habe ich schon einen Reminder?» beantwortest du nicht inhaltlich; verweise auf den Line Manager bzw. Compliance und auf den Schutz meldender Personen (W-07 Ziff. 9).
- Deine Antwort ist keine Bewilligung. Bei Grenzfällen: vorgängig Compliance (4700) fragen.
${context ? "\nKONTEXT DES AKTUELLEN FALLS\n" + context + "\n" : ""}
AUSZÜGE
${kbBlock(cards)}

FRAGE
${question}

Schreibe nach der Antwort genau zwei Zeilen:
QUELLEN: <Dokument und Ziffer, durch Semikolon getrennt>
INCIDENT: ja|nein  (ja, wenn ein konkreter Vorfall beschrieben wird, der erfasst werden sollte)`;
}
async function streamAnswer(list, question, context) {
  const msg = { id: ++MID, role: "ai", text: "", src: [], pending: true };
  list.push(msg);
  const history = list.filter(m => !m.pending && m.text && !m.local).slice(-7, -1).map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }));
  while (history.length && history[0].role !== "user") history.shift();
  const ctl = new AbortController(); S.busy = { what: "answer", ctl }; render();
  try {
    const res = await S.ai(history.concat([{ role: "user", content: policyPrompt(question, context) }]), { signal: ctl.signal, cache: false, onText: ({ text }) => { msg.text = splitAnswer(text).body; paintMsg(msg); } });
    const a = splitAnswer(res.text); msg.text = a.body; msg.src = a.src; msg.incident = a.incident;
    if (list === S.chat) setBasis(msg, null, question);
  } catch (e) { aiFail(e); msg.text = (e && e.text ? splitAnswer(e.text).body + "\n\n" : "") + (e && e.code === "cancelled" ? "(abgebrochen)" : errText(e)); msg.err = true; }
  msg.pending = false; S.busy = null; render();
}
function paintMsg(m) { const el = document.getElementById("m-" + m.id); if (el) { el.querySelector(".body").innerHTML = md(m.text || "") || `<span class="typing">denkt nach …</span>`; scrollChats(); } }

async function chatSend(text) {
  text = (text || "").trim(); if (!text || S.busy) return;
  S.chat.push({ id: ++MID, role: "user", text }); S.ui.chatDraft = "";
  if (S.mode === "offline") {
    const c = CANNED[text]; S.busy = { what: "answer" }; render(); await wait(600); S.busy = null;
    if (c) { const m = { id: ++MID, role: "ai", text: c.text, src: c.sources, incident: !!c.incident }; S.chat.push(m); setBasis(m, null, text); render(); return; }
    S.chat.push({ id: ++MID, role: "ai", local: true, text: "Im Modus «Vorbereitete Antworten» kann ich nur die vier Beispielfragen beantworten. Schalten Sie oben auf **KI live**, dann beantworte ich jede Frage zu den Weisungen." });
    render(); return;
  }
  await streamAnswer(S.chat, text, "");
}

// ---------- Fallakte ----------
const DATEF = ["eingang", "vorfall_datum"];
function parseCH(raw, withTime) {
  const t = String(raw || "").trim().toLowerCase(); if (!t) return "";
  const pad = n => String(n).padStart(2, "0");
  if (t === "heute" || t === "gestern") { const d = now(); if (t === "gestern") d.setDate(d.getDate() - 1); return isoD(d) + (withTime ? "T" + pad(d.getHours()) + ":" + pad(d.getMinutes()) : ""); }
  let m = t.match(/^(\d{4})-(\d{2})-(\d{2})(?:[t ](\d{1,2}):(\d{2}))?$/), y, mo, d, h = 0, mi = 0;
  if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; if (m[4]) { h = +m[4]; mi = +m[5]; } }
  else { m = t.match(/^(\d{1,2})[.\/](\d{1,2})[.\/](\d{2}|\d{4})(?:,?\s+(\d{1,2})[:.](\d{2}))?$/); if (!m) return null; d = +m[1]; mo = +m[2]; y = +m[3]; if (y < 100) y += 2000; if (m[4]) { h = +m[4]; mi = +m[5]; } }
  const dt = new Date(y, mo - 1, d, h, mi);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d || h > 23 || mi > 59) return null;
  return y + "-" + pad(mo) + "-" + pad(d) + (withTime ? "T" + pad(h) + ":" + pad(mi) : "");
}
function showDate(k) { if (S.ui.raw && S.ui.raw[k] !== undefined) return S.ui.raw[k]; const v = S.f[k]; if (!v) return ""; return fmtD(v) + (k === "eingang" && v.length > 10 ? " " + v.slice(11, 16) : ""); }
function nowLocal() { const d = now(); return isoD(d) + "T" + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
function newCase(silent) {
  S.qItem = null; S.caseOpen = true;
  Object.assign(S, { phase: 1, maxPhase: 1, preset: null, busy: null, error: null, kiF: {}, prop: {}, conf: {}, cands: [], sonder: [], konf: null, offen: [], patternDec: null, breach: null, cchat: [], qCount: 0, script: null, levelSet: null, baseSet: null, patternRes: null, closedNoViolation: null, rem: null, handover: null, review: null, po: null, log: [] });
  S.f = { personId: null, meldeweg: "", selbstmeldung: false, eingang: nowLocal(), vorfall_datum: "", policy: "", policy2: "", summary: "", description: "", risk: "", risk_desc: "", behavior: "", behavior_desc: "" };
  S.ui.offlineDeviation = false; S.ui.override = false;
  S.ref = "INC-2026-0" + (1200 + Math.floor(Math.random() * 300));
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Erzählen Sie mir, was passiert ist. Ich trage alles links in die Fallakte ein, schlage Policy, Risk Level und Behavior Level vor und frage nach, wenn etwas Wichtiges fehlt. Sie können links jederzeit selbst ändern." });
  if (!silent) render();
}
const locked = () => !!(S.baseSet || S.levelSet);
const CASE_KEYS = ["phase", "maxPhase", "preset", "ref", "f", "kiF", "prop", "conf", "cands", "sonder", "konf", "offen", "patternDec", "breach", "cchat", "qCount", "script", "levelSet", "baseSet", "patternRes", "closedNoViolation", "rem", "handover", "review", "po", "log"];
function saveCase() { if (S.qItem && S.caseOpen) { S.qItem.state = {}; CASE_KEYS.forEach(k => { S.qItem.state[k] = S[k]; }); } }
function restoreCase(it) { CASE_KEYS.forEach(k => { S[k] = it.state[k]; }); S.qItem = it; S.caseOpen = true; S.busy = null; S.error = null; }

function setField(k, v, byAI) {
  if (v === undefined || v === null) return false;
  if (S.f[k] === v) return false;
  S.f[k] = v;
  if (byAI) { S.kiF[k] = true; if (JUDGED.includes(k)) { S.prop[k] = v; delete S.conf[k]; } }
  return true;
}

function capturePrompt() {
  const conv = S.cchat.filter(m => !m.local && m.text).slice(-14).map(m => (m.report ? "Eingegangene Meldung: " : m.role === "user" ? "Assessor: " : "Assistent: ") + m.text).join("\n");
  const last = (S.cchat.filter(m => m.role === "user").slice(-1)[0] || {}).text || "";
  const cards = retrieve(last + " " + S.f.description, 5);
  const fa = { ...S.f }; fa.personId = S.f.personId ? S.f.personId + " (" + person(S.f.personId).name + ")" : null;
  return `Du bist der KI-Assistent im Incident-Tool der Musterbank AG (fiktive Bank, Prototyp). Ein Assessor erfasst mit dir einen möglichen Policy-Verstoss einer mitarbeitenden Person. Er schreibt frei und oft kurz. Du füllst die Fallakte, schlägst die Bewertung vor und fragst gezielt nach. Der Assessor entscheidet.

FELDER DER FALLAKTE
- personId: Personalnummer aus dem VERZEICHNIS
- meldeweg: einer von ${MELDEWEGE.join(", ")}; selbstmeldung: true/false
- eingang: wann die Meldung bei Compliance einging (YYYY-MM-DDTHH:MM), nur wenn genannt
- vorfall_datum: wann der Verstoss begangen wurde (YYYY-MM-DD); relative Angaben ab heute ${isoD(now())} umrechnen
- policy: Risiko-Code aus dem KATALOG (hauptsächlich verletzte Regel); policy2: optional ein zweiter Code
- summary: ein Satz, worum es geht
- description: neutral, ohne Wertung, 2 bis 6 Sätze; betroffene Kundschaft, Daten, Systeme, Schaden und Sofortmassnahmen gehören hier hinein; die verdächtigte Person heisst «die betroffene Person»; die meldende Person nie mit Namen oder Funktion
- risk: Low | Medium | High; risk_desc: was die Person getan hat, das ein Risiko für die Bank darstellte, und welches Kriterium zutrifft (1 bis 3 Sätze)
- behavior: Mitigating | Expected | Aggravating | Severely Aggravating; behavior_desc: wie sich die Person während des Vorfalls verhalten hat und danach, als er entdeckt wurde bzw. die Meldung bei Compliance einging (Selbstmeldung, Kooperation, Vertuschung usw.), 1 bis 3 Sätze

RISK LEVEL (höchstes zutreffendes Kriterium; im Zweifel das höhere)
High: Schaden über CHF 100'000, Aufsichtsmeldung wahrscheinlich, Kundendaten vieler Personen, Verdacht auf Betrug, Insiderhandel oder Bestechung, erhebliches Reputationsrisiko, Gefährdung von Personen. Medium: Schaden CHF 10'000–100'000, Kundendaten einzelner Personen, Regelverstoss ohne Aussenwirkung, der Kontrollen umgeht. Low: Schaden unter CHF 10'000, Beinahe-Vorfall, geringfügiger formeller Verstoss.

BEHAVIOR LEVEL (frühere Fälle zählen hier nicht)
Mitigating: entlastende Umstände überwiegen (Selbstmeldung, hilft aktiv, Schaden wiedergutgemacht, Regel unklar oder nicht geschult, auf Anweisung). Expected: gewöhnlicher Fehler. Aggravating: grobe Fahrlässigkeit, keine Kooperation, Vertrauensstellung ausgenützt, hoher Schaden. Severely Aggravating: Vorsatz, Vertuschung, persönliche Bereicherung (gilt immer, wenn ein solcher Umstand vorliegt). Fehlen Angaben zum Verhalten: Expected und nachfragen. Vorsatz nie aus einem einzelnen Wort ableiten.

VERSTOSS: Prüfe zuerst, ob überhaupt ein Verstoss vorliegt. Erlaubt die Weisung das Verhalten (z. B. Geschenk unter der Wertgrenze), setze "verstoss" auf {"wert":"nein","begruendung":"… mit Ziffer"} und setze kein Risk und Behavior. Ist es unklar, "unklar" mit der fehlenden Angabe.

SONDERREGELN (nur bei konkreten Hinweisen): "straftat" (Verdacht auf Betrug, Insiderhandel, Bestechung, Gewalt), "vergeltung" (Benachteiligung wegen einer Meldung).

GESPRÄCHSREGELN
- Nur Fakten aus dem Gespräch. Nichts erfinden. Felder, die du nicht kennst, lässt du weg.
- Höchstens EINE Rückfrage pro Antwort, nur wenn die Antwort ein Feld oder die Bewertung ändert (Person unklar, Datum, Kundendaten, Schaden, Selbstmeldung, Verhalten nach der Entdeckung, Bewilligung oder Notfall). Funktion, Stufe und Line Manager stehen im Verzeichnis: nicht danach fragen. Bisher gestellte Rückfragen: ${S.qCount}. ${S.qCount >= 3 ? "Stelle KEINE Rückfrage mehr." : ""} Bei «weiss nicht», «unbekannt» oder «weiter» nicht nochmals fragen.
- Fragt der Assessor etwas zu den Weisungen, beantworte es kurz mit Ziffer aus den AUSZÜGEN und lass die Felder leer.
- Details, die Rückschlüsse auf die meldende Person zulassen: Hinweis in "warnung".
- Keine Sanktionen vorschlagen. Kein Incident Level berechnen (macht das Tool mit der Matrix).
- "antwort": höchstens 3 kurze Sätze in Schweizer Hochdeutsch (ss statt ß): was du eingetragen oder vorgeschlagen hast und gegebenenfalls die eine Rückfrage. Sind Person, Datum, Policy, Risk und Behavior gesetzt, sag, dass der Assessor die Vorschläge links bestätigen kann.

AKTUELLE FALLAKTE
${JSON.stringify(fa)}

VERZEICHNIS
${DIRECTORY.map(x => `${x.id} | ${x.name} | ${x.funktion} | Stufe ${x.stufe} | ${x.abteilung} | LM ${x.lm}`).join("\n")}

KATALOG DER RISIKO-CODES
${CATALOG.map(c => `${c.code} | ${c.name} | ${c.weisung} ${c.ziffer}`).join("\n")}

AUSZÜGE AUS DEN WEISUNGEN
${kbBlock(cards)}

GESPRÄCH
${conv}

Antworte nur mit einem JSON-Objekt:
{"antwort":"","felder":{"personId":"","meldeweg":"","selbstmeldung":false,"eingang":"","vorfall_datum":"","policy":"","policy2":"","summary":"","description":"","risk":"","risk_desc":"","behavior":"","behavior_desc":""},"person_kandidaten":[{"personalnummer":"","grund":"","sicherheit":"hoch|mittel|niedrig"}],"verstoss":{"wert":"ja|nein|unklar","begruendung":""},"sonderregeln":[{"typ":"straftat|vergeltung","begruendung":""}],"konfidenz":{"stufe":"niedrig|mittel|hoch","begruendung":""},"offene_fragen":[],"rueckfrage":false,"optionen":null,"warnung":null}
In "felder" nur Felder, die du neu setzt oder änderst. "optionen": 2 bis 4 kurze Antwortvorschläge zur Rückfrage oder null. "person_kandidaten", "verstoss", "sonderregeln", "konfidenz": null, wenn unverändert.`;
}

function applyAI(r) {
  const s = v => (typeof v === "string" ? v.trim() : v == null ? "" : String(v));
  const fe = r.felder && typeof r.felder === "object" ? r.felder : {};
  const ch = [];
  const put = (k, v) => { if (setField(k, v, true)) ch.push(k); };
  ["summary", "description", "risk_desc", "behavior_desc"].forEach(k => { const v = s(fe[k]); if (v) put(k, v); });
  if (MELDEWEGE.includes(fe.meldeweg)) put("meldeweg", fe.meldeweg);
  if (typeof fe.selbstmeldung === "boolean" && fe.selbstmeldung !== S.f.selbstmeldung) { S.f.selbstmeldung = fe.selbstmeldung; S.kiF.selbstmeldung = true; }
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s(fe.eingang))) put("eingang", s(fe.eingang).slice(0, 16));
  if (/^\d{4}-\d{2}-\d{2}$/.test(s(fe.vorfall_datum))) put("vorfall_datum", s(fe.vorfall_datum));
  const pc = s(fe.policy).toUpperCase(); if (cat(pc)) put("policy", pc); else if (pc) S.ui.badCode = pc;
  const pc2 = s(fe.policy2).toUpperCase(); if (cat(pc2) && pc2 !== S.f.policy) put("policy2", pc2);
  if (RISKS.includes(fe.risk)) put("risk", fe.risk);
  if (BEHAVIORS.includes(fe.behavior)) put("behavior", fe.behavior);
  if (Array.isArray(r.person_kandidaten)) {
    const c = r.person_kandidaten.filter(k => k && person(k.personalnummer)).map(k => ({ personalnummer: k.personalnummer, grund: s(k.grund), sicherheit: ["hoch", "mittel", "niedrig"].includes(k.sicherheit) ? k.sicherheit : "mittel" }));
    if (c.length) S.cands = c;
  }
  const pid = s(fe.personId); if (person(pid) && !S.f.personId) { S.f.personId = pid; S.kiF.personId = true; ch.push("personId"); }
  if (!S.f.personId) { const hi = S.cands.filter(k => k.sicherheit === "hoch"); if (hi.length === 1) { S.f.personId = hi[0].personalnummer; S.kiF.personId = true; ch.push("personId"); } }
  if (Array.isArray(r.sonderregeln)) r.sonderregeln.filter(x => x && ["straftat", "vergeltung"].includes(x.typ)).forEach(x => { if (!S.sonder.some(y => y.typ === x.typ)) S.sonder.push({ typ: x.typ, begruendung: s(x.begruendung), status: "open" }); });
  if (r.verstoss && ["ja", "nein", "unklar"].includes(r.verstoss.wert)) S.breach = { wert: r.verstoss.wert, begruendung: s(r.verstoss.begruendung) };
  if (r.konfidenz && ["niedrig", "mittel", "hoch"].includes(r.konfidenz.stufe)) S.konf = { stufe: r.konfidenz.stufe, begruendung: s(r.konfidenz.begruendung) };
  if (Array.isArray(r.offene_fragen)) S.offen = r.offene_fragen.map(s).filter(Boolean).slice(0, 4);
  const ask = !!r.rueckfrage && S.qCount < 3; if (ask) S.qCount++;
  return { ch, options: ask && Array.isArray(r.optionen) ? r.optionen.map(s).filter(Boolean).slice(0, 4) : null };
}

async function captureSend(text, rep) {
  text = (text || "").trim(); if (!text || S.busy) return;
  S.cchat.push(rep ? { id: ++MID, role: "user", report: true, channel: rep, text } : { id: ++MID, role: "user", text }); S.ui.cDraft = "";
  S.cchat.forEach(m => { m.options = null; m.examples = false; });
  if (locked()) {
    if (S.mode === "offline") { S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Im Modus «Vorbereitete Antworten» kann ich Fragen zum Fall nicht beantworten. Mit **KI live** beantworte ich Fragen zum Fall und zu den Weisungen." }); render(); return; }
    await streamAnswer(S.cchat, text, caseContext()); return;
  }
  if (S.mode === "offline") { await offlineCapture(text); return; }
  const ctl = new AbortController(); S.busy = { what: "capture", ctl }; render();
  try {
    const r = await S.ai.json(capturePrompt(), { signal: ctl.signal, modelTier: "default", cache: false }) || {};
    const res = applyAI(r);
    S.cchat.push({ id: ++MID, role: "ai", text: String(r.antwort || "Ich habe die Fallakte ergänzt."), options: res.options, warn: r.warnung ? String(r.warnung) : null, changed: res.ch });
    if (res.ch.length) log("Assistent", "Fallakte ergänzt", res.ch.map(k => LABELS[k] + (JUDGED.includes(k) ? ": " + S.f[k] : "")).join(", "));
  } catch (e) { aiFail(e); if (!(e && e.code === "cancelled")) S.cchat.push({ id: ++MID, role: "ai", local: true, err: true, text: errText(e) }); }
  S.busy = null; render();
}

async function offlineCapture(text) {
  S.busy = { what: "capture" }; render(); await wait(700); S.busy = null;
  const p = PRESETS.find(x => x.text === text);
  if (!S.script) {
    if (!p) { S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Im Modus «Vorbereitete Antworten» kann ich nur die drei Beispielfälle verarbeiten. Wählen Sie ein Beispiel oder schalten Sie oben auf **KI live**." }); render(); return; }
    const c = p.capture, a = p.assess;
    S.preset = p.id; if (!S.qItem) S.ref = p.ref;
    const extra = [];
    if (c.kundschaft && !/^(keine|nicht bekannt)/i.test(c.kundschaft)) extra.push("Betroffene Kundschaft: " + c.kundschaft + ".");
    if (c.daten && !/^(keine|nicht bekannt)/i.test(c.daten)) extra.push("Daten: " + c.daten + ".");
    if (c.sofortmassnahmen && !/^keine/i.test(c.sofortmassnahmen)) extra.push("Sofortmassnahmen: " + c.sofortmassnahmen + ".");
    const fill = {
      meldeweg: S.qItem ? S.qItem.meldeweg : c.meldeweg, eingang: S.qItem ? S.qItem.atLocal : p.received, vorfall_datum: c.vorfall_datum === "heute" ? isoD(now()) : c.vorfall_datum, policy: a.regeln[0].code, policy2: a.regeln[1] ? a.regeln[1].code : "",
      summary: c.kurztitel, description: c.sachverhalt + (extra.length ? "\n\n" + extra.join(" ") : ""),
      risk: a.risk ? a.risk.level : "", risk_desc: a.risk ? a.risk.begruendung : "", behavior: a.behavior ? a.behavior.level : "", behavior_desc: a.behavior ? a.behavior.umstaende.map(u => u.text).join(". ") + ". " + a.behavior.begruendung : ""
    };
    Object.entries(fill).forEach(([k, v]) => { if (v) setField(k, v, true); });
    S.breach = { wert: a.verstoss, begruendung: a.verstoss_begruendung };
    S.f.selbstmeldung = c.selbstmeldung;
    S.cands = c.person_kandidaten.slice();
    const hi = S.cands.filter(k => k.sicherheit === "hoch"); if (hi.length === 1) { S.f.personId = hi[0].personalnummer; S.kiF.personId = true; }
    S.sonder = (a.sonderregeln || []).map(x => ({ typ: x.typ, begruendung: x.begruendung, status: "open" }));
    S.konf = a.konfidenz; S.offen = a.offene_fragen || [];
    S.script = { qs: (c.rueckfragen || []).slice(0, 2), qi: 0 };
    log("Assistent", "Fallakte ausgefüllt", "Policy " + fill.policy + (a.verstoss === "nein" ? " · Vorschlag: kein Verstoss" : " · Risk " + fill.risk + " · Behavior " + fill.behavior) + " · vorbereitete Antwort");
    const warn = (c.identifizierende_details || [])[0];
    S.cchat.push({ id: ++MID, role: "ai", changed: Object.keys(fill).filter(k => fill[k]).concat(["personId"]), warn: warn ? "Das Detail «" + warn.text + "» lässt Rückschlüsse auf die meldende Person zu. In der Description habe ich es neutral formuliert." : null,
      text: a.verstoss === "nein" ? `Ich habe die Fallakte ausgefüllt. Betroffen ist **${S.f.personId ? person(S.f.personId).name : "noch offen"}**. Geprüft habe ich **${fill.policy}** (${cat(fill.policy).name}): Ein Geschenk bis CHF 200 ist ohne Bewilligung zulässig (W-05 Ziff. 5.2). Mein Vorschlag: **kein Verstoss**.` : `Ich habe die Fallakte ausgefüllt. Betroffen ist **${S.f.personId ? person(S.f.personId).name : "noch offen"}**, verletzt ist vermutlich **${fill.policy}** (${cat(fill.policy).name}). Mein Vorschlag: Risk **${fill.risk}**, Behavior **${fill.behavior}**.` });
    askNext(); render(); return;
  }
  const q = S.script.qs[S.script.qi];
  if (q) {
    if (q.erwartet && text !== q.erwartet) S.ui.offlineDeviation = true;
    if (!/^(unbekannt|weiss nicht|weiter|nicht bekannt)/i.test(text)) {
      const mapped = q.uebernahme && q.uebernahme[text];
      const lab = { kundschaft: "Betroffene Kundschaft", schaden: "Schaden", sachverhalt: "Ergänzung" }[q.feld] || "Ergänzung";
      S.f.description = (S.f.description + "\n" + lab + ": " + (mapped || text.replace(/\.$/, "") + " (Angabe Assessor)") + ".").trim(); S.kiF.description = true;
      S.cchat.push({ id: ++MID, role: "ai", text: "Danke, ich habe das in der Description ergänzt.", changed: ["description"] });
    }
    S.script.qi++;
  }
  askNext(); render();
}
function askNext() {
  const q = S.script.qs[S.script.qi];
  if (q) { S.qCount++; S.cchat.push({ id: ++MID, role: "ai", text: q.frage + (q.grund ? "\n\n" + q.grund : ""), options: (q.optionen || []).concat(q.optionen && q.optionen.includes("Unbekannt") ? [] : ["Weiss nicht"]) }); }
  else S.cchat.push({ id: ++MID, role: "ai", text: S.breach && S.breach.wert === "nein" ? "Danke. Damit bleibt es bei meinem Vorschlag: kein Verstoss. Sie können den Fall links als **No Breach** abschliessen; er wird dann im CWB dokumentiert." : "Mehr brauche ich nicht. Bitte prüfen Sie links Policy, Risk Level und Behavior Level und bestätigen Sie sie einzeln." });
}

// ---------- Bewertung und Level ----------
function judgedState(k) {
  if (!S.f[k]) return "empty";
  if (S.conf[k]) return S.conf[k].status;           // confirmed | changed
  if (S.prop[k] !== undefined && S.prop[k] === S.f[k]) return "proposed";
  if (S.prop[k] !== undefined && S.prop[k] !== S.f[k]) return "deviating";
  return "manual";
}
function confirmJudged(k) {
  const st = judgedState(k);
  if (st === "proposed") { S.conf[k] = { status: "confirmed", by: ASSESSOR, at: now() }; log(ASSESSOR, LABELS[k] + " bestätigt", S.f[k]); }
  else if (st === "deviating") {
    const el = document.getElementById("why-" + k); const reason = el ? el.value.trim() : "";
    if (!reason) { S.error = "Sie weichen beim Feld «" + LABELS[k] + "» vom Vorschlag ab. Bitte kurz begründen."; render(); return; }
    S.conf[k] = { status: "changed", reason, by: ASSESSOR, at: now() }; log(ASSESSOR, LABELS[k] + " geändert", S.prop[k] + " → " + S.f[k] + " · Begründung: " + reason);
  }
  S.error = null; render();
}
function current() {
  const sonder = S.sonder.filter(x => x.status === "accepted");
  const lv = computeLevel({ risk: S.f.risk || null, behavior: S.f.behavior || null, code: [S.f.policy, S.f.policy2], personId: S.f.personId, incidentDate: S.f.vorfall_datum, history: HISTORY, sonder, patternAccepted: !(S.patternDec && S.patternDec.status === "rejected") });
  return { lv, risk: S.f.risk, behavior: S.f.behavior, code: S.f.policy, sonder };
}
function missing() {
  const m = [];
  if (!S.f.personId) m.push("Betroffene Person");
  if (!S.f.meldeweg) m.push("Wie kam die Meldung");
  if (!S.f.vorfall_datum) m.push("Wann wurde der Verstoss begangen");
  if (!S.f.policy) m.push("Verletzte Policy");
  if (!S.f.summary && !S.f.description) m.push("Summary oder Description");
  JUDGED.forEach(k => { const st = judgedState(k); if (st === "empty") { if (!m.includes(LABELS[k])) m.push(LABELS[k]); } else if (st === "proposed" || st === "deviating") m.push(LABELS[k] + " bestätigen"); });
  if (S.f.risk && !S.f.risk_desc.trim()) m.push("Risiko-Beschreibung");
  if (S.f.behavior && !S.f.behavior_desc.trim()) m.push("Verhaltens-Beschreibung");
  S.sonder.forEach(x => { if (x.status === "open") m.push("Sonderregel prüfen"); });
  return m;
}
function baseProposal() {
  const c = current(); if (!c.lv) return null;
  const son = S.sonder.some(x => x.status === "accepted");
  return { matrix: c.lv.matrix, level: maxLevel(c.lv.matrix, son ? "HR Referral" : null), reason: son && c.lv.matrix !== "HR Referral" ? "Sonderregel geht der Matrix vor" : "Matrix: " + c.risk + " × " + c.behavior };
}
function setLevel() {
  const m = missing(); if (m.length) { S.error = "Noch offen: " + m.join(", ") + "."; render(); return; }
  const bp = baseProposal();
  let level = bp.level, override = false, reason = "";
  if (S.ui.override) {
    const ov = $("#ov-level"), ovr = $("#ov-reason");
    if (ov && ov.value && ov.value !== bp.level) { reason = (ovr && ovr.value.trim()) || ""; if (!reason) { S.error = "Eine Übersteuerung braucht eine schriftliche Begründung."; render(); return; } level = ov.value; override = true; }
  }
  S.baseSet = { level, proposed: bp.level, override, reason, at: now() };
  log(ASSESSOR, "Incident Level festgelegt (vor Pattern Aggregation)", level + (override ? " (Vorschlag " + bp.level + ", übersteuert · Begründung: " + reason + ")" : " (" + bp.reason + ")"));
  const pa = patternCheck(HISTORY, S.f.personId, [S.f.policy, S.f.policy2], S.f.vorfall_datum, level);
  S.patternRes = pa; S.patternDec = null; S.error = null; S.ui.override = false;
  const counting = pa.considered.filter(x => x.counts);
  log("System", "Pattern Aggregation gestartet", pa.applied ? pa.rules.join("; ") + " → Höherstufung auf " + pa.level + " vorgeschlagen" : (counting.length ? counting.length + " frühere Fälle im Fenster, keine Höherstufung" : "keine früheren Fälle im Fenster"));
  const name = person(S.f.personId).name;
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: pa.applied
    ? `Level aus der Matrix: **${level}**. Ich habe die Fallhistorie von ${name} geprüft: **${pa.rules.join("; ")}**. Nach der Pattern Aggregation wird der Fall zum **${pa.level}**. Bitte bestätigen Sie die Höherstufung unten in der Fallakte.`
    : `Level aus der Matrix: **${level}**. Ich habe die Fallhistorie von ${name} geprüft: ${counting.length ? counting.length + " frühere Fälle im 12-Monats-Fenster, aber keine Regel der Pattern Aggregation greift" : "keine früheren Fälle im 12-Monats-Fenster"}. Sie können das Incident Level abschliessen.` });
  render();
  setTimeout(() => { const el = document.getElementById("pattern-stage"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
}
function finalizeLevel(decision) {
  const pa = S.patternRes; let level = S.baseSet.level;
  if (decision === "accept") { level = pa.level; S.patternDec = { status: "accepted" }; log(ASSESSOR, "Höherstufung durch Pattern Aggregation bestätigt", S.baseSet.level + " → " + pa.level + " · zugeordnet: " + pa.triggers.map(t => t.ref).join(", ")); }
  if (decision === "reject") {
    const r = (($("#pat-why") || {}).value || "").trim();
    if (!r) { S.error = "Bitte begründen, weshalb die Höherstufung verworfen wird."; render(); return; }
    S.patternDec = { status: "rejected", reason: r }; log(ASSESSOR, "Höherstufung durch Pattern Aggregation verworfen", r);
  }
  S.levelSet = { level, base: S.baseSet.level, override: S.baseSet.override, reason: S.baseSet.reason, at: now() };
  log(ASSESSOR, "Incident Level endgültig festgelegt", level); updQ(level + " · in Bearbeitung");
  S.error = null; S.maxPhase = 3; S.phase = 2;
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Ihr Level: **" + level + "**. Unter «Bearbeiten» übergeben Sie den Fall zur Prüfung an " + (level === "HR Referral" ? "das HR Disciplinary Team" : "das Employee Incidents Team (CWB)") + ". " + (level === "HR Referral" ? "Übernimmt HR den Fall, informiert HR die Person." : "Nach der Freigabe entwerfe ich die E-Mail an die Person.") });
  render(); window.scrollTo({ top: 0, behavior: "smooth" });
}
function undoBase() { S.baseSet = null; S.patternRes = null; S.patternDec = null; log(ASSESSOR, "Festlegung aufgehoben", "Fallakte wieder bearbeitbar"); render(); }
function closeNoViolation() {
  const r = $("#nv-reason"); const reason = r ? r.value.trim() : "";
  if (!reason) { S.error = "Bitte begründen, weshalb kein Verstoss vorliegt."; render(); return; }
  if (!S.f.personId) { S.error = "Bitte zuerst die betroffene Person bestätigen."; render(); return; }
  const ai = S.breach && S.breach.wert === "nein";
  S.closedNoViolation = { reason, at: now() }; S.levelSet = { level: null, at: now() };
  updQ("No Breach");
  log(ASSESSOR, "Ergebnis festgelegt: No Breach", (ai ? "wie vom Assistenten vorgeschlagen · " : "") + reason);
  S.error = null; S.maxPhase = 3; S.phase = 2;
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Ergebnis: **No Breach**. Der Fall wird trotzdem dokumentiert: Unter «Bearbeiten» übergeben Sie ihn an die CWB." });
  render(); window.scrollTo({ top: 0, behavior: "smooth" });
}
function caseContext() {
  const p = person(S.f.personId), c = current();
  return `Fall ${S.ref}: ${S.f.summary}. ${S.f.description} Betroffene Person: ${p ? p.funktion + ", Stufe " + p.stufe : "unbekannt"}. Meldeweg ${S.f.meldeweg}. Policy ${S.f.policy}${S.f.policy2 ? ", " + S.f.policy2 : ""}. Risk ${S.f.risk}: ${S.f.risk_desc} Behavior ${S.f.behavior}: ${S.f.behavior_desc}` + (c.lv ? ` Matrix ${c.lv.matrix}; Vorschlag ${c.lv.proposed} (${c.lv.reason}).` : "") + (S.levelSet && S.levelSet.level ? ` Festgelegt: ${S.levelSet.level}.` : "");
}

// ---------- Reminder ----------
function remCtx() {
  const p = person(S.f.personId);
  return { personName: p.name, incidentDate: S.f.vorfall_datum, sachverhalt: S.f.description || S.f.summary, kurzbeschrieb: (PRESET_EXTRA[S.preset] || {}).kurz || "folgender Vorfall vorlag: " + S.f.summary, rule: cat(S.f.policy), selbstmeldung: S.f.selbstmeldung, ref: S.ref, reporterName: (PRESET_EXTRA[S.preset] || {}).reporterName || "" };
}
function promptReminder(ctx) {
  const c = ctx.rule;
  return `Du bist der KI-Assistent für Assessors im Employee Incident Management der Musterbank AG (fiktiv). Entwirf die Reminder-E-Mail nach der Vorlage. Der Assessor prüft und gibt frei.

VORLAGE
Guten Tag [Vorname Name]
Am [Datum] wurde festgestellt, dass [kurze, neutrale Beschreibung des Vorfalls]. Damit wurde die Regel «[Name der Regel]» nicht eingehalten.
Die Regel besagt: [kurze Zusammenfassung der Regel]. Sie dient dazu, [Zweck der Regel].
Bitte beachten Sie künftig: [ein bis zwei konkrete Hinweise]. Bei wiederholten Verstössen kann ein künftiger Fall höher eingestuft werden.
[Falls Selbstmeldung: Vielen Dank, dass Sie den Vorfall selbst gemeldet haben.]
Bitte bestätigen Sie den Erhalt dieser Nachricht über den Link unten. Dieser Hinweis wird unter der Referenz [Referenznummer] dokumentiert. Sind Sie mit der Beurteilung nicht einverstanden, wenden Sie sich innert 10 Arbeitstagen an Ihren Line Manager. Bei Fragen steht Ihnen Compliance gerne zur Verfügung.
Freundliche Grüsse
Compliance
[Link: Erhalt bestätigen]

REGELN: sachlich und freundlich; keine Vorwürfe, keine Mutmassungen über Absichten, keine Hinweise auf Sanktionen; zu Wiederholungen nur der allgemeine Satz aus der Vorlage, keine Hinweise auf frühere Fälle und keine Aussage, was beim nächsten Mal konkret passiert; keine Namen weiterer Beteiligter; keine Angaben zur meldenden Person (ausser Dank bei Selbstmeldung); höchstens 170 Wörter; Schweizer Hochdeutsch (ss statt ß).

ANGABEN
Name: ${ctx.personName}
Datum des Vorfalls: ${fmtD(ctx.incidentDate)}
Sachverhalt (intern, nicht wörtlich übernehmen): ${ctx.sachverhalt}
Regel: ${c.name} (${c.weisung} ${c.ziffer}): «${c.zitat}»
Zweck: ${c.zweck}
Hinweis: ${c.hinweis}
Selbstmeldung: ${ctx.selbstmeldung ? "ja" : "nein"}
Referenznummer: ${ctx.ref}

Antworte nur mit JSON: {"betreff":"Erinnerung an die Regel «…» – ${ctx.ref}","text":""} (Text mit Zeilenumbrüchen \\n, ohne Betreffzeile).`;
}
const finalLevel = () => (S.review && (S.review.final || S.review.proposed)) || outcome();
async function draftReminder() {
  const ctx = remCtx(); const isEI = finalLevel() === "Employee Incident";
  const offline = isEI ? fillEI(ctx) : fillReminder(ctx);
  let res = offline;
  if (S.mode === "live" && !isEI) {
    const ctl = new AbortController(); S.busy = { what: "reminder", ctl }; render();
    try { res = await S.ai.json(promptReminder(ctx), { signal: ctl.signal, modelTier: "default", cache: false }); }
    catch (e) { aiFail(e); S.busy = null; if (!(e && e.code === "cancelled")) S.error = errText(e); render(); return; }
    S.busy = null;
  } else { S.busy = { what: "reminder" }; render(); await wait(600); S.busy = null; }
  const text = String(res.text || offline.text);
  S.rem = { type: isEI ? "EI" : "Reminder", betreff: String(res.betreff || offline.betreff), text, orig: text, status: "draft" };
  log("Assistent", (isEI ? "Mitteilung Employee Incident" : "Reminder-E-Mail") + " entworfen", text.trim().split(/\s+/).length + " Wörter");
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Der Entwurf der " + (isEI ? "Mitteilung zum Employee Incident" : "Reminder-E-Mail") + " steht links. Prüfen Sie ihn; die automatischen Prüfungen zeigen, ob alle Regeln eingehalten sind." });
  render();
}
function releaseReminder() {
  const ta = $("#rem-text"), tb = $("#rem-subject"); if (ta) S.rem.text = ta.value; if (tb) S.rem.betreff = tb.value;
  const checks = reminderChecks(S.rem.text, remCtx());
  if (checks.some(c => !c.ok) && !S.ui.remForce) { S.ui.remForce = true; S.error = "Nicht alle Prüfungen sind erfüllt. Bitte Text anpassen oder nochmals auf «Versand freigeben» klicken, um bewusst trotzdem freizugeben."; render(); return; }
  S.rem.status = "sent"; S.rem.sentAt = now(); S.ui.remForce = false; S.error = null;
  const nm = S.rem.type === "EI" ? "Mitteilung Employee Incident" : "Reminder-E-Mail";
  log(ASSESSOR, nm + " freigegeben", S.rem.text !== S.rem.orig ? "Entwurf vor der Freigabe angepasst" : "Entwurf unverändert freigegeben");
  log("System", nm + " versandt (simuliert)", "An " + person(S.f.personId).name + ", Kopie " + person(S.f.personId).lm + " · Datum der Information " + fmtD(S.rem.sentAt) + (S.rem.type === "EI" ? " · für das Year-End-Gespräch vorgemerkt" : ""));
  log("System", "Rückmeldung an CWB", "E-Mail versendet, Datum der Information übermittelt · Ticket " + S.handover.ticket);
  setHandedStatus("Abgeschlossen · E-Mail versendet", "done");
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Versendet. Ich habe das Datum der Information an die CWB zurückgemeldet; dort überwacht das Employee Incidents Team " + (S.rem.type === "EI" ? "die Stellungnahme und die Year-End-Vormerkung." : "die Erhaltsbestätigung.") });
  S.maxPhase = 3; render();
}

// ---------- Policy Owner ----------
function poWeisungDefault() { const c = cat(S.f.policy); return c ? c.weisung : "W-01"; }
function anonymize(t) {
  let s = String(t || "");
  DIRECTORY.forEach(p => { const parts = p.name.split(" "); s = s.split(p.name).join("die betroffene Person"); });
  return s;
}
function poQuestion() {
  if (S.breach && S.breach.wert !== "ja" && S.breach.begruendung) return "Liegt hier ein Verstoss vor? Unsere vorläufige Einschätzung: " + S.breach.begruendung;
  if (S.offen.length) return S.offen[0];
  const c = cat(S.f.policy);
  return c ? "Ist das beschriebene Verhalten ein Verstoss gegen " + c.weisung + " " + c.ziffer.split(";")[0] + " («" + c.name + "»), und wie schwer wiegt es aus Sicht der Weisung?" : "Welche Regel ist hier massgebend, und liegt ein Verstoss vor?";
}
function poDraft(w) {
  const o = POLICY_OWNERS[w] || POLICY_OWNERS["W-01"], c = cat(S.f.policy);
  const due = fmtD(addBD(now(), 2));
  const sach = anonymize(S.f.description || S.f.summary || "(Sachverhalt noch nicht erfasst)");
  const ein = [c ? "Policy: " + c.code + " " + c.name + " (" + c.weisung + " " + c.ziffer.split(";")[0] + ")" : "", S.f.risk ? "Risk Level: " + S.f.risk : "", S.f.behavior ? "Behavior Level: " + S.f.behavior : "", S.konf ? "Konfidenz des Assistenten: " + S.konf.stufe : ""].filter(Boolean).join(" · ");
  const text = ["Guten Tag", "",
    "Im Employee Incident Management prüfen wir einen möglichen Verstoss gegen die Weisung " + w + " «" + o.titel + "». Der Assistent und ich sind bei der Auslegung nicht sicher und bitten Sie als zuständige Stelle um Ihre Einschätzung.", "",
    "Sachverhalt (ohne Personenangaben):", sach, "",
    "Unsere Frage:", poQuestion(), "",
    ein ? "Vorläufige Einschätzung: " + ein : "", ein ? "" : null,
    "Bitte antworten Sie bis am " + due + ". Die Angaben sind vertraulich (Need-to-know); bitte leiten Sie diese Nachricht nicht weiter.", "",
    "Freundliche Grüsse", ASSESSOR, "Assessor, Compliance"].filter(x => x !== null).join("\n");
  return { weisung: w, to: o.team + " <" + o.mail + ">", owner: o.verantwortlich, betreff: "Auslegungsfrage zu " + w + (c && c.weisung === w ? " " + c.ziffer.split(";")[0] : "") + " – " + S.ref, text, status: "draft" };
}
function poStart() { S.po = poDraft(poWeisungDefault()); log("Assistent", "Anfrage an Policy Owner entworfen", S.po.weisung + " · " + S.po.to); render(); setTimeout(() => { const el = document.getElementById("po-panel"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 30); }
function poNames(t) { const low = String(t || "").toLowerCase(); return DIRECTORY.filter(p => low.includes(p.name.toLowerCase())).map(p => p.name); }
function poSend() {
  const ta = $("#po-text"), tb = $("#po-subject"); if (ta) S.po.text = ta.value; if (tb) S.po.betreff = tb.value;
  const n = poNames(S.po.text + " " + S.po.betreff);
  if (n.length && !S.ui.poForce) { S.ui.poForce = true; S.error = "Die Anfrage enthält Namen (" + n.join(", ") + "). Der Policy Owner braucht keine Personenangaben. Bitte entfernen oder nochmals auf «Senden» klicken."; render(); return; }
  S.po.status = "sent"; S.po.sentAt = now(); S.ui.poForce = false; S.error = null;
  log(ASSESSOR, "Anfrage an Policy Owner gesendet (simuliert)", S.po.weisung + " · an " + S.po.to + " · Antwort erbeten bis " + fmtD(addBD(S.po.sentAt, 2)));
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: "Die Anfrage ist an **" + S.po.to.split(" <")[0] + "** gegangen (" + S.po.weisung + "). Die Antwort wird in der Fallakte abgelegt. Bis dahin können Sie den Fall offen lassen." });
  render();
}
function poPanel() {
  const P = S.po, unsure = (S.konf && S.konf.stufe === "niedrig") || (S.breach && S.breach.wert === "unklar");
  if (!P) return locked() ? "" : `<div class="po-cta ${unsure ? "hot" : ""}"><div><b>${unsure ? "Assistent unsicher: Policy Owner fragen?" : "Unsicher bei der Auslegung?"}</b><p class="small muted">Der Assistent bereitet eine E-Mail an die Stelle vor, der die Weisung gehört, ohne Personenangaben.</p></div><button class="btn sm ${unsure ? "primary" : ""}" data-act="poStart">Anfrage an Policy Owner</button></div>`;
  const sent = P.status === "sent";
  return `<div class="po-panel ${sent ? "" : "ai-frame"}" id="po-panel"><div class="ph"><h3>Anfrage an den Policy Owner</h3>${sent ? `<span class="chip chip-wait">Gesendet ${fmtT(P.sentAt)} · Antwort bis ${fmtD(addBD(P.sentAt, 2))}</span>` : `<span class="chip chip-ai">Entwurf des Assistenten</span>`}</div>
    <div class="grid2"><div class="fld"><label class="lab" for="po-weisung">Weisung</label><select id="po-weisung" ${sent ? "disabled" : ""}>${Object.keys(POLICY_OWNERS).map(w => `<option value="${w}" ${w === P.weisung ? "selected" : ""}>${w} · ${esc(POLICY_OWNERS[w].titel)}</option>`).join("")}</select></div>
      <div class="fld"><span class="lab">Policy Owner</span><div class="small">${esc(P.owner)}<br><span class="muted">${esc(P.to)}</span></div></div></div>
    <label class="lab" for="po-subject">Betreff</label><input id="po-subject" value="${esc(P.betreff)}" ${sent ? "readonly" : ""}>
    <label class="lab" for="po-text">Text</label><textarea id="po-text" rows="12" ${sent ? "readonly" : ""}>${esc(P.text)}</textarea>
    ${sent ? "" : `<p class="small muted">Prüfen Sie, dass keine Namen oder Details zur betroffenen oder meldenden Person enthalten sind.</p><div class="actions"><button class="btn ghost sm" data-act="poCancel">Verwerfen</button><button class="btn primary sm" data-act="poSend">Senden (simuliert)</button></div>`}</div>`;
}

// ---------- Darstellung ----------
function render() {
  const ae = document.activeElement, focusId = ae && ae.id;
  renderTop();
  $("#app").innerHTML = (S.tab === "chat" || S.tab === "kb" ? viewChatTab() : viewCaptureTab()) + drawerHTML();
  if (focusId) { const el = document.getElementById(focusId); if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) { el.focus(); if (el.setSelectionRange && /^(text|search|)$/.test(el.type || "") ) { const n = el.value.length; try { el.setSelectionRange(n, n); } catch (_) {} } } }
  scrollChats();
}
function scrollChats() { document.querySelectorAll(".msgs").forEach(el => { el.scrollTop = el.scrollHeight; }); }
function errBox() { return S.error ? `<div class="alert" role="alert">${esc(S.error)}</div>` : ""; }
function renderTop() {
  const ai = S.aiStatus === "ready";
  $("#top").innerHTML = `
    <div class="brand"><span class="logo" aria-hidden="true">M</span><div><div class="bt">Incident-Tool</div><div class="bs">Musterbank AG · fiktiv</div></div></div>
    <nav class="tabs" aria-label="Bereiche"><button data-act="tab" data-v="chat" class="${S.tab === "chat" ? "on" : ""}">Weisungs-Assistent <small>Mitarbeitende</small></button><button data-act="tab" data-v="capture" class="${S.tab === "capture" ? "on" : ""}">Incident-Tool <small>Assessor</small>${S.queue.some(q => q.fresh) ? `<span class="badge">${S.queue.filter(q => q.fresh).length}</span>` : ""}</button></nav>
    <div class="top-r"><div class="seg" role="group" aria-label="Antwortquelle">
      <button data-act="mode" data-v="live" class="${S.mode === "live" ? "on" : ""}" ${ai ? "" : "disabled title=\"KI-Verbindung in dieser Ansicht nicht verfügbar\""}>KI live</button>
      <button data-act="mode" data-v="offline" class="${S.mode === "offline" ? "on" : ""}">Vorbereitete Antworten</button></div>
      <span class="who"><span class="avatar">${S.tab === "chat" ? "SW" : "LB"}</span>${S.tab === "chat" ? esc(EMPLOYEE.name) + " · " + esc(EMPLOYEE.rolle) : esc(ASSESSOR) + " · Assessor"}</span></div>`;
}
function msgHTML(m, kind) {
  if (m.report) return `<div class="msg report" id="m-${m.id}"><div class="who-ai">Eingegangene Meldung · ${esc(m.channel)}</div><div class="body">${esc(m.text)}</div></div>`;
  if (m.role === "user") return `<div class="msg user" id="m-${m.id}"><div class="body">${esc(m.text)}</div></div>`;
  let h = `<div class="msg ai ${m.err ? "err" : ""}" id="m-${m.id}"><div class="who-ai">Assistent</div><div class="body">${md(m.text) || `<span class="typing">denkt nach …</span>`}</div>`;
  if (m.warn) h += `<div class="mwarn">${esc(m.warn)}</div>`;
  if (m.changed && m.changed.length) h += `<div class="mchg">Eingetragen: ${[...new Set(m.changed)].map(k => esc(LABELS[k] || k)).join(", ")}</div>`;
  if (m.src && m.src.length) h += `<div class="srcs">${m.src.map(s => `<button class="src ${S.ui.basis && S.ui.basis.mid === m.id && S.ui.basis.sel === s ? "on" : ""}" data-act="src" data-mid="${m.id}" data-v="${esc(s)}" title="Quelle anzeigen">${esc(s)}</button>`).join("")}</div>`;
  if (m.incident && kind === "chat" && !m.reported) h += `<div class="repask"><span class="small">Das klingt nach einem Vorfall, der gemeldet werden muss.</span><button class="btn sm primary" data-act="repStart" data-id="${m.id}">Als Meldung senden</button></div>`;
  if (m.reported) h += `<div class="mchg">Gemeldet · ${esc(m.reported)}</div>`;
  if (m.options && m.options.length && !locked()) h += `<div class="qr">${m.options.map(o => `<button class="opt" data-act="cOpt" data-v="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
  if (m.examples) h += `<div class="ex"><span class="small muted">Beispiele:</span>${PRESETS.map(p => `<button class="opt" data-act="cExample" data-id="${p.id}">${esc(p.label)}</button>`).join("")}</div>`;
  return h + `</div>`;
}
function busyMsg(what) { return `<div class="msg ai"><div class="who-ai">Assistent</div><div class="body"><span class="typing">${what === "capture" ? "trägt in die Fallakte ein …" : what === "reminder" ? "entwirft die E-Mail …" : "denkt nach …"}</span></div>${S.busy && S.busy.ctl ? `<button class="btn ghost sm" data-act="stop">Abbrechen</button>` : ""}</div>`; }

function viewChatTab() {
  return `<div class="wa-layout"><section class="chatpanel">
    <header class="cp-h"><h1>Weisungs-Assistent</h1><p class="muted">Fragen zu den Weisungen der Musterbank AG. Rechts erscheint zu jeder Antwort die passende Weisungsstelle. Erkennt der Assistent einen Vorfall, können Sie ihn direkt melden.</p></header>
    <div class="msgs">${!S.chat.length ? `<div class="welcome"><p>Zum Beispiel:</p><div class="sugg">${SUGGEST.map(q => `<button class="sug" data-act="chatSuggest" data-v="${esc(q)}">${esc(q)}</button>`).join("")}</div></div>` : ""}
      ${S.chat.map(m => msgHTML(m, "chat")).join("")}${reportCard()}${S.busy && S.busy.what === "answer" && !S.chat.some(m => m.pending) ? busyMsg("answer") : ""}</div>
    <form class="composer" data-form="chat"><textarea id="chat-in" rows="2" placeholder="Frage zu den Weisungen stellen …">${esc(S.ui.chatDraft || "")}</textarea><button class="btn primary" type="submit" ${S.busy ? "disabled" : ""}>Senden</button></form>
    <p class="fine">Der Assistent stützt sich auf verdichtete Auszüge der fiktiven Weisungen. Verbindlich ist der Text der Weisung; eine Antwort des Assistenten ist keine Bewilligung. Der Assistent hilft nicht dabei, Regeln oder Kontrollen zu umgehen.</p></section>
    <aside class="kbpanel" aria-label="Wissensbasis">${kbPanel()}</aside></div>`;
}

// ---------- Posteingang ----------
function localStr(d) { return isoD(d) + "T" + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
function seedQueue() {
  const ch = { A: "Telefon · Line Manager", B: "E-Mail · Selbstmeldung", C: "IncidentNet · Hinweis", D: "IncidentNet · Hinweis" };
  S.queue = PRESETS.filter(p => ch[p.id]).map(p => ({ id: "q" + p.id, preset: p.id, ref: p.ref, at: new Date(p.received), atLocal: p.received, channel: ch[p.id], meldeweg: p.capture.meldeweg, text: p.text, status: "Neu", reporter: "vertraulich gespeichert" })).sort((x, y) => y.at - x.at);
}
// Beispielfälle mit Rückmeldung aus CWB bzw. HR (für den Tab «Antworten»)
const ANSWER_SEEDS = [
  { id: "R1", ref: "INC-2026-01044", personId: "P-10601", policy: "IS-03", meldeweg: "Kontrolle", channel: "IncidentNet · Kontrolle (DLP)", eingang: "2026-11-05T08:40", vorfall: "2026-11-04",
    text: "Die DLP-Kontrolle meldet: Elena Marti hat am 04.11.2026 die Konfigurationsdokumentation der Firewall an ihre private E-Mail-Adresse geschickt. Sie sagt, sie habe am Wochenende daran weiterarbeiten wollen, und hat die E-Mail auf Aufforderung gelöscht.",
    summary: "Konfigurationsunterlagen der Firewall an private E-Mail-Adresse gesendet",
    description: "Am 04.11.2026 sandte die betroffene Person die Konfigurationsdokumentation der Firewall (klassifiziert «Vertraulich») an ihre private E-Mail-Adresse, um am Wochenende daran zu arbeiten. Die DLP-Kontrolle meldete den Versand am 05.11.2026. Die E-Mail wurde auf Aufforderung gelöscht; Hinweise auf eine Weitergabe an Dritte gibt es keine. Kundendaten waren nicht betroffen.",
    risk: "Low", risk_desc: "Interne Unterlagen auf einem privaten Konto, keine Kundendaten; die E-Mail wurde gelöscht.", behavior: "Expected", behavior_desc: "Gewöhnlicher Fehler aus Bequemlichkeit; die Person kooperierte und löschte die E-Mail sofort.",
    level: "Reminder", sys: "cwb", ticket: "CWB-2026-04411", handedAt: "2026-11-06T10:15",
    kurz: "Sie die Konfigurationsdokumentation der Firewall an Ihre private E-Mail-Adresse gesendet haben",
    msgs: [{ from: "Employee Incidents Team · CWB", at: "2026-11-13T14:20", text: "Wir stufen den Fall als «Employee Incident» ein (statt «Reminder»). Begründung: Die Unterlagen sind als «Vertraulich» klassifiziert und betreffen Sicherheitseinstellungen; das Risiko ist aus unserer Sicht Medium. Vergleichbare Fälle wurden als Employee Incident eingestuft. Bitte informieren Sie die betroffene Person entsprechend." }],
    status: "changed", final: "Employee Incident", label: "Employee Incidents Team nicht einverstanden" },
  { id: "R2", ref: "INC-2026-00987", personId: "P-10095", policy: "IS-04", meldeweg: "Kontrolle", channel: "IncidentNet · IT-Security", eingang: "2026-10-31T09:05", vorfall: "2026-10-30",
    text: "IT-Security meldet: Thomas Brunner hat am 30.10.2026 auf einem Server ein nicht freigegebenes Fernwartungsprogramm installiert, um einem externen Dienstleister schnell Zugriff zu geben. Das Programm ist inzwischen entfernt, Hinweise auf einen Missbrauch gibt es keine.",
    summary: "Nicht freigegebenes Fernwartungsprogramm auf einem Server installiert",
    description: "Am 30.10.2026 installierte die betroffene Person auf einem Server ein Fernwartungsprogramm, das nicht im Software-Katalog der Bank freigegeben ist, um einem externen Dienstleister Zugriff zu geben. IT-Security entdeckte die Installation am 31.10.2026; das Programm wurde entfernt. Hinweise auf einen Missbrauch oder Datenabfluss gibt es keine.",
    risk: "High", risk_desc: "Externer Zugriff auf einen Server über nicht freigegebene Software umgeht die Sicherheitskontrollen der Bank.", behavior: "Aggravating", behavior_desc: "Bewusste Umgehung der Regel durch eine Führungsperson, um Zeit zu sparen; nach der Entdeckung kooperativ.",
    level: "HR Referral", sys: "cwb", ticket: "CWB-2026-04390", handedAt: "2026-11-03T16:30", hrTicket: "ER-2026-04102",
    kurz: "Sie auf einem Server ein nicht freigegebenes Fernwartungsprogramm installiert haben",
    msgs: [{ from: "HR Disciplinary Team · HR ERS", at: "2026-11-10T11:05", text: "Zu hoch eingestuft. Kein Hinweis auf Missbrauch, das Programm wurde sofort entfernt; ein Disziplinarverfahren ist aus unserer Sicht nicht verhältnismässig. Wir haben den Fall mit dem Vorschlag «Employee Incident» direkt an die CWB weitergeleitet (CWB-2026-04390). Zu Ihrer Information." },
      { from: "Employee Incidents Team · CWB", at: "2026-11-12T09:40", text: "Einverstanden mit «Employee Incident». Bitte informieren Sie die betroffene Person und merken Sie den Fall für das Year-End-Gespräch vor." }],
    status: "approved", final: "Employee Incident", viaHR: true, label: "Von HR an die CWB weitergeleitet" },
  { id: "R3", ref: "INC-2026-01090", personId: "P-10622", policy: "IS-01", meldeweg: "Mitarbeitende (Hinweis)", channel: "Telefon · Hinweis", eingang: "2026-11-10T15:20", vorfall: "2026-11-10",
    text: "Eine Mitarbeiterin meldet: Fabian Graf hat heute einer Kollegin aus seinem Team sein Passwort auf einem Zettel gegeben, damit sie in seiner Abwesenheit seine Pendenzen bearbeiten kann.",
    summary: "Passwort an eine Kollegin weitergegeben",
    description: "Am 10.11.2026 gab die betroffene Person (Lernender) einer Kollegin aus dem Team ihr Passwort auf einem Zettel, damit diese während ihrer Abwesenheit Pendenzen bearbeiten kann. Das Passwort wurde am selben Tag zurückgesetzt. Ein Zugriff durch Dritte ist nicht bekannt.",
    risk: "Low", risk_desc: "Weitergabe von Zugangsdaten innerhalb des Teams; Passwort sofort zurückgesetzt, kein Schaden.", behavior: "Mitigating", behavior_desc: "Lernender, der die Regel nicht kannte; zeigte sich einsichtig und liess das Passwort sofort zurücksetzen.",
    level: "Reminder", sys: "cwb", ticket: "CWB-2026-04458", handedAt: "2026-11-11T09:10",
    kurz: "Sie Ihr Passwort einer Kollegin weitergegeben haben, damit sie Ihre Pendenzen bearbeiten kann",
    msgs: [{ from: "Employee Incidents Team · CWB", at: "2026-11-14T09:30", text: "Einverstanden mit der Einstufung «Reminder». Bitte informieren Sie die betroffene Person." }],
    status: "approved", final: "Reminder", label: "Employee Incidents Team einverstanden" }
];
function seedAnswers() {
  const d = s => { const [x, y] = s.split("T"); const [Y, M, Dd] = x.split("-").map(Number); const [h, m] = (y || "00:00").split(":").map(Number); return new Date(Y, M - 1, Dd, h, m); };
  ANSWER_SEEDS.forEach(o => {
    const p = person(o.personId), sys = SYS[o.sys], hrSys = SYS.hr;
    PRESET_EXTRA[o.id] = { kurz: o.kurz, reporterName: "" };
    const conf = { status: "confirmed", by: ASSESSOR, at: d(o.handedAt) };
    const log = [
      { at: d(o.eingang), actor: "System", action: "Meldung aus dem Posteingang übernommen", detail: o.channel },
      { at: d(o.handedAt), actor: "Assistent", action: "Fallakte ausgefüllt", detail: "Policy " + o.policy + " · Risk " + o.risk + " · Behavior " + o.behavior },
      { at: d(o.handedAt), actor: ASSESSOR, action: "Policy, Risk Level und Behavior Level bestätigt", detail: o.policy + " · " + o.risk + " · " + o.behavior },
      { at: d(o.handedAt), actor: ASSESSOR, action: "Incident Level endgültig festgelegt", detail: o.level + " (Matrix: " + o.risk + " × " + o.behavior + ")" },
      { at: d(o.handedAt), actor: ASSESSOR, action: "An " + (o.viaHR ? hrSys.name : sys.name) + " übergeben", detail: "Ticket " + (o.hrTicket || o.ticket) + " · ohne Angaben zur meldenden Person" }
    ].concat(o.msgs.map(m => ({ at: d(m.at), actor: m.from.split(" · ")[0], action: "Rückmeldung", detail: m.text })));
    const state = {
      phase: 2, maxPhase: 3, preset: o.id, ref: o.ref,
      f: { personId: o.personId, meldeweg: o.meldeweg, selbstmeldung: false, eingang: o.eingang, vorfall_datum: o.vorfall, policy: o.policy, policy2: "", summary: o.summary, description: o.description, risk: o.risk, risk_desc: o.risk_desc, behavior: o.behavior, behavior_desc: o.behavior_desc },
      kiF: {}, prop: { policy: o.policy, risk: o.risk, behavior: o.behavior }, conf: { policy: conf, risk: conf, behavior: conf }, cands: [], sonder: [], konf: { stufe: "hoch", begruendung: "" }, offen: [], patternDec: null, breach: { wert: "ja", begruendung: "" },
      cchat: [{ id: ++MID, role: "ai", local: true, text: o.viaHR ? `HR hält das HR Referral für zu hoch und hat den Fall an die CWB weitergeleitet. Das Employee Incidents Team hat **${o.final}** festgelegt. Ich habe die E-Mail an ${p.name} vorbereitet.` : o.status === "changed" ? `Das Employee Incidents Team ist mit Ihrer Einstufung **${o.level}** nicht einverstanden und hat **${o.final}** festgelegt. Ich habe die E-Mail an ${p.name} entsprechend vorbereitet.` : `Das Employee Incidents Team hat Ihre Einstufung **${o.final}** freigegeben. Ich habe die E-Mail an ${p.name} vorbereitet.` }],
      qCount: 0, script: null, baseSet: { level: o.level, proposed: o.level, override: false, reason: "", at: d(o.handedAt) }, levelSet: { level: o.level, base: o.level, override: false, reason: "", at: d(o.handedAt) },
      patternRes: null, closedNoViolation: null, rem: null, po: null,
      handover: { sys: o.sys, stage: 3, ticket: o.ticket, at: d(o.handedAt), viaHR: !!o.viaHR },
      review: { sys: o.sys, status: o.status, proposed: o.viaHR ? "Employee Incident" : o.level, final: o.final, viaHR: !!o.viaHR, msgs: o.msgs.map(m => ({ from: m.from, text: m.text, at: d(m.at) })) },
      log
    };
    S.queue.push({ id: "q" + o.id, ref: o.ref, at: d(o.eingang), atLocal: o.eingang, channel: o.channel, meldeweg: o.meldeweg, text: o.text, status: "Übergeben", reporter: "vertraulich gespeichert", seedLabel: o.label,
      handed: { sys: o.sys, short: sys.short, name: sys.name, owner: sys.owner, ticket: o.ticket, at: d(o.handedAt), level: o.level, final: o.final, person: p.name, summary: o.summary, status: "Antwort eingegangen · E-Mail offen", stat: "act", answeredAt: d(o.msgs[o.msgs.length - 1].at) },
      state });
  });
}
function updQ(status) { if (S.qItem) S.qItem.status = status; }
function sendReport() {
  const ta = $("#rep-text"), anon = $("#rep-anon");
  const text = ta ? ta.value.trim() : ""; if (!text) return null;
  const isAnon = !!(anon && anon.checked);
  const at = now(); at.setSeconds(0, 0);
  const item = { id: "q" + (++MID), ref: "INC-2026-0" + (1300 + Math.floor(Math.random() * 300)), at, atLocal: localStr(at), channel: "Weisungs-Assistent · " + (isAnon ? "anonym" : "Hinweis"), meldeweg: isAnon ? "Anonym" : "Mitarbeitende (Hinweis)", text, status: "Neu", fresh: true, reporter: isAnon ? "anonym" : "vertraulich gespeichert (getrennt von der Fallakte)" };
  S.queue.unshift(item); S.ui.report = null;
  S.chat.push({ id: ++MID, role: "ai", local: true, text: `Danke. Ihre Meldung ist bei **Compliance** eingegangen (Referenz **${item.ref}**). ${isAnon ? "Sie haben anonym gemeldet; Ihr Name wurde nicht übermittelt." : "Ihr Name wird vertraulich und getrennt vom Fall gespeichert und nicht an die betroffene Person weitergegeben (W-07 Ziff. 9)."} Ihre Meldepflicht ist damit erfüllt; Sie müssen nichts weiter unternehmen.` });
  return item;
}
function reportCard() {
  const r = S.ui.report; if (!r) return "";
  return `<div class="msg ai repcard"><div class="who-ai">Meldung an Compliance</div>
    <label class="lab" for="rep-text">Ihre Schilderung</label><textarea id="rep-text" rows="4">${esc(r.text)}</textarea>
    <label class="check small"><input id="rep-anon" type="checkbox"> Anonym melden (ohne meinen Namen)</label>
    <p class="small muted">Gemeldet von: ${esc(EMPLOYEE.name)}, ${esc(EMPLOYEE.rolle)}. Ihr Name wird vertraulich und getrennt vom Fall gespeichert. Die betroffene Person erfährt nicht, wer gemeldet hat.</p>
    <div class="actions"><button class="btn ghost sm" data-act="repCancel">Abbrechen</button><button class="btn primary sm" data-act="repSend">Meldung senden</button></div></div>`;
}
function openQueueItem(id) {
  const it = S.queue.find(q => q.id === id); if (!it) return;
  saveCase();
  if (it.state) {
    restoreCase(it);
    if (it.handed && it.handed.stat === "act") { S.phase = 2; if (!S.rem) { render(); window.scrollTo({ top: 0 }); draftReminder().then(() => setTimeout(() => { const el = document.getElementById("rem-text"); if (el) el.closest("section").scrollIntoView({ behavior: "smooth", block: "start" }); }, 50)); return; } }
    render(); window.scrollTo({ top: 0 }); return;
  }
  newCase(true);
  S.qItem = it; it.fresh = false; it.status = "In Prüfung";
  S.ref = it.ref; S.f.eingang = it.atLocal; S.f.meldeweg = it.meldeweg; S.f.selbstmeldung = it.meldeweg === "Selbstmeldung";
  S.cchat = [{ id: ++MID, role: "ai", local: true, text: "Ich lese die Meldung aus dem Posteingang und fülle die Fallakte aus." }];
  log("System", "Meldung aus dem Posteingang übernommen", it.channel + " · Eingang " + fmtT(it.at) + " · meldende Person " + it.reporter);
  render(); window.scrollTo({ top: 0 }); captureSend(it.text, it.channel);
}
function viewQueue() {
  const t = S.ui.qTab || "open";
  const open = S.queue.filter(q => !q.handed);
  const ans = S.queue.filter(q => q.handed && q.handed.stat === "act").sort((x, y) => (y.handed.answeredAt || 0) - (x.handed.answeredAt || 0));
  const sent = S.queue.filter(q => q.handed && q.handed.stat !== "act").sort((x, y) => y.handed.at - x.handed.at);
  const nNew = open.filter(q => q.status === "Neu").length;
  const tabs = `<nav class="qtabs" aria-label="Posteingang">
    <button class="${t === "open" ? "on" : ""}" data-act="qTab" data-v="open">Zur Prüfung <span class="cnt">${open.length}</span></button>
    <button class="${t === "ans" ? "on" : ""}" data-act="qTab" data-v="ans">Antworten <span class="cnt ${ans.length ? "act" : ""}">${ans.length}</span></button>
    <button class="${t === "sent" ? "on" : ""}" data-act="qTab" data-v="sent">Weitergeleitet <span class="cnt">${sent.length}</span></button></nav>`;
  const meta = (q, h) => `<dl class="qdl"><dt>Incident-Tool</dt><dd class="mono">${esc(q.ref)}</dd><dt>Betroffen</dt><dd>${esc(h.person)}</dd><dt>Ticket</dt><dd class="mono">${esc(h.ticket)}</dd><dt>Eingang Meldung</dt><dd>${fmtT(q.at)} · ${esc(q.channel)}</dd></dl>`;
  let body, intro;
  if (t === "open") {
    intro = "Neue Meldungen aus IncidentNet, Telefon, E-Mail und dem Weisungs-Assistenten. Angaben zur meldenden Person sind getrennt gespeichert und gehen nicht an den Assistenten.";
    body = open.length ? `<div class="queue">${open.map(q => `<article class="qi ${q.fresh ? "fresh" : ""}">
      <div class="qi-h"><span class="mono">${esc(q.ref)}</span>${q.fresh ? `<span class="chip chip-ai">neu</span>` : ""}<span class="chip chip-muted">${esc(q.status)}</span><span class="grow"></span><span class="small muted">${fmtT(q.at)}</span></div>
      <div class="small muted">${esc(q.channel)}</div><p class="qi-t">${esc(q.text.length > 220 ? q.text.slice(0, 220) + " …" : q.text)}</p>
      <div class="actions"><button class="btn ${q.status === "Neu" ? "primary" : "ghost"} sm" data-act="openQ" data-id="${q.id}">${q.status === "Neu" ? "Prüfen" : "Weiter bearbeiten"}</button></div></article>`).join("")}</div>`
    : `<p class="empty">Keine offenen Meldungen.</p>`;
  } else if (t === "ans") {
    intro = "Rückmeldungen des Employee Incidents Teams (CWB) und von HR. Erst mit der endgültigen Einstufung des Employee Incidents Teams informieren Sie die betroffene Person per E-Mail.";
    body = ans.length ? `<div class="queue">${ans.map(q => { const h = q.handed, R = q.state && q.state.review, last = R && R.msgs[R.msgs.length - 1], changed = h.final && h.final !== h.level;
      const route = R && R.viaHR ? `<span class="route"><span class="sysbadge sb-hr">HR ERS</span> → <span class="sysbadge sb-cwb">CWB</span></span>` : `<span class="sysbadge sb-${h.sys}">${esc(h.short)}</span>`;
      return `<article class="qi ans ${changed ? "changed" : ""}">
      <div class="qi-h">${route}<b class="small">${esc(q.seedLabel || (R && R.viaHR ? "Von HR an die CWB weitergeleitet" : changed ? "Employee Incidents Team nicht einverstanden" : "Employee Incidents Team einverstanden"))}</b><span class="grow"></span><span class="small muted">Antwort ${fmtT(h.answeredAt || h.at)}</span></div>
      <p class="qi-t"><b>${esc(h.person)}</b> · ${esc(h.summary || "")}</p>
      <div class="lvchg"><span class="small muted">Ihre Einstufung</span>${levelPill(h.level, 1)}${changed ? `<span aria-hidden="true">→</span><span class="small muted">endgültig</span>${levelPill(h.final, 1)}` : `<span class="small okt">bestätigt</span>`}</div>
      ${R && R.msgs.length ? `<div class="revmsg compact">${R.msgs.map(m => `<div><b class="small">${esc(m.from)}</b> <span class="small muted">${fmtT(m.at)}</span><p class="small">${esc(m.text)}</p></div>`).join("")}</div>` : ""}
      ${meta(q, h)}
      <div class="actions"><button class="btn primary sm" data-act="openQ" data-id="${q.id}">E-Mail an ${esc(h.person)} schreiben</button></div></article>`; }).join("")}</div>`
    : `<p class="empty">Keine offenen Antworten. Alle E-Mails sind versendet.</p>`;
  } else {
    intro = "Zur Prüfung übergebene und abgeschlossene Fälle. Wartet ein Fall auf eine Rückmeldung, erscheint diese unter «Antworten».";
    body = sent.length ? `<div class="queue">${sent.map(q => { const h = q.handed; return `<article class="qi sent">
      <div class="qi-h"><span class="sysbadge sb-${h.sys}">${esc(h.short)}</span><span class="mono">${esc(h.ticket)}</span>${levelPill(h.final || h.level, 1)}${h.status ? `<span class="chip ${h.stat === "wait" ? "chip-wait" : "chip-ok"}">${esc(h.status)}</span>` : ""}<span class="grow"></span><span class="small muted">gesendet ${fmtT(h.at)}</span></div>
      <p class="qi-t"><b>${esc(h.summary || "")}</b></p>
      <dl class="qdl"><dt>Incident-Tool</dt><dd class="mono">${esc(q.ref)}</dd><dt>Betroffen</dt><dd>${esc(h.person)}</dd><dt>Zuständig</dt><dd>${esc(h.owner)}</dd><dt>Eingang</dt><dd>${fmtT(q.at)} · ${esc(q.channel)}</dd></dl>
      <div class="actions"><button class="btn ghost sm" data-act="openQ" data-id="${q.id}">${h.stat === "wait" ? "Status ansehen" : "Öffnen"}</button></div></article>`; }).join("")}</div>`
    : `<p class="empty">Noch keine Fälle weitergeleitet.</p>`;
  }
  return `<section class="panel"><div class="ph"><h2>Posteingang</h2><span class="hint">${nNew} neue Meldung${nNew === 1 ? "" : "en"} · ${ans.length} Antwort${ans.length === 1 ? "" : "en"}</span></div>
    ${tabs}<p class="small muted">${intro}</p>${body}
    ${t === "open" ? `<div class="actions"><button class="btn ghost sm" data-act="newCase">Fall ohne Meldung erfassen</button></div>` : ""}</section>`;
}
function viewCaptureTab() {
  if (!S.caseOpen) return `<div class="cap-layout"><section class="mask" aria-label="Posteingang">${viewQueue()}</section><aside class="asst" aria-label="Assistent"><div class="ap"><header class="ap-h"><span class="dot" aria-hidden="true"></span><div><b>Assistent</b><div class="small muted">${S.mode === "live" ? "KI live" : "Vorbereitete Antworten"} · stützt sich auf W-01 bis W-11</div></div></header><div class="msgs"><div class="msg ai"><div class="who-ai">Assistent</div><div class="body"><p>Guten Tag ${esc(ASSESSOR.split(" ")[0])}. Wählen Sie links eine Meldung aus dem Posteingang. Ich lese sie, fülle die Fallakte aus und schlage eine Bewertung vor.</p></div></div></div></div></aside></div>`;
  return `<div class="cap-layout"><section class="mask" aria-label="Fallakte">${caseHead()}${stepsHTML()}${S.phase === 1 ? viewMask() : S.phase === 2 ? errBox() + viewHandle() : viewLog()}</section>
    <aside class="asst" aria-label="Assistent">${assistantPanel()}</aside></div>`;
}
function caseHead() {
  const p = S.f.personId ? person(S.f.personId) : null, lvl = finalLevel() || (S.baseSet && S.baseSet.level);
  const status = S.qItem && S.qItem.handed && S.qItem.handed.status ? S.qItem.handed.status : S.handover && S.handover.stage === 3 ? "Übergeben an " + SYS[S.handover.sys].short + " · " + S.handover.ticket : S.closedNoViolation ? "Abgeschlossen (kein Verstoss)" : S.rem && S.rem.status === "sent" ? "Abgeschlossen · Erhalt ausstehend" : S.levelSet ? "In Bearbeitung" : S.baseSet ? "Pattern-Prüfung" : "In Erfassung";
  const dl = deadlines(S.f.eingang || nowLocal(), S.f.risk, lvl, S.levelSet && S.levelSet.at);
  const done = { erfassen: !!(S.f.policy && S.f.risk), level: !!S.levelSet, rem: S.rem && S.rem.status === "sent" };
  return `<div class="casehead"><div class="ch-main"><span class="mono ref">${esc(S.ref)}</span><span class="chip chip-muted">${esc(status)}</span>${lvl ? levelPill(lvl) : ""}${p ? `<span class="ch-p">${esc(p.name)} · ${esc(p.funktion)}</span>` : ""}<span class="grow"></span><button class="btn ghost sm" data-act="toQueue">Posteingang</button></div>
    <div class="ch-dl">${dl.map(d => { const eod = new Date(d.due); eod.setHours(23, 59, 59); const ok = done[d.key]; const over = !ok && eod < now() && !d.sameDay; return `<span class="dlc ${ok ? "done" : over ? "over" : ""}">${esc(d.label)} <b>${d.sameDay ? "heute" : fmtD(d.due)}</b></span>`; }).join("")}</div></div>`;
}
function stepsHTML() {
  return `<nav class="steps" aria-label="Phasen">${["Fallakte", "Bearbeiten", "Verlauf"].map((t, i) => { const n = i + 1, lk = n > S.maxPhase, dn = n < S.maxPhase || (n === 2 && S.handover && S.handover.stage === 3); return `<button class="step ${S.phase === n ? "active" : ""} ${dn ? "done" : ""}" data-act="goto" data-phase="${n}" ${lk ? "disabled" : ""}><span class="sn">${dn ? "✓" : n}</span><span>${t}</span></button>`; }).join("")}</nav>`;
}
function ki(k) { return S.kiF[k] && !locked() ? `<span class="ki" title="vom Assistenten eingetragen">KI</span>` : ""; }
function fld(k, inner, extra) { return `<div class="fld ${extra || ""}"><label class="lab" for="f-${k}">${LABELS[k]} ${ki(k)}</label>${inner}</div>`; }

function judgedBar(k) {
  if (locked()) return "";
  const st = judgedState(k);
  if (st === "proposed") return `<div class="jbar prop"><span>Vorschlag des Assistenten</span><button class="btn sm primary" data-act="confirm" data-k="${k}">Bestätigen</button></div>`;
  if (st === "deviating") return `<div class="jbar dev"><span>Abweichung vom Vorschlag «${esc(k === "policy" ? S.prop[k] + " " + (cat(S.prop[k]) || {}).name : S.prop[k])}»</span><input id="why-${k}" placeholder="Begründung (Pflicht)"><button class="btn sm primary" data-act="confirm" data-k="${k}">Speichern</button></div>`;
  if (st === "confirmed") return `<div class="jbar ok"><span>Bestätigt · ${esc(S.conf[k].by)}</span></div>`;
  if (st === "changed") return `<div class="jbar ok"><span>Geändert · ${esc(S.conf[k].by)} · ${esc(S.conf[k].reason)}</span></div>`;
  if (st === "manual") return `<div class="jbar ok"><span>Vom Assessor gesetzt</span></div>`;
  return "";
}
function viewMask() {
  const ro = locked() ? "disabled" : "", rro = locked() ? "readonly" : "";
  const f = S.f, p = f.personId ? person(f.personId) : null, pol = cat(f.policy), pol2 = cat(f.policy2);
  const opts = (list, val, ph) => `<option value="">${ph || "–"}</option>` + list.map(v => `<option value="${esc(v)}" ${v === val ? "selected" : ""}>${esc(v)}</option>`).join("");
  const catOpts = (val, ph) => `<option value="">${ph}</option>` + CATALOG.map(c => `<option value="${c.code}" ${c.code === val ? "selected" : ""}>${c.code} · ${esc(c.name)} (${c.weisung})</option>`).join("");
  const cands = S.cands.filter(k => k.personalnummer !== f.personId).map(k => { const x = person(k.personalnummer); return `<button class="opt" data-act="pickPerson" data-v="${x.id}" ${ro}>${esc(x.name)} · ${esc(x.funktion)} <span class="conf conf-${k.sicherheit}">${k.sicherheit}</span></button>`; }).join("");
  const hist = p ? HISTORY.filter(h => h.person === p.id).sort((a, b) => b.informed.localeCompare(a.informed)) : [];
  const c = current();
  return `
  <section class="panel">
    <div class="ph"><h2>Meldung</h2>${locked() ? `<span class="chip chip-ok">Festgelegt</span>` : `<span class="hint">Felder mit <span class="ki">KI</span> hat der Assistent eingetragen; alles ist direkt änderbar.</span>`}</div>
    <div class="grid2">
      ${fld("personId", `<select id="f-personId" ${ro}>${`<option value="">Person wählen …</option>` + DIRECTORY.map(x => `<option value="${x.id}" ${x.id === f.personId ? "selected" : ""}>${esc(x.name)} · ${esc(x.funktion)} · ${x.id}</option>`).join("")}</select>
        ${p ? `<div class="pmeta">${esc(p.stufe)} · ${esc(p.abteilung)} · LM ${esc(p.lm)}${p.hoeheresMgmt ? ` · <b>höheres Management</b>` : ""}</div>` : ""}
        ${cands && !locked() ? `<div class="qr small">Weitere Kandidaten: ${cands}</div>` : ""}`, "full")}
      ${fld("meldeweg", `<select id="f-meldeweg" ${ro}>${opts(MELDEWEGE, f.meldeweg)}</select><label class="check small"><input id="f-selbstmeldung" type="checkbox" ${f.selbstmeldung ? "checked" : ""} ${ro}> Selbstmeldung (meldende = betroffene Person)</label>`)}
      ${fld("eingang", `<input id="f-eingang" class="${S.ui.raw && S.ui.raw.eingang !== undefined ? "bad" : ""}" value="${esc(showDate("eingang"))}" ${rro} placeholder="TT.MM.JJJJ HH:MM" inputmode="numeric">${S.ui.raw && S.ui.raw.eingang !== undefined ? `<span class="small warnt">Format TT.MM.JJJJ HH:MM, z. B. 10.11.2026 09:12</span>` : ""}`)}
      ${fld("vorfall_datum", `<input id="f-vorfall_datum" class="${S.ui.raw && S.ui.raw.vorfall_datum !== undefined ? "bad" : ""}" value="${esc(showDate("vorfall_datum"))}" ${rro} placeholder="TT.MM.JJJJ" inputmode="numeric">${S.ui.raw && S.ui.raw.vorfall_datum !== undefined ? `<span class="small warnt">Format TT.MM.JJJJ, z. B. 28.10.2026</span>` : `<span class="small muted">z. B. 28.10.2026 oder «gestern»</span>`}`)}
    </div>
    ${p ? `<details class="more"><summary>Fallhistorie von ${esc(p.name)} (${hist.length})</summary>${hist.length ? `<ul class="hist">${hist.map(x => `<li><span class="mono">${x.ref}</span> <span class="code">${x.code}</span> ${levelPill(x.level, 1)} <span class="small muted">informiert ${fmtD(x.informed)}${x.status !== "abgeschlossen" ? " · " + esc(x.status) : ""}</span><div class="small">${esc(x.titel)}</div></li>`).join("")}</ul>` : `<p class="small muted">Keine früheren Fälle.</p>`}</details>` : ""}
  </section>
  <section class="panel">
    <div class="ph"><h2>Vorfall</h2></div>
    <div class="fld"><label class="lab" for="f-policy">${LABELS.policy} ${ki("policy")}</label><select id="f-policy" ${ro}>${catOpts(f.policy, "Policy wählen …")}</select>
      ${pol ? `<blockquote><b>${esc(pol.weisung)} ${esc(pol.ziffer)}:</b> ${esc(pol.zitat)} <button class="linkbtn" data-act="src" data-v="${esc(pol.weisung + " " + pol.ziffer.split(";")[0])}">Weisung anzeigen</button></blockquote>` : ""}${S.ui.badCode ? `<p class="small warnt">Der Assistent nannte «${esc(S.ui.badCode)}». Dieser Code steht nicht im Katalog und wurde nicht übernommen.</p>` : ""}${judgedBar("policy")}</div>
    <div class="fld"><label class="lab" for="f-policy2">${LABELS.policy2} ${ki("policy2")}</label><select id="f-policy2" ${ro}>${catOpts(f.policy2, "keine")}</select>${pol2 ? `<p class="small muted">${esc(pol2.weisung)} ${esc(pol2.ziffer)}: ${esc(pol2.zitat)}</p>` : ""}</div>
    ${fld("summary", `<input id="f-summary" value="${esc(f.summary)}" ${rro} placeholder="Ein Satz, worum es geht">`)}
    ${fld("description", `<textarea id="f-description" rows="6" ${rro} placeholder="Was ist passiert? Betroffene Kundschaft, Daten, Systeme, Schaden und Sofortmassnahmen gehören hierhin.">${esc(f.description)}</textarea>`)}
  </section>
  <section class="panel">
    ${breachBox()}
    <div class="ph"><h2>Bewertung</h2>${S.konf ? `<span class="konf k-${S.konf.stufe}" title="${esc(S.konf.begruendung)}">Konfidenz ${esc(S.konf.stufe)}</span>` : ""}</div>
    <div class="pair">
      <div class="jfield"><div class="fld"><label class="lab" for="f-risk">${LABELS.risk} ${ki("risk")}</label><select id="f-risk" ${ro}>${opts(RISKS, f.risk)}</select></div>
        <div class="fld"><label class="lab" for="f-risk_desc">Was hat die Person getan, das ein Risiko darstellte? ${ki("risk_desc")}</label><textarea id="f-risk_desc" rows="4" ${rro}>${esc(f.risk_desc)}</textarea></div>${judgedBar("risk")}
        <details class="more"><summary>Kriterien Risk Level</summary><p class="small"><b>High:</b> Schaden über CHF 100'000, Aufsichtsmeldung, viele Kundendaten, Verdacht auf Betrug, Insiderhandel oder Bestechung. <b>Medium:</b> CHF 10'000–100'000, Kundendaten einzelner Personen, Kontrollen umgangen. <b>Low:</b> unter CHF 10'000, Beinahe-Vorfall, formeller Verstoss.</p></details></div>
      <div class="jfield"><div class="fld"><label class="lab" for="f-behavior">${LABELS.behavior} ${ki("behavior")}</label><select id="f-behavior" ${ro}>${opts(BEHAVIORS, f.behavior)}</select></div>
        <div class="fld"><label class="lab" for="f-behavior_desc">Verhalten während des Vorfalls und nach der Entdeckung bzw. Meldung ${ki("behavior_desc")}</label><textarea id="f-behavior_desc" rows="4" ${rro}>${esc(f.behavior_desc)}</textarea></div>${judgedBar("behavior")}
        <details class="more"><summary>Kriterien Behavior Level</summary><p class="small"><b>Mitigating:</b> Selbstmeldung, hilft aktiv, Schaden wiedergutgemacht, Regel unklar. <b>Expected:</b> gewöhnlicher Fehler. <b>Aggravating:</b> grobe Fahrlässigkeit, keine Kooperation, Vertrauensstellung ausgenützt. <b>Severely Aggravating:</b> Vorsatz, Vertuschung, Bereicherung.</p></details></div>
    </div>
    ${S.offen.length ? `<div class="offen"><span class="lab">Offene Fragen</span><ul class="list small">${S.offen.map(q => `<li>${esc(q)}</li>`).join("")}</ul></div>` : ""}
    ${poPanel()}
  </section>
  ${viewLevel(c)}`;
}

function breachBox() {
  if (locked() || !S.breach || S.breach.wert === "ja") return "";
  const nb = S.breach.wert === "nein";
  return `<div class="breach ${nb ? "nb" : "unk"}"><div class="ph"><b>${nb ? "Vorschlag des Assistenten: kein Verstoss" : "Verstoss unklar"}</b>${ki("x") || `<span class="ki">KI</span>`}</div><p class="small">${esc(S.breach.begruendung)}</p>
    ${nb ? `<label class="lab" for="nv-reason">Begründung für die Fallakte</label><textarea id="nv-reason" rows="3">${esc(S.breach.begruendung)}</textarea>${errBox()}<div class="actions"><span class="hint">Der Fall wird als «No Breach» im CWB dokumentiert.</span><button class="btn primary" data-act="closeNV">Als No Breach abschliessen</button></div>` : `<p class="small muted">Klären Sie den Sachverhalt, bevor Sie ein Level festlegen.</p>`}</div>`;
}
function matrixGrid(risk, behavior) {
  let g = `<div class="mx" role="table" aria-label="Matrix Incident Level"><div class="mx-c mx-h"></div>${RISKS.map(r => `<div class="mx-c mx-h ${r === risk ? "hl" : ""}">${r}</div>`).join("")}`;
  BEHAVIORS.forEach(b => { g += `<div class="mx-c mx-r ${b === behavior ? "hl" : ""}">${b}</div>`; RISKS.forEach(r => { const l = MATRIX[b][r]; g += `<div class="mx-c ${lvlClass(l)} ${r === risk && b === behavior ? "sel" : ""}">${l === "Employee Incident" ? "Empl. Incident" : l}</div>`; }); });
  return g + `</div>`;
}
function patternDetails(pa) {
  const codes = [S.f.policy, S.f.policy2].filter(Boolean);
  const rows = pa.considered.map(x => `<li class="${x.counts ? "" : "nc"}"><span class="mono">${x.ref}</span> <span class="code ${codes.includes(x.code) ? "same" : ""}">${x.code}</span> ${levelPill(x.level, 1)} <span class="muted">informiert ${fmtD(x.informed)}</span> <span class="small ${x.counts ? "okt" : "muted"}">${x.counts ? "zählt" : esc(x.why)}</span><div class="small">${esc(x.titel)}</div></li>`).join("");
  const remN = pa.considered.filter(x => x.counts && x.level === "Reminder"), eiN = pa.considered.filter(x => x.counts && x.level === "Employee Incident");
  return `<p class="small muted">Geprüft werden Fälle von ${esc(person(S.f.personId).name)}, über die sie oder er zwischen ${fmtD(pa.from)} und ${fmtD(pa.to)} informiert wurde.</p>
    ${rows ? `<ul class="trig hist2">${rows}</ul>` : `<p class="small">Keine früheren Fälle.</p>`}
    <p class="small">Im Fenster: <b>${remN.length} Reminder</b> (davon ${remN.filter(x => codes.includes(x.code)).length} mit Code ${esc(codes.join(" / "))}) und <b>${eiN.length} Employee Incident</b> (davon ${eiN.filter(x => codes.includes(x.code)).length} mit gleichem Code).</p>
    <p class="small muted">Regel: Der 2. Reminder mit gleichem Code oder der 3. Reminder wird zum Employee Incident; der 2. Employee Incident mit gleichem Code oder der 3. Employee Incident wird zum HR Referral.</p>`;
}
function historyTeaser() {
  if (!S.f.personId) return "";
  const n = HISTORY.filter(h => h.person === S.f.personId).length;
  return n ? `<p class="small muted">${esc(person(S.f.personId).name)} hat ${n} frühere${n === 1 ? "n Fall" : " Fälle"}. Nach dem Festlegen prüft das Tool automatisch die Pattern Aggregation.</p>` : `<p class="small muted">Keine früheren Fälle. Nach dem Festlegen prüft das Tool trotzdem die Pattern Aggregation.</p>`;
}
function viewLevel(c) {
  const lv = c.lv, miss = missing(), bp = baseProposal();
  let side = "";
  if (lv) {
    side += `<div class="kv"><span>Aus der Matrix</span>${levelPill(lv.matrix)}</div>`;
    S.sonder.forEach((x, i) => {
      side += `<div class="sub ${x.status === "open" ? "open" : ""}"><b>Sonderregel: ${x.typ === "straftat" ? "Verdacht auf Straftat" : "Vergeltung gegen meldende Person"}</b> → ${levelPill("HR Referral", 1)}<div class="small">${esc(x.begruendung)}</div>
        ${x.status === "open" && !locked() ? `<div class="row"><button class="btn sm primary" data-act="sonOk" data-i="${i}">Übernehmen</button><input id="son-why-${i}" placeholder="Begründung, falls verworfen"><button class="btn sm" data-act="sonNo" data-i="${i}">Verwerfen</button></div>` : `<span class="small ${x.status === "accepted" ? "okt" : "muted"}">${x.status === "accepted" ? "Übernommen" : x.status === "open" ? "offen" : "Verworfen: " + esc(x.reason || "")}</span>`}</div>`;
    });
    side += `<div class="result"><span>Vorschlag</span>${levelPill(bp.level)}<span class="small muted">${esc(bp.reason)}</span></div>`;
    if (!S.baseSet) side += historyTeaser();
  } else side += `<p class="muted small">Sobald Risk Level und Behavior Level gesetzt sind, liest das Tool das Incident Level aus der Matrix ab.</p>`;
  let act = "";
  if (S.baseSet) act = `<div class="result final"><span>Festgelegt</span>${levelPill(S.baseSet.level)}<span class="small">${esc(ASSESSOR)} · ${fmtT(S.baseSet.at)}${S.baseSet.override ? " · übersteuert" : ""}</span>${!S.levelSet ? `<span class="grow"></span><button class="btn ghost sm" data-act="undoBase">Festlegung aufheben</button>` : ""}</div>`;
  else if (!S.closedNoViolation && lv) {
    act = (S.ui.override ? `<div class="edit"><select id="ov-level">${LEVELS.map(l => `<option ${l === bp.level ? "selected" : ""}>${l}</option>`).join("")}</select><textarea id="ov-reason" rows="2" placeholder="Begründung der Übersteuerung (Pflicht)"></textarea></div>` : "") +
      errBox() + `<div class="actions">${miss.length ? `<span class="hint">Noch offen: ${esc(miss.join(", "))}</span>` : ""}<button class="btn ghost sm" data-act="overrideToggle" ${miss.length ? "disabled" : ""}>${S.ui.override ? "Ohne Übersteuerung" : "Übersteuern"}</button><button class="btn primary" data-act="setLevel" ${miss.length ? "disabled" : ""}>Incident Level festlegen</button></div>`;
  } else act = errBox();
  let h = `<section class="panel level"><div class="ph"><h2><span class="stepno">1</span> Incident Level</h2><span class="hint">Matrix rechnet das Tool, nicht das Sprachmodell</span></div>
    <div class="lvl-grid"><div>${matrixGrid(c.risk, c.behavior)}</div><div class="lvl-side">${side}</div></div>${act}
    ${!S.baseSet && !S.levelSet && !(S.breach && S.breach.wert === "nein") ? `<details class="more"><summary>Kein Verstoss? Fall schliessen</summary><textarea id="nv-reason" rows="2" placeholder="Begründung (Pflicht)"></textarea><button class="btn sm" data-act="closeNV">Als No Breach abschliessen</button></details>` : ""}</section>`;
  if (S.baseSet && S.patternRes) {
    const pa = S.patternRes;
    let res = "";
    if (S.levelSet) res = `<div class="result final"><span>Endgültig</span>${levelPill(S.levelSet.level)}<span class="small">${S.patternDec ? (S.patternDec.status === "accepted" ? "Höherstufung bestätigt" : "Höherstufung verworfen: " + esc(S.patternDec.reason)) : "keine Höherstufung"}</span></div><div class="actions"><button class="btn primary" data-act="goto" data-phase="2">Weiter zur Bearbeitung</button></div>`;
    else if (pa.applied) res = `<div class="uplift">${levelPill(S.baseSet.level)} <span class="arrow">→</span> ${levelPill(pa.level)}<b>${esc(pa.rules.join("; "))}</b></div>
      <p class="small">Die auslösenden Fälle (${pa.triggers.map(t => `<span class="mono">${t.ref}</span>`).join(", ")}) werden diesem Fall zugeordnet und zählen danach nicht mehr einzeln.</p>
      ${errBox()}<div class="actions"><input id="pat-why" class="grow" placeholder="Begründung, falls Sie die Höherstufung verwerfen"><button class="btn" data-act="finReject">Verwerfen</button><button class="btn primary" data-act="finAccept">Höherstufung bestätigen</button></div>`;
    else res = `<div class="uplift none">Keine Höherstufung: Das Incident Level bleibt ${levelPill(S.baseSet.level)}</div><div class="actions"><button class="btn primary" data-act="finNone">Incident Level abschliessen</button></div>`;
    h += `<section class="panel level ${pa.applied && !S.levelSet ? "ai-frame" : ""}" id="pattern-stage"><div class="ph"><h2><span class="stepno">2</span> Pattern Aggregation</h2><span class="hint">Prüfung der Fallhistorie durch das Tool</span></div>${patternDetails(pa)}${res}</section>`;
  }
  return h;
}

function checksHTML(checks) { return checks.map(c => `<li class="${c.ok ? "ok" : "bad"}"><span aria-hidden="true">${c.ok ? "✓" : "!"}</span>${esc(c.label)} <em>${esc(c.detail)}</em></li>`).join(""); }
const SYS = {
  cwb: { key: "cwb", short: "CWB", name: "CWB – Compliance Work Bench", owner: "Compliance · Employee Incidents Team", prefix: "CWB-2026-", next: "Das Employee Incidents Team prüft die Einstufung und meldet sich im Incident-Tool zurück. Erst nach seiner Freigabe informiert der Assessor die Person." },
  hr: { key: "hr", short: "HR ERS", name: "HR Employee Relations System", owner: "HR Disciplinary Team", prefix: "ER-2026-", next: "Das HR Disciplinary Team prüft die Einstufung. Übernimmt es den Fall, führt es das Disziplinarverfahren und informiert die Person selbst. Hält es die Einstufung für zu hoch, leitet es den Fall an die CWB weiter." }
};
const outcome = () => S.closedNoViolation ? "No Breach" : S.levelSet && S.levelSet.level;
const targetSys = () => outcome() === "HR Referral" ? SYS.hr : SYS.cwb;
function payload() {
  const L = outcome(), p = person(S.f.personId), pol = cat(S.f.policy);
  const items = [["Fallakte", S.ref + " · " + (S.f.summary || "")], ["Betroffene Person", p.name + " · " + p.id + " · " + p.funktion]];
  if (pol) items.push([L === "No Breach" ? "Geprüfte Policy" : "Verletzte Policy", pol.code + " · " + pol.name + " (" + pol.weisung + " " + pol.ziffer.split(";")[0] + ")"]);
  items.push(L === "No Breach" ? ["Ergebnis", "No Breach · " + S.closedNoViolation.reason] : ["Bewertung", "Risk " + S.f.risk + " · Behavior " + S.f.behavior + " · Incident Level " + L]);
  if (S.patternRes && S.patternRes.applied && S.patternDec && S.patternDec.status === "accepted") items.push(["Zugeordnete frühere Fälle", S.patternRes.triggers.map(t => t.ref).join(", ")]);
  if (S.rem && S.rem.status === "sent") items.push(["Reminder-E-Mail", "versandt " + fmtT(S.rem.sentAt) + " · Erhaltsbestätigung ausstehend"]);
  items.push(["Verlauf", S.log.length + " Einträge (Vorschläge des Assistenten und Entscheide)"]);
  return items;
}
async function handover() {
  const sys = targetSys();
  S.handover = { sys: sys.key, stage: 1, ticket: sys.prefix + String(4000 + Math.floor(Math.random() * 900)).padStart(5, "0") }; render();
  await wait(700); S.handover.stage = 2; render();
  await wait(900); S.handover.stage = 3; S.handover.at = now();
  updQ("Übergeben an " + sys.short + " · " + S.handover.ticket);
  if (S.qItem) S.qItem.handed = { sys: sys.key, short: sys.short, name: sys.name, owner: sys.owner, ticket: S.handover.ticket, at: S.handover.at, level: outcome(), person: person(S.f.personId).name, summary: S.f.summary, status: "", stat: "" };
  log(ASSESSOR, "An " + sys.name + " übergeben", "Ticket " + S.handover.ticket + " · Empfänger " + sys.owner + " · ohne Angaben zur meldenden Person");
  if (outcome() === "No Breach") {
    S.cchat.push({ id: ++MID, role: "ai", local: true, text: `Der Fall ist im **${sys.name}** als No Breach dokumentiert (Ticket **${S.handover.ticket}**).` });
    setHandedStatus("Dokumentiert · abgeschlossen", "done");
  } else {
    S.review = { sys: sys.key, status: "pending", proposed: outcome(), msgs: [] };
    setHandedStatus(sys.key === "hr" ? "In Prüfung bei HR" : "In Prüfung beim Employee Incidents Team", "wait");
    S.cchat.push({ id: ++MID, role: "ai", local: true, text: `Der Fall ist im **${sys.name}** angekommen (Ticket **${S.handover.ticket}**). ${sys.key === "hr" ? "Das HR Disciplinary Team prüft jetzt die Einstufung." : "Das Employee Incidents Team prüft jetzt die Einstufung. Erst nach seiner Freigabe geht die E-Mail an die Person."} Sobald die Antwort da ist, erscheint sie hier.` });
  }
  S.maxPhase = 3; render();
}
function handoverSection() {
  const L = outcome(); if (!L) return "";
  const sys = targetSys(), H = S.handover;
  if (!H) {
    const remHint = "";
    return `<section class="panel handover"><div class="ph"><h2>${L === "No Breach" ? "Übergabe an" : "Zur Prüfung an"} ${esc(sys.name)}</h2><span class="sysbadge sb-${sys.key}">${esc(sys.short)}</span></div>
      <p>${L === "HR Referral" ? "Ein HR Referral geht zur Prüfung an das HR Disciplinary Team. Übernimmt HR den Fall, führt es das Disziplinarverfahren und informiert die Person selbst." : L === "No Breach" ? "Auch ein Fall ohne Verstoss wird im CWB dokumentiert, mit dem Ergebnis «No Breach» und der Begründung." : "Ein " + esc(L) + " geht zur Prüfung an das Employee Incidents Team. Erst wenn es die Einstufung freigibt, informieren Sie die Person per E-Mail."} Übermittelt werden:</p>
      <ul class="pl">${payload().map(([k, v]) => `<li><span>${esc(k)}</span><b>${esc(v)}</b></li>`).join("")}</ul>
      <p class="small muted">Angaben zur meldenden Person werden nicht übermittelt.</p>${remHint}
      <div class="actions"><button class="btn primary" data-act="handover">An ${esc(sys.short)} übergeben</button></div></section>`;
  }
  const st = n => H.stage > n ? "done" : H.stage === n ? "run" : "";
  let h = `<section class="panel handover"><div class="ph"><h2>Übergabe an ${esc(sys.name)}</h2>${H.stage === 3 ? `<span class="chip chip-ok">Übergeben · ${fmtT(H.at)}</span>` : `<span class="chip chip-muted">wird übermittelt …</span>`}</div>
    <div class="flow ${H.stage === 3 ? "arrived" : "moving"}"><div class="node"><span class="nlogo">M</span><b>Incident-Tool</b><span class="small muted">${esc(S.ref)}</span></div>
      <div class="pipe" aria-hidden="true"><span></span><span></span><span></span><em class="pkt">Fallakte</em></div>
      <div class="node tgt sb-${sys.key}"><span class="nlogo">${esc(sys.short)}</span><b>${esc(sys.name)}</b><span class="small">${H.stage === 3 ? esc(H.ticket) : "wartet …"}</span></div></div>
    <ol class="hsteps"><li class="${st(1)}">Fallakte und Verlauf zusammenstellen</li><li class="${st(2)}">Übermittlung an ${esc(sys.short)}</li><li class="${H.stage === 3 ? "done" : ""}">Eingang bestätigt${H.stage === 3 ? " · Ticket " + esc(H.ticket) : ""}</li></ol></section>`;
  if (H.stage === 3) {
    const p = person(S.f.personId);
    h += `<section class="sysview sv-${sys.key}" aria-label="Ansicht im Zielsystem">
      <div class="sv-bar"><span class="sv-logo">${esc(sys.short)}</span><b>${esc(sys.name)}</b><span class="grow"></span><span class="sv-tab">Eingang</span><span class="sv-sim">Ansicht simuliert</span></div>
      <div class="sv-body"><div class="sv-head"><span class="mono">${esc(H.ticket)}</span><span class="sv-st">${L === "No Breach" ? "Dokumentiert · abgeschlossen" : "Neu · zur Prüfung der Einstufung"}</span>${levelPill(L)}</div>
        <dl class="sv-dl"><dt>Eingang</dt><dd>${fmtT(H.at)} aus Incident-Tool (${esc(S.ref)})</dd><dt>Zuständig</dt><dd>${esc(sys.owner)}</dd><dt>Mitarbeitende Person</dt><dd>${esc(p.name)} · ${esc(p.funktion)} · ${esc(p.abteilung)}</dd>
        ${payload().slice(2).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}<dt>Summary</dt><dd>${esc(S.f.summary)}</dd></dl>
        <div class="sv-att"><span>Anhänge</span><span class="att">Fallakte_${esc(S.ref)}.pdf</span><span class="att">Verlauf.csv</span>${S.rem && S.rem.status === "sent" ? `<span class="att">Reminder-E-Mail.eml</span>` : ""}</div>
        <p class="small muted">${L === "No Breach" ? "Der Fall ist im CWB als «No Breach» abgelegt. Er zählt nicht für die Pattern Aggregation, bleibt aber für Auswertungen und eine allfällige Wiedereröffnung sichtbar." : esc(sys.next)}</p></div></section>`;
  }
  return h;
}
function setHandedStatus(txt, stat) { if (S.qItem && S.qItem.handed) { S.qItem.handed.status = txt; S.qItem.handed.stat = stat; S.qItem.handed.final = finalLevel(); if (stat === "act") S.qItem.handed.answeredAt = now(); } }
function reviewTeam() { return S.review && S.review.sys === "hr" ? "HR Disciplinary Team" : "Employee Incidents Team"; }
function reviewMsg(from, text) { S.review.msgs.push({ from, text, at: now() }); }
function reviewRespond(kind) {
  const R = S.review; if (!R || R.status !== "pending") return;
  if (kind === "eit_ok") {
    R.status = "approved"; R.final = R.proposed;
    reviewMsg("Employee Incidents Team · CWB", `Einverstanden mit der Einstufung «${R.proposed}». Bitte informieren Sie die betroffene Person${R.proposed === "Employee Incident" ? " und merken Sie den Fall für das Year-End-Gespräch vor" : ""}.`);
    log("Employee Incidents Team", "Einstufung freigegeben", R.proposed + " · Ticket " + S.handover.ticket);
  }
  if (kind === "eit_change") {
    const lv = ($("#rev-level") || {}).value, why = (($("#rev-why") || {}).value || "").trim();
    if (!lv || !why) { S.error = "Für die Demo-Antwort bitte Level und Begründung angeben."; render(); return; }
    R.status = "changed"; R.final = lv; S.ui.revChange = false;
    reviewMsg("Employee Incidents Team · CWB", `Wir stufen den Fall als «${lv}» ein (statt «${R.proposed}»). Begründung: ${why} Bitte informieren Sie die betroffene Person entsprechend.`);
    log("Employee Incidents Team", "Einstufung geändert", R.proposed + " → " + lv + " · " + why);
  }
  if (kind === "hr_ok") {
    R.status = "hr_takes"; R.final = "HR Referral";
    reviewMsg("HR Disciplinary Team · HR ERS", "Wir übernehmen den Fall und eröffnen das Disziplinarverfahren nach W-11. Die betroffene Person und der Line Manager werden durch HR informiert. Für Sie ist nichts weiter zu tun; das Ergebnis melden wir zurück.");
    log("HR Disciplinary Team", "Fall übernommen, Disziplinarverfahren eröffnet", "Ticket " + S.handover.ticket + " · Information der Person durch HR");
    setHandedStatus("Disziplinarverfahren bei HR", "done");
    S.cchat.push({ id: ++MID, role: "ai", local: true, text: "HR übernimmt den Fall und informiert die Person selbst. Sie müssen keine E-Mail schreiben. Das Ergebnis des Verfahrens erscheint später im Verlauf." });
    S.error = null; render(); return;
  }
  if (kind === "hr_down") {
    const why = "Der Sachverhalt rechtfertigt aus unserer Sicht kein Disziplinarverfahren; ein Employee Incident mit Year-End-Gespräch genügt.";
    reviewMsg("HR Disciplinary Team · HR ERS", "Zu hoch eingestuft. " + why + " Wir haben den Fall mit dem Vorschlag «Employee Incident» direkt an die CWB weitergeleitet. Zu Ihrer Information.");
    log("HR Disciplinary Team", "Einstufung als zu hoch beurteilt, an CWB weitergeleitet", "Vorschlag Employee Incident · " + why);
    const sys = SYS.cwb; S.handover = { sys: "cwb", stage: 3, at: now(), ticket: sys.prefix + String(4000 + Math.floor(Math.random() * 900)).padStart(5, "0"), viaHR: true };
    R.sys = "cwb"; R.proposed = "Employee Incident"; R.viaHR = true;
    if (S.qItem && S.qItem.handed) Object.assign(S.qItem.handed, { sys: "cwb", short: sys.short, name: sys.name, owner: sys.owner, ticket: S.handover.ticket });
    log("System", "Von HR an CWB weitergeleitet", "Ticket " + S.handover.ticket + " · Employee Incidents Team prüft die endgültige Einstufung");
    setHandedStatus("Von HR an CWB · in Prüfung beim Employee Incidents Team", "wait");
    S.cchat.push({ id: ++MID, role: "ai", local: true, text: "HR hält die Einstufung für zu hoch und hat den Fall an die CWB weitergeleitet. Jetzt legt das **Employee Incidents Team** die endgültige Einstufung fest; danach schreiben Sie die E-Mail an die Person." });
    S.error = null; render(); return;
  }
  setHandedStatus("Antwort eingegangen · E-Mail offen", "act");
  S.cchat.push({ id: ++MID, role: "ai", local: true, text: `Das Employee Incidents Team hat die Einstufung **${R.final}** ${R.status === "approved" ? "freigegeben" : "festgelegt"}. Unten können Sie jetzt die ${R.final === "Employee Incident" ? "Mitteilung zum Employee Incident" : "Reminder-E-Mail"} entwerfen lassen.` });
  S.error = null; render();
}
function flowSteps() {
  const R = S.review, isHR = S.levelSet && S.levelSet.level === "HR Referral", sent = !!(S.rem && S.rem.status === "sent");
  const s = [["Übergabe", !!(S.handover && S.handover.stage === 3)]];
  if (isHR) {
    s.push(["Prüfung durch HR", !!(R && (R.viaHR || R.status !== "pending"))]);
    if (R && R.viaHR) s.push(["Endgültige Einstufung durch das Employee Incidents Team", R.status !== "pending"], ["E-Mail an die Person durch den Assessor", sent], ["Rückmeldung an CWB", sent]);
    else s.push(["Disziplinarverfahren und Information durch HR", !!(R && R.status === "hr_takes")]);
  } else s.push(["Prüfung durch das Employee Incidents Team", !!(R && R.status !== "pending")], ["E-Mail an die Person durch den Assessor", sent], ["Rückmeldung an CWB", sent]);
  const cur = s.findIndex(x => !x[1]);
  return `<ol class="wf">${s.map(([t, d], i) => `<li class="${d ? "done" : i === cur ? "cur" : ""}"><span>${d ? "✓" : i + 1}</span>${esc(t)}</li>`).join("")}</ol>`;
}
function reviewSection() {
  const R = S.review; if (!R) return "";
  const msgs = R.msgs.map(m => `<div class="revmsg"><div class="rm-h"><b>${esc(m.from)}</b><span class="small muted">${fmtT(m.at)}</span></div><p>${esc(m.text)}</p></div>`).join("");
  let h = `<section class="panel review"><div class="ph"><h2>Rückmeldung ${R.sys === "hr" ? "aus dem HR Employee Relations System" : "aus der CWB"}</h2>${R.status === "pending" ? `<span class="chip chip-wait">Antwort ausstehend</span>` : R.status === "hr_takes" ? `<span class="chip chip-ok">HR übernimmt</span>` : `<span class="chip chip-ok">Einstufung ${R.status === "approved" ? "freigegeben" : "geändert"}</span>`}</div>${msgs}`;
  if (R.status === "pending") {
    h += `<p class="small muted">${R.sys === "hr" ? "HR prüft, ob ein Disziplinarverfahren gerechtfertigt ist." : R.viaHR ? "Das Employee Incidents Team legt nach der Rückweisung durch HR die endgültige Einstufung fest." : "Das Employee Incidents Team prüft die Einstufung im CWB."} Im Echtbetrieb kommt die Antwort aus dem Zielsystem zurück.</p>
      <div class="demo"><span class="demo-l">Demo · Antwort simulieren</span>${R.sys === "hr"
        ? `<button class="btn sm primary" data-act="rev" data-v="hr_ok">HR übernimmt den Fall</button><button class="btn sm" data-act="rev" data-v="hr_down">HR: zu hoch eingestuft → an CWB</button>`
        : `<button class="btn sm primary" data-act="rev" data-v="eit_ok">Einverstanden mit «${esc(R.proposed)}»</button><button class="btn sm" data-act="revChange">Andere Einstufung</button>`}</div>`;
    if (S.ui.revChange && R.sys !== "hr") h += `<div class="demo demo-form"><label class="lab" for="rev-level">Einstufung des Employee Incidents Teams</label><select id="rev-level">${["Reminder", "Employee Incident"].filter(x => x !== R.proposed).map(x => `<option>${x}</option>`).join("")}</select>
      <label class="lab" for="rev-why">Begründung</label><textarea id="rev-why" rows="2">${R.proposed === "Reminder" ? "Kundendaten waren betroffen; vergleichbare Fälle wurden als Employee Incident eingestuft." : "Geringes Risiko, sofort behoben; vergleichbare Fälle wurden als Reminder eingestuft."}</textarea><div class="actions"><button class="btn sm primary" data-act="rev" data-v="eit_change">Antwort senden</button></div></div>`;
  }
  return h + `</section>`;
}
function mailSection() {
  const R = S.review; if (!R || !["approved", "changed"].includes(R.status)) return "";
  const F = R.final, p = person(S.f.personId), isEI = F === "Employee Incident", nm = isEI ? "Mitteilung zum Employee Incident" : "Reminder-E-Mail";
  if (S.busy && S.busy.what === "reminder") return `<section class="panel"><div class="busy"><span class="spin"></span>Der Assistent entwirft die ${nm} …</div></section>`;
  if (!S.rem || S.rem.type !== (isEI ? "EI" : "Reminder")) return `<section class="panel"><div class="ph"><h2>${nm}</h2>${levelPill(F)}</div><p>${isEI ? `Die Person wird informiert, dass der Fall ins Year-End-Gespräch einfliesst, und erhält Gelegenheit zur Stellungnahme.` : `Die Person erhält eine Erinnerung an die Regel.`} An ${esc(p.name)}, Kopie an ${esc(p.lm)} (Line Manager). Die E-Mail enthält den allgemeinen Hinweis, dass wiederholte Verstösse höher eingestuft werden können. Ohne Ihre Freigabe wird nichts versendet.</p><div class="actions"><button class="btn primary" data-act="draftReminder">Entwurf erstellen</button></div></section>`;
  const sent = S.rem.status === "sent";
  return `<section class="panel ${sent ? "" : "ai-frame"}"><div class="ph"><h2>${nm}</h2>${sent ? `<span class="chip chip-ok">Versandt (simuliert) · ${fmtT(S.rem.sentAt)}</span>` : `<span class="chip chip-ai">Entwurf des Assistenten</span>`}</div>
      <div class="mailhead"><div><span>Von</span>Compliance</div><div><span>An</span>${esc(p.name)}</div><div><span>Kopie</span>${esc(p.lm)} (Line Manager)</div></div>
      <label class="lab" for="rem-subject">Betreff</label><input id="rem-subject" value="${esc(S.rem.betreff)}" ${sent ? "readonly" : ""}>
      <label class="lab" for="rem-text">Text</label><textarea id="rem-text" rows="16" ${sent ? "readonly" : ""}>${esc(S.rem.text)}</textarea>
      <ul class="checks" id="rem-checks">${checksHTML(reminderChecks(S.rem.text, remCtx()))}</ul>
      ${sent ? `<div class="sentinfo"><div><b>Datum der Information</b> ${fmtD(S.rem.sentAt)} · Start des 12-Monats-Fensters</div>${isEI ? `<div><b>Year-End-Gespräch</b> vorgemerkt · Zusammenfassung an ${esc(p.lm)}</div><div><b>Stellungnahme bis</b> ${fmtD(addBD(S.rem.sentAt, 10))}</div>` : `<div><b>Erhaltsbestätigung</b> ausstehend · Erinnerung am ${fmtD(addBD(S.rem.sentAt, 5))}</div>`}<div><b>Appeal möglich bis</b> ${fmtD(addBD(S.rem.sentAt, 10))}</div><div><b>Rückmeldung an CWB</b> erfolgt · Ticket ${esc(S.handover.ticket)}</div></div><div class="actions"><button class="btn" data-act="toQueue">Zum Posteingang</button><button class="btn primary" data-act="goto" data-phase="3">Verlauf ansehen</button></div>`
      : `<div class="actions"><button class="btn ghost" data-act="draftReminder">Neu entwerfen</button><button class="btn primary" data-act="releaseReminder">Versand freigeben</button></div>`}</section>`;
}
function viewHandle() {
  if (S.closedNoViolation) return `<section class="panel"><div class="ph"><h2>Ergebnis</h2>${levelPill("No Breach")}</div><p>${esc(S.closedNoViolation.reason)}</p><p class="small muted">Festgelegt von ${esc(ASSESSOR)} · ${fmtT(S.closedNoViolation.at)}</p></section>` + handoverSection();
  const L = S.levelSet && S.levelSet.level; if (!L) return `<section class="panel"><p class="empty">Zuerst das Incident Level festlegen.</p></section>`;
  const R = S.review;
  return `<section class="panel"><div class="ph"><h2>Bearbeitungsweg</h2>${levelPill(finalLevel())}</div>
    <p>${L === "HR Referral" ? "Das HR Disciplinary Team prüft die Einstufung. Ist es einverstanden, führt es das Disziplinarverfahren und informiert die Person. Hält es die Einstufung für zu hoch, leitet es den Fall an die CWB weiter; dann legt das Employee Incidents Team die endgültige Einstufung fest und Sie schreiben die E-Mail." : "Das Employee Incidents Team prüft Ihre Einstufung in der CWB. Erst nach seiner Freigabe schreiben Sie die E-Mail an die Person: " + (L === "Reminder" ? "eine Erinnerung an die Regel." : "die Mitteilung, dass der Fall ins Year-End-Gespräch einfliesst.")}</p>
    ${flowSteps()}
    ${S.patternRes && S.patternRes.applied && S.patternDec && S.patternDec.status === "accepted" ? `<p class="small">Zugeordnete frühere Fälle: ${S.patternRes.triggers.map(t => `<span class="mono">${t.ref}</span>`).join(", ")}. In Texten an die betroffene Person werden frühere Fälle nicht erwähnt.</p>` : ""}</section>
    ${R && R.viaHR ? "" : handoverSection()}${reviewSection()}${mailSection()}`;
}
function viewLog() {
  const n = re => S.log.filter(l => l.actor === ASSESSOR && re.test(l.action)).length;
  return `<section class="panel"><div class="ph"><h2>Verlauf ${esc(S.ref)}</h2><span class="hint">Vorschlag und Entscheid bleiben beide gespeichert</span></div>
    <div class="stats"><div><b>${S.log.filter(l => l.actor === "Assistent").length}</b><span>Beiträge des Assistenten</span></div><div><b>${n(/bestätigt/)}</b><span>Vorschläge bestätigt</span></div><div><b>${n(/geändert/)}</b><span>geändert</span></div><div><b>${n(/verworfen/)}</b><span>verworfen</span></div><div><b>${S.levelSet && S.levelSet.override ? "ja" : "nein"}</b><span>Level übersteuert</span></div></div>
    <div class="tablewrap"><table class="log"><thead><tr><th>Zeit</th><th>Wer</th><th>Aktion</th><th>Detail</th></tr></thead><tbody>
    ${S.log.map(l => `<tr class="a-${l.actor === "Assistent" ? "ai" : l.actor === "System" ? "sys" : "hu"}"><td class="mono">${fmtT(l.at)}</td><td>${esc(l.actor)}</td><td>${esc(l.action)}</td><td>${esc(l.detail)}</td></tr>`).join("")}</tbody></table></div>
    <div class="actions"><button class="btn" data-act="toQueue">Zurück zum Posteingang</button></div></section>`;
}
function assistantPanel() {
  const users = S.cchat.filter(m => m.role === "user").length;
  const hint = locked() ? "Fragen zum Fall oder zu den Weisungen …" : users ? "Antworten oder ergänzen …" : "Vorfall beschreiben, z. B. «Lukas Schmid hat letzte Woche Aktien ohne Bewilligung gekauft» …";
  return `<div class="ap"><header class="ap-h"><span class="dot" aria-hidden="true"></span><div><b>Assistent</b><div class="small muted">${S.mode === "live" ? "KI live" : "Vorbereitete Antworten"} · stützt sich auf W-01 bis W-11</div></div></header>
    <div class="msgs">${S.cchat.map(m => msgHTML(m, "cap")).join("")}${S.busy && (S.busy.what === "capture" || (S.busy.what === "answer" && !S.cchat.some(m => m.pending))) ? busyMsg(S.busy.what) : ""}</div>
    <form class="composer" data-form="cap"><textarea id="c-in" rows="2" placeholder="${esc(hint)}">${esc(S.ui.cDraft || "")}</textarea><button class="btn primary" type="submit" ${S.busy ? "disabled" : ""}>Senden</button></form></div>`;
}

// ---------- Wissensbasis ----------
function zKey(z) { return String(z || "").replace(/^Ziff\.\s*/, "").split(/[\s;]/)[0]; }
function zMatch(cardZ, z) {
  if (!z) return true;
  if (cardZ === z || z.startsWith(cardZ + ".") || cardZ.startsWith(z + ".")) return true;
  const r = cardZ.match(/^(\d+)-(\d+)$/); if (r) { const n = parseInt(z, 10); return n >= +r[1] && n <= +r[2]; }
  return false;
}
function sourceLookup(src) {
  const m = String(src).match(/([WE]-\d{2})(?:\s+Ziff\.\s*([\d.\-]+)(?:\s*Nr\.\s*(\d+))?)?/); if (!m) return null;
  const doc = m[1], z = m[2] ? m[2].replace(/\.$/, "") : "", nr = m[3];
  let cards = KB.filter(k => k.doc === doc && zMatch(zKey(k.ziff), z));
  if (nr) { const withNr = cards.filter(k => k.ziff.includes("Nr. " + nr)); if (withNr.length) cards = withNr.concat(cards.filter(k => !withNr.includes(k))); }
  const exact = cards.length > 0;
  if (!exact) cards = KB.filter(k => k.doc === doc);
  const codes = CATALOG.filter(c => c.weisung === doc && (!z || c.ziffer.split(";").some(p => zMatch(zKey(p.trim()), z))));
  const codesNr = nr ? codes.filter(c => c.ziffer.split(";").some(p => zKey(p.trim()) === z && p.includes("Nr. " + nr))) : [];
  if (codesNr.length) { codes.length = 0; codes.push(...codesNr); }
  return { doc, label: src, cards, exact, codes };
}
function drawerHTML() {
  const d = S.ui.drawer; if (!d) return "";
  return `<div class="drawer-bg" data-act="closeDrawer"></div><aside class="drawer" role="dialog" aria-label="Quelle ${esc(d.label)}">
    <header><div><span class="src">${esc(d.label)}</span><h2>${esc(DOCS[d.doc] || d.doc)}</h2></div><button class="btn ghost sm" data-act="closeDrawer" aria-label="Schliessen">Schliessen</button></header>
    <div class="dr-body">
      ${d.codes.length ? `<div class="lab">Wortlaut der Weisung</div>${d.codes.map(c => `<blockquote><b>${esc(c.weisung)} ${esc(c.ziffer)}</b><br>«${esc(c.zitat)}»<div class="small muted">Risiko-Code ${esc(c.code)} · ${esc(c.name)}</div></blockquote>`).join("")}` : ""}
      <div class="lab">${d.exact ? "Auszug in der Wissensbasis" : "Keine genaue Ziffer gefunden, alle Auszüge zu " + esc(d.doc)}</div>
      ${d.cards.map(k => kbCard(k)).join("")}
      <p class="small muted">Die Auszüge sind verdichtet. Verbindlich ist der Text der Weisung.</p>
      <div class="actions"><button class="btn" data-act="kbOpen" data-v="${esc(d.doc)}" data-id="${d.cards[0] ? d.cards[0].id : ""}">In der Wissensbasis anzeigen</button></div>
    </div></aside>`;
}
function kbCard(k, rank) {
  return `<article class="kbc ${S.ui.kbHi === k.id ? "hi" : ""}" id="kb-${k.id}">${rank ? `<span class="rank">${rank}</span>` : ""}<div class="kbz"><span class="src">${esc(k.doc)} ${esc(k.ziff)}</span><b>${esc(k.titel)}</b></div><p>${esc(k.text)}</p></article>`;
}
function kbResults() {
  const q = (S.ui.kbq || "").trim();
  if (q.length < 3) return `<p class="small muted">Zum Beispiel: «Darf ich Konzerttickets von einem Lieferanten annehmen?» oder «Was tun nach einem Phishing-Klick?»</p>`;
  const r = retrieve(q, 6);
  if (!r.length) return `<p class="small muted">Keine passenden Auszüge gefunden. Der Assistent würde sagen, dass die Weisungen das nicht abdecken, und die zuständige Stelle nennen.</p>`;
  return `<p class="small muted">Diese ${r.length} Auszüge gibt der Assistent dem Sprachmodell zu dieser Frage mit, in dieser Reihenfolge. Das Modell antwortet nur auf dieser Grundlage.</p>` + r.map((k, i) => kbCard(k, i + 1)).join("");
}
function setBasis(msg, sel, question) {
  let items = (msg.src || []).map(sourceLookup).filter(Boolean);
  const seen = new Set(); items = items.filter(it => { const k = it.label; if (seen.has(k)) return false; seen.add(k); return true; });
  let fallback = null;
  if (!items.length && question) fallback = retrieve(question, 3);
  S.ui.basis = { mid: msg.id, sel: sel || (items[0] && items[0].label), items, fallback };
}
function basisBox() {
  const b = S.ui.basis;
  if (!b) return `<section class="basis empty"><div class="lab">Passende Weisungsstelle</div><p class="small muted">Stellen Sie links eine Frage. Hier erscheint die Weisungsstelle, auf die sich die Antwort stützt, mit dem Wortlaut der Weisung.</p></section>`;
  const d = b.items.find(x => x.label === b.sel) || b.items[0];
  let body;
  if (d) body = `<div class="kbz"><span class="src">${esc(d.label)}</span><b>${esc(DOCS[d.doc] || d.doc)}</b></div>
      ${d.codes.slice(0, 2).map(c => `<blockquote>«${esc(c.zitat)}»<div class="small muted">Wortlaut ${esc(c.weisung)} ${esc(c.ziffer)} · Risiko-Code ${esc(c.code)}</div></blockquote>`).join("")}
      ${d.cards.slice(0, 1).map(k => `<p class="small"><b>${esc(k.titel)}:</b> ${esc(k.text)}</p>`).join("")}`;
  else body = (b.fallback || []).slice(0, 1).map(k => `<div class="kbz"><span class="src">${esc(k.doc)} ${esc(k.ziff)}</span><b>${esc(k.titel)}</b></div><p class="small">${esc(k.text)}</p>`).join("") || `<p class="small muted">Zu dieser Antwort wurde keine Weisungsstelle zitiert.</p>`;
  const others = b.items.filter(x => x !== d);
  return `<section class="basis"><div class="lab">Passende Weisungsstelle</div>${body}
    ${others.length ? `<div class="qr small"><span class="muted">Ebenfalls zitiert:</span>${others.map(x => `<button class="src" data-act="src" data-mid="${b.mid}" data-v="${esc(x.label)}">${esc(x.label)}</button>`).join("")}</div>` : ""}</section>`;
}
function hl(text, toks) { let h = esc(text); toks.forEach(t => { const re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"); h = h.replace(re, "<mark>$1</mark>"); }); return h; }
function kbListHTML() {
  const f = S.ui.kbDoc || "all";
  const raw = (S.ui.kbq || "").trim();
  const toks = raw.split(/\s+/).filter(t => t.length >= 2);
  const nt = toks.map(norm);
  const hit = s => { const n = norm(s); return nt.every(t => n.includes(t)); };
  if (f === "codes") {
    const cs = CATALOG.filter(c => !nt.length || hit(c.code + " " + c.name + " " + c.weisung + " " + c.ziffer + " " + c.zitat));
    return `<p class="small muted">${cs.length} Risiko-Codes</p>` + cs.map(c => `<article class="kbc"><div class="kbz"><span class="src">${c.code}</span><b>${hl(c.name, toks)}</b></div><p class="small muted">${esc(c.weisung)} ${esc(c.ziffer)}</p><p>«${hl(c.zitat, toks)}»</p></article>`).join("");
  }
  const cards = KB.filter(k => !EMP_HIDDEN.includes(k.doc) && (f === "all" || k.doc === f) && (!nt.length || hit(k.doc + " " + k.ziff + " " + k.titel + " " + k.text + " " + DOCS[k.doc])));
  if (!cards.length) return `<p class="small muted">Keine Treffer. Versuchen Sie ein anderes Stichwort oder fragen Sie links den Assistenten.</p>`;
  let out = `<p class="small muted">${nt.length ? cards.length + " Treffer" : cards.length + " Auszüge"}</p>`, cur = "";
  cards.forEach(k => { if (k.doc !== cur) { cur = k.doc; out += `<h3 class="kbdh"><span class="mono">${k.doc}</span> ${esc(DOCS[k.doc])}</h3>`; } out += `<article class="kbc ${S.ui.kbHi === k.id ? "hi" : ""}" id="kb-${k.id}"><div class="kbz"><span class="src">${esc(k.doc)} ${esc(k.ziff)}</span><b>${hl(k.titel, toks)}</b></div><p>${hl(k.text, toks)}</p></article>`; });
  return out;
}
function kbPanel() {
  const f = S.ui.kbDoc || "all";
  const chip = (v, t) => `<button class="fchip ${f === v ? "on" : ""}" data-act="kbDoc" data-v="${v}">${t}</button>`;
  return `<header class="kbp-h"><h2>Weisungen</h2><span class="small muted">W-01 bis W-11 · E-01, E-03, E-04</span></header>
    <div class="kbp-body" id="kb-scroll">
      ${basisBox()}
      <section class="kbsearch"><div class="lab">Weisungen durchsuchen</div>
        <input id="kb-q" type="search" value="${esc(S.ui.kbq || "")}" placeholder="Stichwort, z. B. Geschenk, Phishing, Haltedauer …" autocomplete="off">
        <nav class="fchips" aria-label="Filter">${chip("all", "Alle")}${Object.keys(DOCS).filter(d => !EMP_HIDDEN.includes(d)).map(d => chip(d, d)).join("")}${chip("codes", "Risiko-Codes")}</nav>
        <div id="kb-list" class="kblist">${kbListHTML()}</div></section>
    </div>`;
}
function openSource(src) { const r = sourceLookup(src); if (!r) return; S.ui.drawer = r; render(); }

// ---------- Ereignisse ----------
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
  const a = b.dataset.act;
  if (a === "tab") { S.tab = b.dataset.v; S.error = null; S.ui.drawer = null; render(); window.scrollTo({ top: 0 }); return; }
  if (a === "src") { e.preventDefault(); if (S.tab === "chat") { const m = S.chat.find(x => String(x.id) === b.dataset.mid); if (m) { setBasis(m, b.dataset.v); render(); const sc = document.getElementById("kb-scroll"); if (sc) sc.scrollTop = 0; } } else openSource(b.dataset.v); return; }
  if (a === "srcClose") { S.ui.kbSrc = null; render(); return; }
  if (a === "closeDrawer") { S.ui.drawer = null; render(); return; }
  if (a === "kbDoc") { S.ui.kbDoc = b.dataset.v; S.ui.kbHi = null; render(); return; }
  if (a === "kbOpen") { S.ui.drawer = null; S.tab = "chat"; S.ui.kbDoc = b.dataset.v; S.ui.kbHi = b.dataset.id || null; S.ui.kbBrowse = true; render(); setTimeout(() => { const el = document.getElementById("kb-" + b.dataset.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 30); return; }
  if (a === "mode") { S.mode = b.dataset.v; S.error = null; render(); return; }
  if (a === "stop") { if (S.busy && S.busy.ctl) S.busy.ctl.abort(); return; }
  if (a === "chatSuggest") { chatSend(b.dataset.v); return; }
  if (a === "repStart") { const i = S.chat.findIndex(m => String(m.id) === b.dataset.id); const q = S.chat.slice(0, i).reverse().find(m => m.role === "user"); S.ui.report = { mid: b.dataset.id, text: q ? q.text : "" }; render(); return; }
  if (a === "repCancel") { S.ui.report = null; render(); return; }
  if (a === "repSend") { const mid = S.ui.report && S.ui.report.mid; const m = S.chat.find(x => String(x.id) === mid); const it = sendReport(); if (m && it) m.reported = it.ref; render(); return; }
  if (a === "openQ") { openQueueItem(b.dataset.id); return; }
  if (a === "qTab") { S.ui.qTab = b.dataset.v; render(); return; }
  if (a === "toQueue") { saveCase(); S.ui.qTab = S.qItem && S.qItem.handed ? (S.qItem.handed.stat === "act" ? "ans" : "sent") : "open"; S.caseOpen = false; S.qItem = null; render(); window.scrollTo({ top: 0 }); return; }
  if (a === "toIncident") { const i = S.chat.findIndex(m => String(m.id) === b.dataset.id); const q = i > 0 ? S.chat[i - 1].text : ""; S.tab = "capture"; newCase(true); render(); if (q) captureSend(q); return; }
  if (a === "cOpt") { captureSend(b.dataset.v); return; }
  if (a === "cExample") { const p = PRESETS.find(x => x.id === b.dataset.id); if (p) captureSend(p.text); return; }
  if (a === "newCase") { newCase(); return; }
  if (a === "pickPerson") { S.f.personId = b.dataset.v; delete S.kiF.personId; log(ASSESSOR, "Person gewählt", b.dataset.v); render(); return; }
  if (a === "confirm") { confirmJudged(b.dataset.k); return; }
  if (a === "undoBase") { undoBase(); return; }
  if (a === "handover") { if (!S.handover) handover(); return; }
  if (a === "finAccept") { finalizeLevel("accept"); return; }
  if (a === "finReject") { finalizeLevel("reject"); return; }
  if (a === "finNone") { finalizeLevel("none"); return; }
  if (a === "patOk") { S.patternDec = { status: "accepted" }; log(ASSESSOR, "Pattern Aggregation bestätigt", current().lv.pattern.rules.join("; ")); render(); return; }
  if (a === "patNo") { const r = ($("#pat-why") || {}).value || ""; if (!r.trim()) { S.error = "Bitte begründen, weshalb die Pattern Aggregation verworfen wird."; render(); return; } S.patternDec = { status: "rejected", reason: r.trim() }; log(ASSESSOR, "Pattern Aggregation verworfen", r.trim()); S.error = null; render(); return; }
  if (a === "sonOk") { const x = S.sonder[+b.dataset.i]; x.status = "accepted"; log(ASSESSOR, "Sonderregel bestätigt", x.typ); render(); return; }
  if (a === "sonNo") { const x = S.sonder[+b.dataset.i]; const r = ($("#son-why-" + b.dataset.i) || {}).value || ""; if (!r.trim()) { S.error = "Bitte begründen, weshalb die Sonderregel verworfen wird."; render(); return; } x.status = "rejected"; x.reason = r.trim(); log(ASSESSOR, "Sonderregel verworfen", x.typ + " · " + x.reason); S.error = null; render(); return; }
  if (a === "goto") { S.phase = +b.dataset.phase; S.error = null; render(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  if (a === "overrideToggle") { S.ui.override = !S.ui.override; render(); return; }
  if (a === "setLevel") { setLevel(); return; }
  if (a === "closeNV") { closeNoViolation(); return; }
  if (a === "draftReminder") { draftReminder(); return; }
  if (a === "rev") { reviewRespond(b.dataset.v); return; }
  if (a === "revChange") { S.ui.revChange = !S.ui.revChange; render(); return; }
  if (a === "poStart") { poStart(); return; }
  if (a === "poSend") { poSend(); return; }
  if (a === "poCancel") { S.po = null; render(); return; }
  if (a === "releaseReminder") { releaseReminder(); return; }
});
document.addEventListener("submit", e => { const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault(); const v = f.querySelector("textarea").value; if (f.dataset.form === "chat") chatSend(v); else captureSend(v); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && S.ui.drawer) { S.ui.drawer = null; render(); return; } if (e.key === "Enter" && !e.shiftKey && (e.target.id === "chat-in" || e.target.id === "c-in")) { e.preventDefault(); e.target.closest("form").requestSubmit(); } });
document.addEventListener("change", e => {
  const t0 = e.target;
  if (t0.id === "po-weisung" && S.po && S.po.status === "draft") { S.po = poDraft(t0.value); render(); return; }
  const t = e.target; if (!t.id || !t.id.startsWith("f-") || locked()) return;
  const k = t.id.slice(2);
  if (k === "selbstmeldung") { S.f.selbstmeldung = t.checked; delete S.kiF.selbstmeldung; return; }
  if (DATEF.includes(k)) {
    S.ui.raw = S.ui.raw || {};
    const v = parseCH(t.value, k === "eingang");
    if (v === null) S.ui.raw[k] = t.value; else { delete S.ui.raw[k]; S.f[k] = v; delete S.kiF[k]; S.patternDec = null; log(ASSESSOR, LABELS[k] + " gesetzt", v ? fmtD(v) : "leer"); }
    setTimeout(render, 0); return;
  }
  if (t.tagName === "SELECT" || t.type === "date" || t.type === "datetime-local") {
    S.f[k] = t.value; delete S.kiF[k];
    if (JUDGED.includes(k)) { delete S.conf[k]; if (S.prop[k] === undefined) log(ASSESSOR, LABELS[k] + " gesetzt", t.value); }
    if (["risk", "behavior", "policy", "policy2", "personId", "vorfall_datum"].includes(k)) S.patternDec = null;
    if (k === "policy" && S.f.policy2 === S.f.policy) S.f.policy2 = "";
    render();
  } else setTimeout(render, 0);
});
document.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "chat-in") S.ui.chatDraft = t.value;
  if (t.id === "kb-q") { S.ui.kbq = t.value; const r = $("#kb-list"); if (r) r.innerHTML = kbListHTML(); return; }
  if (t.id === "c-in") S.ui.cDraft = t.value;
  if (t.id && t.id.startsWith("f-") && !locked() && (t.tagName === "TEXTAREA" || t.type === "text" || t.tagName === "INPUT" && !t.type.startsWith("date") && t.type !== "checkbox")) { const k = t.id.slice(2); if (k in S.f && !DATEF.includes(k)) { S.f[k] = t.value; if (S.kiF[k]) { delete S.kiF[k]; const tag = t.closest(".fld").querySelector(".ki"); if (tag) tag.remove(); } } }
  if (t.id === "po-text" && S.po) S.po.text = t.value;
  if (t.id === "po-subject" && S.po) S.po.betreff = t.value;
  if (t.id === "rem-text" && S.rem) { S.rem.text = t.value; const ul = $("#rem-checks"); if (ul) ul.innerHTML = checksHTML(reminderChecks(S.rem.text, remCtx())); }
});

newCase(true); S.caseOpen = false; seedQueue(); seedAnswers();
render();
initAI();
