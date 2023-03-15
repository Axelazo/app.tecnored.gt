import { Address } from "./Address";
import { Dpi } from "./Dpi";
import { Phone } from "./Phone";

export interface Person {
  firstNames: string;
  lastNames: string;
  birthday: Date;
  address: Address;
  dpi: Dpi;
  nitNumber: string;
  phones: Phone[];
}
