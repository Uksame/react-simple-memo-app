const fs = require('fs');
const path = './Data.json';

// export const initialState = Data.Data.map((item) => ({
//   id: item.id,
//   title: item.title,
//   note: Array.isArray(item.note) ? item.note.join("\n") : item.note,
//   marked_deletion: item.marked_deletion,
// }));

// export const initialState = JSON.parse(localStorage.getItem("notes")) || [];



// Save Notes to JSON
export function saveNotesToJson(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    }
  });
}

// Load Notes from JSON
export function loadNotesFromJson() {
  try {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
}