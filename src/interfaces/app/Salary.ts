import { Timestamps } from "../../interfaces/misc/Timestamps";

export interface Salary extends Timestamps {
  id: number;
  amount: string;
  start: Date;
  end: Date;
}
