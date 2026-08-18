/**
 * Schema.org JSON-LD — single source of truth, the structured-data sibling of
 * pageMeta.js.
 *
 * Emitted by components/JsonLd.jsx as one `@graph` per page. Every node carries
 * an `@id` and cross-references the others by `@id` rather than repeating
 * itself, so a crawler reading any page resolves one Organization entity, one
 * Brand, one LocalBusiness and one WebSite entity for the whole site. That
 * deduplication is the entire point of the graph form — inline-repeating the
 * Organization on every page invites Google to treat them as separate entities.
 *
 * ID convention (fragments are stable identifiers, not URLs to fetch):
 *   {SITE_URL}/#organization   the company, referenced site-wide
 *   {SITE_URL}/#brand          the Parasmani brand
 *   {SITE_URL}/#factory        the Umbergaon plant as a physical place
 *   {SITE_URL}/#logo           the logo image object
 *   {SITE_URL}/#website        the site itself
 *   {url}#webpage              this page
 *   {url}#breadcrumb           this page's trail
 *   {url}#product              the product a product page is about
 *   {url}#faq                  the FAQ block on the page
 *   {url}#article              a blog post
 *
 * Rules when editing:
 *  - Never mark up a claim the page does not visibly make. Everything here was
 *    read off the rendered pages: the address and phones from Footer.jsx, the
 *    socials from its profile links, "since 1989" from AboutUs.jsx, the
 *    standards from each product page's compliance strip, and the FAQ Q&A from
 *    the very arrays the accordions render.
 *  - Prices are deliberately absent. This is a B2B manufacturer that quotes on
 *    enquiry; there is no price to state, and inventing one to unlock merchant
 *    rich results would be a lie. See PRODUCTS below.
 *  - Keys must match the <Route> list in App.jsx and the keys in pageMeta.js.
 *
 * ── Changelog (this revision) ────────────────────────────────────────────
 *  1. PRODUCTS standards corrected against each page's own compliance strip.
 *     Fittings previously carried the three *tube* standards quoted in its
 *     cross-sell sentence (ASTM B280 / EN 1057 / IS 10773) instead of the
 *     three fitting standards in its compliance strip. Straight tube was
 *     missing EN 12735; pancake was missing EN 12449 and EN 12735.
 *  2. Pancake size range corrected to the page value, 4.76 mm – 22.23 mm.
 *  3. LOCAL_BUSINESS added — see the block for why this is not a duplicate of
 *     ORGANIZATION.
 *  4. BRAND added as its own node. One brand, Parasmani.
 *  5. `variesBy` now uses the schema.org property URL Google's variant docs
 *     ask for, with a DefinedTerm where no property exists.
 *  6. FAQ is now its own FAQPage node linked by `hasPart`, rather than being
 *     merged into the page node's type. This frees `mainEntity` on product
 *     pages to carry the Product, which is what those pages are about, and
 *     removes a latent bug where a page with both a collection and an FAQ
 *     would be typed FAQPage while its mainEntity was an ItemList.
 *  7. buildGraph returns [] for `noindex` routes, so admin screens no longer
 *     emit an Organization graph.
 *  8. Blog posts are BlogPosting rather than Article; `headline` is capped at
 *     Google's 110-character limit with the full string preserved in
 *     `alternativeHeadline`; image values are normalised to absolute URLs.
 */

import { SITE_URL } from "./pageMeta";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BRAND_ID = `${SITE_URL}/#brand`;
const FACTORY_ID = `${SITE_URL}/#factory`;
const LOGO_ID = `${SITE_URL}/#logo`;

/** Absolute URL for a route key. */
const abs = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** Absolute URL for an asset that may arrive as a bare filename or a root path. */
const absAsset = (value) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

/* ── Shared postal address ────────────────────────────────────────────────
   One literal, used by both ORGANIZATION and LOCAL_BUSINESS, so the two can
   never drift apart. Transcribed from Footer.jsx.

   NOTE FOR THE TEAM, NOT A CODE ISSUE: the Google Business Profile for this
   plant currently reads "Mahavir Industries, 6/1, GIDC Umbergaon, Umargam".
   The site and the profile disagree on the plot number and on the spelling of
   the locality. Schema that contradicts a verified GBP weakens the local
   entity rather than strengthening it. Whichever is correct, make the site,
   the GBP, IndiaMART and every other listing say the same thing. */
