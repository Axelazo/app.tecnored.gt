import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Person } from "./Person";
import { Position } from "./Position";
import { Account } from "./Account";
import { Salary } from "./Salary";

export interface Employee extends Timestamps {
  id: number;
  employeeNumber: string;
  profileUrl: string;
  person: Person;
  position: Position;
  account: Account;
  salaries: Salary[];
}
