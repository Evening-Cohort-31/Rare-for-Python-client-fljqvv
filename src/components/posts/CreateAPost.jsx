// Component that loads a form to create a new post and submits it to the API
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, getAllCategories } from "../../services";
import { Container, PageHeader, FormField, FormSelect } from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext.js";

export const CreateAPost = () => {
  const { currentUser } = useCurrentUser();
  const [post, setPost] = useState({
    user_id: currentUser?.id || 0,
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
    tag_ids: [],
    approved: currentUser?.is_staff === true ? 1 : 0 // Auto-approve if the current user is staff, otherwise default to false
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
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setPost(prev => ({
      ...prev,
      category_id: parseInt(e.target.value)
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
    <Container>
      <PageHeader title="Create a Post" />
      <form onSubmit={handleSubmit}>
        <FormField label="Title">
          <input
            className="input"
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormField label="Image URL">
          <input
            className="input"
            type="url"
            name="image_url"
            placeholder="https://example.com/image.jpg"
            value={post.image_url}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Content">
          <input
            className="input"
            type="text"
            name="content"
            placeholder="Write your article..."
            value={post.content}
            onChange={handleChange}
            required
          />
        </FormField>

        <FormSelect label="Category">
          <select name="category_id" value={post.category_id} onChange={handleCategoryChange}>
            <option value={0}>Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </FormSelect>

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
    </Container>
  );
}
