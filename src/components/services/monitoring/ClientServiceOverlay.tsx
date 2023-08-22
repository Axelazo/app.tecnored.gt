import { OverlayViewF } from "@react-google-maps/api";
import { Button, Card, Stack, Text, position } from "@chakra-ui/react";
import { BsTicketFill, BsPersonCircle } from "react-icons/bs";
import { OnlineServiceIndicator } from "../OnlineServiceIndicator";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { MdOutlineSignalCellularAlt, MdSpeed } from "react-icons/md";
import { TbArrowsLeftRight } from "react-icons/tb";
import { FaTicketAlt } from "react-icons/fa";
import { BsRouterFill } from "react-icons/bs";

export interface ClientServiceOverlayProps {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
}

export const ClientServiceOverlay = (data: ClientServiceOverlayProps) => {
  const { position } = data;
  return (
    <OverlayViewF mapPaneName={"overlayMouseTarget"} position={position}>
      <Card p={4} style={{ transform: "translate(-50%,-150%)" }}>
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Greisy Adaly Orrego Xol</Text>
            <Stack
              direction={"row"}
              verticalAlign={"end"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={4}
            >
              <Text color={"gray.500"}>IP: 192.168.5.6</Text>
              <Stack direction={"row"}>
                <Text color={"gray.500"}> En línea:</Text>
                <OnlineServiceIndicator />
              </Stack>
            </Stack>
            <Stack direction={"row"} mt={4}>
              <Button leftIcon={<BsPersonCircle />} colorScheme="green">
                Ir al Cliente
              </Button>
              <Button leftIcon={<BsTicketFill />} colorScheme="blue">
                Crear Ticket
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </OverlayViewF>
  );
};
