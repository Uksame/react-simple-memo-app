import "./App.css";
import { useState, useReducer, useEffect } from "react";
import Group from "./components/Group";
import NotesList from "./components/NoteList";
import NewNote from "./components/NewNote";
import { reducerForGroups } from "./components/groupsReducer";
import { ACTIONS, reducer } from "./components/notesReducer";
import { Link, Route, Routes } from "react-router-dom";
import { getAllNotes } from "./Data/Data.js";

function App() {
  useEffect(() => {
    // Fetch notes on component mount
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getAllNotes();
        const mappedNotes = fetchedNotes.map((note) => ({
          id: note.id,
          note: note.content, // Map 'content' to 'note'
          title: note.title,
          date: note.dateTime, // Map 'dateTime' to 'date'
          groupName: note.group, // Map 'group' to 'groupName'
          completed: false, // Defaulting to false
        }));

        // Dispatch the mapped notes to the reducer
        dispatch({ type: ACTIONS.LIST_NOTES, payload: mappedNotes });
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    
    fetchNotes();
  }, []);

  const [notes, dispatch] = useReducer(reducer, []);

  const [groups, dispatchGroup] = useReducer(reducerForGroups, [
    { id: 1, name: "Bobo", marked: false, edit: false },
    { id: 2, name: "Toto", marked: false, edit: false },
  ]);

  const [editNote, setEditNote] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/new-note"
          element={<NewNote groups={groups} dispatch={dispatch} />}
        />
        <Route
          path="/groups"
          element={<Group groups={groups} dispatchGroup={dispatchGroup} />}
        />
        <Route
          path="/"
          element={
            <>
              <Link className="mode-button" to={"/groups"}>
                <button
                  className="mode-button"
                  onClick={() => {
                    setEditNote(false);
                  }}
                >
                  Groups
                </button>
              </Link>

              <NotesList
                className="notes-list"
                notes={notes}
                dispatch={dispatch}
                setEditNote={setEditNote}
                groups={groups}
              />

              {!editNote && (
                <Link to={"/new-note"}>
                  <button className="wrapper">+</button>
                </Link>
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

/* 
  const [notes, dispatch] = useReducer(reducer, [
    {
      id: 3,
      note: "this is my first note",
      title: "first note",
      marked_deletion: false,
    },
    {
      id: 6,
      note: `1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
      title: "this is my second note",
      marked_deletion: false,
    },
    {
      id: 7,
      note: `1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
      title: "this is my second note",
      marked_deletion: false,
    },
    {
      id: 8,
      note: `1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
      title: "this is my second note",
      marked_deletion: false,
    },
    {
      id: 9,
      note: `1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
      title: "this is my second note",
      marked_deletion: false,
    },
    {
      id: 10,
      note: `1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
      title: "this is my second note",
      marked_deletion: false,
    },
  ]);
*/
