// ===== Testlauf: gleiche Anweisungen wie das Incident-Tool, Soll/Ist-Vergleich =====
const MELDEWEGE = ["Selbstmeldung", "Line Manager", "Kontrolle", "Mitarbeitende (Hinweis)", "Anonym"];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const person = id => DIRECTORY.find(p => p.id === id);
const cat = code => CATALOG.find(c => c.code === code);
const now = () => new Date();
const $ = s => document.querySelector(s);
const arr = v => v == null ? [] : Array.isArray(v) ? v : [v];
const ORDER = ["No Breach", "Reminder", "Employee Incident", "HR Referral"];
const CHECKS = [
  ["person", "Person"], ["verstoss", "Verstoss"], ["policy", "Policy"], ["quelle", "Quelle gültig"], ["risk", "Risk"],
  ["behavior", "Behavior"], ["sonder", "Sonderregel"], ["datum", "Datum"], ["meldeweg", "Meldeweg"], ["level", "Incident Level"], ["namen", "Namensschutz"]
];

// Zustand, den capturePrompt() aus dem Tool erwartet
let S = { f: {}, qCount: 0, cchat: [] };
// __CAPTURE_PROMPT__

const R = { results: {}, running: false, ctl: null, tier: "default", runs: 0, startedAt: null, finishedAt: null, open: {}, filter: "alle", sample: null, ready: false };

function promptFor(tc) {
  S = { f: {}, qCount: 0, cchat: [{ role: "user", report: true, text: tc.meldung }] };
  return capturePrompt();
}

// Ist-Werte so lesen, wie applyAI() im Tool sie übernimmt
function readIst(r) {
  const s = v => (typeof v === "string" ? v.trim() : v == null ? "" : String(v));
  const fe = r && r.felder && typeof r.felder === "object" ? r.felder : {};
  let pid = s(fe.personId); if (!person(pid)) pid = "";
  if (!pid && Array.isArray(r.person_kandidaten)) {
    const hi = r.person_kandidaten.filter(k => k && person(k.personalnummer) && k.sicherheit === "hoch");
    if (hi.length === 1) pid = hi[0].personalnummer;
  }
  const policy = s(fe.policy).toUpperCase(), policy2 = s(fe.policy2).toUpperCase();
  const risk = RISKS.includes(fe.risk) ? fe.risk : "", behavior = BEHAVIORS.includes(fe.behavior) ? fe.behavior : "";
  const sonder = Array.isArray(r.sonderregeln) ? [...new Set(r.sonderregeln.filter(x => x && ["straftat", "vergeltung"].includes(x.typ)).map(x => x.typ))] : [];
  const datum = /^\d{4}-\d{2}-\d{2}$/.test(s(fe.vorfall_datum)) ? s(fe.vorfall_datum) : "";
  const meldeweg = MELDEWEGE.includes(fe.meldeweg) ? fe.meldeweg : "";
  let verstoss = r.verstoss && ["ja", "nein", "unklar"].includes(r.verstoss.wert) ? r.verstoss.wert : "";
  if (!verstoss && (policy || risk)) verstoss = "ja";
  let level = "offen", pattern = null, levelWhy = "";
  if (verstoss === "nein") { level = "No Breach"; levelWhy = "Assistent: kein Verstoss"; }
  else if (risk && behavior) {
    const c = computeLevel({ risk, behavior, code: [policy, policy2].filter(cat), personId: pid, incidentDate: datum || isoD(now()), history: HISTORY, sonder: sonder.map(t => ({ typ: t })) });
    level = c.proposed; pattern = c.pattern; levelWhy = c.reason + (c.pattern && c.pattern.applied ? " · " + c.pattern.rules.join("; ") : "");
  } else if (sonder.length) { level = "HR Referral"; levelWhy = "Sonderregel (ohne Risk/Behavior)"; }
  else levelWhy = "Risk oder Behavior fehlt";
  return {
    person: pid, verstoss, verstossWhy: s(r.verstoss && r.verstoss.begruendung), policy, policy2, risk, behavior, sonder, datum, meldeweg, level, levelWhy, pattern,
    summary: s(fe.summary), description: s(fe.description), risk_desc: s(fe.risk_desc), behavior_desc: s(fe.behavior_desc),
    antwort: s(r.antwort), rueckfrage: !!r.rueckfrage, warnung: s(r.warnung), konfidenz: r.konfidenz && r.konfidenz.stufe || ""
  };
}

