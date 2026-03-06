import { fetchJson, postJson, deleteJson } from "./apiSettings";

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
