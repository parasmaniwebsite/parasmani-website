import crypto from "node:crypto";
import mongoose from "mongoose";
import Anthropic from "@anthropic-ai/sdk";

import { createKnowledgeStore } from "../ask/knowledge.js";
import { createProtocolParser } from "../ask/protocol.js";
import { buildParams, decide } from "../ask/decide.js";
import { ESCALATION_TEXT, cannedReply, validateConversation } from "../ask/guards.js";
import AskLog from "../models/AskLog.js";

/**
 * POST /api/ask — Ask Parasmani.
 *
 * Streams Server-Sent Events:
 *   start    {}                               headers flushed, model running
 *   delta    { text }                         a piece of the answer (ANSWER only)
 *   replace  { text }                         full fixed text (escalation, out of scope, canned)
 *   done     { escalate, outcome, sources }   final state; escalate => show Sales buttons
 *   error    { message, escalate: true }      something failed; Sales buttons still shown
 *
 * The API key lives only in the server environment (ANTHROPIC_API_KEY).
 */

const store = createKnowledgeStore();
let client = null;
const getClient = () => (client ??= new Anthropic());

/** Tests swap in a fake client so no real API call is made. */
export const __setClientForTests = (fake) => {
  client = fake;
};

const hashIp = (ip) =>
  crypto
    .createHash("sha256")
    .update(`${process.env.ASK_LOG_SALT || "ask-parasmani"}:${ip || ""}`)
    .digest("hex")
    .slice(0, 16);

/** Best-effort: a logging failure must never break an answer. */
const logQuestion = async (entry) => {
  console.log(`[ask] ${JSON.stringify({ ...entry, reply: undefined })}`);
  if (mongoose.connection.readyState !== 1) return;
  try {
    await AskLog.create(entry);
  } catch (err) {
    console.error("[ask] log write failed:", err.message);
  }
};

const openStream = (res) => {
  res.status(200);
  res.set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // stop proxies buffering the stream
  });
  res.flushHeaders?.();
};

const send = (res, event, data) => {
  if (res.writableEnded) return;
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
};

export const ask = async (req, res) => {
  const { messages, error } = validateConversation(req.body);
  if (error) return res.status(400).json({ message: error });

  const question = messages[messages.length - 1].content;
  const page = typeof req.body?.page === "string" ? req.body.page.slice(0, 300) : undefined;
  const base = { question, page, ipHash: hashIp(req.ip) };

  openStream(res);
  send(res, "start", {});

  // 1. Greetings and thanks never need the model.
  const canned = cannedReply(question);
  if (canned) {
    send(res, "replace", { text: canned });
    send(res, "done", { escalate: false, outcome: "canned", sources: [] });
    return res.end();
  }

  const kb = store.get();

  // 2. Nothing approved yet: every question goes to Sales. No API call.
  if (kb.approved.length === 0) {
    send(res, "replace", { text: ESCALATION_TEXT });
    send(res, "done", { escalate: true, outcome: "escalated", sources: [] });
    res.end();
    return logQuestion({ ...base, outcome: "escalated", reason: "knowledge base has no approved entries" });
  }

  // 3. Ask the model, streaming answer text as soon as the protocol allows.
  const parser = createProtocolParser({ onText: (text) => send(res, "delta", { text }) });

  let stream;
  let aborted = false;
  res.on("close", () => {
    if (!res.writableEnded) {
      aborted = true;
      stream?.abort();
    }
  });

  try {
    stream = getClient().beta.messages.stream(buildParams({ rendered: kb.rendered, messages }));

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        parser.push(event.delta.text);
        // Out of scope needs no more text; stop paying for it.
        if (parser.mode === "OUT_OF_SCOPE") {
          stream.abort();
          break;
        }
      }
    }

    let stopReason = null;
    if (parser.mode !== "OUT_OF_SCOPE") stopReason = (await stream.finalMessage()).stop_reason;

    const d = decide({ result: parser.end(), kb, question, stopReason });
    if (d.text) send(res, "replace", { text: d.text });
    send(res, "done", {
      escalate: d.escalate,
      outcome: d.outcome,
      sources: d.cited.map((e) => ({ id: e.id, title: e.title })),
    });
    res.end();

    if (d.outcome === "answered") {
      console.log(`[ask] ${JSON.stringify({ outcome: d.outcome, sources: d.cited.map((e) => e.id) })}`);
    } else {
      logQuestion({ ...base, outcome: d.outcome, reason: d.reason, sources: d.cited.map((e) => e.id) });
    }
  } catch (err) {
    if (aborted) return; // visitor closed the panel; nothing to report
    let reason = "unexpected error";
    if (err instanceof Anthropic.RateLimitError) reason = "anthropic rate limit";
    else if (err instanceof Anthropic.AuthenticationError) reason = "anthropic authentication failed (check ANTHROPIC_API_KEY)";
    else if (err instanceof Anthropic.APIError) reason = `anthropic api error ${err.status}`;
    console.error("[ask] failed:", reason, err.message);
    send(res, "error", {
      message: "Sorry, I couldn't answer just now. Our sales team can help you straight away.",
      escalate: true,
    });
    res.end();
    logQuestion({ ...base, outcome: "error", reason });
  }
};
