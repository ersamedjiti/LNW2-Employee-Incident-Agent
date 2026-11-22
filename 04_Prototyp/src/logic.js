// ===== Geschäftsregeln aus dem Ist-Prozess (deterministisch, ohne KI) =====
const LEVELS = ["Reminder", "Employee Incident", "HR Referral"];
const RISKS = ["Low", "Medium", "High"];
const BEHAVIORS = ["Mitigating", "Expected", "Aggravating", "Severely Aggravating"];
const MATRIX = {
  "Mitigating":           { Low: "Reminder",          Medium: "Reminder",          High: "HR Referral" },
  "Expected":             { Low: "Reminder",          Medium: "Employee Incident", High: "HR Referral" },
  "Aggravating":          { Low: "Employee Incident", Medium: "Employee Incident", High: "HR Referral" },
  "Severely Aggravating": { Low: "HR Referral",       Medium: "HR Referral",       High: "HR Referral" }
};
const lvlIdx = l => LEVELS.indexOf(l);
const maxLevel = (...ls) => ls.filter(Boolean).reduce((a, b) => (lvlIdx(b) > lvlIdx(a) ? b : a));

function parseD(s) { if (!s) return null; const [y, m, d] = s.slice(0, 10).split("-").map(Number); return new Date(y, m - 1, d); }
function isoD(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function fmtD(s) { const d = typeof s === "string" ? parseD(s) : s; if (!d || isNaN(d)) return "–"; return String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear(); }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function addBD(d, n) { const x = new Date(d); let k = 0; while (k < n) { x.setDate(x.getDate() + 1); const w = x.getDay(); if (w !== 0 && w !== 6) k++; } return x; }
function minus12M(d) { const x = new Date(d); x.setFullYear(x.getFullYear() - 1); return x; }

// Pattern Aggregation nach Ist-Prozess
function patternCheck(history, personId, code, incidentDateStr, baseLevel) {
  const codes = (Array.isArray(code) ? code : [code]).filter(Boolean);
  const inc = parseD(incidentDateStr);
  const from = minus12M(inc);
  const considered = history.filter(h => h.person === personId).map(h => {
    const d = parseD(h.informed);
    let counts = true, why = "im 12-Monats-Fenster, abgeschlossen";
    if (h.status !== "abgeschlossen") { counts = false; why = h.status + ": zählt nicht"; }
    else if (h.linkedTo) { counts = false; why = "bereits " + h.linkedTo + " zugeordnet"; }
    else if (d < from || d > inc) { counts = false; why = "ausserhalb des 12-Monats-Fensters"; }
    return { ...h, counts, why };
  }).sort((a, b) => a.informed.localeCompare(b.informed));
  let level = baseLevel; const triggers = []; const rules = [];
  if (level === "Reminder") {
    const rem = considered.filter(h => h.counts && h.level === "Reminder");
    const same = rem.filter(h => codes.includes(h.code));
    if (same.length + 1 >= 2) { level = "Employee Incident"; triggers.push(...same); rules.push((same.length + 1) + ". Reminder mit gleichem Risiko-Code " + same[0].code + " innert 12 Monaten"); }
    else if (rem.length + 1 >= 3) { level = "Employee Incident"; triggers.push(...rem); rules.push((rem.length + 1) + ". Reminder mit beliebigem Risiko-Code innert 12 Monaten"); }
  }
  if (level === "Employee Incident") {
    const ei = considered.filter(h => h.counts && h.level === "Employee Incident");
    const same = ei.filter(h => codes.includes(h.code));
    if (same.length + 1 >= 2) { level = "HR Referral"; triggers.push(...same); rules.push((same.length + 1) + ". Employee Incident mit gleichem Risiko-Code " + same[0].code + " innert 12 Monaten"); }
    else if (ei.length + 1 >= 3) { level = "HR Referral"; triggers.push(...ei); rules.push((ei.length + 1) + ". Employee Incident mit beliebigem Risiko-Code innert 12 Monaten"); }
  }
  return { from: isoD(from), to: incidentDateStr, considered, level, triggers, rules, applied: level !== baseLevel };
}

function computeLevel({ risk, behavior, code, personId, incidentDate, history, sonder, patternAccepted = true }) {
  if (!risk || !behavior) return null;
  const matrix = MATRIX[behavior][risk];
  const pattern = (Array.isArray(code) ? code.some(Boolean) : code) && personId && incidentDate ? patternCheck(history, personId, code, incidentDate, matrix) : null;
  const sonderHit = (sonder || []).some(s => s.typ === "straftat" || s.typ === "vergeltung");
  const patternLevel = pattern && pattern.applied && patternAccepted ? pattern.level : null;
  const proposed = maxLevel(matrix, patternLevel, sonderHit ? "HR Referral" : null);
  let reason = "Matrix: " + risk + " × " + behavior;
  if (sonderHit && proposed === "HR Referral" && matrix !== "HR Referral") reason = "Sonderregel geht der Matrix vor";
  else if (patternLevel && proposed === patternLevel && patternLevel !== matrix) reason = "Pattern Aggregation hebt an";
  return { matrix, pattern, sonderHit, proposed, reason };
}

// Fristen nach Ist-Prozess (vorläufig)
function deadlines(receivedStr, risk, level, levelSetAt) {
  const r = new Date(receivedStr);
  const out = [
    { key: "erfassen", label: "Erfassung und Analyse", due: addBD(r, 1) },
    { key: "level", label: "Incident Level festlegen", due: addBD(r, 2) }
  ];
  if (risk === "High") out.push({ key: "esk", label: "Eskalation an Leitung Compliance (High)", due: r, sameDay: true });
  if (level === "Reminder") out.push({ key: "rem", label: "Reminder versenden", due: addBD(r, 3) });
  if (level === "Employee Incident") out.push({ key: "ei", label: "Employee Incident abschliessen", due: addDays(r, 30) });
  if (level === "HR Referral") {
    out.push({ key: "hr", label: "Übergabe an HR Disciplinary Team", due: addBD(levelSetAt ? new Date(levelSetAt) : r, 2) });
    out.push({ key: "hrc", label: "HR Referral abschliessen", due: addDays(r, 60) });
  }
  return out;
}

const REPEAT_SENTENCE = "Bei wiederholten Verstössen kann ein künftiger Fall höher eingestuft werden.";

// Prüfungen für den Reminder-Entwurf (Regeln aus dem Ist-Prozess)
function reminderChecks(text, ctx) {
  const t = (text || "").toLowerCase();
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const checks = [];
  checks.push({ ok: words <= 170, label: "Höchstens 170 Wörter", detail: words + " Wörter" });
  const patternWords = ["employee incident", "nächsten mal", "nächste mal", "pattern", "hr referral", "sanktion", "konsequenz", "früheren fall", "frühere fälle", "kündigung"];
  const hitP = patternWords.filter(w => t.includes(w));
  checks.push({ ok: hitP.length === 0, label: "Keine Drohung, kein Hinweis auf frühere Fälle oder Sanktionen", detail: hitP.length ? "gefunden: " + hitP.join(", ") : "keine Treffer" });
  const hasRep = t.includes("höher eingestuft");
  checks.push({ ok: hasRep, label: "Allgemeiner Hinweis zu Wiederholungen", detail: hasRep ? "vorhanden" : "fehlt" });
  const reporterTerms = ["gemeldet von", "meldende person", "hinweisgeb", "kollegin hat", "kollege hat", "vorgesetzte hat beobachtet"];
  if (ctx.reporterName) reporterTerms.push(ctx.reporterName.toLowerCase());
  const hitR = ctx.selbstmeldung ? [] : reporterTerms.filter(w => t.includes(w));
  checks.push({ ok: hitR.length === 0, label: "Keine Angaben zur meldenden Person", detail: ctx.selbstmeldung ? "Selbstmeldung: Dank zulässig" : (hitR.length ? "gefunden: " + hitR.join(", ") : "keine Treffer") });
  const hasRef = ctx.ref && text.includes(ctx.ref);
  checks.push({ ok: !!hasRef, label: "Referenznummer enthalten", detail: ctx.ref });
  const hasConfirm = t.includes("bestätigen");
  checks.push({ ok: hasConfirm, label: "Bitte um Erhaltsbestätigung", detail: hasConfirm ? "vorhanden" : "fehlt" });
  return checks;
}

// Vorlage aus dem Ist-Prozess, deterministisch gefüllt (Offline-Modus)
function fillReminder(ctx) {
  const c = ctx.rule;
  const lines = [
    "Guten Tag " + ctx.personName,
    "",
    "Am " + fmtD(ctx.incidentDate) + " wurde festgestellt, dass " + ctx.kurzbeschrieb + ". Damit wurde die Regel «" + c.name + "» nicht eingehalten.",
    "",
    "Die Regel besagt (" + c.weisung + " " + c.ziffer.split(";")[0] + "): «" + c.zitat.replace(/\.$/, "") + "». Sie dient dazu, " + c.zweck + ".",
    "",
    "Bitte beachten Sie künftig: " + c.hinweis + " " + REPEAT_SENTENCE
  ];
  if (ctx.selbstmeldung) lines.push("", "Vielen Dank, dass Sie den Vorfall selbst gemeldet haben.");
  lines.push("", "Bitte bestätigen Sie den Erhalt dieser Nachricht über den Link unten. Dieser Hinweis wird unter der Referenz " + ctx.ref + " dokumentiert. Sind Sie mit der Beurteilung nicht einverstanden, wenden Sie sich innert 10 Arbeitstagen an Ihren Line Manager. Bei Fragen steht Ihnen Compliance gerne zur Verfügung.",
    "", "Freundliche Grüsse", "Compliance", "", "[Link: Erhalt bestätigen]");
  return { betreff: "Erinnerung an die Regel «" + c.name + "» – " + ctx.ref, text: lines.join("\n") };
}

// Mitteilung Employee Incident (Vorlage des Prototyps, deterministisch gefüllt)
function fillEI(ctx) {
  const c = ctx.rule;
  const lines = [
    "Guten Tag " + ctx.personName,
    "",
    "Am " + fmtD(ctx.incidentDate) + " wurde festgestellt, dass " + ctx.kurzbeschrieb + ". Damit wurde die Regel «" + c.name + "» nicht eingehalten (" + c.weisung + " " + c.ziffer.split(";")[0] + "). Die Regel dient dazu, " + c.zweck + ".",
    "",
    "Compliance hat den Vorfall geprüft und dokumentiert. Er wird in Ihr diesjähriges Year-End-Gespräch aufgenommen; Ihr Line Manager erhält dazu eine kurze Zusammenfassung.",
    "",
    "Sie haben die Möglichkeit, bis am " + fmtD(addBD(ctx.sentAt || new Date(), 10)) + " schriftlich Stellung zu nehmen. Ihre Stellungnahme wird dem Fall beigelegt.",
    "",
    "Bitte beachten Sie künftig: " + c.hinweis + " " + REPEAT_SENTENCE
  ];
  if (ctx.selbstmeldung) lines.push("", "Vielen Dank, dass Sie den Vorfall selbst gemeldet haben.");
  lines.push("", "Bitte bestätigen Sie den Erhalt dieser Nachricht über den Link unten. Der Fall ist unter der Referenz " + ctx.ref + " dokumentiert. Sind Sie mit der Beurteilung nicht einverstanden, wenden Sie sich innert 10 Arbeitstagen an Ihren Line Manager. Bei Fragen steht Ihnen Compliance gerne zur Verfügung.",
    "", "Freundliche Grüsse", "Compliance", "", "[Link: Erhalt bestätigen]");
  return { betreff: "Mitteilung zur Regel «" + c.name + "» – " + ctx.ref, text: lines.join("\n") };
}

if (typeof module !== "undefined") module.exports = { MATRIX, patternCheck, computeLevel, deadlines, reminderChecks, fillReminder, fillEI, fmtD, addBD };
