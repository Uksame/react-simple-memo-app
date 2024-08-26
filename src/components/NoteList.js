import { useState } from "react";
import "../App.css";
import React from "react";
import Note, { PreviewNote } from "./Note"; // Correctly importing PreviewNote

function NotesList({ notes, dispatch, setEditNote, groups }) {
  const [search, setSearch] = useState("");
  const [focusNote, setFocusNote] = useState(false);
  const [noteID, setNoteID] = useState(null);

  const handleFocusNote = (id) => {
    setFocusNote(true);
    setNoteID(id);
  };

  const listedNotes = notes
    .filter(
      (note) =>
        note.note.toLowerCase().includes(search.toLowerCase()) ||
        note.title.toLowerCase().includes(search.toLowerCase())
    )
    .map((note) => (
      <li key={note.id}>
        <PreviewNote
          onClick={() => {
            handleFocusNote(note.id);
            setEditNote(true);
          }}
          note={note}
        />
      </li>
    ));

  if (focusNote) {
    const focusedNote = notes.find((note) => note.id === noteID);
    return (
      <Note
        note={focusedNote}
        dispatch={dispatch}
        setFocusNote={setFocusNote}
        setEditNote={setEditNote}
        groups={groups}
      />
    );
  }

  return (
    <div className="notes-list">
      <input
        className="search bar"
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes">
        <ul style={{ listStyle: "none" }}>{listedNotes}</ul>
      </div>
    </div>
  );
}

export default NotesList;
