import { fetchJson } from "./apiSettings";

export function getPostsByUserId(userId) {
  return fetchJson(`/posts?user_id=${userId}`);
}

export function getPostByUserIdExpandCategory(userId) {
  return fetchJson(`/posts?user_id=${userId}&_expand=category`);
}

export const getAllPosts = () => {
  return fetchJson(`/posts?_expand=category`);
};

// Added for Ticket #5 - Fetches a single post by its ID for the PostDetails view
export function getPostById(postId) {
  return fetchJson(`/posts/${postId}`);
}
