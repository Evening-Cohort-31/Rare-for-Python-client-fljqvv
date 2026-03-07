// Component to display a list of all categories in the database
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../services";
import {
  Loading,
  Notification,
  Container,
  PageHeader,
  Card,
  Button,
  IconButton,
  ConfirmDialog,
} from "../../design";

export const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // Ticket #16 - tracks which category's trash button was clicked so the confirm dialog knows what to delete
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // Ticket #16 - ref used to open/close the native HTML <dialog> element via .showModal() and .close()
  const dialogRef = useRef(null);

  useEffect(() => {
    getAllCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (!categories.length) {
    return (
      <Container>
        <PageHeader title="Categories" centered />
        <Notification
          type="warning"
          message="There are no categories available. Click the button below to start adding new categories."
        />
        <Button color="primary" onClick={() => navigate("/categories/new")}>
          Create a Category
        </Button>
      </Container>
    );
  }

  // Ticket #16 - handles confirmed deletion: calls the API, then filters the deleted category out of state so the UI updates instantly without a page refresh
  const handleConfirmDelete = () => {
    deleteCategory(selectedCategoryId).then((response) => {
      // Filter out the deleted category from local state so the list updates immediately
      const updatedCategories = categories.filter(
        (category) => category.id !== selectedCategoryId,
      );
      setCategories(updatedCategories);
    });
    dialogRef.current?.close(); //This is setup to close the modal and not navigate to another page.
    setSelectedCategoryId(null); //Good safeguard to help prevent bugs.
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.label}
            <button onClick={() => navigate(`/categories/edit/${category.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
        <p>Add more categories by clicking the button below.</p>
        <button onClick={() => navigate("/categories/new")}>Create a Category</button>
    </div>
    <Container>
      <PageHeader title="Categories" centered />

      {/* Ticket #16 - confirmation dialog rendered once, opened via dialogRef.current.showModal() when trash is clicked */}
      <ConfirmDialog
        dialogRef={dialogRef}
        title={"Confirm Category Delete"}
        message={"Are you sure you want to delete this?"}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          dialogRef.current?.close();
          setSelectedCategoryId(null);
        }} //The onCancel is setup to make sure after any cancels that the state is set to null, so that there is no accidental deletion of other categories.
      />

      {categories.map((category) => (
        <Card key={category.id}>
          <article className="media">
            {/* Left: icon buttons */}
            <div className="media-left">
              <div className="buttons are-small">
                <IconButton
                  icon="gear"
                  title="Edit category (coming soon)"
                  onClick={() => {}}
                />
                <IconButton
                  icon="trash"
                  title="Delete category (coming soon)"
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    dialogRef.current?.showModal();
                  }}
                />
              </div>
            </div>

            {/* Main: category label */}
            <div className="media-content">
              <div className="content">
                <p className="mb-0">
                  <span className="has-text-weight-semibold">
                    {category.label}
                  </span>
                  <hr className="my-2" />
                </p>
              </div>
            </div>

            {/* Optional right side: placeholder for future info */}
            {/* <div className="media-right">
              <span className="tag is-light">id: {category.id}</span>
            </div> */}
          </article>
        </Card>
      ))}

      <div className="mt-4">
        <Button color="primary" onClick={() => navigate("/categories/new")}>
          Create a Category
        </Button>
      </div>
    </Container>
  );
};
