import { LOGO, ORGANIZATION, BRAND, LOCAL_BUSINESS, WEBSITE } from "./src/seo/schema.js";

/**
 * Writes the site's entity layer into index.html as raw JSON-LD at build time.
 *
 * Why this exists: components/JsonLd.jsx renders the `@graph` inside the React
 * tree, and React 19 only hoists <script> tags that have a `src`, so the graph
 * lands in <body> and only after JS has run. `curl` on any URL returns zero
 * structured data. Googlebot renders and sees it; GPTBot, PerplexityBot,
 * ClaudeBot and Bingbot largely read raw HTML and see nothing — which defeats
 * the AI-citation goal the graph was built for.
 *
 * vercel.json rewrites every path to `/`, so this one file is what all 22 URLs
 * serve. Injecting here puts the entity layer in raw HTML site-wide with no
 * prerendering step and no runtime cost.
 *
 * Only the five page-independent nodes go here. The page-specific ones
 * (#webpage, #breadcrumb, #product, #faq) depend on the route and stay in
 * React until there is a real prerender. The two graphs overlap by design:
 * identical `@id`s are how the graph form deduplicates, so a consumer that
 * reads both after hydration merges them into one set of entities rather than
 * seeing duplicates. That is the same mechanism that lets every page repeat
 * the Organization reference without splitting the entity.
 *
 * Note on /admin/*: those routes are served this same index.html, so the admin
 * screens carry the Organization node in raw HTML even though buildGraph()
 * returns [] for them. That is harmless — vercel.json sets `X-Robots-Tag:
 * noindex, nofollow` on /admin and /admin/*, which every crawler sees without
 * running JS, and no page-level node is emitted, so nothing here claims an
 * admin screen is a content page.
 */
export default function staticSchema() {
  /* Built once at config load — the nodes are frozen module constants, so
     there is nothing per-request to recompute. */
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [LOGO, ORGANIZATION, BRAND, LOCAL_BUSINESS, WEBSITE],
    /* Same escape as JsonLd.jsx: a literal `</script>` inside any string
       field would close the tag early. Escaping every `<` is cheaper than
       matching the sequence and is still valid JSON. */
  }).replace(/</g, "\\u003c");

  return {
    name: "parasmani:static-schema",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: json,
          injectTo: "head",
        },
      ];
    },
  };
}
