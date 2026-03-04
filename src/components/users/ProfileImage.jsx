import { useMemo, useRef, useState } from "react"
import { useCurrentUser } from "../../context/CurrentUserContext"
import { updateUser, getAvatars } from "../../services/index.js"
import { buildImageSrc } from "../utils/imageUtils.js"
import { ProfilePhotoModal } from "./ProfilePhotoModal.jsx"

export const ProfileImage = ({ user }) => {
  const { currentUser, isLoading: userLoading, fetchUserData } = useCurrentUser()

  // When a user prop is passed (e.g. viewing someone else's profile), display
  // their image. Fall back to currentUser when rendering the logged-in user's
  // own profile section without an explicit prop.
  const displayUser = user ?? currentUser
  const isOwnProfile = !user || user.id === currentUser?.id

  const dialogRef = useRef(null)

  const [avatars, setAvatars] = useState([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const currentImgSrc = useMemo(() => {
    return displayUser?.profile_image_url || ""
  }, [displayUser])

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

  if (userLoading) {
    return <p>Loading...</p>
  }

  if (!currentUser) {
    return <p className="has-text-grey">Not logged in.</p>
  }

  if (!displayUser) {
    return <p className="has-text-grey">No user data.</p>
  }

  return (
    <section>
      <div className="is-flex is-flex-direction-column is-align-items-center">
        <figure className="image is-128x128 mb-3">
          {currentImgSrc ? (
            <img
              src={buildImageSrc(currentImgSrc)}
              alt={`${displayUser?.first_name ?? "User"} profile`}
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

        {isOwnProfile && (
          <button
            type="button"
            className={`button is-link ${isSaving ? "is-loading" : ""}`}
            onClick={handleOpen}
            disabled={isSaving}
          >
            Change or Upload Photo
          </button>
        )}

        {error ? <p className="has-text-danger mt-2">{error}</p> : null}
      </div>

      {isOwnProfile && (
        <ProfilePhotoModal
          dialogRef={dialogRef}
          onClose={closeDialog}
          avatars={avatars}
          isLoadingAvatars={isLoadingAvatars}
          isSaving={isSaving}
          currentImgSrc={currentImgSrc}
          onLoadAvatars={loadAvatars}
          onPickAvatar={handlePickAvatar}
        />
      )}
    </section>
  )
}
