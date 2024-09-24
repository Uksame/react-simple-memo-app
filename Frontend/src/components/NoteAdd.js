import "./NoteAdd.css";
import {
  addNote,
  getAllCategories,
  updateNote,
  deleteCNote,
} from "../api calls/ApiCalls";
import { useState, useEffect } from "react";
import { sampleCategories } from "../Sample Data/sample";
import { useNavigate } from "react-router-dom";

export default function NoteAdd({ note }) {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(sampleCategories);
  const [current, setCurrent] = useState({
    title: "",
    content: "",
    category_id: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (note) {
      setCurrent({
        id: note.id,
        title: note.title,
        content: note.content,
        category_id: note.category ? note.category.id : null,
      });
    } else {
      setCurrent({
        title: "",
        content: "",
        category_id: null,
      });
    }
  }, [note]);

  const CategoriesList = categories.map((cat) => (
    <option value={cat.id} key={cat.id}>
      {cat.name}
    </option>
  ));

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (e, parm) => {
    setCurrent((prev) => ({ ...prev, [parm]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      if (current.id) {
        await updateNote(current);
      } else {
        await addNote(current);
      }
      navigate("/");
    } catch (err) {
      // Extract and join error messages in case of validation error
      if (err.response && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat() // Flatten the array of errors
          .join("\n"); // Join errors with newlines
        setError(errorMessages); // Update the error state with the combined errors
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCNote(current.id);
      navigate("/");
    } catch (err) {
      // Extract a human-readable message from the error
      const errorMessage =
        err.response && err.response.data && err.response.data.title
          ? err.response.data.title // API may send a `title` field with the error
          : "An error occurred while deleting the note."; // Default message
      setError(errorMessage); // Set the error message
    }
  };

  return (
    <div className="AddNote">
      <div className="Buttons">
        <button className="back" onClick={handleBack}>
          Back
        </button>
        <select
          className="categories"
          value={current.category_id || ""}
          onChange={(e) => handleChange(e, "category_id")}
        >
          <option value="">none</option>
          {CategoriesList}
        </select>
        <button onClick={handleSave}>Save</button>
        {note !== null && (
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
      <label className="error-messages">{error}</label>
      <textarea
        className="title"
        placeholder="Title..."
        value={current.title}
        maxLength={70}
        minLength={5}
        onChange={(e) => handleChange(e, "title")}
      ></textarea>
      <textarea
        className="content"
        value={current.content}
        onChange={(e) => handleChange(e, "content")}
      ></textarea>
    </div>
  );
}
