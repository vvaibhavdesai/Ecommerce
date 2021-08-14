const SearchBar = ({ search, setSearch, setKeydown }) => {
  return (
    <input
      className="navbar-search"
      placeholder="Search..."
      value={search}
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      onKeyPress={(e) => {
        setKeydown(e.key);
      }}
    ></input>
  );
};

export default SearchBar;
