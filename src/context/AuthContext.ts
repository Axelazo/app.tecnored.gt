import { createContext } from "react";
import { AuthContextValue } from "../interfaces/AuthContext";
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: null,
  login: () => undefined,
  logout: () => undefined,
});
