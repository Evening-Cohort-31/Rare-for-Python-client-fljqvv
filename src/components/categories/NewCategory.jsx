// Component that loads a form to create a new category and submits the new category to the API
import { useState } from "react";
import { createCategory } from "../../services";
import { useNavigate } from "react-router-dom";
import { PageHeader, Container } from "../../design";

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
    <Container>
      <PageHeader title="Add New Category" />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Category Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Save Category</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type="button" onClick={() => navigate("/categories")}>Cancel</button>
          </div>
        </div>
      </form>
    </Container>
  );
}
