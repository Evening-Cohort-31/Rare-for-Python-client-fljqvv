// Handles both "Upload a new photo" and "Choose from previous uploads" —
import { useState } from "react"
import { getPreviouslyUploadedImages } from "../../services/index.js"
import { buildImageSrc } from "../utils/imageUtils.js"

export const UploadSection = ({ selectedFile, onFileChange, onUpload, isSaving, userId, onPickURL }) => {
  const [previousImages, setPreviousImages] = useState([])
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [previousError, setPreviousError] = useState(null)

  const loadPreviousImages = async () => {
    if (!userId) return
    setIsLoadingPrevious(true)
    setPreviousError(null)
    try {
      const data = await getPreviouslyUploadedImages(userId)
      const list = Array.isArray(data) ? data : (data?.images ?? [])
      setPreviousImages(list)
      setHasLoaded(true)
    } catch (e) {
      console.error(e)
      setPreviousError("Could not load previous uploads.")
    } finally {
      setIsLoadingPrevious(false)
    }
  }

  return (
    <>
      <div className="mb-4">
        <h3 className="title is-6 mb-2">Upload a new photo</h3>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={onFileChange}
            />
          </div>
        </div>

        <button
          type="button"
          className={`button is-link ${isSaving ? "is-loading" : ""}`}
          onClick={onUpload}
          disabled={!selectedFile || isSaving}
        >
          Upload file
        </button>

        {selectedFile ? (
          <p className="help mt-2">Selected: {selectedFile.name}</p>
        ) : null}
      </div>

      <div className="mb-4">
        <h3 className="title is-6 mb-2">Choose from previous uploads</h3>

        {!hasLoaded ? (
          <button
            type="button"
            className={`button ${isLoadingPrevious ? "is-loading" : ""}`}
            onClick={loadPreviousImages}
            disabled={isLoadingPrevious}
          >
            View my uploads
          </button>
        ) : previousImages.length === 0 ? (
          <p className="has-text-grey">No previous uploads found.</p>
        ) : (
          <div className="is-flex is-flex-wrap-wrap" style={{ gap: "0.5rem" }}>
            {previousImages.map((imgPath) => (
              <button
                key={imgPath}
                type="button"
                className="button p-1"
                onClick={() => onPickURL(imgPath)}
                disabled={isSaving}
                title="Use this photo"
              >
                <img
                  src={buildImageSrc(imgPath)}
                  alt="Previous upload"
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 4 }}
                />
              </button>
            ))}
          </div>
        )}

        {previousError ? <p className="has-text-danger mt-2">{previousError}</p> : null}
      </div>
    </>
  )
}
