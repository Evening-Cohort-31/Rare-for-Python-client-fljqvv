import { fetchJson, postJson } from "./apiSettings";

export function getCommentsByPostIdExpandAuthor(postId) {
    return fetchJson(`/posts/${postId}/comments?_expand=user`);
}

export function createComment(comment) {
    return postJson("/comments", comment);
}