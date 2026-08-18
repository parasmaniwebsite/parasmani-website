/**
 * One-off migration: copy blogs and categories from a running Parasmani API
 * into this deployment's database, re-hosting every image on this deployment's
 * ImageKit account so nothing still points at the old one.
 *
 *   node scripts/importBlogs.js --dry-run   # report what would happen
 *   node scripts/importBlogs.js             # do it
 *
 * Safe to re-run: anything already present locally is skipped, so a partial run
 * (a failed image download, a dropped connection) can simply be run again.
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Blog from "../src/models/Blog.js";
import Category from "../src/models/Category.js";
import imagekit from "../src/utils/imagekit.js";

const SOURCE = process.env.SOURCE_API || "https://parasmani.onrender.com";
const DRY_RUN = process.argv.includes("--dry-run");

// Render free instances sleep; the first request pays the cold start.
const FETCH_TIMEOUT_MS = 90_000;

const getJson = async (path) => {
  const res = await fetch(`${SOURCE}${path}`, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`GET ${path} -> ${res.status}`);
  }

  return res.json();
};

/** Pulls the original image down and re-uploads it to our own ImageKit. */
const rehostImage = async (sourceUrl) => {
  const res = await fetch(sourceUrl, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`image ${res.status}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const mime = res.headers.get("content-type") || "image/jpeg";

  // Strip ImageKit's own uniqueness suffix and query string from the name.
  const fileName = decodeURIComponent(
    new URL(sourceUrl).pathname.split("/").pop(),
  );

  if (DRY_RUN) {
    return { url: `(dry-run) ${fileName}`, bytes: buffer.length };
  }

  // Same call shape the blog controller uses, so migrated rows are
  // indistinguishable from ones created through the admin UI.
  const uploaded = await imagekit.upload({
    file: `data:${mime};base64,${buffer.toString("base64")}`,
    fileName,
    folder: "/blogs",
  });

  return { url: uploaded.url, bytes: buffer.length };
};

/** Keeps the connection-string password out of logs and pasted output. */
const redactUri = (uri = "") => uri.replace(/\/\/[^@]+@/, "//***:***@");

const run = async () => {
  console.log(`Source : ${SOURCE}`);
  console.log(`Target : ${redactUri(process.env.MONGO_URI)}`);
  console.log(`ImageKit: ${process.env.IMAGEKIT_URL_ENDPOINT}`);
  console.log(DRY_RUN ? "Mode   : DRY RUN (nothing written)\n" : "Mode   : LIVE\n");

  if (!DRY_RUN && !process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not set — refusing to run");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const [{ categories }, { blogs }] = await Promise.all([
    getJson("/api/category"),
    getJson("/api/blog"),
  ]);

  console.log(`Fetched ${categories.length} categories, ${blogs.length} blogs\n`);

  // --- categories -------------------------------------------------------
  // _ids are preserved so each blog's category reference still resolves.
  console.log("Categories");
  let categoriesAdded = 0;

  // Ids that a blog may legitimately reference: already in the database, or
  // written by the loop below. Tracked in memory so a dry run can still check
  // blogs properly instead of failing them all on categories it did not write.
  const availableCategoryIds = new Set();

  for (const category of categories) {
    const exists = await Category.findById(category._id);

    if (exists) {
      availableCategoryIds.add(String(category._id));
      console.log(`  skip    ${category.name} (already present)`);
      continue;
    }

    if (!DRY_RUN) {
      const doc = new Category({
        _id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      });

      // Without this Mongoose would stamp today's date over the originals.
      await doc.save({ timestamps: false });
    }

    availableCategoryIds.add(String(category._id));
    categoriesAdded++;
    console.log(`  import  ${category.name}`);
  }

  // --- blogs ------------------------------------------------------------
  console.log("\nBlogs");
  let blogsAdded = 0;
  const failures = [];

  for (const blog of blogs) {
    const label = blog.title.slice(0, 52);

    // Match on _id or slug — slug carries a unique index, so a duplicate would
    // throw rather than quietly double up.
    const exists = await Blog.findOne({
      $or: [{ _id: blog._id }, ...(blog.slug ? [{ slug: blog.slug }] : [])],
    });

    if (exists) {
      console.log(`  skip    ${label} (already present)`);
      continue;
    }

    const categoryId = blog.category?._id || blog.category;

    if (!categoryId || !availableCategoryIds.has(String(categoryId))) {
      failures.push({ title: label, reason: "category missing" });
      console.log(`  FAIL    ${label} — category missing`);
      continue;
    }

    let image;

    try {
      image = await rehostImage(blog.image);
    } catch (error) {
      failures.push({ title: label, reason: `image: ${error.message}` });
      console.log(`  FAIL    ${label} — image: ${error.message}`);
      continue;
    }

    if (!DRY_RUN) {
      const doc = new Blog({
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        category: categoryId,
        content: blog.content,
        image: image.url,
        slug: blog.slug,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      });

      await doc.save({ timestamps: false });
    }

    blogsAdded++;
    console.log(`  import  ${label} (${Math.round(image.bytes / 1024)} KB)`);
  }

  // --- summary ----------------------------------------------------------
  console.log("\n" + "-".repeat(60));
  console.log(`Categories imported : ${categoriesAdded}`);
  console.log(`Blogs imported      : ${blogsAdded}`);
  console.log(`Failed              : ${failures.length}`);
  failures.forEach((f) => console.log(`  - ${f.title}: ${f.reason}`));

  if (!DRY_RUN) {
    const stale = await Blog.countDocuments({
      image: { $not: new RegExp(process.env.IMAGEKIT_URL_ENDPOINT, "i") },
    });

    console.log(`\nTotal blogs locally : ${await Blog.countDocuments({})}`);
    console.log(`Images NOT on this ImageKit account: ${stale}`);
  }

  await mongoose.disconnect();
  process.exit(failures.length ? 1 : 0);
};

run().catch(async (error) => {
  console.error("\nMigration failed:", error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
