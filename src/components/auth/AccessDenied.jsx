// This component is rendered when a user tries to access a page they don't have permission to view.
// It provides a user-friendly message and a button to return to the home page.
import { useNavigate } from "react-router-dom"
import { Container, Card, PageHeader, Button, Notification } from "../../design"

export const AccessDenied = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <PageHeader title="Access Denied" />

      <div className="columns is-centered">
        <div className="column is-half">
          <Card>
            <Notification
              type="danger"
              message="You don’t have permission to view that page."
            />

            <div className="has-text-centered mt-5">
              <Button color="primary" onClick={() => navigate("/")}>
                Return to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}