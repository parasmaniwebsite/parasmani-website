import Blog from "../models/Blog.js";

const SITE_URL = "https://www.parasmanicopper.com";

export const getSitemap = async (req, res) => {
  try {
    const blogs = await Blog.find({
      slug: { $exists: true, $ne: "" },
    })
      .select("slug updatedAt createdAt")
      .sort({ createdAt: -1 })
      .lean();

    const staticUrls = [
      `${SITE_URL}/`,
      `${SITE_URL}/about-us`,
      `${SITE_URL}/contact-us`,
      `${SITE_URL}/blogs`,
    ];

    const blogUrls = blogs.map(
      (blog) => `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`
    );

    const allUrls = [...staticUrls, ...blogUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map((url) => `  <url><loc>${url}</loc></url>`)
  .join("\n")}
</urlset>`;

    res
      .status(200)
      .set("Content-Type", "application/xml; charset=utf-8")
      .set("Cache-Control", "public, max-age=0, s-maxage=3600")
      .send(xml);
  } catch (error) {
    console.error("[sitemap] Failed to generate sitemap:", error);
    res.status(500).send("Failed to generate sitemap");
  }
};
