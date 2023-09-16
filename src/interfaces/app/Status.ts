import { Timestamps } from "../../interfaces/misc/Timestamps";
import { TicketsStatuses } from "./TicketStatus";

export interface Status extends Timestamps {
  id: number;
  name: string;
  ticketsStatuses: TicketsStatuses;
}
