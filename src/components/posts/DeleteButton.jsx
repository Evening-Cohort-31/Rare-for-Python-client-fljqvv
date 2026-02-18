import { useState, useEffect } from "react"
import { deletePost } from "../../services"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { ConfirmDialog } from "../../design/ConfirmDialog.jsx"

export const DeleteButton = ({userId}) => {
    const { currentUser, isLoading } = useCurrentUser()
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = (e) => {
        e.preventDefault()
        window.alert("The post has been deleted.")
    }
    if (isLoading || !currentUser) {
        return null
    }

    if (currentUser.id === userId) {
        return (
        <div>
            <button onClick={()=>{setShowConfirm(true)}}>Delete</button>

            <ConfirmDialog
            isOpen={showConfirm}
            title="Delete Post"
            message={`Are you sure you want to delete this post? This action cannot be undone.`}
            onConfirm={handleDelete}
            onCancel={() => setShowConfirm(false)}
            />
      </div>
    )}
    
    return null
}