const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "5/2, GIDC, Umbergaon",
  addressLocality: "Umbergaon",
  addressRegion: "Gujarat",
  postalCode: "396171",
  addressCountry: "IN",
};

/* Plant coordinates and Google Maps place reference, from the verified
   Business Profile for Parasmani Tubes Copper Private Limited. `hasMap` with a
   place_id is the strongest available way to tell Google that the entity on
   this website and the entity on Maps are the same one. */
const PLANT_GEO = {
  "@type": "GeoCoordinates",
  latitude: 20.1587581,
  longitude: 72.7787865,
};

const PLANT_MAP_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJy16QVSUr5zsRTwl603PHRjE";

/* Opening hours as published on the Google Business Profile at the time of
   writing: Tuesday to Sunday, 09:00–20:00, closed Monday.

   CONFIRM BEFORE RELYING ON THIS. A plant that is closed on Monday and open on
   Sunday is unusual and may simply be a stale profile entry. Wrong hours in
   schema send someone to Umbergaon on a day you are shut, so this is the one
   constant in the file worth checking with the plant rather than assuming.
   Editing this array is the only change needed if the hours differ. */
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "20:00",
  },
];

/* ── The logo ─────────────────────────────────────────────────────────────
   A top-level node rather than an object nested inside ORGANIZATION.logo.
   Both forms are legal — a nested node carrying an `@id` is a definition, and
   JSON-LD flattening resolves references to it either way — but BRAND and
   LOCAL_BUSINESS both point at this image too, and a definition sitting at the
   top of the graph is easier to reason about and easier to lint for dangling
   references.

   The image is og-image.png, the site's social card. Google reads
   Organization.logo for the knowledge panel and expects the logo mark itself,
   legible on a white background. Swapping this to a dedicated full-colour logo
   at a stable path under /public is a one-line change here whenever that asset
   exists; the hashed build asset (assets/logo_white-*.png) must not be used,
   because the filename changes on every deploy. */
export const LOGO = {
  "@type": "ImageObject",
  "@id": LOGO_ID,
  url: `${SITE_URL}/og-image.png`,
  contentUrl: `${SITE_URL}/og-image.png`,
  width: 1422,
  height: 841,
  caption: "Parasmani Tubes Copper Pvt. Ltd.",
};

/* ── The brand ────────────────────────────────────────────────────────────
   A single brand: Parasmani. Separate from ORGANIZATION because the company is
   "Parasmani Copper" / "Parasmani Tubes Copper Pvt. Ltd." while the mark on the
   tube is "Parasmani". `Product.brand` accepts either an Organization or a
   Brand; naming the Brand is the more precise of the two and costs one node. */
export const BRAND = {
  "@type": "Brand",
  "@id": BRAND_ID,
  name: "Parasmani",
  logo: { "@id": LOGO_ID },
};

/* ── The company ──────────────────────────────────────────────────────────
   `Corporation` rather than plain `Organization`: it is a registered Pvt Ltd,
   and a subtype is a stronger entity signal.

   `foundingDate` is a year only, which is valid ISO 8601 and all AboutUs.jsx
   claims ("since 1989"). No employee count or revenue here: neither appears on
   the site, and unverifiable numbers are exactly what gets an entity
   distrusted.

   `taxID` is the GSTIN. Checksum-verified: state code 24 is Gujarat, the
   embedded PAN carries `C` in the entity position for a company, and the final
   character matches the computed check digit. CIN is still absent — add it as
     identifier: [{ "@type": "PropertyValue", propertyID: "CIN", value: "<CIN>" }],
   once it is published somewhere on the site. */
