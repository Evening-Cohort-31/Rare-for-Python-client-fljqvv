import { useState, useEffect } from "react"
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
            <strong>{post.title}</strong>
            <div>Author: {post.author}</div>
            <div>Category: {post.category?.label || "None"}</div>
            <div>Date: {post.publication_date}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}