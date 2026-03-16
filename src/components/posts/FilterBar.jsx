export const FilterBar = ({
  inputValue,
  setInputValue,
  onSearch,
  // ADDED (search_post_by_tag ticket): allTags powers the dropdown options, selectedTag tracks the current selection
  allTags,
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <div className="control">
      <input
        className="input mb-5" style={{width: `550px`}}
        type="text"
        placeholder="Search by title..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onSearch}
      />
      {/* ADDED (search_post_by_tag ticket): Dropdown filters posts by tag — "All Tags" resets the filter */}
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {allTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.label}
          </option>
        ))}
      </select>
    </div>
  );
};
