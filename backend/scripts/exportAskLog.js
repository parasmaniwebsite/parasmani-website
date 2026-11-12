/**
 * Export Ask Parasmani questions that were NOT answered from the knowledge base
 * (escalated, out of scope, uncited, errors) to a CSV you can open in Excel.
 *
 *   npm run ask:export            -> last 30 days, to ask-log.csv
 *   npm run ask:export -- 7       -> last 7 days
 *
 * Needs MONGO_URI in backend/.env (same as the server).
 */
import fs from "node:fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AskLog from "../src/models/AskLog.js";

dotenv.config();

const days = Number.parseInt(process.argv[2] ?? "30", 10) || 30;
const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
const out = "ask-log.csv";

const csv = (v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;

await mongoose.connect(process.env.MONGO_URI);
const rows = await AskLog.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).lean();

const lines = [
  ["date", "outcome", "reason", "question", "sources", "page", "visitor"].join(","),
  ...rows.map((r) =>
    [r.createdAt.toISOString(), r.outcome, r.reason, r.question, (r.sources || []).join(" "), r.page, r.ipHash]
      .map(csv)
      .join(","),
  ),
];
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${rows.length} rows from the last ${days} days to backend/${out}`);
await mongoose.disconnect();
