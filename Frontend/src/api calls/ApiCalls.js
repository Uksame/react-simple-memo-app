import axios from "axios";

const API_Notes_URL = "http://localhost:5000/api/notes";

// Notes
export const getAllNotes = async () => {
  try {
    const response = await axios.get(API_Notes_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching notes", err);
  }
};

export const getNoteById = async (Id) => {
  try {
    const response = await axios.get(`${API_Notes_URL}/${Id}`);
    return response.data;
  } catch (err) {
    console.err("Error fetching note", err);
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
    console.error("Error adding note", err);

    if (err.response) {
      console.error("API error response", err.response.data);
    } else if (err.request) {
      console.error("No response from API", err.request);
    } else {
      console.error("Error", err.message);
    }

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
    console.error("Error deleting category", err);
    throw err;
  }
};

export const deleteCNote = async (id) => {
  try {
    const response = await axios.delete(`${API_Notes_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting category", err);
    throw err;
  }
};

const API_Categories_URL = "http://localhost:5000/api/categories";

// Categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_Categories_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching notes", err);
    return null; // Return null in case of error
  }
};

export const getCategoryByeId = async (Id) => {
  try {
    const response = await axios.get(`${API_Categories_URL}/${Id}`);
    return response.data;
  } catch (err) {
    console.err("Error fetching category", err);
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
    console.error("Error fetching category", err);
    return null; // Return null in case of error
  }
};

export const deleteCategoryById = async (id,) => {
  try {
    const response = await axios.delete(`${API_Categories_URL}/${id}`);
    return response.data();
  } catch (err) {
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
    console.error("Error has occurred while adding this category: ", err);
    return null; // Return null in case of error
  }
};
