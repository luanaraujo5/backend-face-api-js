import Database from "better-sqlite3";
import { mkdirSync, existsSync } from "fs";
import path from "path";

const dbPath = process.env.DB_PATH || "./data/db.sqlite";
const dir = path.dirname(dbPath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

export const db = new Database(dbPath);

// migrations (idempotentes)
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

migrate();

if (process.argv.includes("--migrate")) {
  process.exit(0);
}
