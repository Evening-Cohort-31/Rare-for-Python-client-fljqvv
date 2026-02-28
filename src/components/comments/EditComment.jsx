import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentById } from "../../services/CommentService"; 

export const EditComment = () => {

    const {commentId} = useParams();

    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);

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
    
 

  return (
    <div>
      <h1>Edit Comment</h1>
      <h2>Content: {comment.content}</h2>
      <h2>Comment by: {comment.author}</h2>
    </div>
  );
};