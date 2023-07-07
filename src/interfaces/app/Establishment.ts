import { Timestamps } from "interfaces/types/Timestamps";

export interface Establishment extends Timestamps {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}
