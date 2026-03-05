import { IconButton, ConfirmDialog } from "../../design"
import { useState, useEffect, useRef } from "react";
import { getCommentById, editComment } from "../../services/CommentService";

export const EditCommentButton = ({ icon, title, commentId, onUpdate }) => {
    const [comment, setComment] = useState(null);
    const [isOpen, setIsOpen] = useState(false); 
    const dialogRef = useRef(null);

    const openDialog = () => {
        getCommentById(commentId).then(fetchedComment => {
            setComment(fetchedComment);
            setIsOpen(true);
        }).catch(error => {
            console.error("Failed to fetch comment:", error);
            setComment(null);   
        });
    };
    
    useEffect(() => {
        if (isOpen && dialogRef.current) {  
        dialogRef.current?.showModal(); 
        setIsOpen(false);
        }           
    }, [isOpen]);
    
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
            onUpdate?.(); 
            dialogRef.current?.close();
        }).catch(error => {
          console.error("Failed to update comment:", error);
        });
      };

    return (
        <>

            <IconButton icon={icon} title={title} onClick={openDialog} />

            <ConfirmDialog
                dialogRef={dialogRef}
                title="Edit Comment"
                message={
                    <>
                    <span className="mb-2">Content:</span>
                    <textarea
                        className="textarea mb-2"
                        value={comment?.content ?? ""}
                        onChange={(e) => setComment({...comment, content: e.target.value})}
                        rows={1}
                    />
                    <span className="mb-2">Subject:</span>
                    <textarea
                        className="textarea mb-2"
                        value={comment?.subject ?? ""}
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