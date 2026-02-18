// Component that loads a form to create a new post and submits it to the API
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, getAllCategories } from "../../services";

export const CreateAPost = () => {
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
    tag_ids: []
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  // TODO: Replace with actual fetch call when tag API service is ready
  const tags = [
    { id: 1, label: "JavaScript" },
    { id: 2, label: "Python" },
    { id: 3, label: "React" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: name === "category_id" ? parseInt(value) : value
    }));
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    setPost(prev => ({
      ...prev,
      tag_ids: e.target.checked
        ? [...prev.tag_ids, tagId]
        : prev.tag_ids.filter(id => id !== tagId)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(post).then(() => {
      navigate("/my-posts"); //TODO: upon submit, redirect user to Post Detail page for this post instead of my-posts page
    }).catch(error => {
      console.error("Failed to create post:", error);
    });
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
          <label className="label">Tags</label>
          <div className="control">
            {tags.map(tag => (
              <label className="checkbox mr-4" key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={post.tag_ids.includes(tag.id)}
                  onChange={handleTagChange}
                />{" "}
                {tag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="buttons">
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
