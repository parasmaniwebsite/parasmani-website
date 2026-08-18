import app from "../src/app.js";

/**
 * Vercel entry point. Vercel only serves what it finds under api/, so without
 * this file the deployment has no function at all and every path — including
 * /health — falls through to Vercel's own 404.
 *
 * There is no app.listen() here on purpose: Vercel invokes the exported handler
 * per request. server.js remains the entry point for a long-running host.
 * app.js opens the database connection on the first /api request, so nothing
 * else needs to run at boot.
 */
export default app;
