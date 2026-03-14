import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
// CHANGED: Added Link alongside useNavigate (Added on view_post_details_5)
// ADDED (search_post_title ticket): Importing FilterBar component so we can show the search input above the posts list
import { FilterBar } from "../posts/FilterBar.jsx";
import { Loading, PageHeader, Container, Button } from "../../design";
import { PostCard } from "./PostCard.jsx";


export const AllPosts = () => {
  const { currentUser } = useCurrentUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // ADDED (search_post_title ticket): inputValue holds whatever the user types in the search box
  // It starts as an empty string (""), meaning no filter is applied yet
  const [inputValue, setInputValue] = useState("");
  // ADDED (search_post_title ticket): searchTerm only updates when Enter is pressed, this is what actually triggers the filter
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
      setLoading(false);
    });
  }, []);

  // ADDED (search_post_title ticket): handleSearch is passed to FilterBar and fires on every key press
  // It checks if the key was Enter if so, it copies inputValue into searchTerm to trigger the filter
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };

  const visiblePosts = currentUser?.is_staff 
      ? posts
      : posts.filter(post => post.approved);


  if (loading) {
    return <Loading />;
  }

  // ADDED (search_post_title ticket): This function figures out which posts to show based on the search term
  // It starts with ALL posts, then narrows them down if the user has typed something
  const getFilteredPost = () => {
    // Start with the full list of posts from state
    let filtered = visiblePosts;

    // Only filter if the user actually typed something (empty string = show everything)
    if (searchTerm) {
      // Keep only posts where the title contains the search term
      // .toLowerCase() on both sides makes it case-insensitive (so "react" matches "React")
      // ?. (optional chaining) prevents a crash if a post has no title
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Send the filtered list back to whoever called this function
    return filtered;
  };

  return (
    <Container>
      <PageHeader title="All Posts" centered />
      <div className="is-flex" style={{gap: `1rem`}}>
      <Button className="is-link mb-5" onClick={() => navigate("/posts/new")}>
        New Post
      </Button>
      <FilterBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      </div>
      <div className="columns is-multiline">
        {getFilteredPost().map((post) => (
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
};
