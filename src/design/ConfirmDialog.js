export const ConfirmDialog = ({
  dialogRef,
  title,
  message,
  onConfirm,
  onCancel,

  // Optional improvements
  confirmText = "Confirm",
  confirmColor = "is-success",
}) => {
  const closeDialog = () => {
    // dialogRef.current might be null the first render
    const dialogEl = dialogRef?.current
    if (!dialogEl) return

    // Only close if open
    if (dialogEl.open) dialogEl.close()
  }

  const handleCancel = () => {
    closeDialog()
    onCancel?.()
  }

  const handleConfirm = () => {
    closeDialog()
    onConfirm?.()
  }

  return (
    <dialog
      ref={dialogRef}
      // When user presses ESC, <dialog> fires a cancel event.
      onCancel={(e) => {
        e.preventDefault() // prevent browser default close so we control behavior
        handleCancel()
      }}
    >
      <div className="modal is-active">
        <div className="modal-background" onClick={handleCancel}></div>

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={handleCancel}
            ></button>
          </header>

          <section className="modal-card-body">
            <p>{message}</p>
          </section>

          <footer className="modal-card-foot">
            <button
              type="button"
              className={`button ${confirmColor}`}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>

            <button
              type="button"
              className="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </dialog>
  )
}