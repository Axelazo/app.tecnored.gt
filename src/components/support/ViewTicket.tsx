import { useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Ticket } from "../../interfaces/app/Ticket";
import { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import { formatDate, timeAgo } from "../../helpers/time";
import { Status } from "../../interfaces/app/Status";
import { useLoadScript } from "@react-google-maps/api";
import MarkerMap from "../common/Map";
import { UpdateTicketStatusFormValues } from "../../formValues/UpdateTicketStatusFormValues";
import { UpdateTicketStatusFormResolver } from "../../resolvers/UpdateTicketFormResolver";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { RouteToClientButton } from "../services/monitoring/ClientServiceOverlay";

interface TicketStatusProps {
  status: Status;
  description?: string;
  index: number;
  date: string | Date;
  totalItems: number;
  color: string;
  previousColor: string | null;
}

// Define a type for your color mapping
type StatusColorMapping = {
  [key: string]: string;
};

function TicketStatus({
  status,
  description,
  index,
  totalItems,
  date,
  color,
  previousColor,
}: TicketStatusProps) {
  //const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  // Calculate the line height based on the number of items
  const lineHeight = totalItems > 0 ? "220px" : "0";
  const linearGradient = `linear-gradient(to bottom, ${color}, ${
    previousColor ? previousColor : "grey"
  })`;

  return (
    <Stack flexDirection={{ base: "row" }} alignItems={"center"} spacing={6}>
      {
        <Box minW={"25px"} h={"25px"} borderRadius={"100%"} bgColor={color}>
          {isLast ? (
            ""
          ) : (
            <Box
              w={"2px"}
              h={lineHeight}
              ml={"12px"}
              bgGradient={linearGradient}
            ></Box>
          )}
        </Box>
      }

      <Card key={index} flexGrow={1} boxShadow={"xl"} mt={8}>
        <Stack flexDirection={"row"} width={"100%"} flexGrow={1}>
          <Box
            w={5}
            h={5}
            bgColor={color}
            overflow={"visible"}
            position={"absolute"}
            bottom={"50%"}
            left={-2}
            transform={"rotate(45deg)"}
          />
          <Box
            as={Flex}
            borderLeftRadius={"lg"}
            flexGrow={1}
            minH="full"
            minW={8}
            maxW={8}
            bgColor={color}
            position={"relative"}
            float={"left"}
            alignItems={"center"}
          ></Box>
          <Stack alignSelf={"end"} flexGrow={1}>
            <Stack
              flexDirection={{ base: "row" }}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <CardHeader>
                <Heading size="md" width={"auto"}>
                  {status.name}
                </Heading>
              </CardHeader>
              <Text mr={4}>{`${timeAgo(date)} - ${formatDate(date)}`}</Text>
            </Stack>
            <CardBody>
              <Stack spacing="3">
                <Heading size="sm">Comentario:</Heading>
                {description ? (
                  <Text as="em">{description}</Text>
                ) : (
                  <Text as="em">Sin comentario adicional</Text>
                )}
              </Stack>
            </CardBody>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

interface UpdateTicketStatusProps {
  ticketId: string | undefined;
  fetchTicket: () => void;
}

function UpdateTicketStatus({
  ticketId,
  fetchTicket,
}: UpdateTicketStatusProps) {
  const { register, handleSubmit, formState, clearErrors, getValues, control } =
    useForm<UpdateTicketStatusFormValues>({
      resolver: UpdateTicketStatusFormResolver,
    });

  const api = useApiClient();
  const toast = useToast();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = handleSubmit(async (ticketData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        api
          .put<Ticket>(`/tickets/${ticketId}/update`, ticketData)
          .then((response) => {
            setDisabled(true);
            toast({
              description: `Ticket actualizado exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            fetchTicket();
            resolve(response);
          })
          .catch((error: AxiosError) => {
            if (error.response && error.response.data) {
              const message = (error.response.data as ErrorResponseData)
                .message;
              toast({
                title: "Error",
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          })
          .finally(() => {
            setDisabled(false);
          });
      }, timeout);
    });
  });

  return (
    <Card p={4} mt={2}>
      <Heading>Actualizar estado del Ticket</Heading>
      <form onSubmit={onSubmit} noValidate={true}>
        <FormControl mt={6}>
          <FormLabel>Comentario</FormLabel>
          <Textarea {...register("description")}></Textarea>
        </FormControl>
        <Stack
          flexDirection={{ base: "row" }}
          justifyContent={"end"}
          alignItems={"end"}
        >
          <FormControl isRequired isInvalid={!!formState.errors.statusId}>
            <FormLabel>Estado</FormLabel>
            <Select
              placeholder="Seleccionar estado del Ticket"
              maxW={"50%"}
              {...register("statusId")}
            >
              <option value={2}>Abierto</option>
              <option value={3}>En Proceso</option>
              <option value={4}>Cerrado</option>
            </Select>
            <FormErrorMessage>
              {formState.errors.statusId?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            isDisabled={disabled}
            colorScheme={"green"}
            type={"submit"}
            size={"md"}
            isLoading={formState.isSubmitting}
          >
            Actualizar Ticket
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

function ViewTicket() {
  const { ticketId } = useParams();
  const apiClient = useApiClient();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [location, setLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | undefined
  >({
    lat: 16.509673990914745,
    lng: -89.41893294734292,
  });

  // API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTLAIUGQcxfCfTIB3ax80mMMT_YuHRQLc",
  });

  async function fetchTicket() {
    try {
      const response = await apiClient.get<ApiResponse<Ticket>>(
        `/tickets/${ticketId}`
      );
      setTicket(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  }

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  if (!ticket) {
    // You can render a loading indicator here if needed
    return <p>Loading...</p>;
  }

  const getStatusColors = () => {
    const statusColors: {
      [key: number]: {
        currentStatusColor: string;
        nextStatusColor: string | null;
      };
    } = {};
    for (let i = 0; i < ticket.ticketStatuses.length; i++) {
      const currentStatus = ticket.ticketStatuses[i].status.name;
      const nextStatus =
        i < ticket.ticketStatuses.length - 1
          ? ticket.ticketStatuses[i + 1].status.name
          : null;

      // Define colors for your statuses here
      const colorMapping: StatusColorMapping = {
        "En Proceso": "yellow.400",
        Cerrado: "red.400",
        Abierto: "green.400",
      };

      const currentStatusColor = colorMapping[currentStatus];
      const nextStatusColor = nextStatus ? colorMapping[nextStatus] : null;

      statusColors[i] = {
        currentStatusColor,
        nextStatusColor,
      };
    }
    return statusColors;
  };

  const colors = getStatusColors();

  console.log(ticket.description);

  return (
    <>
      <Stack flexGrow={1}>
        <PageHeader
          title={`Ver Ticket #${ticketId?.padStart(6, "0")} - ${
            ticket.reason.name
          }`}
        ></PageHeader>
        <Stack flexDirection={{ base: "column", xl: "row" }}>
          <Stack
            flexDirection={{ base: "column" }}
            minW={{ base: "full", xl: "500px" }}
            maxW={{ base: "full", xl: "30%" }}
          >
            <Card p={4} w={"full"} border={"1px"} borderColor={"gray.300"}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                Información del Ticket:{" "}
              </Text>

              <Stack flexDirection={{ base: "column" }} mt={2}>
                <Stack flexDirection={{ base: "column" }}>
                  <Stack flexDirection={{ base: "row" }} alignItems={"center"}>
                    <Text fontWeight={"bold"}>Razón: </Text>
                    <Text>{ticket.reason.name}</Text>
                  </Stack>
                  {ticket.customReason && (
                    <Stack
                      flexDirection={{ base: "row" }}
                      alignItems={"center"}
                    >
                      <Text fontWeight={"bold"}>Razón personalizada: </Text>
                      <Text>{ticket.customReason}</Text>
                    </Stack>
                  )}
                  <Stack flexDirection={{ base: "row" }} alignItems={"center"}>
                    <Text fontWeight={"bold"}>Prioridad: </Text>
                    {ticket.priority === 1 ? (
                      <Badge size={"xl"} colorScheme={"green"} p={2}>
                        BAJA
                      </Badge>
                    ) : ticket.priority === 2 ? (
                      <Badge size={"xl"} colorScheme={"yellow"} p={2}>
                        MEDIA
                      </Badge>
                    ) : ticket.priority === 3 ? (
                      <Badge size={"xl"} colorScheme={"red"} p={2}>
                        ALTA
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Stack>
                  <Stack flexDirection={{ base: "row" }} alignItems={"center"}>
                    <Text fontWeight={"bold"}>Estado: </Text>
                    {ticket.ticketStatuses[0].status.name === "Abierto" ? (
                      <Badge size={"xl"} colorScheme={"green"} p={2}>
                        ABIERTO
                      </Badge>
                    ) : ticket.ticketStatuses[0].status.name ===
                      "En Proceso" ? (
                      <Badge size={"xl"} colorScheme={"yellow"} p={2}>
                        EN PROCESO
                      </Badge>
                    ) : ticket.ticketStatuses[0].status.name === "Cerrado" ? (
                      <Badge size={"xl"} p={2}>
                        CERRADO
                      </Badge>
                    ) : (
                      ""
                    )}
                  </Stack>
                </Stack>
                <Stack flexDirection={{ base: "column" }}>
                  <Stack flexDirection={{ base: "row" }} alignItems={"center"}>
                    <Text fontWeight={"bold"}>Técnico Asignado: </Text>
                    <Text>{`${ticket.assignees[0].person.firstNames} ${ticket.assignees[0].person.lastNames}`}</Text>
                  </Stack>
                  <Stack flexDirection={{ base: "row" }} alignItems={"center"}>
                    <Text fontWeight={"bold"}>
                      Fecha estimada de finalización:{" "}
                    </Text>
                    <Text>
                      {`${formatDate(ticket.estimatedFinish).split(" ")[0]}`}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
            <Card p={4} w={"full"} border={"1px"} borderColor={"gray.300"}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={"lg"}>
                  Información del Cliente:
                </Text>
              </Stack>
              <Stack
                flexDirection={{ base: "column" }}
                justifyContent={"space-between"}
                mt={2}
              >
                <Stack flexDirection={{ base: "row" }}>
                  <Text fontWeight={"bold"}>Nombre:</Text>
                  <Text>{`${ticket.service.owners[0].client.person.firstNames} ${ticket.service.owners[0].client.person.lastNames}`}</Text>
                </Stack>
                <Stack flexDirection={{ base: "row" }}>
                  <Text fontWeight={"bold"}>No. Servicio:</Text>
                  <Text>{`#${ticket.service.serviceNumber}`}</Text>
                </Stack>
                <Stack flexDirection={{ base: "row" }}>
                  <Text fontWeight={"bold"}>IP:</Text>
                  <Text>{`${ticket.service.ipAddress}`}</Text>
                </Stack>
              </Stack>
              <Stack
                flexDirection={{ base: "column" }}
                justifyContent={"space-between"}
                mt={2}
              >
                <Stack flexDirection={{ base: "row" }}>
                  <Text fontWeight={"bold"}>Teléfonos:</Text>
                  {ticket.service.owners[0].client.person.phones.map(
                    (phone, index) => {
                      return <Text key={index}>{phone.number}</Text>;
                    }
                  )}
                </Stack>
                <Stack flexDirection={{ base: "row" }}>
                  <Text fontWeight={"bold"}>Router:</Text>
                  <Text>{`${ticket.service.router.name}`}</Text>
                </Stack>
              </Stack>
              <Stack mt={2}>
                <Text fontWeight={"bold"}>Ubicación:</Text>
                {isLoaded ? (
                  <MarkerMap
                    location={{
                      lat: parseFloat(ticket.service.address.location.latitude),
                      lng: parseFloat(
                        ticket.service.address.location.longitude
                      ),
                    }}
                  />
                ) : (
                  <Spinner />
                )}
                <RouteToClientButton
                  lat={parseFloat(ticket.service.address.location.latitude)}
                  lng={parseFloat(ticket.service.address.location.longitude)}
                />
              </Stack>
            </Card>
          </Stack>
          <Stack flexDirection={{ base: "column", xl: "row" }} flexGrow={1}>
            <Stack flexGrow={1}>
              <Heading ml={4} mt={4}>
                Historial
              </Heading>
              <Text ml={4}>Mas recientes primero</Text>
              {ticket.ticketStatuses.map((ticketStatus, index) => {
                return (
                  <TicketStatus
                    key={index}
                    date={ticketStatus.createdAt}
                    status={ticketStatus.status}
                    index={index}
                    totalItems={ticket.ticketStatuses.length}
                    color={colors[index].currentStatusColor}
                    previousColor={colors[index].nextStatusColor}
                    description={
                      index === ticket.ticketStatuses.length - 1
                        ? ticket.description
                        : ticketStatus.description
                    }
                  />
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <UpdateTicketStatus ticketId={ticketId} fetchTicket={fetchTicket} />
        </Stack>
      </Stack>
    </>
  );
}

export default ViewTicket;
