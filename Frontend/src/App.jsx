import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./App.css";

import NotesList from "./components/NotesList";
import Categories from "./components/Categories";
import SearchBar from "./components/SearchBar";
import NoteAdd from "./components/NoteAdd";
import ThemeColors from "./components/ThemeColors";

// Wrapping CSSTransition here gives every mounted instance (the page
// animating out and the page animating in briefly coexist) its own
// nodeRef, instead of the two fighting over one shared ref.
function PageTransition({ children, ...transitionProps }) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition nodeRef={nodeRef} {...transitionProps}>
      <div className="transition-wrapper" ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [note, setNote] = useState(null);
  const [catFilter, setCatFilter] = useState([null, ""]);
  const [themeColors, setThemeColors] = useState({
    primary: [124, 111, 240, 1],
    secondary: [255, 139, 107, 1],
    accent: [265, 75, 65, 0.95],
    font: [31, 28, 44, 1],
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
      <header className="AppHeader">
        <h1>Memo</h1>
      </header>
      <div className="app-content">
        <TransitionGroup className="transition-group">
          <PageTransition
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
                    <Categories setCatFilter={setCatFilter} catFilter={catFilter} />
                    <NotesList setNote={setNote} catFilter={catFilter} search={search} />
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
          </PageTransition>
        </TransitionGroup>
      </div>
      {location.pathname === "/" && (
        <button
          onClick={handleAddNoteClick}
          className="AddButton"
          aria-label="Add note"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      <ThemeColors themeColors={themeColors} setThemeColors={setThemeColors} />
    </div>
  );
}

export default App;
