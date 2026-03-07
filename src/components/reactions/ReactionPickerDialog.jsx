import { useRef, useState } from "react"
import { useCurrentUser } from "../../context/CurrentUserContext"
import { Tag } from "../../design"
import { CreateReactionForm } from "./CreateReactionForm"

export const ReactionPickerDialog = ({
  overflowReactions,
  countsByReactionId,
  myReactionId,
  onSelect,
  onReactionCreated,
  onClose,
}) => {
  const { currentUser } = useCurrentUser()
  const dialogRef = useRef(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Open the native dialog on mount
  useState(() => {
    setTimeout(() => dialogRef.current?.showModal(), 0)
  })

  const closeDialog = () => {
    dialogRef.current?.close()
    onClose()
  }

  const handleSelect = (reactionId) => {
    onSelect(reactionId)
    closeDialog()
  }

  const handleReactionCreated = () => {
    onReactionCreated()
    closeDialog()
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault()
        closeDialog()
      }}
    >
      <div className="modal is-active">
        <div className="modal-background" onClick={closeDialog}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Reactions</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={closeDialog}
            ></button>
          </header>

          <section className="modal-card-body">
            {overflowReactions.length > 0 && (
              <>
                <p className="label mb-2">More Reactions</p>
                <div className="tags are-medium" style={{ flexWrap: "wrap" }}>
                  {overflowReactions.map((rt) => {
                    const count = countsByReactionId[rt.id] || 0
                    const isSelected = myReactionId === rt.id

                    return (
                      <Tag
                        key={rt.id}
                        rounded
                        light
                        className={`reaction-tag ${isSelected ? "reaction-selected" : ""}`}
                        onClick={() => handleSelect(rt.id)}
                        style={{ cursor: "pointer", userSelect: "none" }}
                        title={rt.label}
                      >
                        <span className="icon is-small mr-1">
                          <i
                            className={rt.icon_class}
                            style={{ color: isSelected ? rt.color : "#b5b5b5" }}
                          ></i>
                        </span>
                        <span className="mr-1">{rt.label}</span>
                        <span>{count}</span>
                      </Tag>
                    )
                  })}
                </div>
              </>
            )}

            {currentUser?.is_staff && (
              <>
                {overflowReactions.length > 0 && <hr />}
                {!showCreateForm ? (
                  <button
                    type="button"
                    className="button is-link is-light"
                    onClick={() => setShowCreateForm(true)}
                  >
                    <span className="icon is-small mr-1">
                      <i className="fas fa-plus"></i>
                    </span>
                    <span>Create New Reaction</span>
                  </button>
                ) : (
                  <CreateReactionForm
                    onReactionCreated={handleReactionCreated}
                    onCancel={() => setShowCreateForm(false)}
                  />
                )}
              </>
            )}
          </section>

          <footer className="modal-card-foot">
            <button type="button" className="button" onClick={closeDialog}>
              Close
            </button>
          </footer>
        </div>
      </div>
    </dialog>
  )
}
