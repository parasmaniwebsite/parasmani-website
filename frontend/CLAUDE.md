# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing site plus a small admin CMS for Parasmani, a copper tube manufacturer. React 19 + Vite 8 + Tailwind v4, no TypeScript.

This directory is the `frontend` workspace of a monorepo. The git root is one level up at `/mnt/newdisk/Projects/pm`, which also holds `backend/` (Express 5 + MongoDB/Mongoose + JWT). The two are separate npm projects with their own `package.json` and `.env`; there is no workspace tooling linking them.

## Commands

```bash
npm run dev       # Vite dev server on :5173
npm run build     # production build to dist/
npm run preview   # serve the built output
npm run lint      # eslint over the repo
```

The backend runs separately (`cd ../backend && npm run dev`, on :9000) and needs MongoDB up. Most public pages render fine without it; blogs, contact and everything under `/admin` do not.

There is **no test setup** — no test runner, no test script, no test files. Don't advertise a testing workflow that doesn't exist; verify changes by building and exercising the page.

`npm run lint` reports ~96 pre-existing errors, almost all `no-unused-vars` (unused `React` imports and dead asset imports). That is the baseline, not something you broke. Compare against it before and after a change rather than trying to reach zero.

## Environment

`VITE_BACKEND_URI` must be the backend **origin only**, with no path:

```
VITE_BACKEND_URI=http://localhost:9000
```

`.env.example` currently shows `http://localhost:9000/api`, which is wrong. Every call in `src/utils/serviceAPI.js` already prefixes `/api/...`, and the backend mounts its routers at `/api/auth`, `/api/blog`, `/api/category`, `/api/contact`. Including `/api` in the variable produces `/api/api/blog` and 404s. The same variable is also used directly to build image URLs (`${backendURL}/uploads/${blog.image}`), which only resolves if it is an origin.

## Architecture

**Routing** is a single flat `<Routes>` block in `src/App.jsx` — no lazy loading, no nested layouts. `App.jsx` checks `location.pathname.startsWith("/admin")` to hide the `Navbar`/`Footer` chrome on admin screens. Adding a page means adding an import and a `<Route>` there.

**API access** goes through the axios instance in `src/utils/serviceAPI.js`, which sets `baseURL` from the env var and attaches `Authorization: Bearer <token>` from `localStorage` on every request. Use this instance rather than calling axios or fetch directly.

**Auth is client-side only.** `ProtectedRoute` checks for the presence of a `token` key in `localStorage` and redirects to `/admin/login` if absent — it does not validate or decode it. Real enforcement is the backend's JWT middleware. Never treat the admin routes as a security boundary on their own.

**Page composition:** large pages are a top-level file plus a sibling directory of section components, e.g. `pages/products/StraightCopperTube.jsx` imports from `pages/products/straightCopperTube/`. The top-level file owns the hero, asset imports and page-level scroll animations (framer-motion); sections are self-contained and mostly presentational.

`src/pages/products/straightCopperTube/` was previously named `straightCopperTube.` with a trailing dot. Win32 silently strips trailing dots from path segments, so the directory could not be checked out or resolved on Windows and the build failed there. It has been renamed and its five importers updated. **Never create a file or directory whose name ends in a dot or a space, and avoid the Windows reserved names** (`CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9`) — any of these makes the repo un-clonable on Windows.

Filenames must also never differ only by case: macOS and Windows are case-insensitive, so two such files collide on checkout while resolving fine on Linux.

**SPA hosting:** `vercel.json` rewrites all paths to `/` so client-side routes deep-link correctly.

## Typography and fonts

There is a deliberate type system in `src/index.css` — use it instead of inventing per-element sizes.

| Class | Size | Family |
|---|---|---|
| `.h1` | 32px (26px under 768px) | Obviously |
| `.h2` | 28px (24px under 768px) | Obviously |
| `.p1` / `.p2` | 17px / 16px | Albert Sans |
| `.eyebrow-1` / `.eyebrow-2` | 13px / 12px | Albert Sans |
| `.b2` | 16px | Albert Sans |

