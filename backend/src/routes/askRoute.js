import express from "express";
import { ask } from "../controllers/askController.js";
import { askBurstLimiter, askDailyLimiter } from "../middlewares/rateLimiters.js";

const router = express.Router();

router.post("/", askDailyLimiter, askBurstLimiter, ask);

export default router;
