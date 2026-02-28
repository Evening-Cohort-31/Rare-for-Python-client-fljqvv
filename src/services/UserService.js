import { fetchJson, putJson } from "./apiSettings.js";

export function getUserById(id) {
    return fetchJson(`/users/${id}`);
}

export function getAllUsers() {
    return fetchJson("/users");
}

export function getActiveUsers() {
    return fetchJson("/users?active=true");
}

export function getInactiveUsers() {
    return fetchJson("/users?active=false");
}

export const updateUser = (userId, userData) => {
    return putJson(`/users/${userId}`, userData)
}