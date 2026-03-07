import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostsByUserIdExpandCategory } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { Container, PageHeader, Loading, Card } from "../../design";

// React component to display all of the current logged in user's posts
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

  return (
    <Container>
      <PageHeader title="My Posts" centered />
      <button className="button is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</button>
      {!posts.length ? (
        <p className="has-text-centered">No posts found.</p>
      ) : (
        <div className="columns is-multiline">
          {posts.map(post => (
            <div className="column is-half" key={post.id}>
              <Card title={post.title}>
                <p><strong>Author:</strong> {currentUser?.first_name} {currentUser?.last_name}</p>
                <p><strong>Category:</strong> {post.category?.label}</p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}