import { buildImageSrc } from "../utils/imageUtils.js"

export const AvatarGrid = ({ avatars, isLoadingAvatars, isSaving, currentImgSrc, onLoadAvatars, onPickAvatar }) => {
  const isSelected = (avatarUrl) => avatarUrl && currentImgSrc && avatarUrl === currentImgSrc

  return (
    <div className="mb-5">
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <h3 className="title is-6 mb-2">Choose a pre-loaded avatar</h3>

        <button
          type="button"
          className={`button is-small ${isLoadingAvatars ? "is-loading" : ""}`}
          onClick={onLoadAvatars}
          disabled={isLoadingAvatars}
        >
          Refresh
        </button>
      </div>

      {avatars.length === 0 && !isLoadingAvatars ? (
        <p className="has-text-grey">No avatars found yet.</p>
      ) : null}

      <div className="is-flex is-flex-wrap-wrap" style={{ gap: "12px" }}>
        {avatars.map((avatarUrl) => (
          <button
            key={avatarUrl}
            type="button"
            onClick={() => onPickAvatar(avatarUrl)}
            className="button is-white p-2"
            disabled={isSaving}
            style={{
              width: 96,
              height: 96,
              borderRadius: 12,
              border: isSelected(avatarUrl) ? "2px solid #485fc7" : "1px solid #dbdbdb",
            }}
            title="Select avatar"
          >
            <img
              src={buildImageSrc(avatarUrl)}
              alt="avatar option"
              style={{ width: 72, height: 72, borderRadius: "999px", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