export const ORGANIZATION = {
  "@type": "Corporation",
  "@id": ORG_ID,
  name: "Parasmani Copper",
  legalName: "Parasmani Tubes Copper Pvt. Ltd.",
  alternateName: "Parasmani Tubes",
  url: `${SITE_URL}/`,
  logo: { "@id": LOGO_ID },
  image: { "@id": LOGO_ID },
  description:
    "Parasmani Tubes Copper Pvt. Ltd. is a BIS & ISO 9001:2015 certified manufacturer of seamless copper tubes, pancake copper coils and copper fittings in Umbergaon, Gujarat, supplying HVAC/R, medical gas, plumbing and industrial applications.",
  foundingDate: "1989",
  taxID: "24AAPCP2834H1ZA",
  address: POSTAL_ADDRESS,
  location: { "@id": FACTORY_ID },
  brand: { "@id": BRAND_ID },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-98191-34044",
      email: "sales@parasmanicopper.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+91-81698-08254",
      email: "sales@parasmanicopper.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
  ],
  email: "sales@parasmanicopper.com",
  telephone: "+91-98191-34044",
  sameAs: [
    "https://www.facebook.com/ParasmaniTubesCopper",
    "https://www.instagram.com/parasmanitubes",
    "https://www.linkedin.com/company/parasmani-tubes/",
    "https://www.youtube.com/@ParasmaniCopper",
  ],
  knowsAbout: [
    "Seamless copper tubes",
    "Pancake copper coils",
    "Wrought copper fittings",
    "HVAC and refrigeration piping",
    "Medical gas pipeline systems",
    "Copper plumbing and water supply",
  ],
};

/* ── The plant ────────────────────────────────────────────────────────────
   This is not a duplicate of ORGANIZATION. The Corporation node is the legal
   and commercial entity; this node is the physical place it operates from, and
   it is the one that carries coordinates, a map reference and opening hours.
   The two are joined by `location` above and `parentOrganization` below.

   The earlier revision of this file argued LocalBusiness implies premises a
   customer walks into. In practice the deciding fact is that a verified Google
   Business Profile for this plant already exists at these coordinates,
   categorised as a manufacturer, carrying reviews. That local entity exists in
   Google's index whether or not the site acknowledges it. Corroborating it is
   the strongest local signal available; staying silent leaves the website
   entity and the Maps entity unlinked.

   No `aggregateRating`. The plant has a 5.0 rating on that profile and it will
   be tempting to mark it up. Reviews a business collects and publishes about
   itself are ineligible under Google's self-serving review policy, and the GBP
   rating already surfaces in Maps and the local pack on its own.

   No `priceRange`. Nothing on the site states one. */
export const LOCAL_BUSINESS = {
  "@type": "LocalBusiness",
  "@id": FACTORY_ID,
  name: "Parasmani Tubes Copper Pvt. Ltd. — Umbergaon Plant",
  parentOrganization: { "@id": ORG_ID },
  url: `${SITE_URL}/contact`,
  image: { "@id": LOGO_ID },
  logo: { "@id": LOGO_ID },
  description:
    "Manufacturing plant producing seamless copper tubes, pancake copper coils and wrought copper fittings at GIDC Umbergaon, Valsad, Gujarat.",
  address: POSTAL_ADDRESS,
  geo: PLANT_GEO,
  hasMap: PLANT_MAP_URL,
  telephone: "+91-98191-34044",
  email: "sales@parasmanicopper.com",
  openingHoursSpecification: OPENING_HOURS,
  areaServed: { "@type": "Country", name: "India" },
};

/* ── The site ─────────────────────────────────────────────────────────────
   No `potentialAction` / SearchAction. A SearchAction is a promise that
   {search_term_string} substituted into a URL returns a results page, and this
   site has no search — only category filters on /blogs and /downloads, which
   take a fixed vocabulary, not free text. Publishing one anyway would be
   markup that does not describe the page. If a real search route is added,
   uncomment the block below and point it at that route. (Note that Google
   retired the sitelinks searchbox rich result in Nov 2024; the value now is in
   telling non-Google agents the endpoint exists.)

   potentialAction: {
     "@type": "SearchAction",
     target: {
       "@type": "EntryPoint",
       urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
     },
     "query-input": "required name=search_term_string",
   },
*/
export const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Parasmani Copper",
  description:
    "Seamless copper tubes, pancake copper coils and copper fittings for HVAC/R, medical gas, plumbing and industrial use.",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

/* ── Page types ───────────────────────────────────────────────────────────
   Routes absent from this map get plain `WebPage`. CollectionPage is used only
   where the page really is an index of other pages. */
