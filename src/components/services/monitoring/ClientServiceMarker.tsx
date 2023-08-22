import { MarkerF } from "@react-google-maps/api";
import serviceLocationIcon from "../../../img/service-location.svg";
import { useEffect } from "react";
import { ServiceLocation } from "../../../interfaces/tables/ServiceLocation";

export interface ClientServiceMarkerProps {
  id: number;
  service: ServiceLocation;
  position: {
    lat: number;
    lng: number;
  };
  setServiceId: (serviceId: number, serviceLocation: ServiceLocation) => void;
}

export const ClientServiceMarker = (data: ClientServiceMarkerProps) => {
  useEffect(() => {
    console.log(data.id);
  }, []);

  const { id, service, position, setServiceId } = data;
  return (
    <MarkerF
      onClick={() => {
        setServiceId(id, service);
      }}
      key={id}
      position={position}
      icon={{
        url: serviceLocationIcon,
        scaledSize: new google.maps.Size(64, 64),
      }}
    />
  );
};
