import { useState } from "react"
import { createReaction } from "../../services"

export const CreateReactionForm = ({ onReactionCreated, onCancel }) => {
  const [newReaction, setNewReaction] = useState({ label: "", icon_class: "", color: "#000000" })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newReaction.label.trim() || !newReaction.icon_class.trim()) return

    setSaving(true)
    try {
      await createReaction(newReaction)
      onReactionCreated()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="label mb-2">Create New Reaction</p>
      <div className="field">
        <label className="label is-small">Label</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="e.g. Love"
            value={newReaction.label}
            onChange={(e) =>
              setNewReaction({ ...newReaction, label: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label is-small">Icon Class</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="e.g. fas fa-heart"
            value={newReaction.icon_class}
            onChange={(e) =>
              setNewReaction({ ...newReaction, icon_class: e.target.value })
            }
            required
          />
        </div>
        {newReaction.icon_class && (
          <p className="help">
            Preview: <i className={newReaction.icon_class} style={{ color: newReaction.color }}></i>
          </p>
        )}
      </div>
      <div className="field">
        <label className="label is-small">Color</label>
        <div className="control">
          <input
            type="color"
            value={newReaction.color}
            onChange={(e) =>
              setNewReaction({ ...newReaction, color: e.target.value })
            }
          />
        </div>
      </div>
      <div className="buttons">
        <button
          type="submit"
          className={`button is-success ${saving ? "is-loading" : ""}`}
          disabled={saving}
        >
          Save
        </button>
        <button
          type="button"
          className="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
