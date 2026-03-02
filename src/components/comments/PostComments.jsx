// Component for displaying comments related to a specific post as well as a form to add a new comment. This component is accessed via the "View Comments" button on the PostDetails page.
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, createComment } from "../../services/index.js"
import { Loading, PageHeader, Container, Button, FormTextarea, Form, FormActions } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { CommentList } from "./CommentList.jsx"

export const PostComments = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [newComment, setNewComment] = useState("")
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useCurrentUser()
  // State to track if a comment was just posted and trigger re-load of comments list
  const [postedComment, setPostedComment] = useState(false) 

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
        setPostedComment(false) // Resets postedComment flag to false after reload
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [postId, postedComment]) // Re-load page when postId changes or a new comment is posted

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
      setPostedComment(true) // Set flag to true after successful submission to re-load the page with new comment
    } catch (error) {
      console.error("Failed to submit comment:", error)
    }
  }

  if (loading) return <Loading />

  return (
    
  <Container>
    {/*Header with post tile and content for Post that was chosen */}
    <PageHeader title={`Comments for: ${post?.title || "Unknown Post"}`} />

    {/*Form to add a new comment to the post */}
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

    {/*Display mapped comments for the current post using Comments component from posts/PostComments.jsx */}
    <div className="mt-5">
      <CommentList />
    </div>

  </Container>
  )
}