export const ACTIONS = {
  ADD_NOTE: "add-note",
  DELETE_NOTE: "delete-note",
  EDIT_NOTE: "edit-note",
  LIST_NOTES: "list-notes",
};

// Reducer function
export function reducer(notes, action) {
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
