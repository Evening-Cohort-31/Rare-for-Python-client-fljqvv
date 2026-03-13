import { useEffect, useState, useCallback } from "react";
// useParams lets us read the :postId from the URL (e.g. /posts/5 → postId = "5")
import { useParams, useNavigate, Link } from "react-router-dom";
// Custom service function we created in PostService.js to fetch a single post by ID
import { getPostByIdExpandCategoryExpandUser } from "../../services";

// Design system components (Bulma-friendly wrappers)
import {
  Container,
  Loading,
  Button,
  IconButton,
  Card,
  Tag,
} from "../../design";

import { DeletePostButton } from "../../design/DeletePostButton";
import { ReactionBar } from "../reactions/ReactionBar.jsx";
import { PostTagAside } from "./PostTagAside.jsx";

// Displays a single post's full details when a user clicks a post title from a list
export const PostDetails = () => {
  // Extracts the postId from the URL parameter defined in ApplicationViews route
  const { postId } = useParams();
  const navigate = useNavigate();
  // Holds the fetched post data; starts as null to trigger "Loading..." state
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(() => {
    getPostByIdExpandCategoryExpandUser(postId).then(setPost);
  }, [postId]);

  // Fetches the single post from the API when component mounts or postId changes
  useEffect(() => {
    fetchPost();
  }, [postId, fetchPost]);

  // Show loading message while waiting for API response (post is still null)
  if (!post) return <Loading />;

  // Defensive fallback if your API hasn't expanded category yet
  const categoryLabel = post?.category?.label || "Uncategorized";

  return (
    <Container>
      {/* Using a Card here gives you a nice Bulma container + consistent spacing */}
      <Card>
        {/* Post title: centered above the image */}
        <h1 className="title is-2 has-text-centered mb-4">{post.title}</h1>

        {/* Row above the image:
            - Left: edit/delete icons
            - Right: category label
        */}
        <div className="level mb-3">
          <div className="level-left">
            <div className="buttons are-small">
              {/* "Edit post" */}
              <IconButton
                icon="gear"
                title="Edit post"
                onClick={() => navigate(`/my-posts/edit/${post.id}`)}
              />
              {/* "Delete post" */}
              <DeletePostButton
                icon="trash"
                userId={post.user_id}
                postId={post.id}
                title="Delete post"
                confirmTitle="Delete Post"
                confirmMessage="Are you sure you want to delete this post? This action cannot be undone."
              />
            </div>
          </div>

          <div className="level-right">
            {/* Category label on the right above the image */}
            <Tag color="info" light rounded>
              {categoryLabel}
            </Tag>
          </div>
        </div>

        {/* Only render the header image if the post has an image_url */}
        <div className="columns is-variable is-5">
          <div className="column is-three-quarters">
            {post.image_url ? (
              <figure className="image mb-4">
                <img
                  src={post.image_url}
                  alt="Post header"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </figure>
            ) : null}
          </div>

          <div className="column is-one-quarter">
            <PostTagAside post={post} onTagsUpdated={fetchPost} />
          </div>
        </div>

        {/* Row under the image:
            - Left: author name
            - Center: View Comments button
            - Right: reactions placeholder (we'll wire later)
        */}
        <nav className="level mb-5">
          {/* Author display name - uses optional chaining (?.) in case user data is missing */}
          {/* Made authors name into a link to their profile */}
          <div className="level-left">
            <Link to={`/users/${post.user_id}`} className="has-text-weight-semibold">
              <strong>By:</strong> {post.user?.first_name}{" "}
              {post.user?.last_name}
            </Link>
          </div>

          {/* Buttons for the center */}
          <div className="level-item">
            <div className="buttons">
              <Button
                color="primary"
                onClick={() => navigate(`/posts/${postId}/comments`)}
              >
                View Comments
              </Button>
            </div>
          </div>

          {/* Reactions placeholder on the right */}
          <div className="level-right">
            {/* Use ReactionBar component here, passing the postId as a prop */}
            <ReactionBar postId={postId} />
          </div>
        </nav>

        <hr />

        {/* Full post content/body */}
        <div className="content">{post.content}</div>
      </Card>
    </Container>
  );
};
