import { useEffect, useState } from "react";
import {
  getAllNotes,
  getNoteById,
  deleteNote,
  updateNote,
  addNote,
} from "../Data/Data.js";

/* const CurrentNotes = () => {
  const [notes, setNotes] = useState([]);
}; */

//API Calls
export const ACTIONS = {
  ADD_NOTE: "add-note",
  DELETE_NOTE: "delete-note",
  EDIT_NOTE: "edit-note",
  LIST_NOTES: "list-notes",
};

// Reducer function
export function reducer(notes, action) {
  switch (action.type) {
    case ACTIONS.LIST_NOTES:
      return [...action.payload]; //Add the fetched notes to the state

    case ACTIONS.ADD_NOTE:
      const newState = [...notes, newNote(action.payload)];
      return newState;

    case ACTIONS.DELETE_NOTE:
      return notes.filter((note) => note.id !== action.payload.id);
    case ACTIONS.EDIT_NOTE:
      return notes.map((note) => {
        if (note.id === action.payload.id)
          return {
            ...note,
            note: action.payload.newNote,
            title: action.payload.newTitle,
            groupName: action.payload.newGroup,
          };
        else return note;
      });
    default:
      return notes;
  }
}

// Function responsible for creating new notes
export const newNote = ({ note, title, date, groupName }) => {
  return {
    id: Date.now(),
    note: note,
    title: title,
    date: date,
    groupName: groupName,
    completed: false,
  };
};
