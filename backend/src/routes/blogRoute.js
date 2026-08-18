import express from "express";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getBlogCategories,
  reorderBlogs,
} from "../controllers/blogController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getBlogs);

router.get("/categories/all", getBlogCategories);

// Accepts a slug ("copper-tube-quality-tests") or a raw id for older links.
router.get("/:slugOrId", getSingleBlog);


// ADMIN
// Declared before "/:id" so "reorder" is never read as a blog id.
router.patch("/reorder", authMiddleware, reorderBlogs);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createBlog
);

router.put(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
  ]),
  updateBlog,
);

router.delete("/:id", authMiddleware, deleteBlog);

export default router;
