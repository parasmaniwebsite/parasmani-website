/**
 * Per-route <head> metadata — single source of truth.
 *
 * Rendered by components/PageMeta.jsx, which React 19 hoists into <head>.
 * Keys are exact pathnames matching the <Route> list in App.jsx.
 *
 * The copy below is transcribed verbatim from the client's approved
 * "Parasmani Meta Data for Developer" hand-off, including its em dashes and
 * ampersands. Do not reword it here — character counts were signed off
 * against that document. Its targets are title <= 60 and description
 * 140-160; a few titles run slightly over 60 by design and still display.
 *
 * Two routes are not in that document and keep locally written copy:
 * /products (added after the hand-off) and /tools.
 *
 * Rules of thumb when editing:
 *  - Every standard or approval named here was grepped against that page's
 *    own copy first. Don't add a claim the page doesn't visibly make —
 *    Google rewrites snippets it can't corroborate, and it's a commercial
 *    claim either way. The hand-off flags the cited standards (JIS H 3300,
 *    ASTM B68, ASTM B280, EN 13348, IS 10773) as needing confirmation
 *    against actual certification before publishing.
 *  - `canonical` defaults to SITE_URL + the key. Only set it to dedupe two
 *    routes that render the same page.
 *  - `noindex: true` keeps a route out of the index (admin screens).
 *
 * /blog/:id is deliberately absent: BlogDetail.jsx builds its own tags from
 * the fetched post — its title is the post H1 and its description the post
 * intro, which is what the hand-off asks for.
 *
 * /downloads?category=... are filtered views of one page. PageMeta keys on
 * pathname only, so they resolve to the /downloads entry and canonicalise
 * back to /downloads. They are deliberately absent from public/sitemap.xml.
 */

/** Production origin. Also used by public/sitemap.xml and public/robots.txt. */
export const SITE_URL = "https://www.parasmanicopper.com";

/** Brand suffix used when building titles at runtime (e.g. blog posts). */
export const BRAND_SUFFIX = "Parasmani Copper";

