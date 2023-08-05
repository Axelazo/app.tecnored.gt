import { Timestamps } from "../misc/Timestamps";

export interface Plan extends Timestamps {
  id: number;
  name: string;
  price: number;
  speed: string;
}
