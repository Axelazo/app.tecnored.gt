import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Establishment } from "./Establishment";

export interface Area extends Timestamps {
  id: number;
  name: string;
  establishmentId: number;
  establishment: Establishment;
}
