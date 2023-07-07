import { Bank } from "./Bank";

export interface Account {
  id: number;
  number: string;
  bank: Bank;
}
