import { fetchJson, postJson } from "./apiSettings";

// expand supports: "user", "author", and "post"
// "author" is an alias for "user"
export function getCommentsByPostId(postId, ...expand) {

    // Normalize aliases and Set to remove duplicates in request
    const normalized = [...new Set(
        expand.map((e) => e === "author" ? "user" : e)
    )];

    // URLSearchParams makes it easy to build query strings with multiple parameters
    const params = new URLSearchParams();

    // Add the post_id filter
    params.set("post_id", postId)

    // Add multiple expand params if needed
    normalized.forEach((e) => {
        params.append("_expand", e)
    })

    return fetchJson(`/comments?${params.toString()}`)
}

export function createComment(comment) {
    return postJson("/comments", comment);
}