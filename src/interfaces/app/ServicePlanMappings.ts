import { Timestamps } from "../misc/Timestamps";

export interface ServicePlanMapping extends Timestamps {
  id: number;
  serviceId: number;
  planPriceId: number;
  planNameId: number;
  planSpeedId: number;
  start: string;
  planName: {
    id: number;
    name: string;
    start: string;
    planId: number;
  };
  planPrice: {
    id: number;
    price: number;
    start: string;
    planId: number;
  };
  planSpeed: {
    id: number;
    speed: number;
    realSpeed: number;
    start: string;
    planId: number;
  };
}
