# Ask Parasmani — how it works, how to run it, how to keep it right

*Your technical assistant for Parasmani products and applications.*

A floating **Ask Parasmani** button sits bottom-right on every public page. It answers **only** from entries you have approved in `knowledge/`. When it can't, it says so and offers **WhatsApp Sales** (+91 81698 08254) and **Request a Quote** (the site's existing enquiry form), both prefilled with the visitor's question.

## The one thing to know

**The bot knows nothing until you approve entries.** With zero approved entries every question gets the "I don't have verified information" reply. Before going live, approve the ~20 entries in [knowledge/LAUNCH_LIST.md](knowledge/LAUNCH_LIST.md) (about 10 minutes).

To approve an entry: change `status: needs_verification` to `status: approved`, then commit and push. The server re-reads the folder every minute, so after Render redeploys there is no code change and no restart needed.

## What happens to a question

1. **Greeting or thanks** ("hi", "thanks"): instant fixed reply, no AI call.
2. **Nothing approved yet**: escalation reply, no AI call.
3. Otherwise the question goes to Claude with the rules and **only the approved entries**. Claude must start its reply with one of:
   - **ANSWER**: streamed to the visitor, with "Based on: …" showing which entries it used. If it cites no real approved entry, the Sales buttons appear and the question is logged.
   - **ESCALATE**: the exact sentence "I don't have verified information for that specific requirement. Our sales team can help you with the exact specification." (or its translation), plus both buttons.
   - **OUT_OF_SCOPE**: a fixed "I can only help with Parasmani…" message.
4. **Sales buttons are forced by the server, not chosen by the AI**, whenever an answer uses a `safety_critical` entry or the question mentions pressure, wall suitability, medical gas, fuel gas, codes or compliance, price, stock or delivery.

## Guardrails

| Guardrail | Setting |
|---|---|
| API key | Only in the server environment (`ANTHROPIC_API_KEY` on Render). Never in the browser or the code. |
| Rate limit per IP | 20 questions / 10 min and 100 / day (`ASK_LIMIT_10MIN`, `ASK_LIMIT_DAY`) |
| Question length | 500 characters; last 6 messages of history only |
| Prompt injection | Rules tell the model to ignore role changes and prompt-reveal requests; the server only accepts user/assistant turns; it never shows the citation line or unapproved content. |
| Database down | The assistant keeps working; only logging pauses. |
| Logging | Every escalated, out-of-scope, uncited or failed question is saved to MongoDB (`asklogs`), with the visitor's IP stored only as a hash. |

**Your to-do list for improving the knowledge base:**

```bash
cd backend
npm run ask:export
```

This writes `backend/ask-log.csv` (last 30 days; `npm run ask:export -- 7` for 7 days). Each row is a question the bot couldn't answer.

## Run it locally

1. Backend: copy `backend/.env.example` to `backend/.env`, fill `MONGO_URI`, the existing keys, and **`ANTHROPIC_API_KEY`**.
2. Frontend: create `frontend/.env` with `VITE_BACKEND_URI=http://localhost:9000` (origin only, no `/api`).
3. Run each in its own terminal:

```bash
cd backend && npm install && npm run dev
```

```bash
cd frontend && npm install && npm run dev
```

Open http://localhost:5173 and click **Ask Parasmani**.

## Tests

```bash
cd backend && npm test
```

24 offline tests: knowledge parsing, guardrails, the reply protocol and the full `/api/ask` route with a fake model. No key needed.

```bash
cd backend && npm run ask:eval
```

The live eval asks **35 real questions**: 12 answerable, 8 not in the knowledge base, 7 safety-critical, and 8 off-topic, prompt-injection or "make it guess" attempts. It treats the launch list as approved without changing any file, prints PASS/FAIL per question, and saves `backend/test/ask-eval-results.json`. It needs `ANTHROPIC_API_KEY` and makes ~35 API calls.

## Dev site on Vercel (test here before main)

The `dev` branch deploys as a private preview on both Vercel projects. `main`, and therefore the live site, is unaffected.

| | Vercel project |
|---|---|
| Website | `parasmani-website` |
| API | `parasmani-website-5gcw` |

**Get the two dev addresses first.** In each project open Deployments, click the latest deployment of branch `dev`, and copy the domain that contains `git-dev`. That domain always points at the newest `dev` build. Don't use the address with a random code (like `-nqe6okvez-`), because it changes on every push. Below, `<DEV_SITE>` and `<DEV_API>` mean those two addresses. For tidier names, add custom domains such as `dev.parasmanicopper.com` and `api-dev.parasmanicopper.com` under Settings → Domains and assign them to the `dev` branch.

