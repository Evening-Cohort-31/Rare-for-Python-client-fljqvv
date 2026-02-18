import { useState, useEffect } from "react";
import { getAllPosts } from "../../services";
import { Loading, PageHeader, Card, Container } from "../../design";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="columns is-multiline">
        {posts.map((post) => (
          <div className="column is-half" key={post.id}>
            <Card title={post.title}>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Category:</strong> {post.category?.label || "None"}
              </p>
              <p>
                <strong>Date:</strong> {post.publication_date}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
