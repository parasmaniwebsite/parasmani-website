import dotenv from "dotenv";

import app from "./src/app.js";
import connectDB from "./src/utils/db.js";
import createSuperAdmin from "./src/utils/createSuperAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 9001;

/**
 * Entry point for a long-running server (local dev, Render). Serverless hosts
 * never reach this file — they import src/app.js, which opens the connection
 * itself on the first /api request.
 */
const startServer = async () => {
  try {
    // Connect DB up front so a bad URI fails loudly at boot rather than on the
    // first request. Shares the same cached connection app.js uses.
    await connectDB();

    console.log("MongoDB Connected");

    // Create First Admin
    await createSuperAdmin();

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Server Error:", error);
  }
};

startServer();