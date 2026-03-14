// This file creates a Context for sharing the current logged-in employee data across the entire app.
// It allows any component to access currentUser without having to pass it down through props.
// Use the useCurrentUser() hook in any component to access the current user data.

import { createContext, useContext } from 'react';
export const CurrentUserContext = createContext();
export const useCurrentUser = () => useContext(CurrentUserContext);
export { CurrentUserProvider } from './CurrentUserContext.jsx';