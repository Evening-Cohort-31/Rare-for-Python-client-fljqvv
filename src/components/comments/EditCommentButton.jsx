import { IconButton, ConfirmDialog } from "../../design"
import { useState, useEffect, useRef } from "react";
import { getCommentById, editComment } from "../../services/CommentService";

export const EditCommentButton = ({ icon, title, commentId, onUpdate }) => {
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const dialogRef = useRef(null);

    // Function to open the dialog when the edit button is clicked
    const openDialog = () => {
        dialogRef.current?.showModal();
    };
    
    // This useEffect fetches the comment data when the component mounts or when commentId changes, so we have the latest content to edit
    useEffect(() => {
        getCommentById(commentId).then(fetchedComment => {
            setComment(fetchedComment);
            setLoading(false);
        }).catch(error => {
            console.error("Failed to fetch comment:", error);
            setComment(null);
            setLoading(false);
        });
    }, [commentId]);
    
    if (loading) {
        return null;  
    }   

    if (!comment) {
        return null;  
    }   

    // Handles the form submission to save the edited comment. It calls the editComment service and then triggers the onUpdate callback to refresh the comments list in the parent component, and finally closes the dialog.
    const handleSubmit = async () => {

        const commentData = {
            id: comment.id,
            post_id: comment.post_id,
            author_id: comment.author_id,
            content: comment.content,
            subject: comment.subject,
            created_on: comment.created_on,
            author: comment.author
        };
        await editComment(commentId, commentData).then(() => {
            getCommentById(commentId).then(setComment);
            onUpdate?.(); // triggers parent to re-fetch
            dialogRef.current?.close();
        }).catch(error => {
          console.error("Failed to update comment:", error);
        });
      };

    return (
        <>
            {/* IconButton is a reusable component that takes props for icon and title. When clicked, it opens the dialog for editing the comment. */}

            <IconButton icon={icon} title={title} onClick={openDialog} />
            
            {/* ConfirmDialog is a reusable component that renders a <dialog> with customizable title, message, and confirm/cancel buttons. In this case, the message prop contains the form fields for editing the comment content and subject. When the user clicks "Save Changes", it calls handleSubmit to save the edits. */}

            <ConfirmDialog
                dialogRef={dialogRef}
                title="Edit Comment"
                message={
                    <>
                    <span className="mb-2">Content:</span>
                    <textarea
                        className="textarea mb-2"
                        value={comment.content}
                        onChange={(e) => setComment({...comment, content: e.target.value})}
                        rows={1}
                    />
                    <span className="mb-2">Subject:</span>
                    <textarea
                        className="textarea mb-2"
                        value={comment.subject || ""}
                        onChange={(e) => setComment({...comment, subject: e.target.value})}
                        rows={1}
                    />
                    </>
                }
                confirmText="Save Changes"
                confirmColor="is-primary"
                onConfirm={handleSubmit}
                onCancel={() => dialogRef.current?.close()}
            />
        </>
    );
};