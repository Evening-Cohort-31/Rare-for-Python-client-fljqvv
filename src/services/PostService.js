import { fetchJson, putJson } from "./apiSettings";

export function getPostsByUserId(userId) {
    return fetchJson(`/posts?user_id=${userId}`);
}

export function getPostsByUserIdExpandCategory(userId) {
    return fetchJson(`/posts?user_id=${userId}&_expand=category`);
}

export function getAllPosts() {
    return fetchJson(`/posts?_expand=category`);
}

// returns a single post by ID, with the category expanded
export function getPostByIdExpandCategory(postId) {
    return fetchJson(`/posts/${postId}?_expand=category`);
}

export function getPostById(postId) {
    return fetchJson(`/posts/${postId}`);
}

export function updatePost(postId, postData) {
    return putJson(`/posts/${postId}`, postData);
}