import { useEffect, useState } from "react";
import { getPostsByUserIdExpandCategory } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { useNavigate } from "react-router-dom";
import { Loading, PageHeader, Card, Container } from "../../design";

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
    return <Loading />;
  }

  if (!posts.length) {
    return (
      <Container>
        <PageHeader title="My Posts" />
        <p className="has-text-centered">No posts found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="My Posts" />
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-half" key={post.id}>
            <Card title={post.title}>
              <p><strong>Author:</strong> {currentUser?.first_name} {currentUser?.last_name}</p>
              <p><strong>Category:</strong> {post.category?.label}</p>
              <button onClick={() => navigate(`/my-posts/edit/${post.id}`)}>Edit Post</button>
          </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
