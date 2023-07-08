import { Timestamps } from "../misc/Timestamps";
import { Person } from "./Person";

export interface Client extends Timestamps {
  id: number;
  clientNumber: number;
  person: Person;
}
