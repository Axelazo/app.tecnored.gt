export interface ClientFormValues {
  firstNames: string;
  lastNames: string;
  dpiNumber: string;
  nitNumber?: string;
  address: string;
  locality: string;
  municipality: number;
  department: number;
  zipCode?: string;
  phone: string;
  birthday?: Date;
  email?: string;
  cellphone?: string;
  addressType?: string;
}
