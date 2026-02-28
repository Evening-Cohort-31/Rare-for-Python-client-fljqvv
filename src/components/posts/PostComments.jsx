// Ticket #21 - View Comments list page for a given post
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById, getCommentsByPostId } from "../../services";

export const PostComments = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    // Fetch #1: get the post so we can display its title and build the back link
    getPostById(postId).then(setPost);

    // Fetch #2: get all comments for this post, then sort before storing
    getCommentsByPostId(postId).then((data) => {
      // data.sort() compares two comments (a, b) at a time
      // Subtracting dates gives a number — if b is newer, the result is positive
      // A positive result tells sort() to place b before a (most recent on top)
      const sorted = data.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on),
      );
      setComments(sorted);
    });
  }, [postId]);

  // Guard: if either API call hasn't finished yet, both will still be null
  // Returning early here prevents the JSX below from trying to read data that doesn't exist yet
  if (!post || !comments) return <p>Loading...</p>;

  return (
    <section>
      {/* Post title displayed at the top of the page as required */}
      <h1>{post.title}</h1>

      {/* Link component renders as an <a> tag and navigates back to the post detail page */}
      <Link to={`/posts/${postId}`}>Back to Post</Link>

      {/* .map() loops over the sorted comments array and returns JSX for each one */}
      {/* key={comment.id} is required by React to track list items efficiently */}
      {comments.map((comment) => (
        <div key={comment.id}>
          {/* Subject of the comment */}
          <div>
            <strong>Subject:</strong> {comment.subject}
          </div>

          {/* Full body/content of the comment */}
          <div>
            <strong>Content:</strong> {comment.content}
          </div>

          {/* comment.user is the expanded user object from &_expand=user in CommentService */}
          <div>
            <strong>Author:</strong> {comment.user?.display_name}
          </div>

          {/* Formatted as MM/DD/YYYY using toLocaleDateString, same pattern as PostDetails */}
          <div>
            <strong>Date:</strong>{" "}
            {new Date(comment.created_on).toLocaleDateString("en-US")}
          </div>
        </div>
      ))}
    </section>
  );
};
