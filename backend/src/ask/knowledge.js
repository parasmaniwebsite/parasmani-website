import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Loads the Ask Parasmani knowledge base from plain Markdown files.
 *
 * Format (see knowledge/README.md): each entry starts with "## KB-NN-NN Title",
 * followed by status / safety_critical / source lines, a "---" line, then the
 * content. An optional "note:" line is a reviewer note and is never sent to the
 * model.
 *
 * Only entries with `status: approved` ever reach the model. Everything else is
 * parsed (so tests and tooling can see it) but filtered out by approvedEntries().
 */

const here = path.dirname(fileURLToPath(import.meta.url));

// backend/src/ask -> repo root /knowledge. Overridable for hosts that deploy
// the backend folder on its own.
export const DEFAULT_KNOWLEDGE_DIR = path.resolve(here, "../../../knowledge");

const ID_RE = /^KB-\d{2}-\d{2}$/;
const STATUSES = new Set(["approved", "needs_verification", "unavailable"]);

export const parseEntries = (markdown, file = "") => {
  const entries = [];
  // Split on level-2 headings only; "#" titles and "###" never start an entry.
  const blocks = markdown.split(/^## /m).slice(1);

  for (const block of blocks) {
    const [headingLine, ...rest] = block.split(/\r?\n/);
    const id = headingLine.trim().split(/\s+/)[0];
    if (!ID_RE.test(id)) continue;

    const title = headingLine.trim().slice(id.length).trim();
    const sep = rest.findIndex((l) => l.trim() === "---");
    if (sep === -1) continue; // malformed: no header/body separator

    const header = rest.slice(0, sep);
    const field = (name) => {
      const line = header.find((l) => l.startsWith(`${name}:`));
      return line ? line.slice(name.length + 1).trim() : "";
    };

    const status = field("status");
    const body = rest
      .slice(sep + 1)
      .filter((l) => !/^note:/i.test(l.trim())) // reviewer notes stay private
      .join("\n")
      .trim();

    entries.push({
      id,
      title,
      status: STATUSES.has(status) ? status : "needs_verification",
      safetyCritical: field("safety_critical") === "true",
      source: field("source"),
      content: body,
      file,
    });
  }
  return entries;
};

export const loadAllEntries = (dir = DEFAULT_KNOWLEDGE_DIR) => {
  if (!fs.existsSync(dir)) return [];
  const entries = [];
  for (const folder of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, folder);
    if (!fs.statSync(full).isDirectory()) continue;
    for (const file of fs.readdirSync(full).sort()) {
      if (!file.endsWith(".md")) continue;
      const text = fs.readFileSync(path.join(full, file), "utf8");
      entries.push(...parseEntries(text, `${folder}/${file}`));
    }
  }
  return entries;
};

/**
 * Approved entries only. `extraApprovedIds` exists for the eval script, which
 * simulates a launch-set approval without editing any file.
 */
export const approvedEntries = (entries, extraApprovedIds = []) => {
  const extra = new Set(extraApprovedIds);
  return entries.filter((e) => e.status === "approved" || extra.has(e.id));
};

export const renderKnowledgeBase = (entries) =>
  entries
    .map(
      (e) =>
        `<entry id="${e.id}" title="${e.title.replace(/"/g, "'")}"${
          e.safetyCritical ? ' safety_critical="true"' : ""
        }>\n${e.content}\n</entry>`,
    )
    .join("\n\n");

/**
 * Cached loader. Re-reads the folder at most once per `ttlMs`, so approving an
 * entry and redeploying (or editing on a long-running server) takes effect
 * without a code change.
 */
export const createKnowledgeStore = ({
  dir = process.env.KNOWLEDGE_DIR || DEFAULT_KNOWLEDGE_DIR,
  ttlMs = 60_000,
  extraApprovedIds = [],
} = {}) => {
  let cache = null;
  let loadedAt = 0;

  return {
    get() {
      const now = Date.now();
      if (!cache || now - loadedAt > ttlMs) {
        const all = loadAllEntries(dir);
        const approved = approvedEntries(all, extraApprovedIds);
        cache = {
          approved,
          byId: new Map(approved.map((e) => [e.id, e])),
          rendered: renderKnowledgeBase(approved),
        };
        loadedAt = now;
      }
      return cache;
    },
  };
};
