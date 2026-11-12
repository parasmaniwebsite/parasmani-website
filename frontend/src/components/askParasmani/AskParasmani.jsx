import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp, FileText, MessageSquareText, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import EnquiryModal from "../EnquiryModal";
import { MAX_QUESTION_CHARS, askParasmani, whatsappLink } from "./askApi";

/**
 * Ask Parasmani: the site-wide floating assistant (bottom-right on every
 * public page). It replaces the old floating WhatsApp button; WhatsApp now
 * lives inside the panel, so the corner holds one control instead of two.
 *
 * Answers come only from the approved knowledge base on the server. When the
 * server can't answer, it says so and the panel offers WhatsApp Sales and
 * Request a Quote, both prefilled with the visitor's question.
 */

const STARTERS = [
  "What sizes do your pancake coils come in?",
  "Which tempers are available for straight tubes?",
  "How are your tubes packed?",
  "Which documents can I download?",
];

const DISCLAIMER = "General product information. Confirm exact specifications with Parasmani Sales.";

let nextId = 1;

const SalesActions = ({ question, onQuote }) => (
  <div className="mt-3 flex flex-wrap gap-2">
    <a
      href={whatsappLink(question)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1AD054] px-4 font-albert text-[14px] font-medium text-white transition-colors hover:bg-[#16B84A]"
    >
      <FaWhatsapp className="h-[18px] w-[18px]" aria-hidden="true" />
      WhatsApp Sales
    </a>
    <button
      type="button"
      onClick={() => onQuote(question)}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[#19234D] px-4 font-albert text-[14px] font-medium text-[#19234D] transition-colors hover:bg-[#19234D]/5"
    >
      <FileText className="h-[16px] w-[16px]" aria-hidden="true" />
      Request a Quote
    </button>
  </div>
);

const Typing = () => (
  <div className="flex items-center gap-2 py-1 font-albert text-[13px] text-[#6B7080]" role="status">
    <span className="flex gap-1" aria-hidden="true">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#C68344]"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </span>
    Checking Parasmani documents
  </div>
);

const AssistantMessage = ({ msg, onQuote }) => (
  <div className="max-w-[92%] self-start">
    <div className="rounded-[18px] rounded-tl-[6px] bg-[#F3F4F7] px-4 py-3 font-albert text-[15px] leading-[1.5] text-[#1C1C1C]">
      {msg.status === "pending" && !msg.text ? (
        <Typing />
      ) : (
        <p className="whitespace-pre-line break-words">
          {msg.text}
          {msg.status === "pending" && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[#19234D]" aria-hidden="true" />
          )}
        </p>
      )}
      {msg.sources?.length > 0 && (
        <p className="mt-2 font-albert text-[12px] leading-snug text-[#6B7080]">
          Based on: {msg.sources.map((s) => s.title).join(" · ")}
        </p>
      )}
    </div>
    {msg.escalate && msg.status !== "pending" && <SalesActions question={msg.question} onQuote={onQuote} />}
  </div>
);

const AskParasmani = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [quote, setQuote] = useState(null); // question text when the enquiry modal is open

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  const update = (id, patch) =>
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m)));

  // Focus the input on open; return focus to the launcher on close (but not on
  // first page load, which would steal focus from the page).
  const wasOpened = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpened.current = true;
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    if (wasOpened.current) launcherRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Escape closes the panel (but not while the enquiry modal is on top).
  useEffect(() => {
    if (!open || quote !== null) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, quote]);

  // Full-screen on phones: stop the page behind from scrolling.
  useEffect(() => {
    if (!open || window.matchMedia("(min-width: 640px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keep the latest message in view while it streams.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Stop any in-flight answer if the component unmounts.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (raw) => {
      const question = raw.trim().slice(0, MAX_QUESTION_CHARS);
      if (!question || busy) return;

      // History for follow-ups: completed turns only, as plain text.
      const history = messages
        .filter((m) => m.status === "done" && m.text)
        .map((m) => ({ role: m.role, content: m.text }))
        .slice(-5);

      const userId = nextId++;
      const botId = nextId++;
      setMessages((list) => [
        ...list,
        { id: userId, role: "user", text: question, status: "done" },
        { id: botId, role: "assistant", text: "", status: "pending", question },
      ]);
      setInput("");
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const final = await askParasmani({
          messages: [...history, { role: "user", content: question }],
          page: location.pathname,
          signal: controller.signal,
          onDelta: (t) => update(botId, (m) => ({ text: m.text + t })),
          onReplace: (t) => update(botId, { text: t }),
        });
        update(botId, (m) => ({
          status: "done",
          text: m.text.trim(),
          escalate: final.escalate,
          sources: final.sources,
        }));
      } catch (err) {
        if (err.name === "AbortError") return;
        update(botId, {
          status: "error",
          text: err.userMessage || "Something went wrong. Our sales team can help you straight away.",
          escalate: true,
        });
      } finally {
        setBusy(false);
        abortRef.current = null;
      }
    },
    [busy, messages, location.pathname],
  );

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const openQuote = (question) => setQuote(`Enquiry from Ask Parasmani: ${question || ""}`.trim());

  const remaining = MAX_QUESTION_CHARS - input.length;
  const empty = messages.length === 0;

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask Parasmani, the technical assistant"
          aria-expanded={open}
          className="fixed bottom-5 right-5 z-50 flex h-[52px] items-center gap-2.5 rounded-full bg-[#19234D] pl-4 pr-5 font-albert text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(25,35,77,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:bottom-6 sm:right-6 sm:h-[56px]"
        >
          <MessageSquareText className="h-[22px] w-[22px] text-[#E2A66B]" aria-hidden="true" />
          Ask Parasmani
        </button>
      )}

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="ask-parasmani-title"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-48px))] sm:w-[400px] sm:rounded-[24px] sm:border sm:border-gray-100 sm:shadow-[0_24px_60px_rgba(11,18,38,0.28)]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 bg-[#19234D] px-5 pb-4 pt-[max(16px,env(safe-area-inset-top))] text-white">
            <div>
              <h2 id="ask-parasmani-title" className="font-obviously text-[20px] leading-tight">
                Ask Parasmani
              </h2>
              <p className="mt-1 font-albert text-[13px] font-light leading-snug text-white/75">
                Your technical assistant for Parasmani products and applications.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                abortRef.current?.abort();
                setOpen(false);
              }}
              aria-label="Close Ask Parasmani"
              className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>

          {/* Conversation */}
          <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {empty ? (
              <div className="flex flex-1 flex-col justify-end">
                <p className="mb-3 font-albert text-[15px] leading-[1.5] text-[#1C1C1C]">
                  Ask about sizes, tempers, standards, packaging or downloads. If I don't have a verified answer, I'll connect you to our sales team.
                </p>
                <div className="flex flex-col gap-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-[14px] border border-[#C68344]/40 bg-white px-4 py-2.5 text-left font-albert text-[14px] text-[#19234D] transition-colors hover:border-[#C68344] hover:bg-[#C68344]/5"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) =>
                m.role === "user" ? (
                  <div
                    key={m.id}
                    className="max-w-[85%] self-end whitespace-pre-line break-words rounded-[18px] rounded-tr-[6px] bg-[#19234D] px-4 py-2.5 font-albert text-[15px] leading-[1.45] text-white"
                  >
                    {m.text}
                  </div>
                ) : (
                  <AssistantMessage key={m.id} msg={m} onQuote={openQuote} />
                ),
              )
            )}
          </div>

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-gray-100 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
            <div className="flex items-end gap-2 rounded-[18px] border border-gray-200 bg-white py-1.5 pl-4 pr-1.5 focus-within:border-[#19234D]">
              <label htmlFor="ask-parasmani-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="ask-parasmani-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_QUESTION_CHARS))}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Ask a question…"
                className="max-h-[120px] min-h-[36px] flex-1 resize-none bg-transparent py-2 font-albert text-[16px] leading-[1.35] text-[#1C1C1C] outline-none placeholder:text-[#9A9EAB] [field-sizing:content]"
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send question"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C68344] text-white transition-colors hover:bg-[#B5753A] disabled:bg-gray-200 disabled:text-gray-400"
              >
                <ArrowUp size={18} strokeWidth={2.2} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 font-albert text-[11px] leading-snug text-[#6B7080]">
              <span>{DISCLAIMER}</span>
              {remaining < 80 && <span className="shrink-0 tabular-nums">{remaining}</span>}
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-albert text-[13px] font-medium text-[#128C3E] hover:underline"
            >
              <FaWhatsapp className="h-[15px] w-[15px]" aria-hidden="true" />
              Prefer a person? Chat with Sales on WhatsApp
            </a>
          </form>
        </div>
      )}

      <EnquiryModal
        key={quote ?? "closed"}
        open={quote !== null}
        initialMessage={quote ?? ""}
        onClose={() => setQuote(null)}
      />
    </>
  );
};

export default AskParasmani;
