import { useEffect, useState } from "react";
import { userContext } from "./userContext";
import { setApiToken } from "../src/api";
import api from "../src/api";

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [restoring, setRestoring] = useState(true);

  // restore the session on first load (refresh token lives in an httpOnly cookie)
  useEffect(() => {
    api
      .post("/api/auth/refresh")
      .then(async ({ data }) => {
        setAccessToken(data.accessToken);
        const me = await api.get("/api/auth/me");
        setUser(me.data);
      })
      .catch(() => {
        // no valid refresh token -> stay signed out
      })
      .finally(() => setRestoring(false));
  }, []);

  // keep the token in sync with api.js (the axios wrapper)
  useEffect(() => {
    setApiToken(accessToken);
  }, [accessToken]);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <userContext.Provider value={{ user, setUser, accessToken, setAccessToken, logout, restoring }}>
      {children}
    </userContext.Provider>
  );
}