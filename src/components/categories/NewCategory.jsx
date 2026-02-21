// Component that loads a form to create a new category and submits the new category to the API
import { useState } from "react";
import { createCategory } from "../../services";
import { useNavigate } from "react-router-dom";
import { Container, PageHeader, FormField } from "../../design";

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
        <FormField label="Category Name">
          <input
            className="input"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </FormField>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Save Category</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type="button" onClick={() => navigate("/categories")}>Cancel</button>
          </div>
        </div>
        <button type="submit">Save Category</button>
      </form>
    </div>
  );
}
