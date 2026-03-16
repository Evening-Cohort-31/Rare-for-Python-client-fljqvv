import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../services";
import { useCurrentUser } from "../../context/CurrentUserContext.js";
// CHANGED: Added Link alongside useNavigate (Added on view_post_details_5)
// ADDED (search_post_title ticket): Importing FilterBar component so we can show the search input above the posts list
import { FilterBar } from "../posts/FilterBar.jsx";
import { Loading, PageHeader, Container, Button } from "../../design";
import { PostCard } from "./PostCard.jsx";
import { getAllTags } from "../../services";

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
  // ADDED (search_post_by_tag ticket): allTags holds the full list of tags fetched from the API for the dropdown
  const [allTags, setAllTags] = useState([]);
  // ADDED (search_post_by_tag ticket): selectedTag holds the tag id the user picks from the dropdown, empty string means no tag selected
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setPosts(allPosts);
      setLoading(false);
    });
  }, []);

  // ADDED (search_post_by_tag ticket): Fetch all tags on mount so the dropdown has options to show
  useEffect(() => {
    getAllTags().then((allTags) => {
      setAllTags(allTags);
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

    // ADDED (search_post_by_tag ticket): If a tag is selected, keep only posts that have that tag in their tags array
    // Number() converts the string from the dropdown value back to a number to match t.id
    if (selectedTag) {
      filtered = filtered.filter((p) =>
        p.tags?.some((t) => t.id === Number(selectedTag)),
      );
    }

    // Send the filtered list back to whoever called this function
    return filtered;
  };

  return (
    <Container>
      <PageHeader title="All Posts" centered />
      <Button className="is-link mb-5" onClick={() => navigate("/posts/new")}>
        New Post
      </Button>
      {/* ADDED (search_post_by_tag ticket): Passing allTags, selectedTag, setSelectedTag so FilterBar can render the tag dropdown */}
      <FilterBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
        allTags={allTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="columns is-multiline">
        {/* CHANGED (search_post_title ticket): Was posts.map — now calls getFilteredPost() first so only matching posts are shown */}
        {getFilteredPost().map((post) => (
          <div className="column is-half" key={post.id}>
            <PostCard
              post={post}
              currentUser={currentUser}
              showEdit={true}
              showReactions={true}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};
