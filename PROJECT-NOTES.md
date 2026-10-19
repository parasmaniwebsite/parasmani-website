# Parasmani Website — Project Notes

Plain-language guide to how this website is put together. Written for someone who does not code.
Last reviewed: 19 Oct 2026.

---

## 1. The big picture

The website is made of **two separate programs** that talk to each other:

| Part | Folder | What it is | Where it runs |
|---|---|---|---|
| **Frontend** | `frontend/` | Everything a visitor *sees*: pages, text, images, buttons, calculators, PDFs. | Vercel (the public site, `www.parasmanicopper.com`) |
| **Backend** | `backend/` | The "back office" server. Stores and hands out blogs, enquiries and admin logins. Visitors never see it directly. | Render (address `api.parasmanicopper.com`; older address `parasmani.onrender.com`) |

Plus three outside services the backend uses:

| Service | Used for |
|---|---|
| **MongoDB** (database) | Stores blogs, blog categories, enquiries/leads, admin accounts, password-reset codes. |
| **ImageKit** (image hosting) | Stores the pictures uploaded for blog posts. |
| **Resend** (email sending) | Sends the "forgot password" code email to admins. |

Simple way to think about it:
- Most of the site (product pages, industry pages, about, quality, downloads, calculators) is **fixed content** built into the frontend. Changing it means editing code.
- Only **blogs** and **enquiries** are "live" content that come from the backend and can be managed in the **admin panel** without touching code.

---

## 2. Public pages (what visitors see)

Every page address is listed in one file: **`frontend/src/App.jsx`**. That file is the "map" of the site — it says "this web address shows this page file".

All page files are inside `frontend/src/pages/`. Short form below: `pages/...` means `frontend/src/pages/...`.

### Main pages

| Web address | Page | File that controls it |
|---|---|---|
| `/` | Home page | `pages/Home.jsx` |
| `/about` | About Us | `pages/AboutUs.jsx` (sections in `pages/about/`) |
| `/quality` | Quality & Assurance | `pages/QualityAndAssurance.jsx` (+ `pages/about/quality/Compliance.jsx`) |
| `/certifications` | Certifications & Approvals | `pages/CertificationsAndApprovals.jsx` |
| `/downloads` | Downloads (brochures, spec sheets, PDFs) | `pages/DownloadPage.jsx` |
| `/contact` | Contact Us | `pages/Contact.jsx` (the form itself is `components/EnquiryForm.jsx`) |
| `/blogs` | Blog list | `pages/BlogPage.jsx` |
| `/blog/<post-name>` | A single blog post | `pages/BlogDetail.jsx` |

### Products

| Web address | Page | File |
|---|---|---|
| `/products` | All products overview | `pages/products/ProductMainPage.jsx` |
| `/straight-copper-tubes` | Straight Copper Tubes | `pages/products/StraightCopperTube.jsx` (sections in `pages/products/straightCopperTube/`) |
| `/pancake-copper-coil` | Pancake Copper Coil | `pages/products/PancakeCoil.jsx` (sections in `pages/products/pancake/`) |
| `/copper-fittings` | Copper Fittings | `pages/products/CopperFittings.jsx` (sections in `pages/products/copperFittings/`) |

### Industries

| Web address | Page | File |
|---|---|---|
| `/industry` | All industries overview | `pages/IndustrymainPage.jsx` |
| `/hvac-refrigeration` | HVAC & Refrigeration | `pages/industries/HvacRefrigiration.jsx` (sections in `pages/industries/HVAC/`) |
| `/medical-gas` | Medical Gas | `pages/industries/MedicalGas.jsx` (sections in `pages/industries/medicalGas/`) |
| `/household-fuel-gas` | Household & Fuel Gas | `pages/industries/HouseHoldAndFuelGas.jsx` (sections in `pages/industries/HouseHoldAndFuelGas/`) |
| `/plumbing-water-supply` | Plumbing & Water Supply | `pages/industries/PlumbingAndWaterSupply.jsx` (sections in `pages/industries/PlumbingAndWaterSupply/`) |
| `/industrial-process-application` | Industrial & Process | `pages/industries/IndustrialAndProcessApplications.jsx` (sections in `pages/industries/IndustrialAndProcessApplications/`) |

