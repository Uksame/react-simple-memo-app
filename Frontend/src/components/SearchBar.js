import "./SearchBar.css";
export default function SearchBar({ search, setSearch }) {
  return (
    <form
      className="SearchBar"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="Search"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}