const PAGE_TYPE = {
  "/": "WebPage",
  "/about": "AboutPage",
  "/contact": "ContactPage",
  "/products": "CollectionPage",
  "/industry": "CollectionPage",
  "/tools": "CollectionPage",
  "/blogs": "CollectionPage",
  "/downloads": "CollectionPage",
  "/certifications": "CollectionPage",
  "/privacy-policy": "WebPage",
  "/terms-of-service": "WebPage",
};

/* ── Breadcrumb trails ────────────────────────────────────────────────────
   Trails mirror the navbar's grouping, which is what a visitor actually
   perceives, rather than the flat <Routes> list. Home is implicit and added by
   the builder. A route with no entry gets Home > <page title>.

   Google asks that a BreadcrumbList reflect a trail the user can see. The site
   has no visible breadcrumb component yet — ship one alongside this. */
const BREADCRUMBS = {
  "/products": [["Products", "/products"]],
  "/straight-copper-tubes": [
    ["Products", "/products"],
    ["Straight Copper Tubes", "/straight-copper-tubes"],
  ],
  "/pancake-copper-coil": [
    ["Products", "/products"],
    ["Pancake Copper Coil", "/pancake-copper-coil"],
  ],
  "/copper-fittings": [
    ["Products", "/products"],
    ["Copper Fittings", "/copper-fittings"],
  ],
  "/industry": [["Industries", "/industry"]],
  "/hvac-refrigeration": [
    ["Industries", "/industry"],
    ["HVAC & Refrigeration", "/hvac-refrigeration"],
  ],
  "/medical-gas": [
    ["Industries", "/industry"],
    ["Medical Gas", "/medical-gas"],
  ],
  "/household-fuel-gas": [
    ["Industries", "/industry"],
    ["Household & Fuel Gas", "/household-fuel-gas"],
  ],
  "/plumbing-water-supply": [
    ["Industries", "/industry"],
    ["Plumbing & Water Supply", "/plumbing-water-supply"],
  ],
  "/industrial-process-application": [
    ["Industries", "/industry"],
    ["Industrial & Process", "/industrial-process-application"],
  ],
  "/about": [["About", "/about"]],
  "/quality": [
    ["About", "/about"],
    ["Quality & Assurance", "/quality"],
  ],
  "/certifications": [
    ["About", "/about"],
    ["Certifications & Approvals", "/certifications"],
  ],
  "/tools": [["Tools", "/tools"]],
  "/weight-calculator": [
    ["Tools", "/tools"],
    ["Weight Calculator", "/weight-calculator"],
  ],
  "/pressure-calculator": [
    ["Tools", "/tools"],
    ["Pressure Calculator", "/pressure-calculator"],
  ],
  "/project-estimator": [
    ["Tools", "/tools"],
    ["Project Estimator", "/project-estimator"],
  ],
  "/unit-converter": [
    ["Tools", "/tools"],
    ["Unit Converter", "/unit-converter"],
  ],
  "/downloads": [["Downloads", "/downloads"]],
  "/blogs": [["Blogs", "/blogs"]],
  "/contact": [["Contact", "/contact"]],
  "/privacy-policy": [["Privacy Policy", "/privacy-policy"]],
  "/terms-of-service": [["Terms of Service", "/terms-of-service"]],
};

/* ── Products ─────────────────────────────────────────────────────────────
   Modelled as ProductGroup, not Product: none of these pages describes a
   single purchasable item. Each is a family — one alloy, made to order across
   a size range and a set of tempers — which is exactly what ProductGroup and
   `variesBy` exist to express. `hasVariant` lists only the tempers/formats the
   page itself names; no SKUs are invented.

   No `offers`. Google's product rich results need a price, this business
   quotes on enquiry, and a fabricated price would be both wrong and a
   commercial claim. The markup still earns its keep: it resolves the product
   entities, their standards and their maker for Google's knowledge graph and
   for the LLM crawlers that now read these pages. Expect the Merchant listings
   report in Search Console to show "missing offers" warnings against these
   pages. That is the expected and correct state, not a defect to chase.

   Standards live in `additionalProperty` rather than `hasCertification` —
   conformance to a dimensional standard is not a certificate held by the
   company, and the compliance strips on these pages say "compliant", not
   "certified".

   Every `standards` array below is the page's own COMPLIANCE strip, in the
   page's order, complete. Do not extend these from a product's cross-sell
   copy: the fittings page mentions ASTM B280, EN 1057 and IS 10773 only to say
   its fittings match tube made to those standards, and an earlier revision of
   this file mistakenly recorded them as the fittings' own standards. */
