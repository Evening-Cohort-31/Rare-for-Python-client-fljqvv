import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services";

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
    return <p>Loading posts...</p>;
  }

  return (
    <div className="container">
      <section className="hero is-small is-link mb-5">
        <div className="hero-body">
          <p className="title">All Posts</p>
        </div>
      </section>
      <button className="button is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</button>
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-half" key={post.id}>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{post.title}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p><strong>Author:</strong> {post.author}</p>
                  <p><strong>Category:</strong> {post.category?.label || "None"}</p>
                  <p><strong>Date:</strong> {post.publication_date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