function evaluate(tc, ist) {
  const so = tc.soll, c = {};
  const set = (k, ok, soll, istTxt) => { c[k] = { ok, soll, ist: istTxt }; };
  set("person", so.person ? ist.person === so.person : !ist.person, so.person ? so.person + " " + person(so.person).name : "keine Person", ist.person ? ist.person + " " + person(ist.person).name : "–");
  set("verstoss", arr(so.verstoss).includes(ist.verstoss), arr(so.verstoss).join(" / "), ist.verstoss || "–");
  const codes = [ist.policy, ist.policy2].filter(Boolean);
  if (so.keinCode) set("policy", !codes.some(cat), "kein Code (nicht im Katalog)", codes.join(", ") || "–");
  else if (so.policies.length) set("policy", codes.some(x => so.policies.includes(x)), so.policies.join(" / "), codes.join(", ") || "–");
  else set("policy", null, "–", codes.join(", ") || "–");
  const bad = codes.filter(x => !cat(x));
  set("quelle", bad.length === 0, "nur Katalog-Codes", bad.length ? "ohne Quelle: " + bad.join(", ") : codes.length ? "ok" : "kein Code");
  const noBreach = arr(so.verstoss).length === 1 && arr(so.verstoss)[0] === "nein";
  if (so.risk.length) set("risk", so.risk.includes(ist.risk), so.risk.join(" / "), ist.risk || "–");
  else if (noBreach) set("risk", !ist.risk, "keine Bewertung", ist.risk || "–"); else set("risk", null, "–", ist.risk || "–");
  if (so.behavior.length) set("behavior", so.behavior.includes(ist.behavior), so.behavior.join(" / "), ist.behavior || "–");
  else if (noBreach) set("behavior", !ist.behavior, "keine Bewertung", ist.behavior || "–"); else set("behavior", null, "–", ist.behavior || "–");
  const missS = so.sonder.filter(x => !ist.sonder.includes(x)), extraS = ist.sonder.filter(x => !so.sonder.includes(x));
  set("sonder", !missS.length && !extraS.length, so.sonder.join(", ") || "keine", ist.sonder.join(", ") || "keine");
  if (so.datum) set("datum", arr(so.datum).includes(ist.datum), arr(so.datum).map(fmtD).join(" / "), ist.datum ? fmtD(ist.datum) : "–");
  else if (so.person === null) set("datum", !ist.datum, "kein Datum", ist.datum ? fmtD(ist.datum) : "–");
  else set("datum", null, "–", ist.datum ? fmtD(ist.datum) : "–");
  if (so.meldeweg) set("meldeweg", ist.meldeweg === so.meldeweg, so.meldeweg, ist.meldeweg || "–"); else set("meldeweg", null, "–", ist.meldeweg || "–");
  if (so.level) set("level", so.level.includes(ist.level), so.level.join(" / "), ist.level); else set("level", null, "nicht geprüft", ist.level);
  const txt = [ist.summary, ist.description, ist.risk_desc, ist.behavior_desc, ist.verstossWhy].join(" \n ").toLowerCase();
  const hits = (so.noNames || []).filter(n => txt.includes(n.toLowerCase()));
  set("namen", hits.length === 0, (so.noNames || []).length ? "ohne " + so.noNames.join(", ") : "keine Vorgabe", hits.length ? "gefunden: " + hits.join(", ") : "ok");
  if (!(so.noNames || []).length) c.namen.ok = hits.length === 0 ? null : false;
  // Richtung beim Level
  let dir = "";
  if (so.level && !c.level.ok) {
    const iv = ORDER.indexOf(ist.level), sv = so.level.map(l => ORDER.indexOf(l)).filter(i => i >= 0);
    if (iv < 0 || !sv.length) dir = "offen"; else dir = iv < Math.min(...sv) ? "zu tief" : iv > Math.max(...sv) ? "zu hoch" : "";
  }
  const applicable = Object.values(c).filter(x => x.ok !== null);
  return { checks: c, pass: applicable.every(x => x.ok), dir, failed: Object.entries(c).filter(([, x]) => x.ok === false).map(([k]) => k) };
}

