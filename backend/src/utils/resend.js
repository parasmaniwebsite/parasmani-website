import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

// server.js calls dotenv.config() too, but ES module imports are hoisted above
// it, so this file has to load the env itself (same reason imagekit.js does).
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!resend) {
  console.warn("RESEND_API_KEY is not set — outgoing email is disabled");
}

export default resend;
