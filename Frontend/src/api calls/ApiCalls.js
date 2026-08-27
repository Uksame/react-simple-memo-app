import axios from "axios";
import {
  getLocalNotes,
  getLocalCategories,
  addLocalNote,
  updateLocalNote,
  deleteLocalNote,
  addLocalCategory,
  deleteLocalCategory,
} from "./localData";

// A short timeout so an unreachable API (no backend running) fails fast
// and falls back to local storage in well under a second, instead of
// waiting on the OS/browser's own multi-second connection timeout.
axios.defaults.timeout = 2500;

const API_Notes_URL = "http://localhost:5000/api/notes";
const API_Categories_URL = "http://localhost:5000/api/categories";

// No `err.response` means the request never reached a server (refused,
// timed out, DNS failure, etc.) — as opposed to the server responding
// with a real error (400/500), which we still want to surface.
const isUnreachable = (err) => !err.response;

// Notes
export const getAllNotes = async () => {
  try {
    const response = await axios.get(API_Notes_URL);
    return response.data;
  } catch (err) {
    console.warn("API unreachable, using locally saved notes", err);
    return getLocalNotes();
  }
};

export const getNoteById = async (Id) => {
  try {
    const response = await axios.get(`${API_Notes_URL}/${Id}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching note", err);
  }
};

export const addNote = async (note) => {
  try {
    const response = await axios.post(API_Notes_URL, {
      title: note.title,
      content: note.content,
      categoryId: note.category_id,
    });
    return response.data;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, saving note locally instead", err);
      return addLocalNote(note);
    }
    console.error("Error adding note", err);
    throw err;
  }
};

export const updateNote = async (note) => {
  try {
    const response = await axios.put(`${API_Notes_URL}/${note.id}`, {
      content: note.content,
      title: note.title,
      categoryId: note.category_id,
    });
    return response.data;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, updating note locally instead", err);
      return updateLocalNote(note);
    }
    console.error("Error updating note", err);
    throw err;
  }
};

export const deleteCNote = async (id) => {
  try {
    const response = await axios.delete(`${API_Notes_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, deleting note locally instead", err);
      deleteLocalNote(id);
      return true;
    }
    console.error("Error deleting note", err);
    throw err;
  }
};

// Categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_Categories_URL);
    return response.data;
  } catch (err) {
    console.warn("API unreachable, using locally saved categories", err);
    return getLocalCategories();
  }
};

export const getCategoryByeId = async (Id) => {
  try {
    const response = await axios.get(`${API_Categories_URL}/${Id}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching category", err);
    return null; // Return null in case of error
  }
};

export const getCategoryNotesById = async (Id, password) => {
  try {
    const response = await axios.post(`${API_Categories_URL}/${Id}`, {
      passCode: password,
    });
    return response.data.notes;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, filtering locally saved notes", err);
      return getLocalNotes().filter((n) => n.category?.id === Id);
    }
    console.error("Error fetching category", err);
    return null; // Return null in case of error
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${API_Categories_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, deleting category locally instead", err);
      deleteLocalCategory(id);
      return true;
    }
    console.error("Error deleting category", err);
    throw err;
  }
};

export const addCategory = async (name, accessType, passCode = "") => {
  try {
    const response = await axios.post(`${API_Categories_URL}`, {
      name: name,
      accessType: accessType,
      passCode: passCode,
    });
    return response.data;
  } catch (err) {
    if (isUnreachable(err)) {
      console.warn("API unreachable, saving category locally instead", err);
      return addLocalCategory(name, accessType);
    }
    console.error("Error has occurred while adding this category: ", err);
    return null; // Return null in case of error
  }
};
