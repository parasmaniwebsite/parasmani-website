import express from "express";
import {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createContact);

router.get("/", authMiddleware, getContacts);

router.patch(
  "/:id/status",
  authMiddleware,
  updateContactStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

export default router;