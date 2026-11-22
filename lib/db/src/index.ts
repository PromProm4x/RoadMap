import fs from "node:fs";
import path from "node:path";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import pg from "pg";
import * as schema from "./schema/index";

const { Pool } = pg;

// Try to load .env if available
try {
  process.loadEnvFile?.();
} catch {}

const dbUrl = process.env.DATABASE_URL;
const isPostgresUrl = Boolean(
  dbUrl && (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")),
);

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS "user_learning_state" (
  "user_id" text PRIMARY KEY NOT NULL,
  "state" jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
`;

let poolInstance: pg.Pool | null = null;
let pgliteInstance: PGlite | null = null;
let dbInstance: any;

if (isPostgresUrl) {
  poolInstance = new Pool({ connectionString: dbUrl });
  dbInstance = drizzlePg(poolInstance, { schema });
} else {
  // Use embedded persistent PGlite
  const dbDir = path.resolve(process.cwd(), ".data", "devroadmap.db");
  fs.mkdirSync(dbDir, { recursive: true });
  pgliteInstance = new PGlite(dbDir);
  dbInstance = drizzlePglite(pgliteInstance, { schema });
}

export async function initDb(): Promise<void> {
  if (pgliteInstance) {
    await pgliteInstance.exec(SCHEMA_SQL);
  } else if (poolInstance) {
    await poolInstance.query(SCHEMA_SQL);
  }
}

// Automatically ensure schema is created
initDb().catch((err) => {
  console.warn("[db] Schema initialization warning:", err.message);
});

export const pool = poolInstance;
export const client = pgliteInstance;
export const db = dbInstance;

export * from "drizzle-orm";
export * from "./schema/index";
