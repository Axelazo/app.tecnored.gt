import {
  Card,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { ClientServiceMarker } from "../../components/services/monitoring/ClientServiceMarker";
import { ClientServiceOverlay } from "../../components/services/monitoring/ClientServiceOverlay";
import { ServiceLocation } from "../../interfaces/tables/ServiceLocation";

function Monitoring() {
  //Google maps
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTLAIUGQcxfCfTIB3ax80mMMT_YuHRQLc",
    //libraries: ["geometry"],
  });
  const [center, setCenter] = useState({
    lat: 16.509673990914745,
    lng: -89.41893294734292,
  });
  const [zoom, setZoom] = useState(15);
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
  >(undefined);

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  // Services and Location
  const [services, setServices] = useState<ServiceLocation[] | null>(null);
  const [service, setService] = useState<ServiceLocation | null>(null);
  const apiClient = useApiClient();

  // Rendering logic
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const handleMarkerClick = (id: number, service: ServiceLocation) => {
    setSelectedMarker(id);
    setService(service);
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  const mapOptions = {
    mapId: "3e5e9ba702566ad8",
    mapTypeControl: false, // hide Map | Satellite button
    fullscreenControl: false, // hide Expand button
    zoomControl: true, // hide + and - buttons
    streetViewControl: false, // hide street view button
  };

  const mapContainerStyle: React.CSSProperties = {
    boxSizing: "content-box",
    minWidth: "100%",
    height: "720px",
    borderRadius: "15px",
  };

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
    /*     const nearbyLocations = getNearbyLocations(
      16.509673990914745,
      -89.41893294734292,
      10,
      100
    ); */
  };

  const handleBoundsChange = () => {
    setTimeout(() => {
      let bounds;
      if (mapInstance) {
        bounds = mapInstance.getBounds();
      }

      if (bounds) {
        setBounds(bounds);
      }
    }, 200);
    console.log(`Bounds changed!`);
  };

  useEffect(() => {
    if (mapInstance && service) {
      const timeoutId = setTimeout(() => {
        mapInstance.panTo({
          lat: parseFloat(service.latitude),
          lng: parseFloat(service.longitude),
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [service, mapInstance]);

  useEffect(() => {
    servicesResponse();
  }, [bounds]);

  const servicesResponse = async () => {
    if (bounds && bounds instanceof google.maps.LatLngBounds) {
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      const north = northEast.lat();
      const east = northEast.lng();
      const south = southWest.lat();
      const west = southWest.lng();

      await apiClient
        .get<ApiResponse<ServiceLocation[]>>(
          `/services/area?south=${south}&west=${west}&north=${north}&east=${east}`
        )
        .then((response) => {
          setServices(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Card w={"full"} p={6}>
      <Stack overflowY={"hidden"}>
        <HStack>
          <FormControl>
            <FormLabel>Buscar cliente o servicio...</FormLabel>
            <Input type="text" placeholder="Nombres, apellidos..." />
          </FormControl>
          <FormControl>
            <FormLabel>Ubicación...</FormLabel>
            <Select>
              <option>Dolores</option>
              <option>Poxté, Santo Domingo, Machaquilá</option>
              <option>San Francisco</option>
            </Select>
          </FormControl>
        </HStack>
        {isLoaded ? (
          <GoogleMap
            onLoad={handleMapLoad}
            onIdle={handleBoundsChange}
            center={center}
            zoom={zoom}
            options={mapOptions}
            mapContainerStyle={mapContainerStyle}
            onClick={handleMapClick}
          >
            <>
              {/*bounds ? <RectangleF bounds={bounds}></RectangleF> : "" */}
              {services
                ? services.map((service) => {
                    return (
                      <>
                        <ClientServiceMarker
                          setServiceId={() => {
                            handleMarkerClick(service.id, service);
                          }}
                          id={service.id}
                          service={service}
                          position={{
                            lat: parseFloat(service.latitude),
                            lng: parseFloat(service.longitude),
                          }}
                        />
                      </>
                    );
                  })
                : ""}
              {selectedMarker && service && services && (
                <ClientServiceOverlay
                  id={selectedMarker}
                  position={{
                    lat: parseFloat(service.latitude),
                    lng: parseFloat(service.longitude),
                  }}
                />
              )}
            </>
          </GoogleMap>
        ) : (
          <Spinner />
        )}
      </Stack>
    </Card>
  );
}
export default Monitoring;

/*  */
