import fs from "fs";
import path from "path";

const API_URL = "https://api.parasmanicopper.com/api/blog";
const SITE_URL = "https://www.parasmanicopper.com";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateSitemap() {
  console.log("Fetching blogs from:", API_URL);

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blogs: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.blogs)) {
    throw new Error("Unexpected blog API response.");
  }

  const blogs = data.blogs;

  console.log(`Found ${blogs.length} blogs.`);

  const staticUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/about-us`,
    `${SITE_URL}/contact-us`,
    `${SITE_URL}/blogs`,
  ];

  const blogUrls = blogs
    .filter((blog) => blog.slug)
    .map((blog) => {
      const lastmod = blog.updatedAt || blog.createdAt;

      return {
        loc: `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`,
        lastmod: lastmod
          ? new Date(lastmod).toISOString()
          : new Date().toISOString(),
      };
    });

  const urls = [
    ...staticUrls.map((loc) => ({
      loc,
      lastmod: new Date().toISOString(),
    })),
    ...blogUrls,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const outputPath = path.join(
    process.cwd(),
    "public",
    "sitemap.xml"
  );

  fs.writeFileSync(outputPath, xml, "utf8");

  console.log(`Sitemap generated: ${outputPath}`);
  console.log(`Total URLs: ${urls.length}`);
}

generateSitemap().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exit(1);
});
