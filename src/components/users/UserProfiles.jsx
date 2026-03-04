// Component for displaying all user profiles.
import { useEffect, useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllUsers, getInactiveUsers, getActiveUsers, updateUser } from "../../services/index.js"
import { Loading, PageHeader, Container, Card, ConfirmDialog, Button} from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import "./UserProfiles.css"

export const UserProfiles = () => {
  const [users, setUsers] = useState([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // State to trigger re-fetching users after toggling active status
  // This refreshKey state is used to trigger the useEffect hook to re-fetch the user list whenever a user's active status is toggled. 
  // By incrementing this key, we can ensure that the latest user data is loaded without having to directly manipulate the users state after an update.
  const [refreshKey, setRefreshKey] = useState(0)

  const navigate = useNavigate()

  const { currentUser } = useCurrentUser()
  // Ref for the confirmation dialog
  // useRef hook is used to get a reference to the ConfirmDialog component, allowing us to programmatically control its visibility and content when toggling user active status.
  const dialogRef = useRef()

  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
      let isMounted = true

      const loadUsers = async () => {
            setLoading(true)
            try {
                let usersData
                if (activeFilter === "active") {
                    usersData = await getActiveUsers()
                } else if (activeFilter === "inactive") {
                    usersData = await getInactiveUsers()
                } else {
                    usersData = await getAllUsers()
                }

                if (isMounted) {
                    setUsers(usersData.map((u) => ({ ...u, active: Boolean(u.active) })))
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
  }, [activeFilter, refreshKey])

  // Handler for toggling user active status - opens confirmation dialog
  const handleToggleActive = (user) => {
    setSelectedUser(user)
    dialogRef.current.showModal()
  }

// Handler for confirming active status toggle - updates user and refreshes list by incrementing refreshKey
 const handleConfirmToggle = async () => {
  if (!selectedUser) return

  const newActiveStatus = !selectedUser.active

  await updateUser(selectedUser.id, { ...selectedUser, active: newActiveStatus })

  setSelectedUser(null)
  setRefreshKey((prev) => prev + 1)
}

// Handler for canceling active status toggle - simply closes the confirmation dialog without making changes
const handleCancelToggle = () => {
  setSelectedUser(null)
}

// Access control: only staff users can view this page
// Redirects non-staff users to an access denied page.
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

  {/* Top Filter buttons */}
  <div className="level-item">
    <div className="buttons">
      <Button
        color="info"
        variant={activeFilter === "all" ? "outlined" : undefined}
        onClick={() => setActiveFilter("all")}
      >
        All Users
      </Button>
      <Button
        color="info"
        variant={activeFilter === "active" ? "outlined" : undefined}
        onClick={() => setActiveFilter("active")}
      >
        Active Users
      </Button>
      <Button
        color="info"
        variant={activeFilter === "inactive" ? "outlined" : undefined}
        onClick={() => setActiveFilter("inactive")}
      >
        Inactive Users
      </Button>
    </div>
  </div>

  {/* Table */}
  <Card>
    <div className="table-container">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Active Status</th>
            <th>Author or Admin</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Username */}
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>

              {/* User Name */}
              <td>
                {user.first_name} {user.last_name}
              </td>

              {/* Active Status: checkbox + action button */}
              <td>
                <div className="is-flex is-align-items-center" style={{ gap: "0.75rem" }}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={!!user.active}
                      onChange={(e) => {
                        // prevent the checkbox from visually toggling before confirmation
                        e.preventDefault()
                        handleToggleActive(user)
                      }}
                    />
                    <span style={{ marginLeft: "0.5rem" }}>
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </label>
                  
                  {/* Action button to toggle active status - shows "Deactivate" for active users and "Activate" for inactive users */}
                  {user.active ? (
                    <Button
                      color="danger"
                      size="small"
                      onClick={() => handleToggleActive(user)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      size="small"
                      onClick={() => handleToggleActive(user)}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </td>

              {/* Role */}
              <td>{user.is_staff ? "Admin" : "Author"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>

  <ConfirmDialog
    dialogRef={dialogRef}
    title={selectedUser?.active ? "Deactivate User" : "Activate User"}
    message={
      selectedUser?.active
        ? `Are you sure you want to deactivate ${selectedUser?.first_name} ${selectedUser?.last_name} (${selectedUser?.username})?`
        : `Are you sure you want to activate ${selectedUser?.first_name} ${selectedUser?.last_name} (${selectedUser?.username})?`
    }
    confirmText={selectedUser?.active ? "Yes, Deactivate" : "Yes, Activate"}
    confirmColor={selectedUser?.active ? "is-danger" : "is-success"}
    onConfirm={handleConfirmToggle}
    onCancel={handleCancelToggle}
  />
</Container>
)
}