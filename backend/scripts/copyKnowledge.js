/**
 * Build step for serverless hosts (Vercel). The knowledge base lives at the
 * repo root (../knowledge), outside the backend folder, so a serverless bundle
 * would not include it. This copies it to backend/knowledge, which
 * vercel.json then ships with the function.
 *
 * Runs automatically on Vercel via the "vercel-build" script. Render runs the
 * whole repo and does not need it.
 *
 * If the source is missing, it warns instead of failing: the assistant then has
 * no approved entries and hands every question to Sales, which is safe.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, "../../knowledge");
const dest = path.resolve(here, "../knowledge");

if (!fs.existsSync(src)) {
  console.warn(`[copyKnowledge] ${src} not found; Ask Parasmani will escalate every question.`);
  process.exit(0);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
const count = fs.readdirSync(dest).length;
console.log(`[copyKnowledge] copied knowledge base (${count} items) to backend/knowledge`);
