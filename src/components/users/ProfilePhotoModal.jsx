import { AvatarGrid } from "./AvatarGrid.jsx"
// import { UploadSection } from "./UploadSection.jsx"
// import { UrlSection } from "./UrlSection.jsx"

// Modal component for changing the user's profile photo. 
// It includes sections for selecting from available avatars, uploading a new photo, or providing a URL.
export const ProfilePhotoModal = ({
  dialogRef,
  onClose,
  avatars,
  isLoadingAvatars,
  isSaving,
  currentImgSrc,
  onLoadAvatars,
  onPickURL,
  // selectedFile,
  // onFileChange,
  // onUpload,
  // userId,
}) => (
  <dialog
    ref={dialogRef}
    onCancel={(e) => {
      e.preventDefault()
      onClose()
    }}
  >
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>

      <div className="modal-card" style={{ width: "min(900px, 96vw)" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Update profile photo</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>

        {/* AvatarGrid component displays a grid of available avatars for the user to choose from. It shows a loading state while avatars are being fetched and indicates which avatar is currently selected. */}
        <section className="modal-card-body">
          <AvatarGrid
            avatars={avatars} // Array of avatar objects to display in the grid.
            isLoadingAvatars={isLoadingAvatars} // Boolean indicating whether the avatars are currently being loaded.
            isSaving={isSaving} // Boolean indicating whether the profile photo is currently being saved, used to disable interactions while saving.
            currentImgSrc={currentImgSrc} // The source URL of the currently selected avatar, used to highlight the selected avatar in the grid.
            onLoadAvatars={onLoadAvatars} // Function to load the avatars called when the modal is opened to fetch the available avatars from the server.
            onPickURL={onPickURL} // Function to handle the selection of an avatar or entering a URL updating the user's profile photo
          />

          {/* <hr /> */}

          {/* UploadSection component allows the user to upload a new profile photo from their device or select from previous uploads. */}
          {/* <UploadSection
            selectedFile={selectedFile}
            onFileChange={onFileChange}
            onUpload={onUpload}
            isSaving={isSaving}
            userId={userId}
            onPickURL={onPickURL}
          /> */}

          {/* <hr /> */}

          {/* UrlSection component allows the user to provide a URL for their new profile photo. */}
          {/* <UrlSection
            isSaving={isSaving}
            onPickURL={onPickURL}
          /> */}
        </section>

        <footer className="modal-card-foot">
          <button type="button" className="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  </dialog>
)
