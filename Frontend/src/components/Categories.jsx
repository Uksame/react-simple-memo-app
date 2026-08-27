import "./Categories.css";
import { useEffect, useState } from "react";
import { getLocalCategories } from "../api calls/localData";

import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
} from "../api calls/ApiCalls";

export default function Categories({ setCatFilter, catFilter }) {
  const [categories, setCategories] = useState(getLocalCategories);
  const activeId = catFilter[0];

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories, using sample data.", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    await deleteCategoryById(id);
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    if (activeId === id) setCatFilter([null, ""]);
  };

  const categoriesList = categories.map((cat) => {
    let categoryAccess = cat.accessType === 1 ? 1 : 0;

    return (
      <Category
        key={cat.id}
        id={cat.id}
        name={cat.name}
        accessType={categoryAccess}
        active={activeId === cat.id}
        setCatFilter={setCatFilter}
        onDelete={handleDelete}
      />
    );
  });

  return (
    <div className="Categories">
      <div className="headers">
        <h3>Categories</h3>
        <button
          className={`check ${activeId === null ? "active" : ""}`}
          onClick={() => {
            setCatFilter([null, ""]);
          }}
        >
          Show All
        </button>
      </div>
      <div className="cat-container">
        {categories.length === 0 && (
          <p className="empty-hint">No categories yet</p>
        )}
        {categoriesList}
        <AddNewCat onAdded={fetchCategories} />
      </div>
    </div>
  );
}

function AddNewCat({ onAdded }) {
  const [name, setName] = useState("");
  const [accessType, setAccessType] = useState(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    if (name.length < 3) {
      setError("Name must be at least three characters");
      return;
    }

    if (accessType === 1 && password.length < 9) {
      setError("Password must be at least 9 characters long.");
      return;
    }

    try {
      const response = await addCategory(name, accessType, password);
      if (response) {
        setSuccess(true);
        setName("");
        setAccessType(0);
        setPassword("");
        onAdded?.();
      } else {
        setError("Failed to add category. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="AddNewCat">
      <div className="Header">
        <select
          value={accessType}
          onChange={(e) => setAccessType(Number(e.target.value))}
        >
          <option value="0">Public</option>
          <option value="1">Private</option>
        </select>
        <button onClick={handleSave}>Add</button>
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />
      {accessType === 1 && (
        <input
          className="pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      )}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Category added</p>}
    </div>
  );
}

function Category({ id, name, accessType, active, setCatFilter, onDelete }) {
  const [password, setPassword] = useState("");

  return (
    <div className={`Category ${active ? "active" : ""}`}>
      <h3 className={`name ${accessType === 1 ? "Private" : "Public"}`}>
        {accessType === 1 && (
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              d="M6 11V8a6 6 0 1 1 12 0v3M5 11h14v9H5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {name}
      </h3>
      <div className="buttons">
        <button
          className="check"
          onClick={() => {
            setCatFilter([id, password]);
            setPassword("");
          }}
        >
          Show
        </button>
        <button onClick={() => onDelete(id)} className="delete">
          Delete
        </button>
      </div>
      {accessType === 1 && (
        <input
          className="Password"
          type="password"
          placeholder="Enter Your Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
}
