import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import NotesList from "./Components/NotesList";
import Categories from "./Components/Categories";
import SearchBar from "./Components/SearchBar";
import NoteAdd from "./Components/NoteAdd";
import ThemeColors from "./Components/ThemeColors";

function App() {
  const [search, setSearch] = useState("");
  const [note, setNote] = useState(null);
  const [catFilter, setCatFilter] = useState([null, ""]);
  const [themeColors, setThemeColors] = useState({
    primary: [161, 214, 178, 0.99],
    secondary: [206, 223, 159, 0.99],
    accent: [241, 243, 194, 0.82],
    font: [0, 0, 0, 1],
  });

  useEffect(() => {
    //Primary color
    document.documentElement.style.setProperty(
      "--primary-color",
      `rgba(${themeColors.primary.join(",")})`
    );

    // Secondary Color
    document.documentElement.style.setProperty(
      "--secondary-color",
      `rgba(${themeColors.secondary.join(",")})`
    );

    // Accent Colors
    document.documentElement.style.setProperty(
      "--hue",
      `${themeColors.accent[0]}` // No extra closing parenthesis
    );

    document.documentElement.style.setProperty(
      "--sat",
      `${themeColors.accent[1]}%` // Add '%' for saturation
    );

    document.documentElement.style.setProperty(
      "--lgt",
      `${themeColors.accent[2]}%` // Add '%' for lightness
    );

    document.documentElement.style.setProperty(
      "--alp",
      `${themeColors.accent[3]}` // Alpha doesn't need any unit
    );

    //Font Color
    document.documentElement.style.setProperty(
      "--font-color",
      `rgba(${themeColors.font.join(",")})`
    );
  }, [themeColors]);

  const navigate = useNavigate();
  const handleAddNoteClick = () => {
    setNote(null);
    navigate("/note-add");
  };

  const location = useLocation(); 
  
  return (
    <div className="App">
      <div className="app-content">
        <TransitionGroup>
          <CSSTransition
            key={location.key} // Use location key to track transitions
            timeout={500} // Animation duration (matches CSS duration)
            classNames="slide" // Use the class defined in CSS
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <div className="main-content">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Categories setCatFilter={setCatFilter} />
                    <NotesList setNote={setNote} catFilter={catFilter} search={search} />
                    <button onClick={handleAddNoteClick} className="AddButton">
                      +
                    </button>
                  </div>
                }
              />
              <Route
                path="/note-add"
                element={
                  <div className="main-content">
                    <NoteAdd note={note} />
                  </div>
                }
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <ThemeColors themeColors={themeColors} setThemeColors={setThemeColors} />
    </div>
  );
}

export default App;
