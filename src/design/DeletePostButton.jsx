import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { deletePost } from "../services"
import { useCurrentUser } from "../context/CurrentUserContext.js"
import { ConfirmDialog, Button, IconButton } from "../design"

export const DeletePostButton = ({
  userId,
  postId,

  // Button label
  title = "Delete",

  // Dialog content
  confirmTitle = "Delete Post",
  confirmMessage = "Are you sure you want to delete this item? This action cannot be undone.",
  icon = null, // Optional Font Awesome icon name (without "fa-") to use an IconButton instead of a regular Button

  // Optional: where to go after delete
  navigateTo = "/all-posts",
}) => {
  const { currentUser, isLoading } = useCurrentUser()
  const navigate = useNavigate()
  const dialogRef = useRef(null)

  if (isLoading || !currentUser) return null
  if (currentUser.id !== userId && !currentUser.is_staff) return null

  const openDialog = () => {
    // <dialog> must be opened via showModal()
    dialogRef.current?.showModal()
  }

  const handleDelete = async () => {
    await deletePost(postId)
    navigate(navigateTo)
  }

  return (
    <>
      {icon ? (
  <IconButton icon={icon} title={title} color="danger" onClick={openDialog} />
) : (
  <Button color="danger" type="button" onClick={openDialog}>
    {title}
  </Button>
)}

      <ConfirmDialog
        dialogRef={dialogRef}
        title={confirmTitle}
        message={confirmMessage}
        confirmText="Yes, Delete"
        confirmColor="is-danger"
        onConfirm={handleDelete}
        onCancel={() => {}}
      />
    </>
  )
}