import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Address } from "./Address";
import { Client } from "./Client";
import { Router } from "./Router";
import { ServiceOwner } from "./ServiceOwner";
import { ServicePlanMapping } from "./ServicePlanMappings";

export interface Service extends Timestamps {
  id: number;
  serviceNumber: string;
  ipAddress: string;
  address: Address;
  router: Router;
  servicePlanMappings: ServicePlanMapping[];
  owners: ServiceOwner[];
  clients: Client[];
}
