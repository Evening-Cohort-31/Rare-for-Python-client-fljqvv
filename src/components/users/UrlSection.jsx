import { useState } from "react"
import { isImageUrl } from "../utils/imageUtils.js"

export const UrlSection = ({ isSaving, onPickURL }) => {
  const [url, setUrl] = useState("")
  const isValidImage = isImageUrl(url)

  return (
    <div>
      <h3 className="title is-6 mb-2">Use an image URL</h3>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="https://example.com/myphoto.png"
            disabled={isSaving}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link"
            disabled={isSaving || !isValidImage}
            onClick={() => onPickURL(url)}
          >
            Use URL
          </button>
        </div>
      </div>
      {/* Helper text to inform the user about valid image URLs and a preview of the image if the URL is valid. */}
      { !isValidImage && url && (
        <p className="has-text-danger">Please enter a valid image URL (ending with .jpg, .png, etc.)</p>
      )}
      {/* If the entered URL is a valid image URL, display a preview of the image below the input field. */}
      {isValidImage && (
        <img
          src={url}
          alt="URL preview"
          style={{ width: 72, height: 72, borderRadius: "999px", objectFit: "cover", marginTop: 8 }}
        />
      )}
      {/* TODO: Extension-based validation won't catch image URLs that lack a file extension
          (e.g. https://example.com/avatar?id=123). Will revisit and consider validating by attempting to load
          the URL in a hidden Image object and checking onload/onerror instead. */}
    </div>
  )
}
