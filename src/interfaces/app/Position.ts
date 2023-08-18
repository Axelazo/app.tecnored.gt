import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Area } from "./Area";

export interface Position extends Timestamps {
  id: number;
  name: string;
  areaId: number;
  area: Area;
}
