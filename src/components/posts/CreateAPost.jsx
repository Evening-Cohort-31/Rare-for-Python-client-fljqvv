// Component that loads a form to create a new post and submits it to the API
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateAPost = () => {
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
    tag_id: 0
  });
  const navigate = useNavigate();

  // TODO: Replace with actual fetch calls when API services are ready
  const categories = [
    { id: 1, label: "News" },
    { id: 2, label: "Technology" },
    { id: 3, label: "Sports" }
  ];

  const tags = [
    { id: 1, label: "JavaScript" },
    { id: 2, label: "Python" },
    { id: 3, label: "React" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: name === "category_id" || name === "tag_id" ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call, e.g.:
    // createPost(post).then(() => navigate("/my-posts"))
    console.log("New post:", post);
    navigate("/my-posts");
  };

  return (
    <div className="container">
      <section className="hero is-small is-link mb-5">
        <div className="hero-body">
          <p className="title">Create a Post</p>
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Image URL</label>
          <div className="control">
            <input
              className="input"
              type="url"
              name="image_url"
              placeholder="https://example.com/image.jpg"
              value={post.image_url}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Content</label>
          <div className="control">
            <textarea
              className="textarea"
              name="content"
              placeholder="Write your article..."
              value={post.content}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select name="category_id" value={post.category_id} onChange={handleChange}>
                <option value={0}>Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Tag</label>
          <div className="control">
            {tags.map(tag => (
              <label className="radio" key={tag.id}>
                <input
                  type="radio"
                  name="tag_id"
                  value={tag.id}
                  checked={post.tag_id === tag.id}
                  onChange={handleChange}
                />{" "}
                {tag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Publish</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type="button" onClick={() => navigate("/my-posts")}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
