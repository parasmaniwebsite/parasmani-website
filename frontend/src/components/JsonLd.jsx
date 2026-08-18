/**
 * Renders a schema.org `@graph` as a JSON-LD script tag.
 *
 * Unlike the <title>/<meta> tags next to it, React 19 does NOT hoist an inline
 * <script> into <head> — only scripts with a `src` are hoisted. That is fine:
 * JSON-LD is valid anywhere in the document and Google reads it from the body.
 *
 * `dangerouslySetInnerHTML` is the only way to emit a script body in React, and
 * it is safe here because the payload is JSON.stringify output, not markup. The
 * one real risk is a `</script>` sequence inside a string field closing the tag
 * early — a blog title could contain one — so the closing bracket is escaped.
 */
const JsonLd = ({ graph }) => {
  if (!graph || graph.length === 0) return null;

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default JsonLd;
