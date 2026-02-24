// Component to display a list of all categories in the database
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services";
import { useNavigate } from "react-router-dom";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories().then(fetchedCategories => {
      setCategories(fetchedCategories);
      setLoading(false);
    }).catch(error => {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (!categories.length) {
    return <><p>There are no categories available. Click the button below to start adding new categories.</p><button onClick={() => navigate("/categories/new")}>Create a Category</button></>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.label}</li>
        ))}
      </ul>
        <p>Add more categories by clicking the button below.</p>
        <button onClick={() => navigate("/categories/new")}>Create a Category</button>
    </div>
  );
}