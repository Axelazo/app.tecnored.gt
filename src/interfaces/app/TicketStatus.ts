import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Status } from "./Status";

export interface TicketsStatuses extends Timestamps {
  id: number;
  ticketId: number;
  statusId: number;
  description?: string;
  status: Status;
  name: string;
}
