import fs from "fs";

import mongoose from "mongoose";

import Blog from "../models/Blog.js";

import imagekit from "../utils/imagekit.js";

/**
 * Turns a title into the readable part of a URL. No timestamp prefix — the URL
 * is meant to read as the article's name.
 */
export const slugify = (title = "") =>
  title
    .toString()
    // Decompose accents then drop the marks, so "Ünïcode" becomes "unicode"
    // rather than losing the letters entirely.
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    // Collapse every run of non-alphanumerics into a single hyphen, so
    // punctuation and spaces both become clean separators.
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "blog";

/**
 * `slug` carries a unique index, so two posts with the same title would
 * otherwise collide on insert. The second one becomes "<slug>-2".
 */
export const makeUniqueSlug = async (title, excludeId = null) => {
  const base = slugify(title);

  // base is already reduced to [a-z0-9-], so it is safe to embed in a regex.
  const filter = { slug: new RegExp(`^${base}(-\\d+)?$`) };
  if (excludeId) filter._id = { $ne: excludeId };

  const taken = new Set(
    (await Blog.find(filter).select("slug").lean()).map((b) => b.slug),
  );

  if (!taken.has(base)) return base;

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix++;

  return `${base}-${suffix}`;
};



export const createBlog = async (req, res) => {
  try {
    const { title, description, category, content } = req.body;

    
    if (!req.file) {
      console.error("[createBlog] No file uploaded in request");
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    // Validate ImageKit env
    if (
      !process.env.IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.IMAGEKIT_URL_ENDPOINT
    ) {
      console.error("[createBlog] Missing ImageKit environment variables");
      return res.status(500).json({
        success: false,
        message: "ImageKit is not configured on the server",
      });
    }

    // Convert buffer to a base64 data URI (ImageKit accepts data URIs)
    const base64 = req.file.buffer.toString("base64");
    const fileData = `data:${req.file.mimetype};base64,${base64}`;

    // Upload image to ImageKit
    let uploadedImage;
    try {
      uploadedImage = await imagekit.upload({
        file: fileData,
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: "/blogs",
      });
    } catch (uploadErr) {
      console.error("[createBlog] ImageKit upload error:", uploadErr);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to ImageKit",
      });
    }

    const imageUrl = uploadedImage.url;

    // Generate slug to avoid duplicate null slug index errors
    const slug = await makeUniqueSlug(title);

    // Save only URL in MongoDB
    const blog = await Blog.create({
      title,
      description,
      category,
      content,
      image: imageUrl,
      slug,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    // The admin's chosen order wins; newest-first only breaks ties between
    // posts that share a position (unplaced posts all sit at 0).
    const blogs = await Blog.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .populate("category");

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Sets the order visitors see. Takes the full list of blog ids in the order the
 * admin arranged them and writes each one's position in a single round trip.
 */
export const reorderBlogs = async (req, res) => {
  try {
    const { orderedIds } = req.body ?? {};

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "orderedIds must be a non-empty array of blog ids",
      });
    }

    const invalid = orderedIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id),
    );

    if (invalid.length) {
      return res.status(400).json({
        success: false,
        message: "orderedIds contains values that are not valid blog ids",
      });
    }

    // A duplicate id would silently give two posts the same slot.
    if (new Set(orderedIds.map(String)).size !== orderedIds.length) {
      return res.status(400).json({
        success: false,
        message: "orderedIds contains duplicate ids",
      });
    }

    const found = await Blog.countDocuments({ _id: { $in: orderedIds } });

    if (found !== orderedIds.length) {
      return res.status(400).json({
        success: false,
        message: "orderedIds references blogs that no longer exist",
      });
    }

    // 1-based so a freshly created blog, which defaults to 0, sorts above the
    // ordered set rather than colliding with the first placed post.
    await Blog.bulkWrite(
      orderedIds.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { displayOrder: index + 1 } },
        },
      })),
    );

    return res.status(200).json({
      success: true,
      message: "Blog order updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE BLOG — by slug, or by id so older links keep working
export const getSingleBlog = async (req, res) => {
  try {
    const { slugOrId } = req.params;

    let blog = await Blog.findOne({ slug: slugOrId }).populate("category");

    // Anything already shared as /blog/<objectid> must not start 404ing.
    if (!blog && mongoose.Types.ObjectId.isValid(slugOrId)) {
      blog = await Blog.findById(slugOrId).populate("category");
    }

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { title, description, category, content } = req.body;

    const updatedData = {
      title,
      description,
      category,
      content,
    };

    // Handle potential uploaded files (memoryStorage)
    if (req.files?.image?.length) {
      const img = req.files.image[0];
      if (img.buffer) {
        const base64 = img.buffer.toString("base64");
        const fileData = `data:${img.mimetype};base64,${base64}`;
        const uploaded = await imagekit.upload({
          file: fileData,
          fileName: `${Date.now()}-${img.originalname}`,
          folder: "/blogs",
        });
        updatedData.image = uploaded.url;
      } else if (img.filename) {
        updatedData.image = img.filename;
      }
    }

    if (req.files?.authorImage?.length) {
      const aimg = req.files.authorImage[0];
      if (aimg.buffer) {
        const base64 = aimg.buffer.toString("base64");
        const fileData = `data:${aimg.mimetype};base64,${base64}`;
        const uploaded = await imagekit.upload({
          file: fileData,
          fileName: `${Date.now()}-${aimg.originalname}`,
          folder: "/blogs/authors",
        });
        updatedData.authorImage = uploaded.url;
      } else if (aimg.filename) {
        updatedData.authorImage = aimg.filename;
      }
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL UNIQUE CATEGORIES
export const getBlogCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category");

    const filteredCategories = categories.filter(
      (item) => item && item.trim() !== "",
    );

    res.status(200).json({
      success: true,
      categories: filteredCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