async function runOne(tc, signal) {
  R.results[tc.id] = { status: "läuft" }; render();
  const t0 = performance.now();
  try {
    const raw = await R.sample.json(promptFor(tc), { signal, modelTier: R.tier, cache: false });
    const ist = readIst(raw || {});
    R.results[tc.id] = { status: "fertig", raw, ist, ev: evaluate(tc, ist), ms: Math.round(performance.now() - t0) };
  } catch (e) {
    if (signal.aborted) { R.results[tc.id] = { status: "abgebrochen" }; return; }
    R.results[tc.id] = { status: "Fehler", error: (e && (e.code || e.message)) || String(e) };
    if (e && e.code === "rate_limited") await new Promise(r => setTimeout(r, 4000));
  }
  render();
}

async function runAll(ids) {
  if (R.running || !R.sample) return;
  R.running = true; R.ctl = new AbortController(); R.startedAt = new Date(); R.finishedAt = null; R.runs++;
  const list = TESTCASES.filter(t => !ids || ids.includes(t.id));
  list.forEach(t => { R.results[t.id] = { status: "wartet" }; });
  render();
  let i = 0; const signal = R.ctl.signal;
  const worker = async () => { while (i < list.length && !signal.aborted) { const tc = list[i++]; await runOne(tc, signal); } };
  await Promise.all([worker(), worker(), worker()]);
  list.forEach(t => { if (["wartet", "läuft"].includes(R.results[t.id].status)) R.results[t.id] = { status: "abgebrochen" }; });
  R.running = false; R.finishedAt = new Date(); render();
}
function stop() { if (R.ctl) R.ctl.abort(); }

// ---------- Kennzahlen ----------
function metrics() {
  const done = TESTCASES.map(t => [t, R.results[t.id]]).filter(([, r]) => r && r.status === "fertig");
  const per = {};
  CHECKS.forEach(([k]) => {
    const xs = done.map(([, r]) => r.ev.checks[k]).filter(x => x && x.ok !== null);
    per[k] = { n: xs.length, ok: xs.filter(x => x.ok).length };
  });
  return {
    n: done.length, pass: done.filter(([, r]) => r.ev.pass).length, per,
    tief: done.filter(([, r]) => r.ev.dir === "zu tief").length, hoch: done.filter(([, r]) => r.ev.dir === "zu hoch").length,
    offen: done.filter(([, r]) => r.ev.dir === "offen").length,
    fehler: TESTCASES.filter(t => R.results[t.id] && R.results[t.id].status === "Fehler").length,
    rueck: done.filter(([, r]) => r.ist.rueckfrage).length,
    ms: done.length ? Math.round(done.reduce((a, [, r]) => a + r.ms, 0) / done.length) : 0
  };
}
const pct = (a, b) => b ? Math.round(a / b * 100) + "%" : "–";

// ---------- Darstellung ----------
const lvlClass = l => l === "Reminder" || l === "No Breach" ? "lv-rem" : l === "Employee Incident" ? "lv-ei" : l === "HR Referral" ? "lv-hr" : "lv-open";
const pill = l => `<span class="lvl sm ${lvlClass(l)}">${esc(l)}</span>`;
const mark = ok => ok === null ? `<span class="mk na" title="nicht geprüft">·</span>` : ok ? `<span class="mk ok" title="Soll erfüllt">✓</span>` : `<span class="mk bad" title="Soll nicht erfüllt">✗</span>`;

function render() {
  const m = metrics();
  const st = R.running ? `Läuft · ${m.n} von ${Object.values(R.results).filter(r => r.status !== "abgebrochen").length || TESTCASES.length}` : R.finishedAt ? `Letzter Lauf ${R.finishedAt.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })} · ${m.n} Fälle ausgewertet` : "Noch kein Lauf";
  $("#status").textContent = st;
  $("#run").disabled = R.running || !R.sample; $("#stop").disabled = !R.running;
  $("#exMd").disabled = $("#exCsv").disabled = !m.n || R.running;
  $("#tier").value = R.tier; $("#tier").disabled = R.running;
  $("#noai").hidden = !R.ready || !!R.sample;
  $("#kpis").innerHTML = kpis(m);
  $("#checks").innerHTML = checkBars(m);
  $("#rows").innerHTML = rows();
}

