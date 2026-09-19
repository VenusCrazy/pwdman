import { createContext, useContext } from "react";

export const userContext = createContext(null);

export function useUser() {
  const ctx = useContext(userContext);
  if (!ctx) throw new Error("useUser must be used within UserContextProvider");
  return ctx;
}