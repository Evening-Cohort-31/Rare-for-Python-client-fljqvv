import { fetchJson } from "./apiSettings";

export function getAllReactions() {
    return fetchJson("/reactions");
}