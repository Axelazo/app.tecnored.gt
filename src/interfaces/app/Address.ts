import { Timestamps } from "../misc/Timestamps";
import { Department } from "./Department";
import { Location } from "./Location";
import { Municipality } from "./Municipality";

export interface Address extends Timestamps {
  street: string;
  locality: string;
  municipality: Department;
  department: Municipality;
  zipCode: string;
  type: number;
  location: Location;
}
