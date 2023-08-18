import { Timestamps } from "../../interfaces/misc/Timestamps";

export interface Establishment extends Timestamps {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}
