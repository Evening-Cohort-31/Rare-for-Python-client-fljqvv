import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
import { Loading, PageHeader, Container, Button} from "../../design";
import { PostCard } from "./PostCard.jsx";


export const AllPosts = () => {
  const { currentUser } = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
      setLoading(false);
    });
  }, []);

  const visiblePosts = currentUser?.is_staff 
      ? posts
      : posts.filter(post => post.approved);


  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <PageHeader title="All Posts" centered />
      <Button className="is-link mb-5" onClick={() => navigate("/posts/new")}>New Post</Button>
      <div className="columns is-multiline">
        {visiblePosts.map((post) => (
          <div className="column is-half" key={post.id}>
            <PostCard 
            post={post} 
            currentUser={currentUser} 
            showEdit={true} 
            showReactions={true} /> 
            
          </div>
        ))}
      
    </div>
    </Container>
  );
}
