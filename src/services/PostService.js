import { fetchJson, deleteJson } from "./apiSettings";

export function getPostsByUserId(userId) {
    return fetchJson(`/posts?user_id=${userId}`);
}

export function getPostByUserIdExpandCategory(userId) {
    return fetchJson(`/posts?user_id=${userId}&_expand=category`);
}

export const getAllPosts= () => {
  return fetchJson(`/posts?_expand=category`);
}

export const deletePost = (postId) => {
    return deleteJson(`/posts/${postId}`);

}

