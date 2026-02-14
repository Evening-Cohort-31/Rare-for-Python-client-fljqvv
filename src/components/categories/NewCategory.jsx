// Component that loads a form to create a new category and submits the new category to the API
import { useState } from "react";
import { createCategory } from "../../services";
import { useNavigate } from "react-router-dom";

export const NewCategory = () => {
  const [label, setLabel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim()) {
      createCategory({ label }).then(() => {
        navigate("/categories");
      }).catch(error => {
        console.error("Failed to create category:", error);
      });
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="label">Category Name:</label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Category</button>
      </form>
    </div>
  );
}
