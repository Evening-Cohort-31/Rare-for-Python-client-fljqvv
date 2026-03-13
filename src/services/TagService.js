import { fetchJson, postJson, putJson, deleteJson } from "./apiSettings";

export const getAllTags = () => {
  return fetchJson("/tags");
};

export const createTag = (tag) => {
  return postJson("/tags", tag);
};

export const deleteTag = (id) => {
  return deleteJson(`/tags/${id}`);
};

export const getTagById = (id) => {
  return fetchJson(`/tags/${id}`);
};

export const editTag = (id, updatedTag) => {
  return putJson(`/tags/${id}`, updatedTag);
};
