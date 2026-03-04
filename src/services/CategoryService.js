import { fetchJson, postJson, deleteJson } from "./apiSettings";

export function getAllCategories() {
  return fetchJson("/categories");
}

export function createCategory(category) {
  return postJson("/categories", category);
}

// Ticket #16 - Delete a Category: sends DELETE request to remove a category by id
export const deleteCategory = (id) => {
  return deleteJson(`/categories/${id}`);
};
