// Reusable card component for displaying post summaries, with optional edit button and reaction bar.
import { useNavigate, Link } from "react-router-dom"
import { Card, Button } from "../../design"
import { ReactionBar } from "../reactions/ReactionBar"

export const PostCard = ({
  post,
  currentUser,
  showEdit = false,
  showReactions = false,
}) => {
  const navigate = useNavigate()

  const isOwner = currentUser && currentUser.id === post.user_id

  const authorName =
    post.author ||
    `${currentUser?.first_name ?? ""} ${currentUser?.last_name ?? ""}`.trim()

  const formattedDate = post.publication_date
    ? new Date(post.publication_date).toLocaleDateString()
    : "No date"

  const previewText =
    post.content?.length > 160
      ? `${post.content.slice(0, 160)}...`
      : post.content

  return (
    <Card className="post-card">
      <div className="content">
        <div className="mb-3">
          <h3 className="title is-4 mb-2">
            <Link to={`/posts/${post.id}`} className="has-text-dark">
              {post.title}
            </Link>
          </h3>

          <div className="is-flex is-flex-wrap-wrap is-align-items-center is-size-7 has-text-grey mb-3">
            <span className="mr-4">
              <strong>By:</strong> {authorName || "Unknown"}
            </span>
            <span className="mr-4">
              <strong>Category:</strong> {post.category?.label || "None"}
            </span>
            <span>
              <strong>Published:</strong> {formattedDate}
            </span>
          </div>
        </div>

        {previewText ? (
          <p className="has-text-grey-dark mb-4" style={{ lineHeight: "1.6" }}>
            {previewText}
          </p>
        ) : null}

        <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
          <Link to={`/posts/${post.id}`} className="has-text-link has-text-weight-semibold">
            Read More →
          </Link>

          {showEdit && isOwner ? (
            <div className="buttons mb-0">
              <Button
                className="is-outlined"
                onClick={() => navigate(`/my-posts/edit/${post.id}`)}
              >
                Edit Post
              </Button>
            </div>
          ) : null}
        </div>

        {showReactions ? (
          <>
            <hr className="my-4" />
            <div>
              <ReactionBar postId={post.id} />
            </div>
          </>
        ) : null}
      </div>
    </Card>
  )
}