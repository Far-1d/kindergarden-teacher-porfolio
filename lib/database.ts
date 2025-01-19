import mongoose, { Mongoose } from 'mongoose';

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

//@ts-ignore
let cached: Cached = global.mongoose as Cached || { conn: null, promise: null };

if (!cached) {
  //@ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) {
    console.log('mongoDB is already connected');
    return cached.conn;
  }
  
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "promptopia"
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log("--- error in connections ---");
    throw e;
  }
  
  console.log('mongoDB connected');
  return cached.conn;
}
