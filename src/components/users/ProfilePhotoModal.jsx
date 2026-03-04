import { AvatarGrid } from "./AvatarGrid.jsx"
import { UploadSection } from "./UploadSection.jsx"
import { UrlSection } from "./UrlSection.jsx"

export const ProfilePhotoModal = ({
  dialogRef,
  onClose,
  avatars,
  isLoadingAvatars,
  isSaving,
  currentImgSrc,
  onLoadAvatars,
  onPickAvatar,
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

        <section className="modal-card-body">
          <AvatarGrid
            avatars={avatars}
            isLoadingAvatars={isLoadingAvatars}
            isSaving={isSaving}
            currentImgSrc={currentImgSrc}
            onLoadAvatars={onLoadAvatars}
            onPickAvatar={onPickAvatar}
          />

          <hr />

          <UploadSection />

          <hr />

          <UrlSection />
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
