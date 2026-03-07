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

  // The useRef hook is used here to manage the dialog element for changing the profile image. 
  // It allows us to programmatically open and close the dialog when the user interacts with the "Change or Upload Photo" button.
  const dialogRef = useRef(null)

  const [avatars, setAvatars] = useState([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  // The useMemo hook is used to compute the current image source for the profile picture. 
  // It memoizes the value based on the displayUser's profile_image_url, ensuring that the image source is only recalculated when the displayUser changes.
  // It optimizes performance over useEffect by avoiding unnecessary computations on every render.
  const currentImgSrc = useMemo(() => {
    return displayUser?.profile_image_url || ""
  }, [displayUser])

  // Modal control functions to open the dialog for changing the profile image.
  const openDialog = () => {
    const dialogEl = dialogRef.current
    if (!dialogEl) return
    if (!dialogEl.open) dialogEl.showModal()
  }

  // Modal control function to close the dialog for changing the profile image.
  const closeDialog = () => {
    const dialogEl = dialogRef.current
    if (!dialogEl) return
    if (dialogEl.open) dialogEl.close()
  }

  // Function to load available avatars from the server. It manages loading state and error handling while fetching the avatar list.
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

  // Handler for when the user clicks the button to change their profile image. It opens the dialog and loads avatars if they haven't been loaded yet.
  const handleOpen = async () => {
    openDialog()
    if (avatars.length === 0 && !isLoadingAvatars) {
      await loadAvatars()
    }
  }

  // Handler for when the user selects an avatar from the modal. It updates the user's profile image and handles loading and error states.
  const handleUserImageURLChange = async (imageURL) => {
    if (!currentUser) return

    setIsSaving(true)
    setError(null)

    try {
      const updatedUser = {
        ...currentUser,
        profile_image_url: imageURL,
      }

      await updateUser(currentUser.id, updatedUser)

      closeDialog()

      // refresh from server 
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
        {/* Display the user's profile image if available, otherwise show a placeholder. The image is styled to be circular and fit within a 128x128 pixel area. */}
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

        {/* Button to change or upload a new profile photo, only shown if the user is viewing their own profile. It is disabled while saving to prevent multiple submissions. */}
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

        {/* Display any error messages related to loading avatars or updating the profile image */}
        {error ? <p className="has-text-danger mt-2">{error}</p> : null}
      </div>

        {/* The ProfilePhotoModal component is conditionally rendered when the user is viewing their own profile. It receives props for managing the dialog state, loading avatars, and handling avatar selection. */}
      {isOwnProfile && (
        <ProfilePhotoModal
          dialogRef={dialogRef}
          onClose={closeDialog}
          avatars={avatars}
          isLoadingAvatars={isLoadingAvatars}
          isSaving={isSaving}
          currentImgSrc={currentImgSrc}
          onLoadAvatars={loadAvatars}
          onPickURL={handleUserImageURLChange}
        />
      )}
    </section>
  )
}
