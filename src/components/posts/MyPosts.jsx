import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPostsByUserIdExpandCategory } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { Container, PageHeader, Loading, Button} from "../../design";
import { PostCard } from "./PostCard.jsx";

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
    return <Loading />;
  }

  return (
    <Container>
      <PageHeader title="My Posts" centered />
      <Button className="is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</Button>
      {!posts.length ? (
        <p className="has-text-centered">No posts found.</p>
      ) : (
        <div className="columns is-multiline">
          {posts.map(post => (
            <div className="column is-half" key={post.id}>
              <PostCard 
                post={post} 
                currentUser={currentUser} 
                showEdit={true} 
                showReactions={false} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}