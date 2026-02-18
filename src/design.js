export const FormField = ({ label, inputRef, type = "text" }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <input className="input" type={type} ref={inputRef} />
    </div>
  </div>
)

export const FormTextarea = ({ label, placeholder, inputRef }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <textarea className="textarea" placeholder={placeholder} ref={inputRef}></textarea>
    </div>
  </div>
)

export const Notification = ({ type, message, onClose }) => (
  <div className={`notification is-${type}`}>
    {onClose && <button className="delete" onClick={onClose}></button>}
    {message}
  </div>
)

export const ConfirmDialog = ({ dialogRef, title, message, onConfirm, onCancel }) => (
  <dialog ref={dialogRef}>
    <div className="modal is-active">
      <div className="modal-background" onClick={() => dialogRef.current.close()}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close"
            onClick={() => { dialogRef.current.close(); onCancel?.() }}></button>
        </header>
        <section className="modal-card-body">
          <p>{message}</p>
        </section>
        <footer className="modal-card-foot">
          {onConfirm && (
            <button className="button is-success"
              onClick={() => { dialogRef.current.close(); onConfirm() }}>Confirm</button>
          )}
          <button className="button"
            onClick={() => { dialogRef.current.close(); onCancel?.() }}>OK</button>
        </footer>
      </div>
    </div>
  </dialog>
)

export const Loading = () => (
  <section className="section has-text-centered">
    <p className="title">Loading...</p>
  </section>
)

export const PageHeader = ({ title }) => (
  <h1 className="title">{title}</h1>
)

export const Card = ({ title, children }) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">{title}</p>
    </header>
    {children && (
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    )}
  </div>
)

export const Container = ({ children }) => (
  <section className="section">
    <div className="container">{children}</div>
  </section>
)
