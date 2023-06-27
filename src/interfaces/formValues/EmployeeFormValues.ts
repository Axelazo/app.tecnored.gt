import { PersonFormValues } from "./PersonFormValues";

export interface EmployeeFormValues extends PersonFormValues {
  bank: string;
  accountNumber: string;
  establishment: number;
  area: number;
  position: number;
  salary: number;
  birthday: Date;
  nitNumber: string;
}
