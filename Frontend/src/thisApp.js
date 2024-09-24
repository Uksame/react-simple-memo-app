import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { getAllNotes, getCategoryNotesById } from "../api calls/ApiCalls"; // Ensure correct path
import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
} from "../api calls/ApiCalls";

import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState([null, ""]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Categories setCatFilter={setCatFilter} />
                <SearchBar search={search} setSearch={setSearch} />
                <NotesList catFilter={catFilter} search={search} />
                <ThemeColors />
                <Link to={"/note-add"}>
                  <button className="NoteAdd">+</button>
                </Link>
              </>
            }
          />
          <Route path="/note-add" element={<NoteAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

function SearchBar({ search, setSearch }) {
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

function NotesList({ search, catFilter }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes on component mount
    const fetchNotes = async () => {
      try {
        const fetchedNotes =
          catFilter[0] === null
            ? await getAllNotes()
            : await getCategoryNotesById(catFilter[0], catFilter[1]);
        if (fetchedNotes) {
          setNotes(fetchedNotes); // Set notes if fetched successfully
        } else {
          setNotes([]);
        }
      } catch (err) {
        console.error("Error fetching notes:", err);
        setNotes([]);
      }
    };

    fetchNotes();
  }, [catFilter]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const notesList = filteredNotes.map((note) => {
    const categoryName = note.category?.name || "";
    var accessType = 0;
    if (note.category?.accessType === 1) accessType = 1;
    //Replace accessType = 1; with return; on final

    return (
      <Note
        key={note.id}
        content={note.content}
        title={note.title}
        category={categoryName}
        date={note.dateTime}
        Access={accessType}
      />
    );
  });

  return (
    <div className="ListNotes">{notes.length > 0 ? notesList : <p></p>}</div>
  );
}

function Note({ title, content, category, date, Access }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });

  return (
    <div className="note">
      <div className="note-header">
        <h3 className="note-title">{title}</h3>
        <h3 className={`note-category ${Access === 0 ? "public" : "private"}`}>
          {category}
        </h3>
      </div>
      <p className="note-content">{content}</p>
      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>
      </div>
    </div>
  );
}

export function NoteAdd() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) setCategories(fetchedCategories);
    };
    fetchCategories();
  }, [categories]);

  const CategoriesList = categories.map((cat) => {
    <option key={cat.id}>{cat.name}</option>;
  });

  return (
    <div>
      <button>Back</button>

      <select className="categories">
        <option>none</option>
        {CategoriesList}
      </select>
      <button>Save</button>
      <button>Delete</button>
      <textarea className="title" placeholder="Title..."></textarea>
      <textarea className="content"></textarea>
    </div>
  );
}

export function Categories({ setCatFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) setCategories(fetchedCategories);
    };
    fetchCategories();
  }, [categories]);

  if (categories.length <= 0) return <p>Empty list</p>;

  const categoriesList = categories.map((cat) => {
    let categoryAccess = 0;

    cat.accessType === 1 ? (categoryAccess = 1) : (categoryAccess = 0);

    return (
      <Category
        key={cat.id}
        id={cat.id}
        name={cat.name}
        accessType={categoryAccess}
        setCatFilter={setCatFilter}
      />
    );
  });

  return (
    <div className="Categories">
      {/*       <button onClick={() => setExpand(!expand)}>≡</button>
       */}{" "}
      <div className="CatList">
        {categoriesList} <AddNewCat />
        <button
          className="check"
          onClick={() => {
            setCatFilter([null, 0]);
          }}
        >
          Show All
        </button>
      </div>
    </div>
  );
}
function AddNewCat() {
  const [name, setName] = useState("");
  const [accessType, setAccessType] = useState(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    // Reset error and success messages
    setError("");
    setSuccess(false);

    if (name.length < 3) {
      setError("name must be at least three characters");
      return;
    }

    // Validate password if accessType is Private (1)
    if (accessType === 1 && password.length < 9) {
      setError("Password must be at least 9 characters long.");
      return; // Stop if password validation fails
    }

    try {
      // Await the response from addCategory
      const response = await addCategory(name, accessType, password);

      // Check for successful response
      if (response) {
        setSuccess(true); // Show success message
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />
      <select onChange={(e) => setAccessType(Number(e.target.value))}>
        <option value="0">Public</option>
        <option value="1">Private</option>
      </select>
      {accessType === 1 && (
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      )}

      <button onClick={handleSave}>Save</button>

      {/* Show error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show success message with green checkmark */}
      {success && (
        <p style={{ color: "green" }}>&#10004; Category added successfully!</p>
      )}
    </div>
  );
}

function Category({ name, accessType, setCatFilter, id }) {
  const [password, setPassword] = useState("");

  return (
    <div className="Category">
      <button onClick={() => deleteCategoryById(id)} className="Delete">
        Delete
      </button>
      <h3 className={`name ${accessType === 1 ? "Private" : "Public"}`}>
        {name}
      </h3>
      <button
        className="check"
        onClick={() => {
          setCatFilter([id, password]);
          setPassword("");
        }}
      >
        Show
      </button>
      {accessType === 1 && (
        <input
          className="Password"
          type="password"
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
}



export  function ThemeColors() {
  // State to keep track of the selected color type (index)
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const [params, setParams] = useState([
    [0, 0, 0, 1], // Primary color (RGBA)
    [0, 0, 0, 1], // Secondary color (RGBA)
    [0, 0, 0, 1], // Accent color (RGBA)
    [0, 0, 0, 1], // Font color (RGBA)
  ]);

  const handleValues = (index, newValue) => {
    const updatedParams = [...params];
    updatedParams[index] = newValue; // Here i can update each parameter
    setParams(updatedParams); // State update
  };

  return (
    <div>
      <select onChange={(e) => setSelectedIndex(Number(e.target.value))}>
        <option value="0">Primary</option>
        <option value="1">Secondary</option>
        <option value="2">Accent</option>
        <option value="3">Font</option>
      </select>

      <ColorPicker
        value={params[selectedIndex]} // Pass the selected color
        setValue={(newValue) => handleValues(selectedIndex, newValue)}
      />
    </div>
  );
}

function ColorPicker({ value, setValue }) {
  const handleSliderChange = (index, newValue) => {
    const updatedValue = [...value];
    updatedValue[index] = Number(newValue);
    setValue(updatedValue); // Update the color array (RGBA)
  };

  return (
    <div>
      <div>
        <span>RED</span>
        <input
          value={value[0]}
          onChange={(e) => handleSliderChange(0, e.target.value)}
          type="range"
          min={0}
          max={255}
        />
        <span>{value[0]}</span>
      </div>

      <div>
        <span>GREEN</span>
        <input
          value={value[1]}
          onChange={(e) => handleSliderChange(1, e.target.value)}
          type="range"
          min={0}
          max={255}
        />
        <span>{value[1]}</span>
      </div>

      <div>
        <span>BLUE</span>
        <input
          value={value[2]}
          onChange={(e) => handleSliderChange(2, e.target.value)}
          type="range"
          min={0}
          max={255}
        />
        <span>{value[2]}</span>
      </div>

      <div>
        <span>OPACITY</span>
        <input
          value={value[3]}
          onChange={(e) => handleSliderChange(3, e.target.value)}
          type="range"
          min={0}
          max={1}
          step={0.01}
        />
        <span>{value[3]}</span>
      </div>
    </div>
  );
}
