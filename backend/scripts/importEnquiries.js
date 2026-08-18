/**
 * One-off migration: copy contact enquiries from a running Parasmani API into
 * this deployment's database.
 *
 * Unlike blogs, GET /api/contact is behind authMiddleware, so this needs a
 * token for the SOURCE deployment. Supply either:
 *
 *   SOURCE_TOKEN="<jwt>" node scripts/importEnquiries.js
 *
 *   SOURCE_ADMIN_EMAIL="admin@…" SOURCE_ADMIN_PASSWORD="…" \
 *     node scripts/importEnquiries.js
 *
 * Add --dry-run to report without writing.
 *
 * Enquiries carry personal data (names, phone numbers, email addresses), so the
 * log masks contact details — a migration transcript should not become a second
 * copy of the data.
 *
 * Safe to re-run: rows already present locally are skipped.
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Contact from "../src/models/Contact.js";

const SOURCE = process.env.SOURCE_API || "https://parasmani.onrender.com";
const DRY_RUN = process.argv.includes("--dry-run");

// Render free instances sleep; the first request pays the cold start.
const FETCH_TIMEOUT_MS = 90_000;

const redactUri = (uri = "") => uri.replace(/\/\/[^@]+@/, "//***:***@");

/** j***@example.com — enough to eyeball a row without logging the address. */
const maskEmail = (email = "") => {
  const [user, domain] = String(email).split("@");
  if (!domain) return "***";
  return `${user.slice(0, 1)}***@${domain}`;
};

const maskPhone = (phone = "") => {
  const digits = String(phone);
  return digits.length <= 4 ? "***" : `***${digits.slice(-4)}`;
};

/** Logs in against the source deployment if no token was supplied directly. */
const getSourceToken = async () => {
  if (process.env.SOURCE_TOKEN) {
    console.log("Auth   : SOURCE_TOKEN from environment");
    return process.env.SOURCE_TOKEN;
  }

  const email = process.env.SOURCE_ADMIN_EMAIL;
  const password = process.env.SOURCE_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "No credentials. Set SOURCE_TOKEN, or SOURCE_ADMIN_EMAIL and SOURCE_ADMIN_PASSWORD.",
    );
  }

  const res = await fetch(`${SOURCE}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok || !body.token) {
    throw new Error(`Login failed (${res.status}): ${body.message || "no token"}`);
  }

  console.log(`Auth   : logged in as ${maskEmail(email)}`);
  return body.token;
};

const run = async () => {
  console.log(`Source : ${SOURCE}`);
  console.log(`Target : ${redactUri(process.env.MONGO_URI)}`);
  console.log(DRY_RUN ? "Mode   : DRY RUN (nothing written)" : "Mode   : LIVE");

  const token = await getSourceToken();

  await mongoose.connect(process.env.MONGO_URI);

  const res = await fetch(`${SOURCE}/api/contact`, {
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(
      `GET /api/contact -> ${res.status}` +
        (res.status === 401 ? " (token rejected or expired)" : ""),
    );
  }

  const { contacts } = await res.json();

  console.log(`\nFetched ${contacts.length} enquiries\n`);

  let imported = 0;
  let skipped = 0;
  const failures = [];
  const statusCounts = {};

  for (const contact of contacts) {
    const label = `${(contact.fullName || "(no name)").slice(0, 24).padEnd(24)} ${maskEmail(contact.email).padEnd(26)} ${maskPhone(contact.contactNumber)}`;

    if (await Contact.findById(contact._id)) {
      skipped++;
      console.log(`  skip    ${label}`);
      continue;
    }

    try {
      if (!DRY_RUN) {
        const doc = new Contact({
          _id: contact._id,
          fullName: contact.fullName,
          contactNumber: contact.contactNumber,
          email: contact.email,
          message: contact.message,
          // Preserve the triage state the team already worked through.
          status: contact.status || "New",
          createdAt: contact.createdAt,
          updatedAt: contact.updatedAt,
        });

        // Without this Mongoose would stamp today's date over the originals,
        // which would make every enquiry look like it arrived during migration.
        await doc.save({ timestamps: false });
      }

      statusCounts[contact.status || "New"] =
        (statusCounts[contact.status || "New"] || 0) + 1;

      imported++;
      console.log(`  import  ${label}`);
    } catch (error) {
      failures.push({ id: contact._id, reason: error.message });
      console.log(`  FAIL    ${label} — ${error.message}`);
    }
  }

  console.log("\n" + "-".repeat(60));
  console.log(`Imported : ${imported}`);
  console.log(`Skipped  : ${skipped} (already present)`);
  console.log(`Failed   : ${failures.length}`);
  failures.forEach((f) => console.log(`  - ${f.id}: ${f.reason}`));

  if (imported) {
    console.log("\nBy status:");
    Object.entries(statusCounts).forEach(([status, count]) =>
      console.log(`  ${status.padEnd(12)} ${count}`),
    );
  }

  if (!DRY_RUN) {
    console.log(`\nTotal enquiries locally: ${await Contact.countDocuments({})}`);
  }

  await mongoose.disconnect();
  process.exit(failures.length ? 1 : 0);
};

run().catch(async (error) => {
  console.error("\nMigration failed:", error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
