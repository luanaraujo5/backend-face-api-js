import { insertDescriptors, listPeopleWithDescriptors, upsertPerson, deletePersonByName } from "../repositories/people.repo.js";

/**
 * Payload interface for person registration
 */
export interface RegisterPayload {
  /** Person's name */
  name: string;
  /** Array of face descriptor arrays */
  descriptors: number[][];
}

/**
 * Register a new person with face descriptors
 * @param {RegisterPayload} payload - Registration data
 * @returns {{ok: boolean}} Success response
 * @throws {Error} If name or descriptors are missing/invalid
 */
export function registerPerson(payload: RegisterPayload) {
  const { name, descriptors } = payload || ({} as RegisterPayload);
  if (!name || !Array.isArray(descriptors) || descriptors.length === 0) {
    const err = new Error("name e descriptors são obrigatórios");
    (err as any).status = 400;
    throw err;
  }
  const personId = upsertPerson(name);
  insertDescriptors(personId, descriptors);
  return { ok: true };
}

/**
 * Get all registered people with their descriptors
 * @returns {Array<{name: string, descriptors: number[][]}>} List of people
 */
export function getPeople() {
  return listPeopleWithDescriptors();
}

/**
 * Remove a person by name
 * @param {string} name - Person's name to remove
 * @returns {{ok: boolean, removed: boolean}} Success response with removal status
 */
export function removePerson(name: string) {
  const removed = deletePersonByName(name);
  return { ok: true, removed };
}
