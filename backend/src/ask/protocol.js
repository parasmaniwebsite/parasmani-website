/**
 * The model answers in a tiny line protocol so the server can decide what the
 * visitor sees without trusting free text:
 *
 *   ANSWER                     <- first line: ANSWER | ESCALATE | OUT_OF_SCOPE
 *   The answer text ...        <- streamed to the visitor (ANSWER only)
 *   SOURCES: KB-02-01, KB-14-01  <- last line, never shown
 *
 * For ESCALATE the body may hold the escalation sentence translated into the
 * visitor's language; nothing else is shown.
 *
 * createProtocolParser() is fed raw text deltas and emits visible text as soon
 * as it is safe to do so. It only withholds a partial line while that line
 * could still turn out to be the SOURCES line.
 */

export const MODES = ["ANSWER", "ESCALATE", "OUT_OF_SCOPE"];
const SOURCES_PREFIX = "SOURCES:";

export const createProtocolParser = ({ onMode, onText } = {}) => {
  let mode = null;
  let headerBuf = "";
  let pending = ""; // current, not-yet-emitted line fragment
  let body = ""; // everything after the header, minus the sources line
  let sourcesLine = "";
  let lineStart = true; // are we at the start of a line in the body?

  const emit = (text) => {
    if (!text) return;
    body += text;
    if (mode === "ANSWER") onText?.(text);
  };

  const feedBody = (chunk) => {
    for (const ch of chunk) {
      if (ch === "\n") {
        if (pending.startsWith(SOURCES_PREFIX)) {
          sourcesLine = pending;
        } else {
          emit(pending + "\n");
        }
        pending = "";
        lineStart = true;
        continue;
      }
      if (lineStart) {
        pending += ch;
        // Still a possible "SOURCES:" line? Keep holding it back.
        if (SOURCES_PREFIX.startsWith(pending) || pending.startsWith(SOURCES_PREFIX)) continue;
        // Not the sources line: release what we held and stream normally.
        emit(pending);
        pending = "";
        lineStart = false;
      } else {
        emit(ch);
      }
    }
  };

  return {
    push(delta) {
      if (mode === null) {
        headerBuf += delta;
        const nl = headerBuf.indexOf("\n");
        // Decide once the first line is complete (or clearly too long to be a
        // mode word, in which case the model ignored the protocol).
        if (nl === -1 && headerBuf.length < 20) return;
        const first = (nl === -1 ? headerBuf : headerBuf.slice(0, nl)).trim().toUpperCase();
        mode = MODES.find((m) => first === m || first.startsWith(`${m} `)) || "ANSWER";
        const malformed = !MODES.some((m) => first === m || first.startsWith(`${m} `));
        onMode?.(mode, { malformed });
        const restText = malformed ? headerBuf : headerBuf.slice(nl + 1);
        headerBuf = "";
        feedBody(restText);
        return;
      }
      feedBody(delta);
    },

    /** Call once the stream has ended. Returns the parsed result. */
    end() {
      if (mode === null) {
        // Stream ended before a full header line.
        const first = headerBuf.trim().toUpperCase();
        mode = MODES.includes(first) ? first : "ANSWER";
        onMode?.(mode, { malformed: !MODES.includes(first) });
        if (!MODES.includes(first)) feedBody(headerBuf);
        headerBuf = "";
      }
      if (pending) {
        if (pending.startsWith(SOURCES_PREFIX)) sourcesLine = pending;
        else emit(pending);
        pending = "";
      }
      const sources = [...new Set(sourcesLine.slice(SOURCES_PREFIX.length).match(/KB-\d{2}-\d{2}/g) || [])];
      return { mode, text: body.trim(), sources };
    },

    get mode() {
      return mode;
    },
  };
};