const COPPER_ALLOY = "C12200 DHP copper";

/* Fittings size range, per the client. Isolated as a constant because it is
   the one dimension on the site under review: 1/4" is 6.35 mm, which matches
   the 6 mm floor, but 4" is 101.6 mm against a stated 130 mm ceiling, and
   /hvac-refrigeration gives the maximum as 5 1/8" (130 mm). If the range is
   restated, this is the only line to change. */
const SIZE_RANGE_FITTINGS = '1/4" - 4" (ID: 6 mm - 130 mm)';

export const PRODUCTS = {
  "/straight-copper-tubes": {
    name: "Seamless Straight Copper Tubes",
    description:
      "Cold-drawn seamless straight copper tubes in C12200 DHP copper, supplied in 3 metre lengths for HVAC/R, plumbing, medical gas and industrial process piping.",
    category: "Copper Tube",
    sizeRange: "6 mm - 130 mm outside diameter",
    standards: [
      "ASTM B280",
      "JIS H 3300",
      "EN 1057",
      "ASTM B819",
      "IS 10773",
      "ASTM B68",
      "EN 13348",
      "EN 12735",
    ],
    variesBy: [
      "https://schema.org/size",
      { "@type": "DefinedTerm", name: "Temper" },
    ],
    variants: [
      ["Hard temper (H)", "Rigid straight runs and risers, maximum pressure rating."],
      ["Half Hard temper (HH)", "General purpose for chiller plants and commercial HVAC."],
      ["Quarter Hard temper (QH)", "Field bending where tight radius changes are needed."],
    ],
  },
  "/pancake-copper-coil": {
    name: "Pancake Copper Coils",
    description:
      "Soft-annealed pancake copper coils in C12200 DHP copper, 15.24 m standard coil, for split AC, VRF branch runs, refrigeration and cold storage line sets.",
    category: "Copper Coil",
    sizeRange: "4.76 mm - 22.23 mm outside diameter",
    standards: [
      "ASTM B280",
      "JIS H 3300",
      "EN 1057",
      "EN 12449",
      "IS 10773",
      "ASTM B68",
      "EN 12735",
    ],
    variesBy: ["https://schema.org/size"],
    variants: [
      ["Soft annealed pancake coil", "Bends freely by hand for on-site routing."],
    ],
  },
  "/copper-fittings": {
    name: "Wrought Copper Fittings",
    description:
      "Wrought copper fittings — elbows, tees, couplers, U-bends and reducers — dimensioned to the same OD standards as the tube range for clean brazed joints.",
    category: "Copper Fitting",
    sizeRange: SIZE_RANGE_FITTINGS,
    standards: ["ASME B16.22", "EN 1254-1", "JIS H 3401"],
    variesBy: [
      "https://schema.org/size",
      { "@type": "DefinedTerm", name: "Fitting type" },
    ],
    variants: [
      ["Elbows", "45° and 90° direction changes."],
      ["Tees", "Branch connections."],
      ["Couplers", "Straight tube-to-tube joints."],
      ["U-bends", "Return bends for coil work."],
      ["Reducers", "Transitions between nominal sizes."],
    ],
  },
};

/* ── Collection page contents ─────────────────────────────────────────────
   An index page's ItemList names what it links to, so the crawler learns the
   hierarchy without having to follow and re-render every link.

   /certifications and /downloads are typed CollectionPage but have no entry
   here: their contents are files and certificates rather than a fixed set of
   routes, so there is no stable list to name. They render as a CollectionPage
   with no mainEntity, which is valid. */
