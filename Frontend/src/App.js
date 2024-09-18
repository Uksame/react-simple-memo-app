import { useState } from "react";
import "./App.css";
import { ListNotes } from "./api calls/methods";
import Categories from "./Components/Categories";
import SearchBar from "./Components/SearchBar";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <Categories />
      <SearchBar search={search} setSearch={setSearch} />
      <ListNotes search={search} />
    </div>
  );
}

export default App;
