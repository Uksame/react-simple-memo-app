//Define you API base URL
const API_BASE_URL = "http://localhost:5003/api/notes";

//Get all notes

export const getAllNotes = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return await response.json();
  } catch (error) {
    console.error("error fetching notes:", error);
  }
};

// Get a note by ID
export const getNoteById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch note");
    return await response.json();
  } catch (error) {
    console.error("error fetching note:", error);
  }
};

// Add a new note

export const addNote = async (note) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }
    return await response.json();
  } catch (error) {
    console.error("Error update note:", error);
  }
};

//Delete Note
export const deleteNote = async (id) => {
  try {
    const response = fetch(`${API_BASE_URL}/${id}`, {
      method: "Delete",
    });
    if (!response.ok) throw new Error("Failed to delete note");
    return (await response).json();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
