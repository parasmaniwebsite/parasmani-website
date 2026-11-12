/**
 * Deterministic checks that run before and after the model. They exist so the
 * important behaviour (escalation buttons, length limits, greetings) never
 * depends on how cleverly a question is phrased.
 */

export const MAX_MESSAGE_CHARS = 500;
export const MAX_HISTORY_MESSAGES = 6;

export const ESCALATION_TEXT =
  "I don't have verified information for that specific requirement. Our sales team can help you with the exact specification.";

export const OUT_OF_SCOPE_TEXT =
  "I can only help with Parasmani copper tubes, coils and fittings: sizes, standards, tempers, applications, packaging, approvals and downloads. For anything else, our sales team is happy to help.";

export const GREETING_TEXT =
  "Hello! Ask me about Parasmani copper tubes, pancake coils or fittings: sizes, standards, tempers, packaging or downloads.";

export const THANKS_TEXT = "You're welcome. Anything else about Parasmani products?";

/**
 * Topics where the answer must always come with the Sales buttons, even when
 * the model finds general information. Matches the design brief: pressure
 * ratings, wall-thickness suitability, medical gas, fuel gas, code compliance,
 * pricing, stock and lead times. Kept broad on purpose: a false positive only
 * adds two buttons; a false negative hides them on a safety question.
 */
const ESCALATE_TOPICS = [
  // pressure / suitability
  /\bpressure\b/i, /\bbar\b/i, /\bpsi\b/i, /\bmpa\b/i, /\bburst/i, /\bmawp\b/i,
  /\bsuitab/i, /\bsuitable\b/i, /\bcan i use\b/i, /\bwill it (hold|work|handle)\b/i,
  /\bwall( thickness)?\b.*\b(for|enough|sufficient|ok|okay|need|require|rated|handle)\b/i,
  /\b(enough|sufficient|thick enough|strong enough)\b/i,
  /\bsiz(e|ing)\b.*\b(for|need|require|which|what)\b.*\b(tr|ton|kw|flat|riser|building|system|load)\b/i,
  // medical gas
  /\bmedical\b/i, /\bmgps\b/i, /\boxygen\b/i, /\bo2\b/i, /\bnitrous\b/i, /\bhospital\b/i,
  /\bhtm\s*02/i, /\ben\s*13348\b/i, /\bvacuum\b/i,
  // fuel gas
  /\blpg\b/i, /\bpng\b/i, /\bfuel gas\b/i, /\bnatural gas\b/i, /\bgas (line|pipe|piping|riser)\b/i, /\bb837\b/i,
  // code compliance
  /\bcomplian/i, /\bcode\b/i, /\bregulat/i, /\bcertif(y|ied) for\b/i, /\bapproved for\b/i,
  // commercial
  /\bprice\b/i, /\bpricing\b/i, /\bcost\b/i, /\brate\b/i, /\bquote\b/i, /\bquotation\b/i, /\bdiscount\b/i,
  /\bstock\b/i, /\bavailab(le|ility) (now|today|immediately)\b/i, /\blead ?time\b/i, /\bdelivery\b/i,
  /\bdispatch\b/i, /\bmoq\b/i, /\bminimum order\b/i, /\bhow soon\b/i,
  // Hindi / Hinglish commercial words customers commonly type
  /\bkimat\b/i, /\bkeemat\b/i, /\bbhav\b/i, /\bdaam\b/i,
];

export const needsEscalation = (text) => ESCALATE_TOPICS.some((re) => re.test(text));

const GREETING_RE = /^\s*(hi+|hello+|hey+|namaste|good (morning|afternoon|evening)|hii+)\s*[!.]*\s*$/i;
const THANKS_RE = /^\s*(thanks?|thank you|thx|ok(ay)? thanks?|great,? thanks?|dhanyavaad|shukriya)\s*[!.]*\s*$/i;

/** Canned replies that never need the model (saves cost and latency). */
export const cannedReply = (text) => {
  if (GREETING_RE.test(text)) return GREETING_TEXT;
  if (THANKS_RE.test(text)) return THANKS_TEXT;
  return null;
};

/**
 * Validates and normalises the client-supplied conversation. Returns
 * { messages } or { error }. Only user/assistant roles are accepted, so a
 * client cannot inject "system" turns.
 */
export const validateConversation = (body) => {
  const raw = body?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return { error: "Please type a question." };
  }

  const recent = raw.slice(-MAX_HISTORY_MESSAGES);
  const messages = [];
  for (const m of recent) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return { error: "Invalid message format." };
    }
    const content = m.content.trim();
    if (!content) continue;
    if (m.role === "user" && content.length > MAX_MESSAGE_CHARS) {
      return { error: `Please keep your question under ${MAX_MESSAGE_CHARS} characters.` };
    }
    // Assistant turns come back from our own UI; cap them anyway so a tampered
    // client cannot stuff the context.
    messages.push({ role: m.role, content: content.slice(0, 2000) });
  }

  // The API requires the first message to be from the user and we always
  // answer the latest user message.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return { error: "Please type a question." };
  }
  return { messages };
};
