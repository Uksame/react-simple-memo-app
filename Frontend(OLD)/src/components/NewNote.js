import { useState } from "react";
import { ACTIONS } from "./notesReducer";
import { Link } from "react-router-dom";

export default function NewNote({ dispatch, groups }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [group, setGroup] = useState("");

  const handleSave = () => {
    dispatch({
      type: ACTIONS.ADD_NOTE,
      payload: {
        note: note,
        title: title,
        groupName: group,
        date: new Date().toLocaleDateString(),
      },
    });
  };

  const listGroups = groups.map((group) => (
    <option onClick={() => setGroup(group.name)} key={group.id}>
      {group.name}
    </option>
  ));

  return (
    <div className="new-note">
      <div className="new-note-buttons">
        <Link to={"/"}>
          <button onClick={handleSave}>Save</button>
        </Link>
        <select>{listGroups}</select>{" "}
        <Link to={"/"}>
          {" "}
          <button style={{ color: "red" }}>Cancel</button>
        </Link>
      </div>
      <input
        value={title}
        className="title-style"
        placeholder="Title..."
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="note-style"
        value={note}
        placeholder="Note..."
        type="text"
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
}
