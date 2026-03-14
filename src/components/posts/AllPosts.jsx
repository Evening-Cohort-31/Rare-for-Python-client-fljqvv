import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllPosts } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
// CHANGED: Added Link alongside useNavigate (Added on view_post_details_5)
import { Loading, PageHeader, Card, Container } from "../../design";
import { ReactionBar } from "../reactions/ReactionBar.jsx";
// ADDED (search_post_title ticket): Importing FilterBar component so we can show the search input above the posts list
import { FilterBar } from "../posts/FilterBar.jsx";

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

  if (loading) {
    return <Loading />;
  }

  // ADDED (search_post_title ticket): This function figures out which posts to show based on the search term
  // It starts with ALL posts, then narrows them down if the user has typed something
  const getFilteredPost = () => {
    // Start with the full list of posts from state
    let filtered = posts;

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
      <button
        className="button is-link mb-5"
        onClick={() => navigate("/posts/new")}
      >
        New Post
      </button>
      <FilterBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      <div className="columns is-multiline">
        {/* CHANGED (search_post_title ticket): Was posts.map — now calls getFilteredPost() first so only matching posts are shown */}
        {getFilteredPost().map((post) => (
          <div className="column is-half" key={post.id}>
            {/* CHANGED: Wrapped title in Link for clickable navigation to post details (Added on view_post_details_5) */}
            <Card title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
              <p>
                <strong>Category:</strong> {post.category?.label || "None"}
              </p>
              <p>
                <strong>Date:</strong> {post.publication_date}
              </p>
              <div className="buttons">
                {currentUser && currentUser.id === post.user_id && (
                  <button
                    className="button"
                    onClick={() => navigate(`/my-posts/edit/${post.id}`)}
                  >
                    Edit Post
                  </button>
                )}
              </div>
              <hr />
              <div className="mt-3">
                <ReactionBar postId={post.id} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
