import { fetchJson, postJson, putJson, deleteJson } from "./apiSettings";

export function getAllCategories() {
  return fetchJson("/categories");
}

export function getCategoryById(categoryId) {
    return fetchJson(`/categories/${categoryId}`);
}

export function createCategory(category) {
  return postJson("/categories", category);
}

export function updateCategory(categoryId, categoryData) {
    return putJson(`/categories/${categoryId}`, categoryData);
}

// Ticket #16 - Delete a Category: sends DELETE request to remove a category by id
export const deleteCategory = (id) => {
  return deleteJson(`/categories/${id}`);
};
