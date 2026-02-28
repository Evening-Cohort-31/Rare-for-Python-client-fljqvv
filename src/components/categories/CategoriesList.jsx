// Component to display a list of all categories in the database
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../services"
import {
  Loading,
  Notification,
  Container,
  PageHeader,
  Card,
  Button,
  IconButton,
} from "../../design"

export const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories)
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error)
        setCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

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
    )
  }

  return (
    <Container>
      <PageHeader title="Categories" centered />

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
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* Main: category label */}
            <div className="media-content">
              <div className="content">
                <p className="mb-0">
                  <span className="has-text-weight-semibold">{category.label}</span>
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
  )
}