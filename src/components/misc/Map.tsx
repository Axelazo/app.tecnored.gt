import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type location = {
  lat: number;
  lng: number;
};

interface MapProps {
  location: location | null;
  setLocation?: (location: location) => void;
  formSubmited: boolean;
  disabled?: boolean;
}
function Map({ location, setLocation, formSubmited, disabled }: MapProps) {
  const [center, setCenter] = useState<location>({
    lat: 16.797948256374617,
    lng: -89.93191334282228,
  });
  const [zoom, setZoom] = useState(15);
  const [showError, setShowError] = useState(true);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
  };

  useEffect(() => {
    if (mapInstance && location) {
      const timeoutId = setTimeout(() => {
        mapInstance.panTo({ lat: location.lat, lng: location.lng });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [location, mapInstance]);

  return (
    <Stack w={"full"}>
      <FormControl
        isRequired
        isInvalid={formSubmited && location === null}
        isDisabled={disabled}
      >
        {location === null ? (
          ""
        ) : (
          <Button
            position={"absolute"}
            right={0}
            zIndex={2}
            colorScheme="red"
            onClick={(e) => {
              e.preventDefault();
              if (setLocation) {
                setLocation(null);
              }
            }}
          >
            Eliminar ubicación
          </Button>
        )}
        <FormLabel>Seleccionar ubicacion</FormLabel>
        <GoogleMap
          onLoad={handleMapLoad}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            boxSizing: "content-box",
            minWidth: "100%",
            height: "560px",
            borderRadius: "15px",
            border:
              formSubmited && location === null ? "2px solid red" : undefined,
          }}
          options={{
            mapId: "3e5e9ba702566ad8",
            mapTypeControl: false, // hide Map | Satellite button
            fullscreenControl: false, // hide Expand button
            zoomControl: true, // hide + and - buttons
            streetViewControl: false, // hide street view button
          }}
          onClick={(e) => {
            if (e.latLng)
              if (setLocation) {
                setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }
          }}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
        {showError && (
          <FormErrorMessage>
            Debes marcar una ubicación en el mapa
          </FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
}

export default Map;
