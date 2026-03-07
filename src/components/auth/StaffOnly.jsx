import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useCurrentUser } from "../../context/CurrentUserContext.js"
import { Loading } from "../../design"

export const StaffOnly = () => {
  const { currentUser, isLoading } = useCurrentUser()
  const location = useLocation()

  // Wait until user info is resolved (prevents redirect flash)
  if (isLoading) return <Loading />

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Logged in but not staff
  if (!currentUser.is_staff) {
    return <Navigate to="/access-denied" replace />
  }

  // Staff -> allow access
  return <Outlet />
}