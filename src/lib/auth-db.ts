import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB ?? "shomaj_shathi";

declare global {
  var __shomajAuthMongoClient: MongoClient | undefined;
}

function createClient() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is required for BetterAuth. Add it to .env.local (see .env.example) or to your Vercel project settings.",
    );
  }
  return new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
}

export const authMongoClient = globalThis.__shomajAuthMongoClient ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__shomajAuthMongoClient = authMongoClient;
}

export function getAuthDatabase(): Db {
  return authMongoClient.db(databaseName);
}
