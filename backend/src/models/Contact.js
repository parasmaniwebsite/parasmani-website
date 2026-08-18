import mongoose from "mongoose";

/* The copper estimator's own result, stored alongside the lead so the sales
   team sees what the visitor was quoted without re-running the tool. Only
   estimator leads carry this; enquiry-form leads leave it unset. */
const estimateSchema = new mongoose.Schema(
  {
    systemLabel: { type: String, trim: true },
    product: { type: String, trim: true },
    scale: { type: String, trim: true },
    buildingType: { type: String, trim: true },
    city: { type: String, trim: true },
    meters: { type: Number },
    weight: { type: String, trim: true },
    breakdown: [
      {
        _id: false,
        size: { type: String, trim: true },
        meters: { type: Number },
      },
    ],
  },
  { _id: false },
);

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    /* Not required: the copper estimator asks for a phone number and treats
       email as optional. The enquiry form still requires it on its own side. */
    email: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    /* Which form produced the lead. Defaults to the enquiry form so every
       existing document reads correctly without a migration. */
    source: {
      type: String,
      enum: ["Enquiry Form", "Project Estimator"],
      default: "Enquiry Form",
    },

    /* Optional extras the estimator collects; the enquiry form sends none. */
    company: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    timeline: {
      type: String,
      trim: true,
    },

    estimate: estimateSchema,

    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