function kpis(m) {
  const tile = (lab, val, sub, cls = "") => `<div class="kpi ${cls}"><span class="lab">${lab}</span><span class="kv">${val}</span><span class="hint">${sub}</span></div>`;
  return tile("Fälle bestanden", m.n ? `${m.pass}<small>/${m.n}</small>` : "–", "alle geprüften Punkte erfüllt", m.n ? (m.pass === m.n ? "good" : "") : "")
    + tile("Incident Level", pct(m.per.level.ok, m.per.level.n), `${m.per.level.ok} von ${m.per.level.n} im Soll-Bereich`)
    + tile("Level zu tief", m.n ? m.tief : "–", "gefährlich: Fall wird unterschätzt", m.tief ? "bad" : "")
    + tile("Level zu hoch", m.n ? m.hoch : "–", "unnötige Eskalation", m.hoch ? "warnish" : "")
    + tile("Quelle gültig", pct(m.per.quelle.ok, m.per.quelle.n), "kein erfundener Risiko-Code", m.n && m.per.quelle.ok < m.per.quelle.n ? "bad" : "")
    + tile("Namensschutz", pct(m.per.namen.ok, m.per.namen.n), "meldende Person nicht genannt", m.n && m.per.namen.ok < m.per.namen.n ? "bad" : "");
}

function checkBars(m) {
  if (!m.n) return `<p class="hint">Nach dem Lauf steht hier die Trefferquote je Prüfpunkt.</p>`;
  return CHECKS.map(([k, lab]) => {
    const p = m.per[k], v = p.n ? p.ok / p.n : 0;
    return `<div class="cb"><span class="cb-l">${lab}</span><span class="cb-bar"><i style="width:${(v * 100).toFixed(1)}%" class="${v === 1 ? "full" : v < .7 ? "low" : ""}"></i></span><span class="cb-v mono">${p.n ? p.ok + "/" + p.n : "–"}</span></div>`;
  }).join("") + `<p class="hint">Ø Antwortzeit ${(m.ms / 1000).toFixed(1)} s · Rückfragen gestellt: ${m.rueck} · Fehler: ${m.fehler}</p>`;
}

function rows() {
  const f = R.filter;
  return TESTCASES.filter(t => {
    const r = R.results[t.id];
    if (f === "alle") return true;
    if (f === "fehl") return r && r.status === "fertig" && !r.ev.pass;
    if (f === "ok") return r && r.status === "fertig" && r.ev.pass;
    return true;
  }).map(t => {
    const r = R.results[t.id], open = R.open[t.id];
    const so = t.soll;
    let res = `<span class="hint">${r ? esc(r.status) : "nicht gelaufen"}</span>`;
    if (r && r.status === "läuft") res = `<span class="spin"></span><span class="hint">läuft</span>`;
    if (r && r.status === "Fehler") res = `<span class="tag bad">Fehler</span> <span class="hint">${esc(r.error)}</span>`;
    if (r && r.status === "fertig") res = (r.ev.pass ? `<span class="tag ok">bestanden</span>` : `<span class="tag bad">${r.ev.failed.length} Abweichung${r.ev.failed.length > 1 ? "en" : ""}</span>`) + (r.ev.dir ? ` <span class="tag ${r.ev.dir === "zu tief" ? "bad" : "neutral"}">${r.ev.dir}</span>` : "");
    const sollL = so.level ? so.level.map(pill).join(" ") : `<span class="hint">nicht geprüft</span>`;
    const istL = r && r.status === "fertig" ? pill(r.ist.level) : `<span class="hint">–</span>`;
    return `<article class="tc ${r && r.status === "fertig" ? (r.ev.pass ? "pass" : "fail") : ""}">
      <button class="tc-h" data-act="toggle" data-id="${t.id}" aria-expanded="${!!open}">
        <span class="tc-id mono">${t.id}</span>
        <span class="tc-t"><b>${esc(t.titel)}</b><span class="hint">${esc(t.fokus)}</span></span>
        <span class="tc-lv"><span class="lab">Soll</span>${sollL}</span>
        <span class="tc-lv"><span class="lab">Ist</span>${istL}</span>
        <span class="tc-r">${res}</span>
        <span class="chev">${open ? "−" : "+"}</span>
      </button>
      ${open ? detail(t, r) : ""}
    </article>`;
  }).join("");
}

