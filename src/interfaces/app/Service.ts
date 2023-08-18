import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Person } from "./Person";
import { Position } from "./Position";
import { Account } from "./Account";
import { Salary } from "./Salary";

export interface Service extends Timestamps {
  id: number;
}
