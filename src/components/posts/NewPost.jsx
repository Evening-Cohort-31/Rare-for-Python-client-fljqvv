import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createPost, getAllCategories, getAllTags } from "../../services"
import { Container, PageHeader } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { PostForm } from "./PostForm"

export const NewPost = () => {
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()

  const [post, setPost] = useState({
    user_id: currentUser?.id || 0,
    title: "",
    image_url: "",
    content: "",
    category_id: "",
    tag_ids: [],
  })

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    getAllCategories().then(setCategories)
    getAllTags().then(setTags)
  }, [])

  useEffect(() => {
    if (currentUser?.id) {
      setPost((prev) => ({
        ...prev,
        user_id: currentUser.id,
      }))
    }
  }, [currentUser])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (e) => {
    setPost((prev) => ({
      ...prev,
      category_id: parseInt(e.target.value),
    }))
  }

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value)
    setPost((prev) => ({
      ...prev,
      tag_ids: e.target.checked
        ? [...prev.tag_ids, tagId]
        : prev.tag_ids.filter((id) => id !== tagId),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError("")

    const postData = {
      ...post,
      category_id: parseInt(post.category_id),
    }

    createPost(postData)
      .then(() => {
        navigate("/my-posts")
      })
      .catch((error) => {
        console.error("Failed to create post:", error)
        setSubmitError("Something went wrong while creating your post.")
      })
  }

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
  )
}