Old misspelled address `/hvac-refrigiration` automatically forwards to `/hvac-refrigeration` (set in `frontend/vercel.json`).

### Tools / calculators

| Web address | Page | File |
|---|---|---|
| `/tools` | Tools overview | `pages/ToolsPage.jsx` |
| `/weight-calculator` | Copper tube weight calculator (can export PDF) | `pages/WeightCalculator.jsx` |
| `/pressure-calculator` | Pressure calculator | `pages/PressureCalculatorPage.jsx` (parts in `pages/pressureCalculator/`) |
| `/project-estimator` and `/copper-estimator` (same page) | Project / copper estimator — also sends a lead to the admin panel | `pages/CopperEstimator.jsx` |
| `/unit-converter` | Unit converter | `pages/UnitConverterPage.jsx` (parts in `pages/unitConverter/`) |

### Legal & other

| Web address | Page | File |
|---|---|---|
| `/privacy-policy` | Privacy Policy | `pages/legal/PrivacyPolicy.jsx` |
| `/terms-of-service` | Terms of Service | `pages/legal/TermsOfService.jsx` |
| any unknown address | "Page not found" | `pages/NotFound.jsx` |

### Pieces shared by many pages

These live in `frontend/src/components/` and appear on many pages:

| File | What it is |
|---|---|
| `Navbar.jsx` | Top menu bar |
| `Footer.jsx` | Bottom footer |
| `WhatsAppFloat.jsx` | Floating WhatsApp button |
| `EnquiryForm.jsx` / `EnquiryModal.jsx` | The enquiry form and its pop-up version |
| `Hero.jsx`, `ProductsSection.jsx`, `BrandsServed.jsx`, `InsightsSection.jsx`, etc. | Sections of the Home page (`InsightsSection` shows latest blogs) |
| `PageMeta.jsx` | Sets each page's Google title/description (text comes from `frontend/src/seo/pageMeta.js`) |

**Tip:** large pages = one main file + a folder of the same name holding its sections. To change, say, the FAQ on the Medical Gas page, look in `pages/industries/medicalGas/` (FAQ text is in `faqData.js`).

### SEO files

| File | Purpose |
|---|---|
| `frontend/src/seo/pageMeta.js` | Page titles & descriptions shown in Google |
| `frontend/src/seo/schema.js`, `faqSources.js` | Extra info for Google (structured data) |
| `frontend/public/robots.txt` | Tells search engines what to crawl |
| `frontend/public/sitemap.static.xml` | List of fixed pages for Google |
| `frontend/scripts/generate-sitemap.js` | Runs on every build; joins the static list with live blog posts (fetched from `api.parasmanicopper.com`) to make the final `sitemap.xml` |

---

## 3. Admin panel

### How to reach it

Go to `www.parasmanicopper.com/admin` → it takes you to the login page. On admin pages the normal menu, footer and WhatsApp button are hidden. Search engines are told not to index admin pages.

### Admin pages

| Web address | What it does | File |
|---|---|---|
| `/admin/login` | Sign in with email + password | `pages/admin/AdminLogin.jsx` |
| `/admin/forgot-password` | Reset password using a code emailed to you | `pages/admin/AdminForgotPassword.jsx` |
| `/admin/dashboard` | Shows totals: number of blogs, number of enquiries | `pages/admin/Dashboard.jsx` |
| `/admin/blogs` | Create, edit, delete, reorder blog posts; add/delete blog categories | `pages/admin/Blogs.jsx` (+ `components/admin/BlogFormModal.jsx`, `BlogCard.jsx`) |
| `/admin/enquiries` | See all leads from the contact form and the estimator; mark status (New / Contacted / Converted / Closed); delete | `pages/admin/AdminContact.jsx` (+ `components/admin/ContactTable.jsx`) |

