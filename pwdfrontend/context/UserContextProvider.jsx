import { useState } from "react";
import { userContext } from "./userContext";

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);

  return (
    <userContext.Provider value={{ user, setUser, logout }}>
      {children}
    </userContext.Provider>
  );
}