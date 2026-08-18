import express from "express";

import authMiddleware
from "../middlewares/authMiddleware.js";

import {
createCategory,
getCategories,
deleteCategory
}
from "../controllers/categoryController.js";

const router=
express.Router();


// Public
router.get(
"/",
getCategories
);


// Admin
router.post(
"/",
authMiddleware,
createCategory
);

router.delete(
"/:id",
authMiddleware,
deleteCategory
);

export default router;