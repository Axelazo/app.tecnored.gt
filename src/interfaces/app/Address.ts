import { Department } from "./Department";
import { Municipality } from "./Municipality";

export interface Address {
  street: string;
  locality: string;
  municipality: Department;
  department: Municipality;
  zipCode: string;
  type: number;
}