const COLLECTIONS = {
  "/products": [
    ["Seamless Straight Copper Tubes", "/straight-copper-tubes"],
    ["Pancake Copper Coils", "/pancake-copper-coil"],
    ["Wrought Copper Fittings", "/copper-fittings"],
  ],
  "/industry": [
    ["HVAC & Refrigeration", "/hvac-refrigeration"],
    ["Medical Gas", "/medical-gas"],
    ["Household & Fuel Gas", "/household-fuel-gas"],
    ["Plumbing & Water Supply", "/plumbing-water-supply"],
    ["Industrial & Process Applications", "/industrial-process-application"],
  ],
  "/tools": [
    ["Copper Weight Calculator", "/weight-calculator"],
    ["Pressure Calculator", "/pressure-calculator"],
    ["Project Estimator", "/project-estimator"],
    ["Unit Converter", "/unit-converter"],
  ],
};

/* ── Grouped collection contents ──────────────────────────────────────────
   For index pages whose contents are named things rather than routes, and
   which the page groups under headings. /certifications is the only one.

   `numberOfItems` is never written by hand here — the builder derives it from
   the array length, so the count cannot drift away from the list the way the
   hand-written block did.

   READ THIS BEFORE ENABLING. Every name below is a third-party trademark or
   institution presented as a compatibility or approval claim, and the live
   /certifications page currently renders "CERTIFICATION — COMING SOON"
   placeholders and none of these names. Two conditions have to be met first:

     1. The page must visibly display all three lists. Structured data
        describing content a visitor cannot see is a policy violation, and this
        is the most conspicuous kind — sixteen named organisations.
     2. Someone at Parasmani has to confirm each entry. "Compatible VRV / VRF
        Systems" naming Daikin, Mitsubishi Electric, Voltas, Hitachi, Samsung
        and Carrier is a materially different claim from the LG and Haier
        approvals /hvac-refrigeration actually documents, and asserting an
        approval you do not hold in machine-readable form is worse than
        asserting it in prose. Note that Haier, which the site does document,
        is missing from this list. */
const GROUPED_COLLECTIONS = {
  "/certifications": [
    {
      name: "Quality Certifications",
      items: ["ISO 9001:2015 Certificate", "BIS Certificate"],
    },
    {
      name: "Compatible VRV / VRF Systems",
      items: [
        "Daikin",
        "Mitsubishi Electric",
        "LG",
        "Voltas",
        "Hitachi",
        "Panasonic",
        "Samsung",
        "Carrier",
      ],
    },
    {
      name: "Government & Institutional Approvals",
      items: [
        "Indian Railways",
        "Mumbai Metro",
        "Delhi Metro",
        "Azim Premji Foundation",
        "State Bank of India (SBI)",
        "CSIR (Council of Scientific & Industrial Research)",
        "Adani Group",
        "Kerala Public Works Department (Kerala PWD)",
      ],
    },
  ],
};

/* ── Builders ─────────────────────────────────────────────────────────── */

/**
 * Home > … > current page. `item` is omitted on the last crumb per Google.
 *
 * Returns null for the home page: a one-item trail reading "Home" describes no
 * hierarchy and Google explicitly does not want breadcrumbs that consist only
 * of the page itself.
 */
const breadcrumbNode = (path, url, title) => {
  if (path === "/") return null;
  /* Fallback for a route not yet in BREADCRUMBS: the page title minus the
     brand suffix. A crumb reading "… | Qty & Weight | Parasmani" is the SEO
     title, not a label anyone would click. */
  const label = title.split("|")[0].trim();
  const crumbs = [["Home", "/"], ...(BREADCRUMBS[path] ?? [[label, path]])];

  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map(([name, href], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      ...(i < crumbs.length - 1 ? { item: abs(href) } : {}),
    })),
  };
};

/**
 * Question nodes for a page's FAQ accordion.
 *
 * Accepts both FAQ shapes in the codebase: {question, answer} in the industry
 * sections and {q, a} on the product pages. Entries whose question or answer is
 * not a plain string are dropped rather than serialised — a JSX node or an
 * element array would emit "[object Object]" into the markup, which is worse
 * than the entry being absent.
 */
const questionNodes = (url, entries) =>
  entries
    .map((entry) => ({
      question: entry.question ?? entry.q,
      answer: entry.answer ?? entry.a,
    }))
    .filter(
      ({ question, answer }) =>
        typeof question === "string" &&
        typeof answer === "string" &&
        question.trim() &&
        answer.trim(),
    )
    .map(({ question, answer }, i) => ({
      "@type": "Question",
      "@id": `${url}#faq-${i + 1}`,
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    }));

