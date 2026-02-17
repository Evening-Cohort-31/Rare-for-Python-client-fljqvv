// import { useState, useEffect } from "react"
// import { deletePost } from "../../services"
import { useCurrentUser } from "../../context/CurrentUserContext.js"

export const DeleteButton = ({userId}) => {
    const { currentUser, isLoading } = useCurrentUser()

    const handleDelete = (e) => {
        e.preventDefault()
        window.alert("Are you sure you want to delete this post?")
    }

    if (isLoading || !currentUser) {
        return null
    }

    if (currentUser.id === userId) {
        return <button onClick={handleDelete}>Delete</button>
    }
    
    return null
}