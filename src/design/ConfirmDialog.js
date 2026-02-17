export const ConfirmDialog = ({ dialogRef, title, message, onConfirm, onCancel }) => {
  const handleCancel = () => {
    dialogRef.current.close()
    onCancel?.()
  }

  const handleConfirm = () => {
    dialogRef.current.close()
    onConfirm?.()
  }

  return (
    <dialog ref={dialogRef}>
      <div className="modal is-active">
        <div className="modal-background" onClick={handleCancel}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={handleCancel}></button>
          </header>
          <section className="modal-card-body">
            <p>{message}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleConfirm}>Confirm</button>
            <button className="button" onClick={handleCancel}>Cancel</button>
          </footer>
        </div>
      </div>
    </dialog>
  )
}
