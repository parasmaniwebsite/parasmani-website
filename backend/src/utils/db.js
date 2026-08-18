import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

/**
 * Serverless-safe MongoDB connection.
 *
 * On a long-running server the connection is opened once at boot. On a
 * serverless platform there is no boot: the module is loaded per cold start and
 * `app.listen()` never runs, so connecting inside server.js leaves every query
 * buffering until it times out.
 *
 * The promise is cached on globalThis rather than in module scope because a
 * warm invocation reuses the process but may re-evaluate modules. Caching the
 * *promise*, not just the connection, means concurrent requests during a cold
 * start all await the same handshake instead of opening one connection each —
 * which is how a serverless deployment exhausts an Atlas connection limit.
 */
const cache = (globalThis.__mongooseCache ??= { conn: null, promise: null });

export const connectDB = async () => {
  if (cache.conn) return cache.conn;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGO_URI, {
        // Fail fast with a real connection error instead of letting queries sit
        // in the buffer for 10s and report a misleading "buffering timed out".
        bufferCommands: false,
        serverSelectionTimeoutMS: 8000,
      })
      .catch((error) => {
        // Clear the cache so the next request retries rather than reusing a
        // permanently rejected promise.
        cache.promise = null;
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};

export default connectDB;
