//* A "Person" interface that holds information related to a person

import { GenericFormValues } from "./GenericFormValues";

export interface PersonFormValues extends GenericFormValues {
  firstNames: string;
  lastNames: string;
  dpiNumber: string;
  nitNumber?: string;
  address: string;
  locality: string;
  zipCode?: string;
  phone: string;
  birthday?: Date;
  email?: string;
  cellphone?: string;
  addressType?: string;
}
