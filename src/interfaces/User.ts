import { Role } from "./Role";

export interface User {
  id: number;
  firstNames: string;
  lastNames: string;
  email: string;
  roles: Role[];
  token: string;
  employeeId?: number;
}

export interface UserLoginFormValues {
  email: string;
  password: string;
}

export interface UserLoginAPIResponse {
  status: number;
  data: User;
}
