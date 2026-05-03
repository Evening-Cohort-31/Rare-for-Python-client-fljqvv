import { fetchJson, postJson } from "./apiSettings";

export function getAllReactions() {
    return fetchJson("/reactions");
}

export function createReaction(reaction) {
    return postJson("/reactions", reaction);
}