/**
 * The FAQ block as its own entity, linked from the page by `hasPart`.
 *
 * Kept separate rather than folded into the page node's `@type` so that
 * `mainEntity` on a product page stays free for the Product — which is what
 * the page is actually about — and so a page that is both an index and an FAQ
 * cannot end up typed FAQPage while its mainEntity is an ItemList.
 *
 * Note that Google retired FAQ rich results on 7 May 2026. This markup no
 * longer produces a SERP feature for any site. It is kept because Google still
 * uses it to understand the page and because the AI crawlers that now read
 * these pages parse it directly.
 */
const faqNode = (url, questions) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: questions.map((q) => ({ "@id": q["@id"] })),
});

/**
 * A page whose index is grouped under headings, e.g. /certifications.
 *
 * One outer ItemList so the page keeps a single `mainEntity`, with each group
 * wrapped in a positioned ListItem rather than nested bare — that keeps the
 * order of the groups explicit as well as the order within them.
 *
 * `numberOfItems` is computed, never declared.
 */
const groupedListNode = (groups) => ({
  "@type": "ItemList",
  numberOfItems: groups.length,
  itemListElement: groups.map((group, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "ItemList",
      name: group.name,
      numberOfItems: group.items.length,
      itemListElement: group.items.map((name, j) => ({
        "@type": "ListItem",
        position: j + 1,
        name,
      })),
    },
  })),
});

const productNode = (url, product, path) => ({
  "@type": "ProductGroup",
  "@id": `${url}#product`,
  name: product.name,
  description: product.description,
  url,
  category: product.category,
  material: COPPER_ALLOY,
  brand: { "@id": BRAND_ID },
  manufacturer: { "@id": ORG_ID },
  productGroupID: path.replace(/^\//, ""),
  variesBy: product.variesBy,
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Size range",
      value: product.sizeRange,
    },
    {
      "@type": "PropertyValue",
      name: "Standards",
      value: product.standards.join(", "),
    },
  ],
  hasVariant: product.variants.map(([name, description], i) => ({
    "@type": "Product",
    "@id": `${url}#variant-${i + 1}`,
    name: `${product.name} — ${name}`,
    description,
    material: COPPER_ALLOY,
    brand: { "@id": BRAND_ID },
  })),
});

/**
 * The `@graph` for a route.
 *
 * Node `@id`s are built from the page's *canonical* URL, not from the route it
 * was reached by. /copper-estimator and /project-estimator render the same
 * component and pageMeta canonicalises the former to the latter; keying off the
 * route instead would assert two separate WebPage entities for one page and
 * contradict the rel=canonical sitting right above it in the head.
 *
 * Returns an empty array for `noindex` routes. The admin screens have no
 * pageMeta breadcrumb or page type, so they would otherwise fall through to a
 * plain WebPage plus a trail labelled from their SEO title, and publish the
 * full company graph on a screen nobody should be indexing.
 *
 * @param {string} path      route key, already normalised of a trailing slash
 * @param {object} meta      the pageMeta entry (title/description/canonical)
 * @param {Array}  [faqs]    FAQ entries visible on this page, if any
 */
