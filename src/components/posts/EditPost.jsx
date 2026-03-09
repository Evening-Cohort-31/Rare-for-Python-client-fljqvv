import { useEffect, useState } from "react"
import { updatePost, getAllCategories, getPostById } from "../../services"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { useParams, useNavigate } from "react-router-dom"
import { Container, PageHeader, Loading } from "../../design"
import { PostForm } from "./PostForm"

export const EditPost = () => {
  const { postId } = useParams()
  const { currentUser } = useCurrentUser()
  const [post, setPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitError, setSubmitError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) return

    Promise.all([getPostById(postId), getAllCategories()])
      .then(([fetchedData, fetchedCategories]) => {
        const fetchedPost = Array.isArray(fetchedData)
          ? fetchedData.find((p) => p.id === parseInt(postId))
          : fetchedData

        if (!fetchedPost || fetchedPost.user_id !== currentUser.id) {
          navigate("/my-posts")
          return
        }

        setPost(fetchedPost)
        setCategories(fetchedCategories)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch post or categories:", error)
        setLoading(false)
      })
  }, [postId, currentUser, navigate])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }))
  }

  const handleCategoryChange = (event) => {
    setPost((prevPost) => ({
      ...prevPost,
      category_id: parseInt(event.target.value),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitError("")

    const postData = {
      user_id: post.user_id,
      category_id: parseInt(post.category_id),
      title: post.title,
      publication_date: post.publication_date,
      image_url: post.image_url,
      content: post.content,
      approved: post.approved,
    }

    updatePost(postId, postData)
      .then(() => {
        navigate("/my-posts")
      })
      .catch((error) => {
        console.error("Failed to update post:", error)
        setSubmitError("Something went wrong while saving your changes.")
      })
  }

  if (loading) return <Loading />

  if (!post) {
    return (
      <Container>
        <p className="has-text-centered">Post not found.</p>
      </Container>
    )
  }

  return (
    <Container>
      <PageHeader
        title="Edit Post"
        subtitle="Update your title, content, and category."
        centered
      />

      <div className="columns is-centered">
        <div className="column is-8-tablet is-7-desktop">
          <PostForm
            post={post}
            categories={categories}
            onInputChange={handleInputChange}
            onCategoryChange={handleCategoryChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/my-posts")}
            submitError={submitError}
            submitLabel="Save Changes"
            showImageUrl={false}
            showTags={false}
          />
        </div>
      </div>
    </Container>
  )
}