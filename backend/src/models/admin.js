import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // Stamped on every password change. authMiddleware rejects any token issued
  // before this instant, so a reset signs out sessions that are already out
  // there — the point of resetting a password someone else may know.
  passwordChangedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Admin", adminSchema);