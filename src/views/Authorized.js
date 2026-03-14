import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useCurrentUser } from "../context/CurrentUserContext.js"
import { Loading } from "../design"

export const Authorized = () => {
  const { currentUser, isLoading } = useCurrentUser()
  const location = useLocation()

  // Wait until user data finishes loading
  if (isLoading) return <Loading />

  // No logged-in user → redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // User exists → allow access
  return <Outlet />
}