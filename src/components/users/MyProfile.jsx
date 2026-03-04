// Component for displaying the current user's profile.
import { Container, PageHeader, Card } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { ProfileImage } from "./ProfileImage.jsx"

export const MyProfile = () => {
  const { currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!currentUser) {
    return <p className="has-text-grey">Not logged in.</p>
  }

  return (
    <Container>
      <PageHeader title="My Profile" centered />

      <div className="columns is-centered">
        <div className="column is-half">
          <Card>
            <ProfileImage />

            <div className="mt-5">
              <p><strong>Name:</strong> {currentUser.first_name} {currentUser.last_name}</p>
              <p><strong>Username:</strong> {currentUser.username}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Role:</strong> {currentUser.is_staff ? "Admin" : "Author"}</p>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}