Every `h1` and `h2` in the codebase already carries `.h1`/`.h2`. `.p1`, `.p2`, `.eyebrow-*` and `.b2` exist but are **not yet applied** — body copy is still styled inline. Apply them when touching a section, but don't bulk-map by font size: the raw sizes overlap with table cells, form labels and captions that are not body copy.

These classes sit in `@layer components`, so an inline Tailwind utility still wins when you genuinely need a one-off.

**Use `font-albert` and `font-obviously`, never `font-[AlbertSans]` or `font-['Obviously']`.** The arbitrary form compiles to a bare family name with no fallback, so any font failure drops the page to the browser default serif. The utilities resolve to `--font-albert` / `--font-obviously` theme tokens that carry a full fallback chain. In inline styles use `fontFamily: "var(--font-albert)"`.

Both faces are self-hosted from `src/assets/fonts` as **woff2 only**, bundled by Vite with `font-display: swap`, and preloaded from `index.html` (Vite rewrites those hrefs to the hashed paths at build). There are no Google Fonts links and none should be added — the site must work offline and where Google Fonts is blocked.

**Never add `local()` to a `@font-face`.** It makes the browser prefer a same-named font installed on the visitor's machine over the bundled file, so anyone with the real licensed Obviously — the designer, typically — saw a different typeface to everyone else on the same page and browser. This was a real bug; don't reintroduce it.

Albert Sans is the upstream **variable** font (SIL OFL, licence in `AlbertSans-OFL.txt`). It replaced the Regular+Medium statics; at 400/500 its metrics are identical to those, so body copy did not reflow.

It is deliberately declared **`font-weight: 400 900`, not `100 900`**. The site uses `font-extralight`(200) and `font-light`(300) on ~238 elements, mostly hero eyebrows and body copy. With only the 400/500 statics those requests found no lighter face and silently rendered at 400 — that is the weight the design was drawn against. Declaring the full range exposes genuine 200/300 and makes all that text visibly thinner than intended. The clamp keeps the intended look while 600/700 still resolve to real instances rather than faux-bold, which was the actual defect. Widening to `100 900` is only correct alongside a deliberate pass over those 238 elements.

Obviously is a **66-glyph demo cut** — `A-Z`, `a-z`, `0-9`, comma, period, space, nothing else. Any heading containing `&`, `'`, `-`, `/`, `?`, `+`, `%` or a dash falls back for that one character; about 20 headings site-wide do, including four industry heroes. `'Obviously Fallback'` in `index.css` exists for exactly this: the same Albert Sans file at `size-adjust: 106.67%` (cap-height matched) and pinned to `font-weight: 500` (stem-matched to Obviously's single outline). It sits between Obviously and AlbertSans in the `--font-obviously` chain. Both numbers are measured off rendered outlines — read the comments there before changing either. The real fix is licensing the full family; until then, prefer heading copy that avoids those characters.

The one deliberate exception is the PDF export template in `pages/WeightCalculator.jsx`, a standalone HTML string rendered outside the app where `index.css` variables do not resolve. It keeps its own literal font stack — leave it alone.

## Conventions

Styling is Tailwind utilities written inline, heavily using arbitrary values for colours and spacing (`text-[#18234D]`, `rounded-[20px]`). There is no design-token layer beyond the fonts, and brand colours are repeated as literals — `#18234D`/`#19234D` navy, `#C68344`/`#BC6C3D` copper, `#C43A26` red.

Interactive product visualisations (the scale previews in `SpecificationsSection`, the calculators) map slider percentages to real-world values through small helper functions and drive CSS via inline `style` on an image or SVG. When changing them, scope transitions to the property that actually animates rather than `transition-all`, and be aware that source PNGs may carry large transparent margins — `object-contain` will letterbox them, and `object-fill` on a padded image stretches empty space.
