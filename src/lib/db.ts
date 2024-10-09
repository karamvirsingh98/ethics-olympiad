import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const { DB_URI, DB_TOKEN } = process.env;

const client = createClient({ url: DB_URI, authToken: DB_TOKEN });

export const db = drizzle(client, { schema });
