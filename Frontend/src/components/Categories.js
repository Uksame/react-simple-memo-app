import "./Categories.css";
import { useEffect, useState } from "react";
import { sampleCategories } from "../Sample Data/sample";

import {
  addCategory,
  deleteCategoryById,
  getAllCategories,
} from "../api calls/ApiCalls";

export default function Categories({ setCatFilter }) {
  const [categories, setCategories] = useState(sampleCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        if (fetchedCategories && fetchedCategories.length > 0)
          setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories, using sample data.", error);
      }
    };
    fetchCategories();
  }, []);

  if (categories.length <= 0) return <p>No categories</p>;

  const categoriesList = categories.map((cat) => {
    let categoryAccess = cat.accessType === 1 ? 1 : 0;

    return (
      <Category
        key={cat.id}
        id={cat.id}
        name={cat.name}
        accessType={categoryAccess}
        setCatFilter={setCatFilter}
      />
    );
  });

  return (
    <div className="Categories">
      <div className="headers">
        <h3>Categories</h3>
        <button
          className="check"
          onClick={() => {
            setCatFilter([null, 0]);
          }}
        >
          Show All
        </button>
      </div>
      <div className="cat-container">
        {categoriesList}
        <AddNewCat />
      </div>
    </div>
  );
}

function AddNewCat() {
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
        <select onChange={(e) => setAccessType(Number(e.target.value))}>
          <option value="0">Public</option>
          <option value="1">Private</option>
        </select>
        <button onClick={handleSave}>Save</button>
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
      {success && <p className="success">Category added successfully!</p>}
    </div>
  );
}

function Category({ id, name, accessType, setCatFilter }) {
  const [password, setPassword] = useState("");

  return (
    <div className="Category">
      <h3 className={`name ${accessType === 1 ? "Private" : "Public"}`}>
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
        <button onClick={() => deleteCategoryById(id)} className="delete">
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
