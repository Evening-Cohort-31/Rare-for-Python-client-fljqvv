// Handles both "Upload a new photo" and "Choose from previous uploads" —
// grouped together since both deal with user-uploaded files.
export const UploadSection = () => (
  <>
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
  </>
)
