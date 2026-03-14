export const FilterBar = ({ inputValue, setInputValue, onSearch }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onSearch}
      />
    </div>
  );
};
