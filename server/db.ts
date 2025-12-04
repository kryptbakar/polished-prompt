import pkg from 'pg';
const { Pool } = pkg as any;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Disable TLS certificate validation for Railway PostgreSQL
if (process.env.NODE_ENV === 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
