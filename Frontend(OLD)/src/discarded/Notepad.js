import { useEffect, useReducer, useState } from "react";
import Note from "../components/Note";

//-------------Notes Actions-------------
/* #region Notes */
export const ACTIONS = {
  ADD_NOTE: "add-note",
  DELETE_NOTE: "delete-note",
  EDIT_NOTE: "edit-note",
  LIST_NOTES: "list-notes",
};

//reducer function that will take two value the current stay (array of objects ie. note) and action that will include the type of action and a payload consisting whatever data needed to update the state

function reducer(notes, action) {
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      return [...notes, newNote(action.payload)];
    case ACTIONS.DELETE_NOTE:
      return notes.filter((note) => note.id !== action.payload.id);
    case ACTIONS.EDIT_NOTE:
      return notes.map((note) => {
        if (note.id === action.payload.id)
          return {
            ...note,
            note: action.payload.newNote,
            title: action.payload.newTitle,
          };
        else return note;
      });
    default:
      return notes;
  }
}

//the function reponsible for creating new notes
const newNote = ({ note, title, date }) => {
  return {
    id: Date.now(),
    note: note,
    title: title,
    date: date,
    completed: false,
  };
};

/* #endregion */


//--------Notes Components 
/*#region Components */
export function NotesList({notes}) {
  
  const listedNotes = notes
    .filter(
      (note) =>
        note.note.toLowerCase().includes(search.toLowerCase()) ||
        note.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((note) => (
      <li key={note.id}>
        <Note note={note} dispatch={dispatch} />
      </li>
    ));

  
  return (
    <div className="NotesList">

    </div>
  )
}

/*#endregion */
function Notepad({ onNotesChange }) {
  //----------Notes States
  const [notes, dispatch] = useReducer(reducer, []);
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    onNotesChange(notes); // Call the callback to update the parent component state
  }, [notes, onNotesChange]);

  const Today = new Date();

  const listedNotes = notes
    .filter(
      (note) =>
        note.note.toLowerCase().includes(search.toLowerCase()) ||
        note.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((note) => (
      <li key={note.id}>
        <Note note={note} dispatch={dispatch} />
      </li>
    ));

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_NOTE,
      payload: {
        note: note,
        title: noteTitle,
        date: (new Date()).toLocaleDateString(),
      },
    });
    setNote("");
    setNoteTitle("");
  };

  return (
    <div className="Notepad">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Search..."
          style={{ height: "2vh", marginLeft: "10vh" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type="submit">search</button>
      </form>

      <form onSubmit={handleNoteSubmit}>
        <input
          type="text"
          placeholder="Title..."
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>
      <button
        onClick={() => {
          setNote("");
          setNoteTitle("");
        }}
      >
        Clear
      </button>
      <ul style={{ listStyle: "none" }}>{listedNotes}</ul>
    </div>
  );
}

export default Notepad;
