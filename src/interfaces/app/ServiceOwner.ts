import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Client } from "./Client";

export interface ServiceOwner extends Timestamps {
  id: number;
  clientId: number;
  serviceId: number;
  client: Client;
}
