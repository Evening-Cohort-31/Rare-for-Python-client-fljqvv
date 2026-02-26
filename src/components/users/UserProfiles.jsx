// Component for displaying all user profiles.
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../services/index.js"
import { Loading, PageHeader, Container, Card} from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import "./UserProfiles.css"

export const UserProfiles = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()

    useEffect(() => {
        let isMounted = true

        const loadUsers = async () => {
            setLoading(true)
            try {
                const usersData = await getAllUsers()
                if (isMounted) {
                    setUsers(usersData)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadUsers()

        return () => {
            isMounted = false
        }
    }, [])

  if (!currentUser || !currentUser.is_staff) {
    navigate("/access-denied", { replace: true })
    return null
  }

  if (loading) {
    return <Loading />
  }

  return (
  <Container>
    <PageHeader title="Users" centered />

    {users.map((user) => (
      <Card key={user.id}>
        <div className="user-row">
          {/* 1) Username */}
          <div className="user-cell">
            <strong>Username:</strong>
            <span>{user.username}</span>
          </div>

          <div className="user-divider" />

          {/* 2) Name */}
          <div className="user-cell">
            <strong>Name:</strong>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </div>

          <div className="user-divider" />

          {/* 3) Active checkbox */}
          <div className="user-cell user-cell--sm">
            <label className="checkbox">
              <input type="checkbox" checked={!!user.active} readOnly />
              <span style={{ marginLeft: "0.5rem" }}>Active</span>
            </label>
          </div>

          <div className="user-divider" />

          {/* 4) Role radios (driven by is_staff) */}
          <div className="user-cell user-cell--md">
            <div className="role-group">
              <label className="radio">
                <input
                  type="radio"
                  name={`role-${user.id}`}
                  checked={!user.is_staff}
                  readOnly
                />
                <span style={{ marginLeft: "0.5rem" }}>Author</span>
              </label>

              <label className="radio">
                <input
                  type="radio"
                  name={`role-${user.id}`}
                  checked={!!user.is_staff}
                  readOnly
                />
                <span style={{ marginLeft: "0.5rem" }}>Admin</span>
              </label>
            </div>
          </div>
        </div>
      </Card>
    ))}
  </Container>
)
}