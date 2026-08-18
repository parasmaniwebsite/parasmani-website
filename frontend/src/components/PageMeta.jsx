import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageMeta, SITE_URL } from "../seo/pageMeta";
import { buildGraph } from "../seo/schema";
import { faqsByRoute } from "../seo/faqSources";
import JsonLd from "./JsonLd";

/**
 * Renders the current route's title, description, canonical and Open Graph
 * tags. React 19 hoists bare <title>/<meta>/<link> out of the tree and into
 * <head>, so no helmet library is needed — this just has to be mounted inside
 * the Router.
 *
 * Caveat worth knowing: this is a client-rendered SPA, so these tags only
 * exist after JS runs. Googlebot renders JS and will see them; social
 * scrapers (WhatsApp, LinkedIn, Slack) generally do not, which is why
 * index.html carries a static fallback set of og/twitter tags. Per-page
 * unfurls would need prerendering.
 *
 * Unmapped routes render nothing and fall back to index.html.
 * /blog/:id is one of those on purpose: BlogDetail supplies its own.
 */
const PageMeta = () => {
  const { pathname } = useLocation();

  // React appends hoisted <meta>, so the fallback description in index.html
  // would otherwise sit ahead of the per-route one and be the one Google uses.
  // Drop it once JS is running; non-JS scrapers have already read it from the
  // served HTML by then.
  useEffect(() => {
    document
      .querySelectorAll('meta[name="description"][data-default]')
      .forEach((el) => el.remove());
  }, []);

  // "/about/" and "/about" are the same page to the router; treat them the
  // same here too. The bare "/" must survive the strip.
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const meta = pageMeta[key];

  if (!meta) return null;

  const canonical = meta.canonical ?? `${SITE_URL}${key === "/" ? "/" : key}`;

  // Admin screens: no structured data either. Describing a page to crawlers we
  // are simultaneously telling them not to index is pointless at best.
  if (meta.noindex) {
    return (
      <>
        <title>{meta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </>
    );
  }

  return (
    <>
      <title>{meta.title}</title>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Twitter. Static defaults for og:image, og:site_name and
          og:type live in index.html so non-JS scrapers still get something. */}
      <meta property="og:title" content={meta.title} />
      {meta.description && (
        <meta property="og:description" content={meta.description} />
      )}
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      {meta.description && (
        <meta name="twitter:description" content={meta.description} />
      )}

      {/* schema.org graph for this route. Keyed off the same `key` as the tags
          above, so a route can never end up with meta from one page and
          structured data from another. */}
      <JsonLd graph={buildGraph(key, meta, faqsByRoute[key])} />
    </>
  );
};

export default PageMeta;
