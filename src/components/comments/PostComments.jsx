// Component for displaying comments related to a specific post as well as a form to add a new comment. This component is accessed via the "View Comments" button on the PostDetails page.
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, createComment } from "../../services/index.js"
import { Loading, PageHeader, Container, Button, FormTextarea, Form, FormActions } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { Comments } from "../posts/PostComments.jsx"

export const PostComments = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState("")
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useCurrentUser()

  // Memoize numeric postId to avoid unnecessary re-renders in useEffect dependencies
  const numericPostId = useMemo(() => parseInt(postId, 10), [postId])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login")
    }
  }, [currentUser, navigate])

  // Load post details and comments on mount
  useEffect(() => {
    let isMounted = true

    const load = async () => {
      setLoading(true)
      try {
        const [postData] = await Promise.all([
          getPostById(postId),
        ])
        if (!isMounted) return
        setPost(postData)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [postId])

  const handleCommentChange = (e) => {
    console.log("CHANGE FIRED", e.target.value)
    setNewComment(e.target.value)
  }

  // Submit handler for adding a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    console.log("SUBMIT FIRED")
    const content = newComment.trim()
    if (!content) return

    const commentData = {
      post_id: numericPostId,
      author_id: currentUser.id,
      content,
    }

    try {
      await createComment(commentData)
      setNewComment("")
    } catch (error) {
      console.error("Failed to submit comment:", error)
    }
  }

  if (loading) return <Loading />

  return (
  <Container>
    <PageHeader title={`Comments for: ${post?.title || "Unknown Post"}`} />

    <Form onSubmit={handleCommentSubmit}>
      <FormTextarea
        name="comment"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
        required
      />

      <FormActions centered>
        <Button type="button" onClick={() => navigate(`/posts/${postId}`)}>
          Back to Post
        </Button>
        <Button type="submit" color="primary">
          Add Comment
        </Button>
      </FormActions>
    </Form>

    {/* Add spacing before comments */}
    <div className="mt-5">
      <Comments />
    </div>

  </Container>
  )
}