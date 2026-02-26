import { fetchJson } from "./apiSettings";

// Ticket #21 - Fetches all comments for a given post, with the author's user object expanded
export function getCommentsByPostId(postId) {
  return fetchJson(`/comments?post_id=${postId}&_expand=user`);
}
