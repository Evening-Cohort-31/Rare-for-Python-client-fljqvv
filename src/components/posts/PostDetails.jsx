import { useEffect, useState } from "react";
// useParams lets us read the :postId from the URL (e.g. /posts/5 → postId = "5")
import { useParams, useNavigate } from "react-router-dom";
// Custom service function we created in PostService.js to fetch a single post by ID
import { getPostById } from "../../services";

// New component for Ticket #5 - View Post Details
// Displays a single post's full details when a user clicks a post title from a list
export const PostDetails = () => {
  // Extracts the postId from the URL parameter defined in ApplicationViews route
  const { postId } = useParams();
  // useNavigate gives us a function to programmatically change the URL
  const navigate = useNavigate();
  // Holds the fetched post data; starts as null to trigger "Loading..." state
  const [post, setPost] = useState(null);

  // Fetches the single post from the API when component mounts or postId changes
  useEffect(() => {
    getPostById(postId).then(setPost);
  }, [postId]);

  // Show loading message while waiting for API response (post is still null)
  if (!post) return <p>Loading...</p>;

  return (
    <section className="post-detail">
      {/* Post title */}
      <h1>{post.title}</h1>

      {/* Only render the header image if the post has an image_url */}
      {post.image_url ? (
        <img
          src={post.image_url}
          alt="Post header"
          style={{ maxWidth: "100%" }}
        />
      ) : null}

      {/* Author display name - uses optional chaining (?.) in case user data is missing */}
      <div>
        <strong>By:</strong> {post.user?.first_name}
      </div>

      {/* Publication date formatted as MM/DD/YYYY using toLocaleDateString */}
      <div>
        <strong>Published:</strong>{" "}
        {new Date(post.publication_date).toLocaleDateString("en-US")}
      </div>

      <hr />

      {/* Full post content/body */}
      <div>{post.content}</div>

      {/* Ticket #21 - Navigates to the comments list for this post */}
      <button onClick={() => navigate(`/posts/${postId}/comments`)}>
        View Comments
      </button>
    </section>
  );
};
