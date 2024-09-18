import "./Categories.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../api calls/ApiCalls";

export default function Categories() {
  const [expand, setExpand] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) 
        setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  if (categories.length <= 0) return <p>Empty list</p>;

  const categoriesList = categories.map((cat) => {
    const categoryAccess = (cat.accessType = 1 ? "Private" : "Public");

    return (
      <Category key={cat.id} name={cat.name} accessType={categoryAccess} />
    );
  });

  return (
    <div className="Categories">
      <button onClick={() => setExpand(!expand)}>≡</button>
      <div className="CatList">{categoriesList}</div>
    </div>
  );
}

function Category({ name, accessType }) {
  return (
    <div className="Category">
      <h3>{name}</h3>
      <h3>{accessType}</h3>
    </div>
  );
}
