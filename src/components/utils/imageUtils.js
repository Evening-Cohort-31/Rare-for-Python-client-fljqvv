// Utility functions related to image handling, such as constructing full image URLs from relative paths or handling default images.
import { API_BASE_URL } from "../../services/index.js"

// Helper function to build a full image source URL. If the provided URL is already absolute (starts with "http"), it returns it as is. Otherwise, it prepends the API base URL to construct the full path to the image resource.
export const buildImageSrc = (url) => {
    if (!url) return ""
    if (url.startsWith("http")) return url
    return `${API_BASE_URL}${url}`
}

// Utility function to check if a given URL points to an image file based on its extension.
export const isImageUrl = (url) => {
    try {
        const { pathname } = new URL(url)
        return /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i.test(pathname)
    } catch {
        return false
    }
}

