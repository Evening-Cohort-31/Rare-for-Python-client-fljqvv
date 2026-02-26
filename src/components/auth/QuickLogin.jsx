import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import { getAllUsers } from "../../services"
import { Card, Button, Notification, Loading } from "../../design"
import { useCurrentUser } from "../../context/CurrentUserContext"

export const QuickLogin = ({ setToken }) => {
  const navigate = useNavigate()
  const { fetchUserData } = useCurrentUser()

  const [staffUser, setStaffUser] = useState(null)
  const [authorUser, setAuthorUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Helper function to pick a random element from an array
  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const loadRandomUsers = async () => {
    setLoading(true)
    setError("")

    try {
      const users = await getAllUsers()

      // Filter users into staff and authors, then pick one random user from each category
      const staff = users.filter((u) => u.is_staff === true)
      const authors = users.filter((u) => u.is_staff === false)

      setStaffUser(staff.length ? pickRandom(staff) : null)
      setAuthorUser(authors.length ? pickRandom(authors) : null)
    } catch (err) {
      console.error("QuickLogin failed to load users:", err)
      setError("Could not load users for quick login.")
      setStaffUser(null)
      setAuthorUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRandomUsers()
  }, [])

  const handleQuickLogin = async (user) => {
    const res = await loginUser({
      username: user.username,
      password: user.password,
    })

    if (res?.valid) {
      setToken(res.token)
      fetchUserData()
      navigate("/")
    } else {
      setError("Quick login failed. (Username/password mismatch)")
    }
  }

  if (loading) return <Loading />

  return (
    <div className="mt-6">
      <Card title="Quick Login (Dev Helper)">
        <p className="mb-4">
          Use this to quickly log in as a standard user or staff user for testing.
        </p>

        {error ? (
          <Notification type="danger" message={error} />
        ) : null}

        <div className="columns is-multiline">
          {/* Standard user card */}
          <div className="column is-6">
            <Card title="Standard User">
              {authorUser ? (
                <>
                <p>
                  <strong>Name:</strong> {authorUser.first_name} {authorUser.last_name}
                </p>
                  <p>
                    <strong>Username:</strong> {authorUser.username}
                  </p>
                  <p>
                    <strong>Password:</strong> {authorUser.password}
                  </p>

                  <div className="buttons is-centered mt-4">
                    <Button
                      color="primary"
                      onClick={() => handleQuickLogin(authorUser)}
                    >
                      Quick Login as User
                    </Button>
                  </div>
                </>
              ) : (
                <Notification
                  type="warning"
                  message="No standard users found (is_staff = false)."
                />
              )}
            </Card>
          </div>

          {/* Staff user card */}
          <div className="column is-6">
            <Card title="Staff User">
              {staffUser ? (
                <>
                  <p>
                    <strong>Name:</strong> {staffUser.first_name} {staffUser.last_name}
                  </p>
                  <p>
                    <strong>Username:</strong> {staffUser.username}
                  </p>
                  <p>
                    <strong>Password:</strong> {staffUser.password}
                  </p>

                  <div className="buttons is-centered mt-4">
                    <Button
                      color="danger"
                      onClick={() => handleQuickLogin(staffUser)}
                    >
                      Quick Login as Staff
                    </Button>
                  </div>
                </>
              ) : (
                <Notification
                  type="warning"
                  message="No staff users found (is_staff = true)."
                />
              )}
            </Card>
          </div>
        </div>

        {/* Refresh */}
        <div className="buttons is-centered mt-5">
          <Button variant="outlined" onClick={loadRandomUsers}>
            Pick Different Users
          </Button>
        </div>
      </Card>
    </div>
  )
}