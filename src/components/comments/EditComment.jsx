import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentById, editComment } from "../../services/CommentService";
import { Button, Form, FormField } from "../../design"; 


export const EditComment = () => {

    const {commentId} = useParams();
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
        return <p>Loading comment...</p>;
    }

    if (!comment) {
        return <p>Comment not found.</p>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const commentData = {
            id: comment.id,
            post_id: comment.post_id,
            author_id: comment.author_id,
            content: comment.content,
            subject: null,
            created_on: comment.created_on,
            author: comment.author
        };
        editComment(commentId, commentData).then(() => {
          navigate(`/posts/${comment.post_id}/comments`);
        }).catch(error => {
          console.error("Failed to update comment:", error);
        });
      };
    
    
 

  return (
    <Form>
        {/* Form field to editing the original comment*/}
        <FormField label="Comment Content">
            <textarea
                className="textarea"
                value={comment.content}
                onChange={(e) => setComment({ ...comment, content: e.target.value })}
            />
        </FormField>
        {/* Button to save changes and update database */}
        <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        {/* Button to cancel editing and return to previous view */}
        <Button type="button" onClick={() => {window.alert("Editing canceled!")}}>Cancel</Button>
    </Form>
    
  );
};