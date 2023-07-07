import { Timestamps } from "interfaces/types/Timestamps";
import { Area } from "./Area";

export interface Position extends Timestamps {
  id: number;
  name: string;
  areaId: number;
  area: Area;
}