function detail(t, r) {
  const fin = r && r.status === "fertig";
  const cmp = CHECKS.map(([k, lab]) => {
    const c = fin ? r.ev.checks[k] : null;
    const sollTxt = c ? c.soll : sollText(t, k);
    return `<tr class="${c && c.ok === false ? "neg" : ""}"><th>${lab}</th><td>${esc(sollTxt)}</td><td>${c ? esc(c.ist) : "–"}</td><td>${c ? mark(c.ok) : ""}</td></tr>`;
  }).join("");
  return `<div class="tc-b">
    <div class="tc-grid">
      <div class="stack">
        <div><span class="lab">Meldung (Eingabe an den Assistenten)</span><blockquote>${esc(t.meldung)}</blockquote></div>
        <div><span class="lab">Begründung Soll</span><p class="small">${esc(t.begruendung)}</p></div>
        ${fin ? `<div><span class="lab">Level-Berechnung durch das Tool</span><p class="small">${esc(r.ist.levelWhy)}</p></div>` : ""}
        ${fin && r.ist.antwort ? `<div><span class="lab">Antwort des Assistenten</span><p class="small">${esc(r.ist.antwort)}</p></div>` : ""}
        ${fin && r.ist.verstossWhy ? `<div><span class="lab">Begründung Verstoss</span><p class="small">${esc(r.ist.verstossWhy)}</p></div>` : ""}
      </div>
      <div class="stack">
        <table class="cmp"><thead><tr><th></th><th>Soll</th><th>Ist</th><th></th></tr></thead><tbody>${cmp}</tbody></table>
        ${fin ? `<details><summary>Fallakte des Assistenten (Summary, Description, Begründungen)</summary>
          <dl class="dl"><dt>Summary</dt><dd>${esc(r.ist.summary) || "–"}</dd><dt>Description</dt><dd>${esc(r.ist.description) || "–"}</dd><dt>Risk</dt><dd>${esc(r.ist.risk_desc) || "–"}</dd><dt>Behavior</dt><dd>${esc(r.ist.behavior_desc) || "–"}</dd></dl></details>
          <details><summary>Rohantwort (JSON)</summary><pre>${esc(JSON.stringify(r.raw, null, 2))}</pre></details>` : ""}
        <div class="row"><button class="btn sm" data-act="one" data-id="${t.id}" ${R.running || !R.sample ? "disabled" : ""}>Nur diesen Fall laufen lassen</button></div>
      </div>
    </div>
  </div>`;
}

function sollText(t, k) {
  const so = t.soll;
  return ({
    person: so.person ? so.person + " " + person(so.person).name : "keine Person",
    verstoss: arr(so.verstoss).join(" / "),
    policy: so.keinCode ? "kein Code" : so.policies.join(" / ") || "–",
    quelle: "nur Katalog-Codes", risk: so.risk.join(" / ") || "–", behavior: so.behavior.join(" / ") || "–",
    sonder: so.sonder.join(", ") || "keine", datum: so.datum ? arr(so.datum).map(fmtD).join(" / ") : "–",
    meldeweg: so.meldeweg || "–", level: so.level ? so.level.join(" / ") : "nicht geprüft",
    namen: (so.noNames || []).length ? "ohne " + so.noNames.join(", ") : "keine Vorgabe"
  })[k];
}

