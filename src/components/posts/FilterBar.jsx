export const FilterBar = ({ inputValue, setInputValue, onSearch }) => {
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
    </div>
  );
};
