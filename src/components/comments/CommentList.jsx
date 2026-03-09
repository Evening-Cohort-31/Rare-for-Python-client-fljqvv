// Ticket #21 - View Comments list page for a given post
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,
  getCommentsByPostId,
  deleteComment,
} from "../../services";
import { Container, IconButton, ConfirmDialog } from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { EditCommentButton } from "./EditCommentButton";

export const CommentList = () => {
  const { postId } = useParams();
  const { currentUser } = useCurrentUser();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const dialogRef = useRef(null);

  //Moved the comments fetching logic into a separate function so it can be called both on initial load and after posting a new comment to refresh the list.

  const getAndSetComments = useCallback(() => {
    getCommentsByPostId(postId, "author").then((data) => {
      const sorted = data.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on),
      );
      setComments(sorted);
    });
  }, [postId]);

  useEffect(() => {
    // Fetch #1: get the post so we can display its title and build the back link
    getPostById(postId).then(setPost);
    // Fetch #2: get all comments for this post, then sort before storing
    getAndSetComments();
  }, [postId, getAndSetComments]); // Re-run this effect if postId changes or comments are updated (e.g. after posting a new comment)

  // Guard: if either API call hasn't finished yet, both will still be null
  // Returning early here prevents the JSX below from trying to read data that doesn't exist yet
  if (!post || !comments) return <p>Loading...</p>;

  // Ticket #22 - handles confirmed deletion: calls the API, then filters the deleted comment out of state so the UI updates instantly without a page refresh
  const handleConfirmDelete = () => {
    deleteComment(selectedCommentId).then((response) => {
      // Filter out the deleted comment from local state so the list updates immediately
      const updatedComments = comments.filter(
        (comment) => comment.id !== selectedCommentId,
      );
      setComments(updatedComments);
    });
    dialogRef.current?.close(); //This is setup to close the modal and not navigate to another page.
    setSelectedCommentId(null); //Good safeguard to help prevent bugs.
  };

  return (
    <Container>
      {/* Post title displayed at the top of the page as required */}
      {/* <h1>{post.title}</h1> */}

      {/* Link component renders as an <a> tag and navigates back to the post detail page */}
      {/* <Link to={`/posts/${postId}`}>Back to Post</Link> */}

      {/* .map() loops over the sorted comments array and returns JSX for each one */}
      {/* key={comment.id} is required by React to track list items efficiently */}

      {/* Ticket #22 - confirmation dialog rendered once, opened via dialogRef.current.showModal() when trash is clicked */}
      <ConfirmDialog
        dialogRef={dialogRef}
        title={"Confirm Comment Delete"}
        message={"Are you sure you want to delete this?"}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          dialogRef.current?.close();
          setSelectedCommentId(null);
        }} //The onCancel is setup to make sure after any cancels that the state is set to null, so that there is no accidental deletion of other comments.
      />
      <div className="columns is-multiline">
        {comments.map((comment) => (
          <div className="column is-half mb-6" key={comment.id}>
            <article className="message is-info">
              {/* comment.user is the expanded user object from &_expand=user in CommentService */}
              <div className="message-header">
                <span>
                  <strong className="has-text-left">Comment By:</strong>{" "}
                  {comment.author}
                </span>
                <div className="buttons are-small">
                  {comment.author_id === currentUser?.id && (
                    <>
                      {/* Replaced empty Icon Button with function EditCommentButton component. */}
                      <EditCommentButton
                        icon="gear"
                        title="Edit Comment"
                        commentId={comment.id}
                        // onUpdate is a callback prop that EditCommentButton will call after successfully saving edits, which triggers this parent component to re-fetch the comments list and show the updated content without needing a full page refresh.
                        onUpdate={getAndSetComments}
                      />
                      <IconButton
                        icon="trash"
                        title="Delete comment"
                        onClick={() => {
                          setSelectedCommentId(comment.id);
                          dialogRef.current?.showModal();
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              {/* Full body/content of the comment */}
              <div className="message-body">
                <strong>Content:</strong> {comment.content}
                {/* Formatted as MM/DD/YYYY using toLocaleDateString, same pattern as PostDetails */}
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(comment.created_on).toLocaleDateString("en-US")}
                </div>
                <div>
                  {/* Subject of the comment */}
                  <strong>Subject:</strong> {comment.subject}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </Container>
  );
};
