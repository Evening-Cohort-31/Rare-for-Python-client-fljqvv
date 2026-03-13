import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createPost,
  getAllCategories,
  getAllTags,
  addTagToPost,
} from "../../services";
import { Container, PageHeader } from "../../design";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { PostForm } from "./PostForm";

export const NewPost = () => {
  const { currentUser } = useCurrentUser();
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const navigate = useNavigate();

  const [post, setPost] = useState({
    user_id: currentUser?.id || 0,
    title: "",
    image_url: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    Promise.all([getAllCategories(), getAllTags()])
      .then(([fetchedCategories, fetchedTags]) => {
        setCategories(fetchedCategories);
        setTags(fetchedTags);
      })
      .catch((error) => {
        console.error("Failed to fetch categories or tags:", error);
      });
  }, []);

  useEffect(() => {
    if (currentUser?.id) {
      setPost((prev) => ({
        ...prev,
        user_id: currentUser.id,
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setPost((prev) => ({
      ...prev,
      category_id: parseInt(e.target.value),
    }));
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);

    setSelectedTagIds((prev) =>
      e.target.checked ? [...prev, tagId] : prev.filter((id) => id !== tagId),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const postData = {
        user_id: post.user_id,
        title: post.title,
        image_url: post.image_url,
        content: post.content,
        category_id: parseInt(post.category_id),
      };

      const createdPost = await createPost(postData);

      if (selectedTagIds.length) {
        try {
          await Promise.all(
            selectedTagIds.map((tagId) => addTagToPost(createdPost.id, tagId)),
          );
        } catch (tagError) {
          console.error("Post created but failed to attach some tags:", tagError);
        }
      }

      navigate("/my-posts");
    } catch (error) {
      console.error("Failed to create post:", error);
      setSubmitError("Something went wrong while creating your post.");
    }
  };

  return (
    <Container>
      <PageHeader
        title="Create a Post"
        subtitle="Write and publish a new post."
        centered
      />

      <div className="columns is-centered">
        <div className="column is-8-tablet is-7-desktop">
          <PostForm
            post={post}
            categories={categories}
            onInputChange={handleInputChange}
            onCategoryChange={handleCategoryChange}
            onTagChange={handleTagChange}
            selectedTagIds={selectedTagIds}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/my-posts")}
            submitError={submitError}
            submitLabel="Publish"
            showImageUrl={true}
            showTags={true}
            tags={tags}
          />
        </div>
      </div>
    </Container>
  );
};
