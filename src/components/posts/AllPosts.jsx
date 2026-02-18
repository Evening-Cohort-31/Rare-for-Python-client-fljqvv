import { useState, useEffect } from "react"
// Added Link to enable navigation to the post detail page when a title is clicked
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services"

export const AllPosts = () => {
    
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getAllPosts().then((allPosts) => 
            setPosts(allPosts)) 
    }, [])
    
    return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {/* Wrapped title in Link so clicking it navigates to /posts/:id detail view */}
            <Link to={`/posts/${post.id}`}><strong>{post.title}</strong></Link>
            <div>Author: {post.author}</div>
            <div>Category: {post.category?.label || "None"}</div>
            <div>Date: {post.publication_date}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}