Admin side menu and layout: `components/admin/AdminLayout.jsx`, `AdminSideBar.jsx`, `AdminNavbar.jsx`.

### How login works (simple version)

1. Admin types email + password on the login page.
2. Frontend sends them to the backend. Backend checks them against the database.
3. If correct, backend gives back a **token** (like a 7-day entry pass). The browser keeps it.
4. Every admin action (add blog, view enquiries…) sends that pass along. **The backend checks the pass every time** — this is the real lock.
5. Changing your password cancels all old passes, so everyone must log in again.

Login and password-reset attempts are rate-limited (too many tries → temporarily blocked) to stop guessing attacks.

### Where the first admin account comes from

When the backend starts, it checks whether an admin with the email in the setting `ADMIN_EMAIL` exists. If not, it creates one using `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (file: `backend/src/utils/createSuperAdmin.js`). These settings are entered in Render's dashboard, not in the code.

### Forgot password flow

1. Enter email → backend emails a short code (via Resend).
2. Enter code → backend gives a short-lived reset pass.
3. Enter new password → saved; old logins stop working.

---

## 4. What the Render backend does

The backend is a small server (Node.js + Express). Its code is in `backend/`. Starting file: `backend/server.js`; main setup: `backend/src/app.js`.

It does four jobs, each at its own address:

| Address on backend | Job | Who can use it |
|---|---|---|
| `/api/blog` | Give out blog posts (list, single post, categories). Create/edit/delete/reorder posts. | Reading: anyone. Changing: admins only. |
| `/api/category` | Blog categories. | Reading: anyone. Changing: admins only. |
| `/api/contact` | Receive enquiries from the website's forms (contact form + project estimator). List/update/delete them. | Sending: anyone. Viewing/changing: admins only. |
| `/api/auth` | Admin login, "who am I", add another admin, forgot/reset password. | Login: anyone. Others: admins. |
| `/health` | "Are you alive?" check — returns `ok`. Useful for Render monitoring. | Anyone |

Where the code for each job lives:

| Job | Route file (address list) | Logic file | Data shape |
|---|---|---|---|
| Blogs | `backend/src/routes/blogRoute.js` | `backend/src/controllers/blogController.js` | `backend/src/models/Blog.js` |
| Categories | `routes/categoryRoute.js` | `controllers/categoryController.js` | `models/Category.js` |
| Enquiries | `routes/contactRoute.js` | `controllers/contactController.js` | `models/Contact.js` |
| Admin login | `routes/authRoute.js` | `controllers/authController.js` | `models/admin.js`, `models/PasswordReset.js` |

Other backend helpers (`backend/src/`):
- `middlewares/authMiddleware.js` — checks the admin pass on protected actions.
- `middlewares/rateLimiters.js` — limits repeated login/reset attempts.
- `middlewares/uploadMiddleware.js` — receives uploaded image files (held in memory, then sent to ImageKit).
- `utils/db.js` — connects to MongoDB.
- `utils/imagekit.js` — connects to ImageKit.
- `utils/resend.js`, `utils/sendEmail.js`, `utils/otp.js` — password-reset emails and codes.

Which websites may talk to the backend (set in `backend/src/app.js`): `www.parasmanicopper.com`, `parasmanicopper.com`, and `localhost:5173` (for local testing). Any new domain must be added there.

**Render free-plan note:** free Render servers "fall asleep" when unused. The first visitor after a quiet period may wait ~30–60 seconds for blogs to load. Paid plan avoids this.

**Note:** the backend folder also contains `backend/vercel.json` and `backend/api/index.js`, which would let it run on Vercel instead. Production is Render; those files are a spare option.

### Settings (secret keys) the backend needs

Entered in Render → service → Environment. Never put real values in the code. Full list with explanations: `backend/.env.example`.

| Setting | Meaning |
|---|---|
| `MONGO_URI` | Database address + password |
| `JWT_SECRET` | Secret used to sign admin login passes (must be long and random) |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | First admin account |
| `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` | Image hosting keys |
| `RESEND_API_KEY`, `MAIL_FROM`, `APP_NAME` | Email sending |
| `PORT` | Set automatically by Render |
| `TRUST_PROXY` | Should be `1` on Render so rate-limiting sees real visitor addresses |

Frontend has one setting: `VITE_BACKEND_URI` = backend address **without** `/api` at the end (e.g. `https://api.parasmanicopper.com`). Set in Vercel. (Note: `frontend/.env.example` wrongly shows `/api` at the end — don't copy that part.)

