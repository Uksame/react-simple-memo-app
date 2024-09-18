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

const API_Categories_URL = "http://localhost:5000/api/categories";

// Categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_Categories_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching notes", err);
  }
};

export const getCategoryByeId = async (Id) => {
  try {
    const response = await axios.get(`${API_Categories_URL}/${Id}`);
    return response.data;
  } catch (err) {
    console.err("Error fetching category", err);
  }
};
