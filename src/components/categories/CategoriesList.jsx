// Component to display a list of all categories in the database
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services";
import { useNavigate } from "react-router-dom";
import { Loading, Notification, PageHeader, Card, Container } from "../../design";

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
    return <Loading />;
  }

  if (!categories.length) {
    return (
      <Container>
        <PageHeader title="Categories" />
        <Notification type="info" message="There are no categories available. Click the button below to start adding new categories." />
        <button className="button is-link" onClick={() => navigate("/categories/new")}>Create a Category</button>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="Categories" />
      <div className="columns is-multiline">
        {categories.map(category => (
          <div className="column is-one-third" key={category.id}>
            <Card title={category.label} />
          </div>
        ))}
      </div>
      <button className="button is-link mt-4" onClick={() => navigate("/categories/new")}>Create a Category</button>
    </Container>
  );
}
