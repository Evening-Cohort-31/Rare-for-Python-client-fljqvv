import { fetchJson, postJson, deleteJson } from "./apiSettings";

export const getTagsByPostId = async (postId) => {
    const rows = await fetchJson(`/posttags?post_id=${postId}&_expand=tag`);

    return rows.map((row) => ({
        postTagId: row.id,
        id: row.tag.id,
        label: row.tag.label,
        created_on: row.created_on,
    }));
};

export const addTagToPost = async (postId, tagId) => {
    try {
        return await postJson("/posttags", {
            post_id: postId,
            tag_id: tagId,
        });
    } catch (err) {
        console.warn(err?.message || "Failed to add tag to post.");
        throw err;
    }
};

export const removeTagFromPost = (postTagId) => {
    return deleteJson(`/posttags/${postTagId}`);
};