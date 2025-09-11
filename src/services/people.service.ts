import { insertDescriptors, listPeopleWithDescriptors, upsertPerson, deletePersonByName } from "../repositories/people.repo.js";

export interface RegisterPayload {
  name: string;
  descriptors: number[][];
}

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

export function getPeople() {
  return listPeopleWithDescriptors();
}

export function removePerson(name: string) {
  const removed = deletePersonByName(name);
  return { ok: true, removed };
}
