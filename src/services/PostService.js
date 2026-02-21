import { fetchJson, postJson, putJson } from "./apiSettings";

export function getPostsByUserId(userId) {
    return fetchJson(`/posts?user_id=${userId}`);
}

export function getPostsByUserIdExpandCategory(userId) {
    return fetchJson(`/posts?user_id=${userId}&_expand=category`);
}

export function getAllPosts() {
    return fetchJson(`/posts?_expand=category`);
}

export const createPost = (post) => {
    return postJson(`/posts`, post);
}

export function getPostByIdExpandCategory(postId) {
    return fetchJson(`/posts/${postId}?_expand=category`);
}

export function getPostByIdExpandCategoryExpandUser(postId) {
    return fetchJson(`/posts/${postId}?_expand=category&_expand=user`);
}

export function getPostById(postId) {
    return fetchJson(`/posts/${postId}`);
}

export function updatePost(postId, postData) {
    return putJson(`/posts/${postId}`, postData);
}
