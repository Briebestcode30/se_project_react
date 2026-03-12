import { createContext } from "react";

// Default value is null (no user logged in)
const CurrentUserContext = createContext(null);

export default CurrentUserContext;
