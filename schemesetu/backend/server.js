const express = require("express");
const path = require("path");
const schemes = require("./schemes");

const app = express();
app.use(express.json({ limit: "10kb" }));

const OCC = ["farmer", "artisan", "student", "unorg", "salaried", "business", "homemaker"];
const CAT = ["General", "OBC", "SC", "ST"];
const GEN = ["f", "m", "o"];

function validate(b) {
  if (!b || typeof b !== "object") return null;
  const age = Number(b.age), inc = Number(b.inc);
  if (!Number.isFinite(age) || age < 0 || age > 110) return null;
  if (!Number.isFinite(inc) || inc < 0 || inc > 10000) return null;
  if (!GEN.includes(b.gen) || !OCC.includes(b.occ) || !CAT.includes(b.cat)) return null;
  return { age, inc, gen: b.gen, occ: b.occ, cat: b.cat,
    bank: !!b.bank, house: !!b.house, girl: !!b.girl };
}

const strip = ({ n, b, d }) => ({ n, b, d });

app.get("/api/health", (_req, res) => res.json({ status: "ok", schemes: schemes.length }));
app.get("/api/schemes", (_req, res) => res.json({ schemes: schemes.map(strip) }));

app.post("/api/match", (req, res) => {
  const profile = validate(req.body);
  if (!profile) return res.status(400).json({ error: "Invalid profile" });
  const matches = schemes.filter((s) => s.r(profile)).map(strip);
  res.json({ count: matches.length, matches });
});

app.use(express.static(path.join(__dirname, "..", "frontend")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SchemeSetu running on http://localhost:${PORT}`));
