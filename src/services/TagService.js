import { fetchJson, postJson, putJson, deleteJson } from "./apiSettings";

// Function to get all tags from the API Ticket #10
export const getAllTags = () => {
  return fetchJson("/tags");
};

export const createTag = (tag) => {
  return postJson("/tags", tag);
};
// Ticket #18 function that deletes Tags from the API
export const deleteTag = (id) => {
  return deleteJson(`/tags/${id}`);
};

export const getTagById = (id) => {
  return fetchJson(`/tags/${id}`);
};

export const editTag = (id, updatedTag) => {
  return putJson(`/tags/${id}`, updatedTag);
};

export const getTagsByPostId = (postId) => {
  return fetchJson(`/posts/${postId}/tags`);
};

export const addTagToPost = (postId, tagId) => {
  return postJson(`/posts/${postId}/tags`, { tag_id: tagId });
};

export const removeTagFromPost = (postId, tagId) => {
  return deleteJson(`/posts/${postId}/tags/${tagId}`);
};
