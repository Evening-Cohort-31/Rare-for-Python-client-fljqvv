import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllPosts } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
// CHANGED: Added Link alongside useNavigate (Added on view_post_details_5)
import { Loading, PageHeader, Card, Container } from "../../design";
import { ReactionBar } from "../reactions/ReactionBar.jsx";
import { ApprovePostButton } from "./ApprovePostButton.jsx";

export const AllPosts = () => {
  const { currentUser } = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const visiblePosts = currentUser?.is_staff === true
      ? posts
      : posts.filter(post => post.approved === 1)

  return (
    <Container>
      <PageHeader title="All Posts" centered />
      <button className="button is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</button>
      <div className="columns is-multiline">
        {visiblePosts.map((post) => (
          <div className="column is-half" key={post.id}>
            <Card title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Category:</strong> {post.category?.label || "None"}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(post.publication_date)}
              </p>
              <div className="buttons">
                  {currentUser && currentUser.id === post.user_id && (
                    <button className ="button" onClick={() => navigate(`/my-posts/edit/${post.id}`)}>
                  Edit Post
                </button>
                    )}
                  { currentUser.is_staff === true && post.approved === 0 && (
                    <ApprovePostButton
                      className="button"
                      post={post}/>
                  )}
             </div>
             <hr />
                <div className="mt-3">
                  <ReactionBar postId={post.id} />
                </div>
          </Card>
          </div>
        ))}
      
    </div>
    </Container>
  );
}
