/**
 * Streaming client for POST /api/ask.
 *
 * Uses fetch rather than the shared axios instance (utils/serviceAPI.js) on
 * purpose: axios in the browser cannot read a response body as it streams, and
 * the endpoint needs no auth token.
 *
 * The server sends Server-Sent Events: start, delta {text}, replace {text},
 * done {escalate, outcome, sources}, error {message, escalate}.
 */

export const SALES_WHATSAPP_NUMBER = "918169808254";
export const MAX_QUESTION_CHARS = 500;

export const whatsappLink = (question) => {
  const text = question
    ? `Hi Parasmani, I asked on your website: "${question}". Please help me with the exact specification.`
    : "Hi Parasmani, I need help with a copper tube requirement.";
  return `https://wa.me/${SALES_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

const parseEvent = (block) => {
  let name = "message";
  let data = "";
  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) name = line.slice(6).trim();
    else if (line.startsWith("data:")) data += line.slice(5).trim();
  }
  try {
    return { name, data: data ? JSON.parse(data) : {} };
  } catch {
    return null;
  }
};

/**
 * askParasmani({ messages, page, signal, onDelta, onReplace })
 * Resolves to { escalate, outcome, sources } or throws an Error whose
 * `userMessage` is safe to show.
 */
export const askParasmani = async ({ messages, page, signal, onDelta, onReplace }) => {
  const base = import.meta.env.VITE_BACKEND_URI || "";
  let res;
  try {
    res = await fetch(`${base}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, page }),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    const e = new Error("network");
    e.userMessage = navigator.onLine === false
      ? "You seem to be offline. Check your connection, or reach our sales team on WhatsApp."
      : "I couldn't reach our server just now. Our sales team can help you straight away.";
    throw e;
  }

  // Validation errors (400) and rate limits (429) come back as JSON.
  if (!res.headers.get("content-type")?.includes("text/event-stream")) {
    let message = "Something went wrong. Our sales team can help you straight away.";
    try {
      const json = await res.json();
      if (json?.message) message = json.message;
    } catch {
      /* keep default */
    }
    const e = new Error(`http ${res.status}`);
    e.userMessage = message;
    throw e;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let final = null;

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const ev = parseEvent(buffer.slice(0, idx));
      buffer = buffer.slice(idx + 2);
      if (!ev) continue;
      if (ev.name === "delta") onDelta?.(ev.data.text || "");
      else if (ev.name === "replace") onReplace?.(ev.data.text || "");
      else if (ev.name === "done") final = ev.data;
      else if (ev.name === "error") {
        const e = new Error("server");
        e.userMessage = ev.data.message;
        throw e;
      }
    }
  }

  if (!final) {
    const e = new Error("incomplete");
    e.userMessage = "The answer was cut off. Please try again, or ask our sales team.";
    throw e;
  }
  return final;
};
