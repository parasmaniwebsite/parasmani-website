import fs from "fs";
import path from "path";

const API_URL = "https://api.parasmanicopper.com/api/blog";
const SITE_URL = "https://www.parasmanicopper.com";

async function generateSitemap() {
  const publicDir = path.join(process.cwd(), "public");

  const staticSitemapPath = path.join(
    publicDir,
    "sitemap.static.xml"
  );

  const outputSitemapPath = path.join(
    publicDir,
    "sitemap.xml"
  );

  console.log("Reading static sitemap...");

  if (!fs.existsSync(staticSitemapPath)) {
    throw new Error(
      `Static sitemap not found: ${staticSitemapPath}`
    );
  }

  const staticSitemap = fs.readFileSync(
    staticSitemapPath,
    "utf8"
  );

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

  const blogs = data.blogs.filter(
    (blog) => blog.slug
  );

  console.log(`Found ${blogs.length} blogs.`);

  const blogUrls = blogs
    .map((blog) => {
      const lastmod =
        blog.updatedAt ||
        blog.createdAt;

      const lastmodDate = lastmod
        ? new Date(lastmod).toISOString()
        : new Date().toISOString();

      return `  <url>
    <loc>${SITE_URL}/blog/${escapeXml(blog.slug)}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("\n");

  const closingTag = "</urlset>";

  if (!staticSitemap.includes(closingTag)) {
    throw new Error(
      "Static sitemap does not contain </urlset>."
    );
  }

  const finalSitemap =
    staticSitemap.replace(
      closingTag,
      `${blogUrls}\n\n${closingTag}`
    );

  fs.writeFileSync(
    outputSitemapPath,
    finalSitemap,
    "utf8"
  );

  console.log(
    `Sitemap generated successfully: ${outputSitemapPath}`
  );

  console.log(
    `Static sitemap preserved + ${blogs.length} blog URLs added.`
  );
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

generateSitemap().catch((error) => {
  console.error("Sitemap generation failed:");
  console.error(error);
  process.exit(1);
});