One-time setup in the Vercel dashboard:

1. **API project `parasmani-website-5gcw`** → Settings → Environment Variables. For each variable choose environment **Preview** and branch **dev**:
   - `ANTHROPIC_API_KEY` = your key
   - `ALLOWED_ORIGINS` = `<DEV_SITE>` (with `https://`, no trailing slash)
   - `TRUST_PROXY` = `1`
   - Check that `MONGO_URI`, `JWT_SECRET` and the three `IMAGEKIT_*` variables are also enabled for Preview; the API won't start without the ImageKit ones. With the live `MONGO_URI`, quotes sent from the dev site land in your real admin panel. With a separate database, the dev site's blogs are empty.
2. **API project** → Settings → Deployment Protection: let **preview** deployments be reached without a Vercel login. Otherwise the browser can't call the dev API. It is still rate-limited.
3. **Website project `parasmani-website`** → Settings → Environment Variables → `VITE_BACKEND_URI` = `<DEV_API>` (origin only, no `/api`), environment **Preview**, branch **dev**. Leave this project's Deployment Protection on, so only people logged in to your Vercel team can open the dev site.
4. Redeploy the latest `dev` deployment in both projects (Deployments → ⋯ → Redeploy) so the new variables apply.

To try approvals safely: approve entries on the `dev` branch, push, test on the dev site, and merge to `main` only when you're happy.

## Deploy

1. **Render (backend)**: Service → Environment → add `ANTHROPIC_API_KEY`. Also set `ASK_LOG_SALT` to any random string, and keep `TRUST_PROXY=1` so rate limits see real visitor IPs. Deploy. The `knowledge/` folder ships with the repo, so the backend finds it at `../knowledge`. If the Render service is ever set to deploy only the `backend/` folder, set `KNOWLEDGE_DIR` instead.
2. **Render free plan sleeps.** The first question after a quiet spell can take 30–60 seconds. Use a paid instance, or an uptime monitor pinging `https://api.parasmanicopper.com/health` every 10 minutes.
3. **Vercel (frontend)**: no new settings. `VITE_BACKEND_URI` is already set. Deploy as usual.
4. Smoke test on the live site: ask one launch-list question (should answer with "Based on…"), one price question (should show both buttons), and "write me a poem" (should decline).

## Settings

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Required |
| `ASK_MODEL` | `claude-opus-5-5` | Model |
| `ASK_EFFORT` | `low` | Thinking effort; low keeps replies fast |
| `ASK_FALLBACKS` | `on` | If Claude's safety filter declines a request, retry on a fallback model inside the same call |
| `ASK_LIMIT_10MIN` / `ASK_LIMIT_DAY` | 20 / 100 | Per-IP limits |
| `ASK_LOG_SALT` | built-in | Salt for IP hashes |
| `KNOWLEDGE_DIR` | `../knowledge` | Where the entries live |

## Files

| Path | What |
|---|---|
| `knowledge/` | The knowledge base (plain Markdown). `README.md` explains the format; `REVIEW.md` lists the conflicts to resolve; `LAUNCH_LIST.md` lists what to approve first. |
| `backend/src/ask/` | Knowledge loader, guardrails, prompt, reply protocol, decision logic |
| `backend/src/controllers/askController.js` | The `/api/ask` streaming endpoint |
| `backend/src/models/AskLog.js` | Unanswered-question log |
| `frontend/src/components/askParasmani/` | The floating widget and its streaming client |

## What I left out on purpose

- **Chat history, accounts, sign-in.** Each visit starts fresh. Nobody needs a login to ask about tube sizes.
- **Answering from unapproved data "for now".** Going live early with guesses would cost more trust than a slower launch.
- **Vector search.** The whole approved knowledge base fits in one cached prompt, so there are fewer moving parts and fewer wrong answers.
- **Live prices, stock, lead times.** These are always handed to Sales.
- **Doing calculations in chat.** The bot points to the site's calculators, so the maths lives in one place.
- **An admin page for the question log (v1).** Use `npm run ask:export` for a CSV. Add a page later if you read the log weekly.
- **Thumbs up/down, avatars, a personality.** The polish is in honest, short answers.
- **Changing the home page "Ask AI" strip.** It still links to ChatGPT, Google and Perplexity. I'd point it at Ask Parasmani, but that's your call.
