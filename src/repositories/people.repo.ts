import { db } from "../config/db.js";
import { floatArrayToBuffer, bufferToFloatArray } from "../utils/embeddings.js";

/**
 * Insert or get existing person by name
 * @param {string} name - Person's name
 * @returns {number} Person ID from database
 * @throws {Error} If unable to get person ID
 */
export function upsertPerson(name: string): number {
  db.prepare(`INSERT OR IGNORE INTO person(name) VALUES (?)`).run(name);
  const row = db.prepare(`SELECT id FROM person WHERE name = ?`).get(name) as { id: number } | undefined;
  if (!row) throw new Error("Falha ao obter ID da pessoa");
  return row.id;
}

/**
 * Insert face descriptors for a person
 * @param {number} personId - Person ID from database
 * @param {number[][]} descriptors - Array of face descriptor arrays
 */
export function insertDescriptors(personId: number, descriptors: number[][]): void {
  const stmt = db.prepare(`INSERT INTO descriptor(person_id, vector) VALUES (?, ?)`);
  const insertMany = db.transaction((arr: number[][]) => {
    for (const d of arr) stmt.run(personId, floatArrayToBuffer(d));
  });
  insertMany(descriptors);
}

/**
 * Delete person and all their descriptors by name
 * @param {string} name - Person's name to delete
 * @returns {boolean} True if person was deleted, false if not found
 */
export function deletePersonByName(name: string): boolean {
  const row = db.prepare(`SELECT id FROM person WHERE name = ?`).get(name) as { id: number } | undefined;
  if (!row) return false;
  db.prepare(`DELETE FROM person WHERE id = ?`).run(row.id);
  return true;
}

/**
 * Get all people with their face descriptors
 * @returns {Array<{name: string, descriptors: number[][]}>} Array of people with their descriptors
 */
export function listPeopleWithDescriptors(): { name: string; descriptors: number[][] }[] {
  const rows = db
    .prepare(
      `SELECT p.name as name, d.vector as vector
       FROM person p
       JOIN descriptor d ON p.id = d.person_id
       ORDER BY p.name ASC`
    )
    .all() as { name: string; vector: Buffer }[];

  const map = new Map<string, number[][]>();
  for (const r of rows) {
    const arr = bufferToFloatArray(r.vector);
    if (!map.has(r.name)) map.set(r.name, []);
    map.get(r.name)!.push(arr);
  }
  return Array.from(map.entries()).map(([name, descriptors]) => ({ name, descriptors }));
}
