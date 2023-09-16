import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Person } from "./Person";
import { Position } from "./Position";
import { Account } from "./Account";
import { Salary } from "./Salary";
import { Area } from "./Area";
import { Establishment } from "./Establishment";

export interface Employee extends Timestamps {
  id: number;
  employeeNumber: string;
  profileUrl: string;
  person: Person;
  employeePositionMapping: Array<{
    position: Position;
    area: Area;
    establishment: Establishment;
  }>;
  position: Position;
  area: Area;
  establishment: Establishment;
  account: Account;
  salaries: Salary[];
}
