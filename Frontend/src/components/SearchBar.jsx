import './SearchBar.css'
export default function SearchBar({ search, setSearch }) {
  return (
    <form
      className="SearchBar"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </form>
  );
}
