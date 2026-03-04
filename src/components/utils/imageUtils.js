// Utility functions related to image handling, such as constructing full image URLs from relative paths or handling default images.
import { API_BASE_URL } from "../../services/index.js"

export const buildImageSrc = (url) => {
    if (!url) return ""
    if (url.startsWith("http")) return url
    return `${API_BASE_URL}${url}`
}