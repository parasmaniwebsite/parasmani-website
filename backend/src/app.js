import express from "express";
import cors from "cors";

import connectDB from "./utils/db.js";

import authRoutes from "./routes/authRoute.js";
import testRoute from "./routes/testRoute.js";
import contactRoute from "./routes/contactRoute.js";
import blogRoute from "./routes/blogRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";

const app = express();

// Rate limiting keys on req.ip, which is the proxy's address unless Express is
// told how many hops to trust. Set TRUST_PROXY to the number of proxies in
// front of this app (1 behind a single nginx/Vercel layer); leaving it unset is
// correct for direct exposure. Never use `true` — a client could then spoof
// X-Forwarded-For and sidestep every limit.
const trustProxy = Number.parseInt(process.env.TRUST_PROXY ?? "", 10);
app.set("trust proxy", Number.isNaN(trustProxy) ? false : trustProxy);

app.use(cors( {
    origin : ['http://localhost:5173', 'https://www.parasmanicopper.com', "https://parasmanicopper.com"]
}));

// Bounded so an oversized body cannot be used to exhaust memory.
app.use(express.json({ limit: "100kb" }));

// Routes
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
    })
})

/**
 * Every /api route needs the database, so the connection is established here
 * rather than at boot. On a serverless host app.listen() never runs, so a
 * connection opened only in server.js would never exist and every query would
 * buffer until it timed out. connectDB caches, so this is a no-op once warm.
 *
 * /health deliberately sits above this: it stays a pure liveness check that
 * answers even when the database is unreachable.
 */
app.use("/api", async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);
        res.status(503).json({
            success: false,
            message: "Database unavailable. Please try again shortly.",
        });
    }
});

app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoute);

app.use("/api/blog", blogRoute);

app.use("/api/category", categoryRoutes);

// Static Folder
app.use("/uploads", express.static("src/uploads"));

export default app;
