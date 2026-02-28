import { fetchJson } from "./apiSettings.js";

export function getUserById(id) {
  return fetchJson(`/users/${id}`);
}

export function getAllUsers() {
  return fetchJson("/users");
}
