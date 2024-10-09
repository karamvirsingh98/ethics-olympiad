import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const { DB_URI, DB_TOKEN } = process.env;

export default defineConfig({
  schema: "./src/lib/schema.ts",
  dialect: "turso",
  dbCredentials: { url: DB_URI, authToken: DB_TOKEN },
});
