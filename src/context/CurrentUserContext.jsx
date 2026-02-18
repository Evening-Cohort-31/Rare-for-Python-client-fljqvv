// This Provider component wraps our entire app and manages the currentUser state.
// When the app loads, it checks localStorage for a logged-in user and fetches their full data from the API.
// It provides both currentUser (the data) and setCurrentUser (to update it) to all child components.
// This runs automatically on app load and whenever someone logs in/out.
// Use the useCurrentUser() hook in any component to access the user data.
// Wrap your app with <CurrentUserProvider> in src/main.jsx after importing it.
import { CurrentUserContext } from "./CurrentUserContext.js";
import { useState, useEffect } from "react";
import { getUserById } from "../services";

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize isLoading based on whether there's a user in localStorage
  const [isLoading, setIsLoading] = useState(() => {
    return localStorage.getItem("auth_token") !== null;
  });

  const fetchUserData = () => {
    const localUser = localStorage.getItem("auth_token");

    if (localUser) {
      setIsLoading(true);
      getUserById(localUser)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setCurrentUser(null);
          localStorage.removeItem("auth_token");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, fetchUserData }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
