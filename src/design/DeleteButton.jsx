import { useState } from "react"
import { deletePost } from "../services/index.js"
import { useCurrentUser } from "../context/CurrentUserContext.js"
import { ConfirmDelete } from "./ConfirmDelete.jsx"
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({userId, postId}) => {
    const { currentUser, isLoading } = useCurrentUser()
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate();

    const handleDelete = () => {
        deletePost(postId).then(() => {
            setShowConfirm(false)
            navigate("/all-posts")
        })
    }

    if (isLoading || !currentUser) {
        return null
    }

    if (currentUser.id === userId) {
        return (
        <div>
            <button className="button is-danger" onClick={()=>{setShowConfirm(true)}}>Delete</button>

            <ConfirmDelete
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
