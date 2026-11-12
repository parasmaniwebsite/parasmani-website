import mongoose from "mongoose";

/**
 * One row per Ask Parasmani question that was not answered from the knowledge
 * base (escalated, out of scope, uncited or failed). This is the to-do list for
 * improving the knowledge base: export it with `npm run ask:export`.
 *
 * The visitor's IP is stored only as a salted hash, enough to spot one person
 * asking repeatedly without keeping personal data.
 */
const askLogSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 600 },
    outcome: {
      type: String,
      enum: ["escalated", "out_of_scope", "uncited", "error", "answered_with_escalation"],
      required: true,
    },
    reason: { type: String, trim: true },
    sources: [{ type: String }],
    reply: { type: String, maxlength: 3000 },
    page: { type: String, trim: true, maxlength: 300 },
    ipHash: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.AskLog || mongoose.model("AskLog", askLogSchema);