export const buildGraph = (path, meta, faqs) => {
  if (!meta || meta.noindex) return [];

  const url = meta.canonical ?? abs(path);
  /* Every lookup below keys off the canonical page, not the route we arrived
     by, for the same reason the @ids do: the graph describes one page. Without
     this, /copper-estimator missed the /project-estimator breadcrumb trail and
     fell back to labelling itself with its raw SEO title. */
  const key = meta.canonical ? meta.canonical.slice(SITE_URL.length) || "/" : path;
  const product = PRODUCTS[key];
  const collection = COLLECTIONS[key];
  const grouped = GROUPED_COLLECTIONS[key];

  const questions = Array.isArray(faqs) ? questionNodes(url, faqs) : [];
  const hasFaqs = questions.length > 0;
  const breadcrumb = breadcrumbNode(key, url, meta.title);
  const faq = hasFaqs ? faqNode(url, questions) : null;

  /* A page has one mainEntity. Priority runs index > grouped index > product >
     FAQ, because that is the order in which the thing dominates the page. The
     FAQ is never the mainEntity here: it is reachable as its own node via
     `hasPart`, which is what keeps this unambiguous whatever combination a
     page carries. */
  const mainEntity = collection
    ? {
        "@type": "ItemList",
        itemListElement: collection.map(([name, href], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          url: abs(href),
        })),
      }
    : grouped
      ? groupedListNode(grouped)
      : product
        ? { "@id": `${url}#product` }
        : null;

  /* `about` only where the page genuinely is about one entity: the product on
     a product page, the company on the home and about pages, the plant on the
     contact page. Pointing every page at the Organization dilutes the signal
     rather than strengthening it. */
  const about = product
    ? { "@id": `${url}#product` }
    : key === "/" || key === "/about"
      ? { "@id": ORG_ID }
      : key === "/contact"
        ? { "@id": FACTORY_ID }
        : null;

  const pageNode = {
    "@type": PAGE_TYPE[key] ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    ...(meta.description ? { description: meta.description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    ...(about ? { about } : {}),
    // Only reference the trail if one was built — the home page has none, and
    // a reference to a node that isn't in the graph is a dangling @id.
    ...(breadcrumb ? { breadcrumb: { "@id": breadcrumb["@id"] } } : {}),
    ...(faq ? { hasPart: { "@id": faq["@id"] } } : {}),
    inLanguage: "en-IN",
    ...(mainEntity ? { mainEntity } : {}),
  };

  return [
    LOGO,
    ORGANIZATION,
    BRAND,
    LOCAL_BUSINESS,
    WEBSITE,
    pageNode,
    ...(breadcrumb ? [breadcrumb] : []),
    ...(product ? [productNode(url, product, key)] : []),
    ...(faq ? [faq] : []),
    ...questions,
  ];
};

/** Google truncates or ignores an Article headline beyond 110 characters. */
const HEADLINE_MAX = 110;

const clampHeadline = (title = "") => {
  if (title.length <= HEADLINE_MAX) return title;
  const cut = title.slice(0, HEADLINE_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd();
};

/**
 * The `@graph` for a blog post. Separate entry point because BlogDetail builds
 * its tags from a fetched document rather than from the static pageMeta table.
 *
 * `BlogPosting` rather than `Article`: it is the more specific type for a post
 * under /blog, and costs nothing.
 *
 * `author` is the Organization. Articles carry no visible byline, and schema
 * has to describe what is on the page, so a named Person is not asserted here.
 * If a byline is added to BlogDetail.jsx later, swap this for a Person node —
 * an author page is not required for that, only the byline itself.
 *
 * `image` is normalised to an absolute URL: BlogDetail resolves both an
 * absolute URL and a bare upload filename, and schema requires the former.
 */
export const buildArticleGraph = (blog, { url, image, category }) => {
  const articleId = `${url}#article`;
  const imageUrl = absAsset(image);
  const headline = clampHeadline(blog.title);

  return [
    LOGO,
    ORGANIZATION,
    BRAND,
    LOCAL_BUSINESS,
    WEBSITE,
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: blog.title,
      ...(blog.description ? { description: blog.description } : {}),
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      ...(imageUrl ? { primaryImageOfPage: { "@id": `${url}#primaryimage` } } : {}),
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blogs",
          item: `${SITE_URL}/blogs`,
        },
        { "@type": "ListItem", position: 3, name: blog.title },
      ],
    },
    ...(imageUrl
      ? [
          {
            "@type": "ImageObject",
            "@id": `${url}#primaryimage`,
            url: imageUrl,
            contentUrl: imageUrl,
          },
        ]
      : []),
    {
      "@type": "BlogPosting",
      "@id": articleId,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntityOfPage: { "@id": `${url}#webpage` },
      headline,
      ...(headline !== blog.title ? { alternativeHeadline: blog.title } : {}),
      ...(blog.description ? { description: blog.description } : {}),
      ...(imageUrl ? { image: { "@id": `${url}#primaryimage` } } : {}),
      ...(blog.createdAt ? { datePublished: blog.createdAt } : {}),
      ...(blog.updatedAt ? { dateModified: blog.updatedAt } : {}),
      ...(category ? { articleSection: category } : {}),
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
    },
  ];
};
