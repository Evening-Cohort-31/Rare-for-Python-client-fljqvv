import { fetchJson, API_BASE_URL } from "./apiSettings";

export function getAvatars() {
    return fetchJson("/avatars");
}

export const uploadFile = async (endpoint, formData) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        body: formData
    })

    if (!response.ok) {
        throw new Error("Upload failed")
    }

    return response.json()
}