// ---------- Export ----------
function reportMd() {
  const m = metrics(), d = R.finishedAt || new Date();
  const L = [];
  L.push("# Testbericht Incident-Tool", "", `Lauf vom ${fmtD(d)} ${d.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })} · Modellstufe «${R.tier}» · ${m.n} von ${TESTCASES.length} Fällen ausgewertet`, "",
    "Jede Meldung wurde mit denselben Anweisungen wie im Incident-Tool (erster Durchgang der Fallerfassung, ohne Antwort auf Rückfragen) an das Sprachmodell geschickt. Incident Level, Pattern Aggregation und Sonderregeln rechnet das Tool deterministisch aus den Ist-Werten.", "",
    "## Kennzahlen", "", "| Kennzahl | Wert |", "|---|---|",
    `| Fälle bestanden | ${m.pass} von ${m.n} |`, `| Level zu tief | ${m.tief} |`, `| Level zu hoch | ${m.hoch} |`, `| Level offen (Bewertung fehlt) | ${m.offen} |`, `| Rückfragen gestellt | ${m.rueck} |`, `| Fehler | ${m.fehler} |`, `| Ø Antwortzeit | ${(m.ms / 1000).toFixed(1)} s |`, "",
    "## Trefferquote je Prüfpunkt", "", "| Prüfpunkt | Treffer | Quote |", "|---|---|---|");
  CHECKS.forEach(([k, lab]) => L.push(`| ${lab} | ${m.per[k].ok}/${m.per[k].n} | ${pct(m.per[k].ok, m.per[k].n)} |`));
  L.push("", "## Übersicht", "", "| Nr. | Fall | Soll Level | Ist Level | Ergebnis | Abweichungen |", "|---|---|---|---|---|---|");
  TESTCASES.forEach(t => {
    const r = R.results[t.id]; const fin = r && r.status === "fertig";
    L.push(`| ${t.id} | ${t.titel} | ${t.soll.level ? t.soll.level.join(" / ") : "–"} | ${fin ? r.ist.level : "–"} | ${fin ? (r.ev.pass ? "bestanden" : "nicht bestanden") + (r.ev.dir ? " (" + r.ev.dir + ")" : "") : r ? r.status : "nicht gelaufen"} | ${fin ? r.ev.failed.map(k => CHECKS.find(c => c[0] === k)[1]).join(", ") || "–" : "–"} |`);
  });
  L.push("", "## Abweichungen im Detail", "");
  const fails = TESTCASES.filter(t => R.results[t.id] && R.results[t.id].status === "fertig" && !R.results[t.id].ev.pass);
  if (!fails.length) L.push("Keine.");
  fails.forEach(t => {
    const r = R.results[t.id];
    L.push(`### ${t.id} ${t.titel}`, "", `Fokus: ${t.fokus}`, "", `> ${t.meldung}`, "", "| Prüfpunkt | Soll | Ist |", "|---|---|---|");
    r.ev.failed.forEach(k => { const c = r.ev.checks[k]; L.push(`| ${CHECKS.find(x => x[0] === k)[1]} | ${c.soll} | ${c.ist} |`); });
    L.push("", `Begründung Soll: ${t.begruendung}`, "", `Level-Berechnung: ${r.ist.levelWhy}`, "");
  });
  return L.join("\n");
}
function reportCsv() {
  const q = v => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["Nr", "Fall", "Fokus", "Ergebnis", "Richtung", ...CHECKS.flatMap(([, l]) => [l + " Soll", l + " Ist", l + " ok"]), "Antwortzeit ms"];
  const lines = [head.map(q).join(";")];
  TESTCASES.forEach(t => {
    const r = R.results[t.id]; const fin = r && r.status === "fertig";
    const cells = [t.id, t.titel, t.fokus, fin ? (r.ev.pass ? "bestanden" : "nicht bestanden") : r ? r.status : "nicht gelaufen", fin ? r.ev.dir : ""];
    CHECKS.forEach(([k]) => { const c = fin ? r.ev.checks[k] : null; cells.push(c ? c.soll : sollText(t, k), c ? c.ist : "", c ? (c.ok === null ? "n/a" : c.ok ? "ja" : "nein") : ""); });
    cells.push(fin ? r.ms : "");
    lines.push(cells.map(q).join(";"));
  });
  return "﻿" + lines.join("\r\n");
}
async function save(ext) {
  const dl = await window.claude?.use?.("downloads");
  const d = R.finishedAt || new Date();
  const name = `Testbericht_${isoD(d)}.${ext}`;
  const data = ext === "md" ? reportMd() : reportCsv();
  const msg = $("#exmsg");
  if (!dl) { msg.textContent = "Download ist in dieser Ansicht nicht verfügbar."; return; }
  try { await dl.save({ filename: name, data }); msg.textContent = name + " gespeichert."; }
  catch (e) { msg.textContent = e && e.code === "declined" ? "Download abgebrochen." : "Download nicht möglich (" + (e && e.code || "Fehler") + ")."; }
}

// ---------- Ereignisse ----------
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const a = b.dataset.act, id = b.dataset.id;
  if (a === "toggle") { R.open[id] = !R.open[id]; render(); }
  if (a === "one") runAll([id]);
  if (a === "filter") { R.filter = b.dataset.v; document.querySelectorAll("[data-act=filter]").forEach(x => x.classList.toggle("on", x === b)); render(); }
  if (a === "openAll") { const all = TESTCASES.every(t => R.open[t.id]); TESTCASES.forEach(t => R.open[t.id] = !all); render(); }
});
$("#run").addEventListener("click", () => runAll());
$("#stop").addEventListener("click", stop);
$("#tier").addEventListener("change", e => { R.tier = e.target.value; });
$("#exMd").addEventListener("click", () => save("md"));
$("#exCsv").addEventListener("click", () => save("csv"));
$("#ncases").textContent = TESTCASES.length;

render();
(async () => {
  try { R.sample = await window.claude?.use?.("sample"); } catch { R.sample = null; }
  R.ready = true; render();
})();
