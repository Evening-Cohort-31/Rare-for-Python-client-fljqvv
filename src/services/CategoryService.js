import { fetchJson, postJson, putJson } from "./apiSettings";

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