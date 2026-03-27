import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: "3bc2b177aab17b43d21bb0a80b75886d",
    databaseId: "bbd2acf0-0b01-47a9-9b76-a531b981c086",
    token: "dj1d9kpBNY3Uxzzt-8ShwBqxAjOPt1TtVwEzt924",
    // accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    // databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    // token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});
