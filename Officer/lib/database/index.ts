import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if(!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise = mongoose.connect(MONGODB_URI, {
    dbName: "CarHub",
    bufferCommands: false,
    // serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    // connectTimeoutMS: 10000, // 10 seconds timeout
  });

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
