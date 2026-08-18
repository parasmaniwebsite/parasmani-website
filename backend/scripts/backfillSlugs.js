/**
 * Rewrites existing blog slugs to clean, title-derived ones.
 *
 * Slugs used to be generated as "<timestamp>-<title>", which surfaced in URLs
 * as /blog/1783025608305-designing-reliable-vrf. This drops the prefix so the
 * URL reads as the article's name.
 *
 *   node scripts/backfillSlugs.js --dry-run
 *   node scripts/backfillSlugs.js
 *
 * Safe to re-run: a blog whose slug already matches its title is left alone.
 * Old /blog/<id> links keep working regardless — getSingleBlog falls back to an
 * id lookup — but any /blog/<old-slug> link will break, which is why the old
 * slug is printed for every row changed.
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Blog from "../src/models/Blog.js";
import { slugify } from "../src/controllers/blogController.js";

const DRY_RUN = process.argv.includes("--dry-run");

const redactUri = (uri = "") => uri.replace(/\/\/[^@]+@/, "//***:***@");

const run = async () => {
  console.log(`Target : ${redactUri(process.env.MONGO_URI)}`);
  console.log(DRY_RUN ? "Mode   : DRY RUN (nothing written)\n" : "Mode   : LIVE\n");

  await mongoose.connect(process.env.MONGO_URI);

  const blogs = await Blog.find().select("_id title slug").sort({ createdAt: 1 });

  // Tracks slugs claimed during this run as well as ones already in the
  // database, so two same-titled posts cannot both take the same slug.
  const claimed = new Set(blogs.map((b) => b.slug).filter(Boolean));

  let changed = 0;
  let unchanged = 0;

  for (const blog of blogs) {
    const base = slugify(blog.title);

    if (blog.slug === base) {
      unchanged++;
      console.log(`  keep    ${blog.slug}`);
      continue;
    }

    claimed.delete(blog.slug);

    let next = base;
    let suffix = 2;
    while (claimed.has(next)) next = `${base}-${suffix++}`;

    console.log(`  rename  ${blog.slug}`);
    console.log(`       -> ${next}`);

    if (!DRY_RUN) {
      blog.slug = next;
      // Titles and timestamps must not be disturbed by a slug fix.
      await blog.save({ timestamps: false });
    }

    claimed.add(next);
    changed++;
  }

  console.log("\n" + "-".repeat(60));
  console.log(`Renamed   : ${changed}`);
  console.log(`Unchanged : ${unchanged}`);

  await mongoose.disconnect();
  process.exit(0);
};

run().catch(async (error) => {
  console.error("\nBackfill failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
