import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services";
import { Container, PageHeader, Loading, Card } from "../../design";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <PageHeader title="All Posts" />
      <button className="button is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</button>
      <div className="columns is-multiline">
        {posts.map((post) => (
          <div className="column is-half" key={post.id}>
            {/* CHANGED: Wrapped title in Link for clickable navigation to post details (Added on view_post_details_5) */}
            <Card title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Category:</strong> {post.category?.label || "None"}
              </p>
              <p>
                <strong>Date:</strong> {post.publication_date}
              </p>
              {currentUser && currentUser.id === post.user_id && (
                <button onClick={() => navigate(`/my-posts/edit/${post.id}`)}>
                  Edit Post
                </button>
              )}
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
