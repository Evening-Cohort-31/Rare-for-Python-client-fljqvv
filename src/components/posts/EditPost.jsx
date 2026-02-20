// Component to display a form for editing an existing post, pre-populated with the post's current data
import { useEffect, useState } from "react";
import { updatePost, getAllCategories, getPostById } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { useParams, useNavigate } from "react-router-dom";

export const EditPost = () => {
  const { postId } = useParams();
  const { currentUser } = useCurrentUser();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    Promise.all([
      getPostById(postId),
      getAllCategories()
    ]).then(([fetchedData, fetchedCategories]) => {
      // Handle case where API returns an array instead of a single post
      const fetchedPost = Array.isArray(fetchedData)
        ? fetchedData.find(p => p.id === parseInt(postId))
        : fetchedData;

      if (!fetchedPost) {
        navigate("/my-posts");
        return;
      }

      if (fetchedPost.user_id !== currentUser.id) {
        navigate("/my-posts");
        return;
      }
      setPost(fetchedPost);
      setCategories(fetchedCategories);
      setLoading(false);
    }).catch(error => {
      console.error("Failed to fetch post or categories:", error);
      setLoading(false);
    });
  }, [postId, currentUser, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      user_id: post.user_id,
      category_id: parseInt(post.category_id),
      title: post.title,
      publication_date: post.publication_date,
      image_url: post.image_url,
      content: post.content,
      approved: post.approved,
    };
    updatePost(postId, postData).then(() => {
      navigate("/my-posts");
    }).catch(error => {
      console.error("Failed to update post:", error);
    });
  };

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  //Form to edit an existing post's title, content, and category, pre-populated with the post's current data

  return (
    <form onSubmit={handleSubmit}>
        <h2>Edit Post</h2>
        <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} required />
        </div>
        <div>
            <label htmlFor="content">Content:</label>
            <textarea id="content" name="content" value={post.content} onChange={handleInputChange} required />
        </div>
        <div>
            <label htmlFor="category">Category:</label>
            <select id="category" name="category_id" value={post.category_id} onChange={handleInputChange} required>
            <option value="">Select a category</option>
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
            ))}
            </select>
        </div>
        <div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => navigate("/my-posts")}>Cancel</button>
        </div>
    </form>
  );
}