export const pageMeta = {
  // ── Home ──────────────────────────────────────────────────────────────
  "/": {
    title: "Copper Tubes & Fittings Manufacturer in India | Parasmani",
    description:
      "BIS & ISO 9001:2015 certified maker of seamless copper tubes, pancake coils & fittings for HVAC/R, medical gas & plumbing. Trusted by OEMs & exporters.",
  },

  // ── Products ──────────────────────────────────────────────────────────
  // Not in the hand-off — added after it was written.
  "/products": {
    title: "Copper Tubes, Coils & Fittings — Our Products | Parasmani",
    description:
      "One range covering seamless straight copper tubes, soft annealed pancake coils and precision wrought fittings — engineered for HVAC/R, plumbing, medical gas and industrial use.",
  },
  "/straight-copper-tubes": {
    title: "Seamless Copper Tubes Manufacturer | Parasmani",
    description:
      "Seamless straight copper tubes in 3 m lengths for HVAC/R, plumbing, medical gas & industry. Cold-drawn, pressure-tested, JIS H 3300 & IS 10773 compliant.",
  },
  "/pancake-copper-coil": {
    title: "Pancake Copper Coil Manufacturer, AC & Refrigeration | Parasmani",
    description:
      "Soft-annealed pancake copper coils (15.24 m) for split AC, refrigeration & cold storage. JIS H 3300, ASTM B68 & IS 10773 compliant, R32/R410A ready.",
  },
  "/copper-fittings": {
    title: "Copper Fittings Manufacturer | Elbows & Couplings | Parasmani",
    description:
      "Wrought copper fittings — elbows, tees, couplers, U-bends & reducers for clean brazed joints. Individually wrapped for HVAC/R, medical gas & plumbing.",
  },

  // ── Industries ────────────────────────────────────────────────────────
  "/industry": {
    title: "Copper Tube Applications by Industry | Parasmani",
    description:
      "Copper tube solutions for HVAC/R, medical gas, plumbing, industrial process & fuel gas. Explore Parasmani application-specific tubes, coils & fittings.",
  },
  "/hvac-refrigeration": {
    title: "ACR Copper Tubes for Split AC, VRF & Chillers | Parasmani",
    description:
      "HVAC/R copper tubes, pancake coils & fittings for split AC, VRF/VRV, chillers & cold storage. R32/R410A compatible, JIS H 3300, ASTM B280 & IS 10773 compliant.",
  },
  "/medical-gas": {
    title: "Medical Gas Copper Pipe — EN 13348 | Parasmani",
    description:
      "Degreased and residual carbon controlled medical gas copper pipe made to EN 13348 for MGPS. Download the Parasmani medical gas catalogue for sizes & specs.",
  },
  "/household-fuel-gas": {
    title: "Copper Gas Pipe for LPG & PNG | Fuel Gas | Parasmani",
    description:
      "Copper tube for household LPG, PNG & fuel gas piping inside buildings, made to European & American gas standards. Download the Parasmani gas piping brochure.",
  },
  "/plumbing-water-supply": {
    title: "Copper Plumbing Pipes & Tubes | Water Supply | Parasmani",
    description:
      "Copper tube & precision fittings for clean drinking-water supply inside buildings. Corrosion-resistant, built for reliable brazed joints.",
  },
  "/industrial-process-application": {
    title: "Copper Tubes for Industrial & Process Use | Parasmani",
    description:
      "Copper tubes for cold storage, food & beverage, dairy, pharma, heat exchangers, marine & defence. Rated from -40°C, built to global standards by Parasmani.",
  },

  // ── Company ───────────────────────────────────────────────────────────
  "/about": {
    title: "About Parasmani — Copper Tube Manufacturer, Gujarat",
    description:
      "Three decades making seamless copper tubes in Umbergaon, Gujarat. BIS & ISO 9001:2015 certified, OEM-approved and export-ready for HVAC & medical gas.",
  },
  "/quality": {
    title: "Copper Tube Testing & Quality Assurance | Parasmani",
    description:
      "Eddy-current, hydrostatic & mechanical testing on every batch to BIS & ISO 9001:2015. How Parasmani assures copper tube quality from cathode to finished coil.",
  },
  "/certifications": {
    title: "Certifications & OEM Approvals | Parasmani",
    description:
      "ISO 9001:2015 & OEM approvals. Download Parasmani's copper tube certificates, mill test reports & compliance documents for HVAC & MGPS.",
  },
  "/contact": {
    title: "Contact Us — Copper Tube Manufacturer Gujarat | Parasmani",
    description:
      "Contact Parasmani Tubes Copper Pvt. Ltd. for copper tube enquiries, quotes & exports. Factory in Umbergaon, Gujarat. Get in touch.",
  },

  // ── Tools ─────────────────────────────────────────────────────────────
  // Not in the hand-off — the hub page has no entry there.
  "/tools": {
    title: "Copper Tube Calculators & Tools | Parasmani Copper",
    description:
      "Free calculators for HVAC engineers, procurement teams and contractors: copper tube weight, pressure rating, unit conversion and project material estimation.",
  },
  "/weight-calculator": {
    title: "Copper Tube Weight Calculator | kg/m & Job Weight | Parasmani",
    description:
      "Free copper tube weight calculator: get weight per metre, per piece & total job weight from OD, wall thickness, length & quantity. Instant, accurate results.",
  },
  "/pressure-calculator": {
    title: "Copper Tube Pressure Calculator | Working & Burst | Parasmani",
    description:
      "Free copper tube pressure calculator: find safe working & burst pressure from OD, wall thickness & temper. Check ratings for HVAC, gas & plumbing lines.",
  },
  "/project-estimator": {
    title: "Copper Tube Project Estimator | Qty & Weight | Parasmani",
    description:
      "Free copper tube project estimator: calculate tube, coil & fitting quantities and total copper weight for your HVAC, plumbing or gas project in seconds.",
  },
  // Same component as /project-estimator (App.jsx). The hand-off lists only
  // /project-estimator, so this mirrors it and canonicalises to it.
  "/copper-estimator": {
    title: "Copper Tube Project Estimator | Qty & Weight | Parasmani",
    description:
      "Free copper tube project estimator: calculate tube, coil & fitting quantities and total copper weight for your HVAC, plumbing or gas project in seconds.",
    canonical: `${SITE_URL}/project-estimator`,
  },
  "/unit-converter": {
    title: "Copper Tube Unit Converter | mm, inch, kg, psi | Parasmani",
    description:
      "Free unit converter for copper tube work: switch between mm/inch, kg/lb, bar/psi & gauge sizes. Fast, accurate conversions for engineers & installers.",
  },

  // ── Resources ─────────────────────────────────────────────────────────
  "/downloads": {
    title: "Copper Tube Catalogues, Datasheets & Downloads | Parasmani",
    description:
      "Download Parasmani copper tube catalogues, spec sheets, submittals, technical handbooks & certifications for HVAC/R, medical gas, plumbing & industry.",
  },
  "/blogs": {
    title: "Copper Tube Knowledge Centre | Parasmani Insights",
    description:
      "Technical guides, standards explainers & industry insights on copper tube, HVAC/R, medical gas & plumbing, from the Parasmani engineering team.",
  },

  // ── Legal ─────────────────────────────────────────────────────────────
  // Not in the hand-off — written locally. Indexable but low priority; the
  // copy is a plain summary of each document rather than a keyword title.
  "/privacy-policy": {
    title: "Privacy Policy | Parasmani Copper",
    description:
      "How Parasmani Tubes Copper Pvt. Ltd. collects, uses, shares and protects personal information from visitors and business contacts, and the rights you have over it.",
  },
  "/terms-of-service": {
    title: "Terms of Service | Parasmani Copper",
    description:
      "The terms governing use of parasmanicopper.com — permitted use, intellectual property, downloads, engineering tool accuracy, liability and governing law.",
  },

  /* ── Admin ─────────────────────────────────────────────────────────────
     The <meta name="robots"> PageMeta renders from `noindex` only exists once
     React has mounted, so it is the belt to the braces of the `X-Robots-Tag:
     noindex, nofollow` header vercel.json sets on /admin and /admin/*. That
     header is what non-rendering crawlers act on. robots.txt deliberately does
     not disallow these paths — see the comment there.

     Bare /admin has no entry because App.jsx redirects it to /admin/login. */
  "/admin/login": { title: "Admin Login | Parasmani Copper", noindex: true },
  "/admin/forgot-password": {
    title: "Forgot Password | Parasmani Admin",
    noindex: true,
  },
  "/admin/dashboard": { title: "Dashboard | Parasmani Admin", noindex: true },
  "/admin/blogs": { title: "Blogs | Parasmani Admin", noindex: true },
  "/admin/enquiries": { title: "Enquiries | Parasmani Admin", noindex: true },
};
