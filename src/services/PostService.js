import { fetchJson } from "./apiSettings";

export function getPostsByUserId(userId) {
    return fetchJson(`/posts?user_id=${userId}`);
}

export function getPostByUserIdExpandCategory(userId) {
    return fetchJson(`/posts?user_id=${userId}&_expand=category`);
}