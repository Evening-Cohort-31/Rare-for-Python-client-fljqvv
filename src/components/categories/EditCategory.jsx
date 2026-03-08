// Component that loads a form to edit an existing category, pre-populated with the category's current data
import { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../services";
import { useParams, useNavigate } from "react-router-dom";
import { FormField } from "../../design";

export const EditCategory = () => {
  const { categoryId } = useParams();
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryById(categoryId).then((fetchedData) => {
      const fetchedCategory = Array.isArray(fetchedData)
        ? fetchedData.find(c => c.id === parseInt(categoryId))
        : fetchedData;

      if (!fetchedCategory) {
        navigate("/categories");
        return;
      }
      setLabel(fetchedCategory.label);
      setLoading(false);
    }).catch(error => {
      console.error("Failed to fetch category:", error);
      setLoading(false);
    });
  }, [categoryId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim()) {
      updateCategory(categoryId, { label }).then(() => {
        navigate("/categories");
      }).catch(error => {
        console.error("Failed to update category:", error);
      });
    }
  };

  if (loading) {
    return <p>Loading category...</p>;
  }

  return (
    <div>
      <h2>Edit Category</h2>
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
      </form>
    </div>
  );
}
