// lib/db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env file");
}

// Use global cache in dev + prod
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // 🔹 limit pool to avoid overload
      serverSelectionTimeoutMS: 5000, // 🔹 fail fast if Mongo is unreachable
      socketTimeoutMS: 45000, // 🔹 avoid hanging sockets
      bufferCommands: false,
    }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // 🔹 keep cache persistent
  return cached.conn;
}
