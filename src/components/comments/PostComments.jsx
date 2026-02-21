// Component for displaying comments related to a specific post as well as a form to add a new comment. This component is accessed via the "View Comments" button on the PostDetails page.
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, getCommentsByPostIdExpandAuthor, createComment } from "../../services/index.js"
import { Loading, Notification, PageHeader, Card, Container, Button, FormTextarea, Form, FormActions, IconButton } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"

export const PostComments = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [comments, setComments] = useState([])
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
        const [postData, commentData] = await Promise.all([
          getPostById(postId),
          getCommentsByPostIdExpandAuthor(postId),
        ])
        if (!isMounted) return
        setPost(postData)
        setComments(Array.isArray(commentData) ? commentData : [])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [postId])

  // Function to refresh comments after adding a new one
  const refreshComments = async () => {
    const commentData = await getCommentsByPostIdExpandAuthor(postId)
    setComments(commentData)
  }

  // Submit handler for adding a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    const content = newComment.trim()
    if (!content) return

    const commentData = {
      post_id: numericPostId,
      author_id: currentUser.id, // if your API can infer, remove this
      content,
    }

    await createComment(commentData)
    await refreshComments()
    setNewComment("")
  }

  if (loading) return <Loading />

  return (
  <Container>
    <PageHeader title={`Comments for: ${post?.title || "Unknown Post"}`} />

    <Form onSubmit={handleCommentSubmit}>
      <FormTextarea
        name="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
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

      {comments.length === 0 ? (
        <Notification
          type="info"
          message="There are no comments for this post yet."
        />
      ) : (

        <div className="columns is-multiline">

          {comments.map((comment) => {

            const author =
              comment.author || comment.user || comment.author_profile || null

            const authorName = author?.first_name
              ? `${author.first_name}${author.last_name ? ` ${author.last_name}` : ""}`
              : "Unknown User"

            const isMine =
              comment.author_id === currentUser?.id ||
              author?.id === currentUser?.id

            // Center if only one comment exists
            const columnClass =
              comments.length === 1
                ? "column is-half is-offset-one-quarter"
                : "column is-half"

            return (
              <div key={comment.id} className={columnClass}>

                <Card
                  title={`Comment by ${authorName}`}
                  headerRight={
                    isMine ? (
                      <div className="buttons are-small">
                        <IconButton
                          icon="gear"
                          title="Edit comment (coming soon)"
                          onClick={() => {}}
                        />
                        <IconButton
                          icon="trash"
                          title="Delete comment (coming soon)"
                          onClick={() => {}}
                        />
                      </div>
                    ) : null
                  }
                >
                  <p>{comment.content}</p>
                </Card>

              </div>
            )
          })}

        </div>

      )}

    </div>
  </Container>
)
}