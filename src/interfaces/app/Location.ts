import { Timestamps } from "../misc/Timestamps";

export interface Location extends Timestamps {
  id: number;
  latitude: string;
  longitude: string;
}
