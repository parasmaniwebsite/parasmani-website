import mongoose from "mongoose";

/**
 * One document per "forgot password" attempt. It carries the flow through both
 * stages: the emailed OTP first, then the reset token minted once that OTP is
 * verified. Nothing is stored in a form that is useful to an attacker who reads
 * the collection — both secrets are hashed.
 */
const passwordResetSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },

    // Normalised copy of the address, used for per-address throttling.
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otpHash: {
      type: String,
      default: null,
    },

    otpExpiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    resetTokenHash: {
      type: String,
      default: null,
    },

    resetTokenExpiresAt: {
      type: Date,
      default: null,
    },

    // Set once the flow is finished or superseded; a consumed row is inert.
    consumedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Mongo's TTL monitor sweeps rows an hour after creation — comfortably past
// every window above, so this is only housekeeping. Expiry is always enforced
// in code as well, because the sweep runs on its own ~60s schedule.
passwordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 });

// Lookup path for the reset step.
passwordResetSchema.index({ resetTokenHash: 1 });

// Supports "newest active row for this address" without an in-memory sort.
passwordResetSchema.index({ email: 1, createdAt: -1 });

export default mongoose.model("PasswordReset", passwordResetSchema);
