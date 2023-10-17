import { Timestamps } from "../misc/Timestamps";

export interface Payroll extends Timestamps {
  id: number;
  from: Date;
  to: Date;
  status: number;
  net: number;
  allowances: number;
  deductions: number;
}
