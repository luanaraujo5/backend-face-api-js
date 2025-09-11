import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import path from "path";

/**
 * Database configuration and initialization
 */
const dbPath = process.env.DB_PATH || "./data/db.sqlite";
const dir = path.dirname(dbPath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

/**
 * SQLite database instance
 */
export const db = new Database(dbPath);

/**
 * Run database migrations (idempotent)
 * Creates tables and indexes if they don't exist
 */
function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS descriptor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      person_id INTEGER NOT NULL,
      vector BLOB NOT NULL,
      FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE
    );
  `);

  db.exec(`CREATE INDEX IF NOT EXISTS idx_descriptor_person ON descriptor(person_id);`);
  db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_person_name ON person(name);`);

  console.log("✅ Migrations OK");
}

// Run migrations on module load
migrate();

if (process.argv.includes("--migrate")) {
  process.exit(0);
}
