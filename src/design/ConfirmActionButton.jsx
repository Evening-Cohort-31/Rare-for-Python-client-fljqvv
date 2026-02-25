import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext.js"
import { ConfirmDelete } from "./ConfirmDelete.jsx"
import { Button, IconButton } from "../design"

/**
 * ConfirmActionButton
 *
 * Generic confirmation button for destructive (or important) actions.
 * Designed to be used for deleting posts, comments, reactions, etc.
 *
 * Renders:
 * - IconButton if `icon` is provided
 * - Otherwise renders a standard Button (from your design system)
 *
 * Props:
 * - ownerId: number (required) -> the user id that is allowed to perform the action
 * - onConfirm: async function (required) -> what to do when user confirms
 *
 * - title: string -> text on the button (used for Button; also used for dialog title fallback)
 * - confirmTitle: string -> title shown inside confirm dialog
 * - confirmMessage: string -> message shown inside confirm dialog
 *
 * - icon: string -> Font Awesome icon name (e.g. "trash") to render IconButton
 * - color: string -> Bulma color (e.g. "danger", "info") used by Button/IconButton
 *
 * - navigateTo: string -> optional route to navigate to after confirm succeeds
 * - onDone: function -> optional callback after confirm succeeds (after navigate)
 *
 * - isAllowed: boolean -> override permission check (useful for admins later)
 */
export const ConfirmActionButton = ({
  ownerId,
  onConfirm,

  title = "Delete",
  confirmTitle,
  confirmMessage = "Are you sure? This action cannot be undone.",

  icon,              // e.g. "trash"
  color = "danger",  // default to danger for destructive actions

  navigateTo,
  onDone,

  isAllowed,         // optional override
}) => {
  const { currentUser, isLoading } = useCurrentUser()
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  if (isLoading || !currentUser) return null

  const permitted =
    typeof isAllowed === "boolean"
      ? isAllowed
      : currentUser.id === ownerId

  if (!permitted) return null

  const dialogTitle = confirmTitle || title
  const dialogMessage = confirmMessage

  const handleConfirm = async () => {
    try {
      await onConfirm()
      setShowConfirm(false)

      if (navigateTo) navigate(navigateTo)
      if (onDone) onDone()
    } catch (err) {
      console.error("ConfirmActionButton failed:", err)
      setShowConfirm(false)
    }
  }

  return (
    <>
      {/* If icon is provided, use IconButton (compact). Otherwise use your Button component. */}
      {icon ? (
        <IconButton
          icon={icon}
          title={title}
          color={color}
          onClick={() => setShowConfirm(true)}
        />
      ) : (
        <Button
          color={color}
          type="button"
          onClick={() => setShowConfirm(true)}
        >
          {title}
        </Button>
      )}

      <ConfirmDelete
        isOpen={showConfirm}
        title={dialogTitle}
        message={dialogMessage}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}