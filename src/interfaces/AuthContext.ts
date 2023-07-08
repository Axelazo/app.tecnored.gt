import { User } from "../interfaces/User";

export interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null;
  login: (user: User) => void;
  logout: () => void;
}
