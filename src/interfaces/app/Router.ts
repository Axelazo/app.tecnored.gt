import { Timestamps } from "../misc/Timestamps";
import { Establishment } from "./Establishment";

export interface Router extends Timestamps {
  id: number;
  name: string;
  ipAddress: string;
  establishmentId: number;
  establishment: Establishment;
}
