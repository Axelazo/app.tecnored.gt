export interface ServicesFormValues {
  clientId: number;
  planId: number;
  routerId: number;
  ipAddress: string;
  start?: Date;
  latlng: string;
  latitude: string;
  longitude: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
