# Ask Parasmani — Design Brief

*Your technical assistant for Parasmani products and applications.*
Status: Phase 0, awaiting approval. 13 Nov 2026.

## The first 10 seconds

| Who | Arrives with | Must get in 10 seconds |
|---|---|---|
| **Plumber** (on site, on a phone, one hand) | "Do you make 15 mm half hard in 5.8 m lengths?" | A yes/no with the exact size, or WhatsApp Sales one tap away. No typing past one line. |
| **HVAC contractor** | "Which coil for a split AC, what sizes?" | Pancake coil range and the matching OD/wall as written in the datasheet, plus the TDS PDF link. |
| **Procurement manager** | "Are you ISI / BIS approved? Who have you supplied?" | The approvals list and the right PDF from Downloads, then Request a Quote with the question already filled in. |
| **Hospital engineer** | "Is your tube suitable for oxygen lines to HTM 02-01?" | General product info (cleaned, capped MGPS tube exists), and an honest handover: "Compliance must be confirmed by Sales" — never a yes. |

## The magic moment

You ask a real question and get **one short, exact answer with its source** ("From: MGPS Tube TDS"), in under two seconds. When the bot does not know, it says so plainly and the WhatsApp button opens **with your question already typed** for Sales. Either way, you are never stuck.

## Deliberately NOT building

- **Chat history, accounts, sign-in.** Each visit starts fresh. Nobody needs to log in to ask about tube sizes.
- **General copper Q&A or "AI says…" answers.** Outside knowledge is the main way a closed bot gives confident wrong answers.
- **Vector search / RAG pipeline.** The knowledge base fits in one prompt. Fewer moving parts means fewer wrong answers.
- **Live pricing, stock, lead times.** These change daily and are not in any file. Always handed to Sales.
- **Running the calculators inside chat.** It links to `/weight-calculator` or `/pressure-calculator` instead, so there is one source of truth for the maths.
- **Voice, file upload, multi-language UI chrome.** The bot replies in the user's language; buttons stay English for now.
- **Admin dashboard for logs (v1).** Unanswered questions go to a MongoDB collection plus a CSV export script. Add an admin page later if you read the logs weekly.
- **Thumbs up/down, typing avatars, personality.** Polish comes from good answers, not decoration.

## Stack detected and where the backend lives

- **Frontend:** React 19 + Vite 8 + Tailwind v4 on Vercel (`www.parasmanicopper.com`). Widget mounts once in `App.jsx`, next to `WhatsAppFloat`, hidden on `/admin`.
- **Backend:** Express 5 + MongoDB on Render (`api.parasmanicopper.com`). It already has IP rate limiting (`express-rate-limit`), CORS for the live domains and `TRUST_PROXY`.
- **Decision:** add `POST /api/ask` to the **existing Render backend**, using the `@anthropic-ai/sdk` package. The key goes in `ANTHROPIC_API_KEY` in Render's environment settings. Render supports long-lived streaming responses; Vercel functions are less suited to that. The route must not fail when MongoDB is down, so logging is best-effort.
- **Knowledge base:** plain Markdown/YAML files in `knowledge/`, loaded by the backend when it starts. Only `status: approved` entries are sent to the model.

## Where I'd push back (please decide)

1. **Render free plan sleeps** for 30 to 60 seconds. A cold first question kills the magic moment, so it needs a paid instance or a keep-warm ping.
2. **The existing "Ask AI" strip on Home** sends visitors to ChatGPT, Google and Perplexity, which can say anything about us. That contradicts "honesty is the brand". I recommend repointing it to open Ask Parasmani, but that changes a page, so it needs your yes.
3. **One launcher, not two.** WhatsApp already floats bottom-right. A second bubble stacked on it is clutter. Proposal: a single "Ask Parasmani" pill there, with WhatsApp moved inside the panel as a permanent button. Alternatively, keep both, stacked.
4. **Escalation buttons come from the server, not the model's wording.** The model returns `{answer, entry_ids, escalate}`. Safety-critical topics are forced to `escalate: true` in code, so the buttons can't be talked away by a cleverly phrased prompt.

Decided (13 Nov 2026):
- **WhatsApp Sales** in the bot uses **+91 81698 08254** (`wa.me/918169808254`), not the site's floating-button number +91 98191 34044. The existing floating button stays as it is.
- **Request a Quote** opens the existing `EnquiryModal` / `EnquiryForm`, with the customer's question prefilled. This needs one small optional prop on the form (initial message); no visual change. The form's message field allows 10–300 characters, so long questions are trimmed to fit.
