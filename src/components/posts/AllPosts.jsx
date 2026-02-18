import { useState, useEffect } from "react"
import { getAllPosts } from "../../services"
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton.jsx";

export const AllPosts = () => {
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
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
            <DeleteButton userId={post.user_id} />
            {currentUser && currentUser.id === post.user_id && (
              <button onClick={() => navigate(`/my-posts/edit/${post.id}`)}>Edit Post</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}