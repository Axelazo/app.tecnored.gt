import { Timestamps } from "interfaces/types/Timestamps";
import { Establishment } from "./Establishment";

export interface Area extends Timestamps {
  id: number;
  name: string;
  establishmentId: number;
  establishment: Establishment;
}
