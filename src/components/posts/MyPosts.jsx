import { useEffect, useState } from "react";
// Added Link to enable navigation to the post detail page when a title is clicked
import { Link } from "react-router-dom";
import { getPostByUserIdExpandCategory } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";

// React component to display the all of the current logged in user's posts
export const MyPosts = () => {
  const { currentUser, isLoading: userLoading } = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getPostByUserIdExpandCategory(currentUser.id).then(fetchedPosts => {
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
            {/* Wrapped title in Link so clicking it navigates to /posts/:id detail view */}
            <Link to={`/posts/${post.id}`}><strong>{post.title}</strong></Link>
            <div>Author: {currentUser?.first_name} {currentUser?.last_name}</div>
            <div>Category: {post.category?.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}