import { useState, useEffect } from "react"
import { getAllPosts } from "../../services"
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { useNavigate } from "react-router-dom";
import { Loading, PageHeader, Card, Container } from "../../design"

export const AllPosts = () => {
const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getAllPosts().then((allPosts) => {
            setPosts(allPosts)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
    <Container>
      <PageHeader title="All Posts" />
      <div className="columns is-multiline">
        {posts.map(post => (
          <div className="column is-half" key={post.id}>
            <Card title={post.title}>
              <p><strong>Author:</strong> {post.author}</p>
              <p><strong>Category:</strong> {post.category?.label || "None"}</p>
              <p><strong>Date:</strong> {post.publication_date}</p>
              {currentUser && currentUser.id === post.user_id && (
              <button onClick={() => navigate(`/my-posts/edit/${post.id}`)}>Edit Post</button>
            )}
          </Card>
          </div>
        ))}
      </div>
    </Container>
  )
}
