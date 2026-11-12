import { buildSystem } from "./prompt.js";
import { ESCALATION_TEXT, OUT_OF_SCOPE_TEXT, needsEscalation } from "./guards.js";

/** The one place the Claude request is shaped (used by the route and the eval). */
export const buildParams = ({ rendered, messages }) => {
  const params = {
    model: process.env.ASK_MODEL || "claude-opus-5-5",
    max_tokens: 4000,
    output_config: { effort: process.env.ASK_EFFORT || "low" },
    system: buildSystem(rendered),
    messages,
  };
  if ((process.env.ASK_FALLBACKS || "on") !== "off") {
    // Re-runs a safety-classifier refusal on a fallback model inside the same call.
    params.betas = ["server-side-fallback-2026-07-01"];
    params.fallbacks = "default";
  }
  return params;
};

/**
 * Turns the parsed model output into what the visitor sees.
 * Returns { outcome, escalate, text, cited, reason }.
 *   text is null for ANSWER (it was already streamed) and the fixed or
 *   translated sentence otherwise.
 */
export const decide = ({ result, kb, question, stopReason = null }) => {
  const mode = stopReason === "refusal" ? "ESCALATE" : result.mode;

  if (mode === "OUT_OF_SCOPE") {
    return { outcome: "out_of_scope", escalate: false, text: OUT_OF_SCOPE_TEXT, cited: [] };
  }

  if (mode === "ESCALATE") {
    const t = result.text;
    const translated = t && t.length < 400 && !t.includes("\n");
    return {
      outcome: "escalated",
      escalate: true,
      text: translated ? t : ESCALATION_TEXT,
      cited: [],
      reason: stopReason === "refusal" ? "model refusal" : "not in knowledge base",
    };
  }

  const cited = result.sources.map((id) => kb.byId.get(id)).filter(Boolean);
  const uncited = cited.length === 0;
  const safety = cited.some((e) => e.safetyCritical);
  const topic = needsEscalation(question);
  const escalate = uncited || safety || topic;
  return {
    outcome: uncited ? "uncited" : escalate ? "answered_with_escalation" : "answered",
    escalate,
    text: null,
    cited,
    reason: uncited ? "answer cited no approved entry" : safety ? "safety-critical entry" : topic ? "always-escalate topic" : undefined,
  };
};
