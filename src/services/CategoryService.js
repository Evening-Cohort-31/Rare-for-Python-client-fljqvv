import { fetchJson, postJson } from "./apiSettings";

export function getAllCategories() {
    return fetchJson("/categories");
}

export function createCategory(category) {
    return postJson("/categories", category);
}