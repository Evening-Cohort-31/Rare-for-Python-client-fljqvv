import { useEffect, useState } from "react";
import { getPostsByUserIdExpandCategory } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { useNavigate } from "react-router-dom";

// React component to display the all of the current logged in user's posts
export const MyPosts = () => {
  const { currentUser, isLoading: userLoading } = useCurrentUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getPostsByUserIdExpandCategory(currentUser.id).then(fetchedPosts => {
        const sortedPosts = fetchedPosts.sort((a, b) =>
          new Date(b.publication_date) - new Date(a.publication_date)
        );
        setPosts(sortedPosts);
        setLoading(false);
      }).catch(error => {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading || userLoading) {
    return <p>Loading posts...</p>;
  }

  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <h2>My Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <div>Author: {currentUser?.first_name} {currentUser?.last_name}</div>
            <div>Category: {post.category?.label}</div>
            <button onClick={() => navigate(`/my-posts/edit/${post.id}`)}>Edit Post</button>
          </li>
        ))}
      </ul>
    </div>
  );
}