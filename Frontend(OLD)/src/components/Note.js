import { useState } from "react";
import { ACTIONS } from "../components/notesReducer";

import "../App.css";

export function PreviewNote({ note, onClick }) {
  return (
    <div className="preview-note" onClick={onClick}>
      <h3>{note.title}</h3>
      <div>
        <p>{note.note}</p>
        <p>{note.groupName}</p>
        <h6 style={{ textAlign: "start" }}>{note.date}</h6>
      </div>
    </div>
  );
}

function Note({ note, dispatch, setFocusNote, setEditNote, groups }) {
  const [currentNote, setCurrentNote] = useState(note.note);
  const [currentTitle, setCurrentTitle] = useState(note.title);
  const [group, setGroup] = useState("");

  const listGroups = groups.map((group) => (
    <option onClick={() => setGroup(group.name)} key={group.id}>
      {group.name}
    </option>
  ));

  return (
    <div className="note">
      <div className="buttons">
        <button
          onClick={() => {
            setFocusNote(false);
            setEditNote(false);
          }}
        >
          {"< RETURN"}
        </button>
        <select place={group}>
          <option value="" disabled selected hidden>
            Choose Group...
          </option>
          {listGroups}
        </select>
        <button
          onClick={() => {
            dispatch({
              type: ACTIONS.EDIT_NOTE,
              payload: {
                id: note.id,
                newNote: currentNote,
                newTitle: currentTitle,
                newGroup: group,
              },
            });
          }}
        >
          SAVE{" "}
        </button>
        <button
          onClick={() => {
            setCurrentTitle(note.title);
            setCurrentNote(note.note);
          }}
        >
          UNDO
        </button>

        <button
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE_NOTE, payload: { id: note.id } });
            setFocusNote(false);
            setEditNote(false);
          }}
          style={{ color: "black" }}
        >
          DELETE
        </button>
      </div>

      <input
        placeholder="Title..."
        className="title-style"
        value={currentTitle}
        onChange={(e) => setCurrentTitle(e.target.value)}
        maxLength={40}
      />

      <textarea
        value={currentNote}
        className="note-style"
        onChange={(e) => setCurrentNote(e.target.value)}
      />
    </div>
  );
}

export default Note;
