import { Timestamps } from "interfaces/types/Timestamps";

export interface Salary extends Timestamps {
  id: number;
  amount: string;
  start: Date;
  end: Date;
}