---

## 5. Where images, videos and PDFs are stored

### A. Fixed website images & PDFs → inside the frontend code

These are part of the code. To change one, replace the file and redeploy.

| What | Folder |
|---|---|
| Page images (by section) | `frontend/src/assets/` — e.g. `homePage/`, `about/`, `products/`, `industries/`, `hvac/`, `brands/` (client logos), `certifications/`, `footer/`, `contact/`, `blogs/`, `Built/` |
| Hero videos (home page) | `frontend/src/assets/heroVideo.mp4`, `heroVideo2.mp4`, `heroVideo3.mp4` |
| Other videos + poster images | `frontend/public/videos/` |
| Fonts | `frontend/src/assets/fonts/` |
| Site icon & social-share image | `frontend/public/favicon.svg`, `frontend/public/og-image.png`, `frontend/src/assets/favicon.png` |

**PDFs (Downloads page)** — all in `frontend/src/assets/downloads/`:

| Sub-folder | Contents |
|---|---|
| `brochures/` | Product catalog + HVAC-R, MGPS (medical), Plumbing, Fuel Gas, Industrial brochures |
| `Spec-Sheets/` | Technical data sheets (HVAC-R tubes, PTP K-Series, MGPS tubes) |
| `deal-reference/` | Weight charts, packaging specifications |
| `Approvals/` | OEM/vendor, project, government approvals |
| `Policies/` | Quality policy, supplier code of conduct |

**To add/replace a PDF:** put the file in the right sub-folder, then list it in `pages/DownloadPage.jsx` (top of file has one line per PDF, and the list below gives its title and download name). Replacing a file with the *exact same name* needs no code change — just redeploy.

### B. Blog images → ImageKit (online)

When an admin uploads a blog picture, the backend sends it to **ImageKit** (folder `/blogs`). Only the picture's web link is saved in the database. So blog images are **not** in this code folder — manage them in the ImageKit dashboard.

### C. Old uploads folder (legacy)

`backend/src/uploads/` holds a few old test images from before ImageKit was used. Very old blog posts may still point there. On Render, anything saved there would be wiped on each redeploy, which is why ImageKit is used now.

### D. Text content stored in the database (MongoDB)

Blog posts (title, summary, content, category, order), blog categories, enquiries/leads, admin accounts.

---

## 6. How a change goes live

1. Code is changed and pushed to GitHub (`main` branch).
2. **Vercel** rebuilds the frontend automatically → new pages/images/PDFs live in a few minutes. Build also regenerates the sitemap from live blogs.
3. **Render** rebuilds the backend automatically (if auto-deploy is on).
4. Blogs and enquiries do **not** need a redeploy — they change instantly via the admin panel.

---

## 7. Things noticed during this review (not yet fixed)

- `frontend/.env.example` shows the backend address ending in `/api`; correct value has no `/api`.
- Blog edit form can upload an "author image", but the blog database shape (`backend/src/models/Blog.js`) has no author-image field, so it is silently not saved.
- Root folder has many older guide files (`README.md`, `QUICKSTART.md`, `SETUP.md`, `FIXES.md`, `COMPLETION_SUMMARY.md`, etc.) that may be out of date. This file and `frontend/CLAUDE.md` are the most current.
- `backend/src/uploads/` contains leftover test images (WhatsApp photo, QR code) that can probably be removed.
- One image file has an unusual name with a special space: `frontend/src/assets/products/copperFitting/Screenshot 2026-06-08 at 10.37.59 PM.png` — can cause trouble on Windows; worth renaming.
