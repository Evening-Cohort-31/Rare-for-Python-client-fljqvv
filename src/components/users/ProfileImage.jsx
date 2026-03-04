// src/components/profile/ProfileImage.jsx
import { useEffect, useMemo, useRef, useState } from "react"
import { useCurrentUser } from "../../context/CurrentUserContext"
import { updateUser, getAvatars, API_BASE_URL } from "../../services/index.js"

export const ProfileImage = () => {
  const { currentUser, isLoading: userLoading, fetchUserData } = useCurrentUser()

  const dialogRef = useRef(null)

  const [avatars, setAvatars] = useState([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const currentImgSrc = useMemo(() => {
    return currentUser?.profile_image_url || ""
  }, [currentUser])

const buildImageSrc = (url) => {
  if (!url) return ""
  if (url.startsWith("http")) return url
  return `${API_BASE_URL}${url}`
}

  const openDialog = () => {
    const dialogEl = dialogRef.current
    if (!dialogEl) return
    if (!dialogEl.open) dialogEl.showModal()
  }

  const closeDialog = () => {
    const dialogEl = dialogRef.current
    if (!dialogEl) return
    if (dialogEl.open) dialogEl.close()
  }

  const loadAvatars = async () => {
    setIsLoadingAvatars(true)
    setError(null)
    try {
      const data = await getAvatars()
      const list = Array.isArray(data) ? data : data?.avatars
      setAvatars(list ?? [])
    } catch (e) {
      console.error(e)
      setError("Could not load avatars.")
    } finally {
      setIsLoadingAvatars(false)
    }
  }

  const handleOpen = async () => {
    openDialog()
    if (avatars.length === 0 && !isLoadingAvatars) {
      await loadAvatars()
    }
  }

  const handlePickAvatar = async (avatarUrl) => {
    if (!currentUser) return

    setIsSaving(true)
    setError(null)

    try {
      const updatedUser = {
        ...currentUser,
        profile_image_url: avatarUrl,
      }

      await updateUser(currentUser.id, updatedUser)

      closeDialog()

      // refresh from server (best with PUT + backend coercions)
      await fetchUserData()
    } catch (e) {
      console.error(e)
      setError("Could not update profile image.")
    } finally {
      setIsSaving(false)
    }
  }

  const isSelected = (avatarUrl) => {
    return avatarUrl && currentImgSrc && avatarUrl === currentImgSrc
  }

  if (userLoading) {
    return <p>Loading...</p>
  }

  if (!currentUser) {
    return <p className="has-text-grey">Not logged in.</p>
  }

  return (
    <section>
      <div className="is-flex is-flex-direction-column is-align-items-center">
        <figure className="image is-128x128 mb-3">
          {currentImgSrc ? (
            <img
              src={buildImageSrc(currentImgSrc)}
              alt={`${currentUser?.first_name ?? "User"} profile`}
              style={{
                width: 128,
                height: 128,
                objectFit: "cover",
                borderRadius: "999px",
                border: "1px solid #dbdbdb",
              }}
            />
          ) : (
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: "999px",
                border: "1px solid #dbdbdb",
                display: "grid",
                placeItems: "center",
                background: "#f5f5f5",
              }}
            >
              <span className="has-text-grey">No photo</span>
            </div>
          )}
        </figure>

        <button
          type="button"
          className={`button is-link ${isSaving ? "is-loading" : ""}`}
          onClick={handleOpen}
          disabled={isSaving}
        >
          Change or Upload Photo
        </button>

        {error ? <p className="has-text-danger mt-2">{error}</p> : null}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault()
          closeDialog()
        }}
      >
        <div className="modal is-active">
          <div className="modal-background" onClick={closeDialog}></div>

          <div className="modal-card" style={{ width: "min(900px, 96vw)" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Update profile photo</p>
              <button
                type="button"
                className="delete"
                aria-label="close"
                onClick={closeDialog}
              ></button>
            </header>

            <section className="modal-card-body">
              <div className="mb-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                  <h3 className="title is-6 mb-2">Choose a pre-loaded avatar</h3>

                  <button
                    type="button"
                    className={`button is-small ${isLoadingAvatars ? "is-loading" : ""}`}
                    onClick={loadAvatars}
                    disabled={isLoadingAvatars}
                  >
                    Refresh
                  </button>
                </div>

                {avatars.length === 0 && !isLoadingAvatars ? (
                  <p className="has-text-grey">
                    No avatars found yet.
                  </p>
                ) : null}

                <div className="is-flex is-flex-wrap-wrap" style={{ gap: "12px" }}>
                  {avatars.map((avatarUrl) => (
                    <button
                      key={avatarUrl}
                      type="button"
                      onClick={() => handlePickAvatar(avatarUrl)}
                      className="button is-white p-2"
                      disabled={isSaving}
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 12,
                        border: isSelected(avatarUrl)
                          ? "2px solid #485fc7"
                          : "1px solid #dbdbdb",
                      }}
                      title="Select avatar"
                    >
                      <img
                        src={buildImageSrc(avatarUrl)}
                        alt="avatar option"
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: "999px",
                          objectFit: "cover",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <h3 className="title is-6 mb-2">
                  Upload a new photo <span className="tag is-light">Coming soon</span>
                </h3>
                <button type="button" className="button" disabled>
                  Upload file…
                </button>
              </div>

              <div className="mb-4">
                <h3 className="title is-6 mb-2">
                  Choose from previous uploads <span className="tag is-light">Coming soon</span>
                </h3>
                <button type="button" className="button" disabled>
                  View my uploads
                </button>
              </div>

              <div>
                <h3 className="title is-6 mb-2">
                  Use an image URL <span className="tag is-light">Coming soon</span>
                </h3>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      placeholder="https://example.com/myphoto.png"
                      disabled
                    />
                  </div>
                  <div className="control">
                    <button type="button" className="button is-link" disabled>
                      Use URL
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <footer className="modal-card-foot">
              <button type="button" className="button" onClick={closeDialog}>
                Close
              </button>
            </footer>
          </div>
        </div>
      </dialog>
    </section>
  )
}