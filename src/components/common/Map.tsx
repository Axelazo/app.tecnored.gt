import { Stack } from "@chakra-ui/react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface MapProps {
  location: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
}

function MarkerMap({ location }: MapProps) {
  const [center, setCenter] = useState(location);
  const [zoom, setZoom] = useState(15);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
  };

  useEffect(() => {
    if (mapInstance && location) {
      const timeoutId = setTimeout(() => {
        mapInstance.panTo(location);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [location, mapInstance]);

  return (
    <Stack w={"full"}>
      <GoogleMap
        onLoad={handleMapLoad}
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          boxSizing: "content-box",
          minWidth: "100%",
          height: "300px",
          borderRadius: "15px",
        }}
        options={{
          mapId: "3e5e9ba702566ad8",
          mapTypeControl: false, // hide Map | Satellite button
          fullscreenControl: false, // hide Expand button
          zoomControl: true, // hide + and - buttons
          streetViewControl: false, // hide street view button
        }}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </Stack>
  );
}

export default MarkerMap;
