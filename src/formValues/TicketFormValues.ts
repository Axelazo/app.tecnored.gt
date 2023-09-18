export interface TicketFormValues {
  clientId: number;
  serviceId: number;
  reasonId: number;
  employeeId: number;
  customReason?: string;
  estimatedStart: Date;
  estimatedFinish: Date;
  comment?: string;
  description?: string;
  priority: number;
}
