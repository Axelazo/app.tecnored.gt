import { Timestamps } from "../../interfaces/misc/Timestamps";
import { Client } from "./Client";
import { Employee } from "./Employee";
import { Router } from "./Router";
import { Service } from "./Service";
import { Status } from "./Status";
import { TicketReason } from "./TicketReason";
import { TicketsStatuses } from "./TicketStatus";

export interface Ticket extends Timestamps {
  id: number;
  serviceId: number;
  reason: TicketReason;
  reasonId: number;
  customReason?: string;
  service: Service;
  employee: Employee;
  estimatedStart: Date;
  estimatedFinish: Date;
  description?: string;
  priority: number;
  ticketStatuses: TicketsStatuses[];
  clients: Client[];
  assignees: Employee[];
  router: Router;
  statuses: TicketsStatuses[];
}
