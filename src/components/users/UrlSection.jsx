export const UrlSection = () => (
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
)
