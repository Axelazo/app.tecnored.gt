import { OverlayViewF } from "@react-google-maps/api";
import { Button, Card, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import {
  BsTicketFill,
  BsPersonCircle,
  BsFillHddNetworkFill,
} from "react-icons/bs";
import { OnlineServiceIndicator } from "../OnlineServiceIndicator";
import { NavLink } from "react-router-dom";
import { Service } from "../../../interfaces/app/Service";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useApiClient from "../../../hooks/useApiClient";
import { ApiResponse } from "../../../interfaces/misc/ApiResponse";
import { MdLocationCity } from "react-icons/md";

export interface ClientServiceOverlayProps {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
}

export const ClientServiceOverlay = (data: ClientServiceOverlayProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);

  const api = useApiClient();

  const { id, position } = data;

  const getServiceInformation = async (id: number) => {
    setIsLoading(true);
    return new Promise<Service>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Service>>(`/services/${id}`)
          .then((response) => {
            if (response.status === 204) {
              resolve(response.data);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            reject(reason);
          });
      }, timeout);
    });
  };

  useEffect(() => {
    if (id) {
      getServiceInformation(id)
        .then((service) => {
          console.log(service);
          setIsLoading(false);
          setService(service);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(`Id doesn't exist yet!`);
    }
  }, [id]);

  return (
    <OverlayViewF mapPaneName={"overlayMouseTarget"} position={position}>
      <Card p={4} style={{ transform: "translate(-50%,-150%)" }}>
        <Stack direction={"row"} spacing={4} align={"center"}>
          {service && !isLoading ? (
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text
                fontWeight={600}
              >{`Servicio #${service.serviceNumber}`}</Text>

              <Stack direction={"row"} mt={2}>
                <Icon as={BsPersonCircle} color={"gray.500"} />
                <Text color={"gray.500"}>
                  {`${service.owners[0].client.person.firstNames} ${service.owners[0].client.person.lastNames}`}
                </Text>
              </Stack>
              <Stack direction={"row"} mt={2}>
                <Icon as={MdLocationCity} color={"gray.500"} />
                <Text color={"gray.500"}>
                  {`Dirección: ${service.owners[0].client.person.address.street}, ${service.owners[0].client.person.address?.locality}`}{" "}
                </Text>
              </Stack>
              {void console.log(service.owners[0].client.person.address)}
              <Stack
                direction={"row"}
                verticalAlign={"end"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={2}
              >
                <Stack direction={"row"}>
                  {" "}
                  <Icon as={BsFillHddNetworkFill} color={"gray.500"} />
                  <Text color={"gray.500"}>{`${service.ipAddress}`}</Text>
                </Stack>

                <Stack direction={"row"}>
                  <Text color={"gray.500"}> En línea:</Text>
                  <OnlineServiceIndicator />
                </Stack>
              </Stack>
              <Stack direction={"row"} mt={4}>
                <Button
                  leftIcon={<BsPersonCircle />}
                  colorScheme="green"
                  variant="solid"
                  as={NavLink}
                  to={`/clients/view/${service.owners[0].client.id}`}
                >
                  Ir al Cliente
                </Button>
                <Button
                  leftIcon={<BsTicketFill />}
                  colorScheme="blue"
                  variant="solid"
                  as={NavLink}
                  to={`/support/create/${service.owners[0].client.id}/${service.id}`}
                  relative="path"
                >
                  Crear Ticket
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Spinner />
          )}
        </Stack>
      </Card>
    </OverlayViewF>
  );
};
