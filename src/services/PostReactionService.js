import { fetchJson, putJson } from "./apiSettings";

export function getAllPostReactions() {
    return fetchJson("/postreactions");
}

export function getPostReactionsByPostId(postId) {
    return fetchJson(`/postreactions?post_id=${postId}`);
}

export function updateOrCreatePostReaction(postReaction) {
    return putJson("/postreactions", postReaction);
}