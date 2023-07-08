import {
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  GoogleMap,
  OverlayViewF,
  MarkerF,
  useLoadScript,
  Rectangle,
  RectangleF,
} from "@react-google-maps/api";
import { getNearbyLocations } from "../../helpers/location";
import { useState } from "react";

import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { MdOutlineSignalCellularAlt, MdSpeed } from "react-icons/md";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FaTicketAlt } from "react-icons/fa";
import { BsRouterFill } from "react-icons/bs";

function Monitoring() {
  //Check if the map is loaded, returns flag isLoaded
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTLAIUGQcxfCfTIB3ax80mMMT_YuHRQLc",
    libraries: ["geometry"],
  });

  //Center of the map
  const [center, setCenter] = useState({
    lat: 16.509673990914745,
    lng: -89.41893294734292,
  });
  //Current zoom level
  const [zoom, setZoom] = useState(15);

  //Current bounds
  const [bounds, setBounds] = useState<
    google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined
  >(undefined);

  //Current map instance
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  //Locations of the services on the map
  const [locations, setLocations] = useState<
    { lat: number; lng: number }[] | null
  >(null);

  const handleMapLoad = (map: google.maps.Map) => {
    setMapInstance(map);
    console.log(map);
    const nearbyLocations = getNearbyLocations(
      16.509673990914745,
      -89.41893294734292,
      10,
      100
    );

    setLocations(nearbyLocations);
  };

  const handleBoundsChange = () => {
    let bounds;
    if (mapInstance) {
      bounds = mapInstance.getBounds();
    }

    if (bounds) {
      setBounds(bounds);
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
            onBoundsChanged={handleBoundsChange}
            center={center}
            zoom={zoom}
            options={{
              mapId: "3e5e9ba702566ad8",
              mapTypeControl: false, // hide Map | Satellite button
              fullscreenControl: false, // hide Expand button
              zoomControl: true, // hide + and - buttons
              streetViewControl: false, // hide street view button
            }}
            mapContainerStyle={{
              boxSizing: "content-box",
              minWidth: "100%",
              height: "720px",
              borderRadius: "15px",
            }}
          ></GoogleMap>
        ) : (
          <Spinner />
        )}
      </Stack>
    </Card>
  );
}
export default Monitoring;

/*  */
