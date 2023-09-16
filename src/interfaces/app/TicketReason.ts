import { Timestamps } from "../../interfaces/misc/Timestamps";

export interface TicketReason extends Timestamps {
  id: number;
  name: string;
}
