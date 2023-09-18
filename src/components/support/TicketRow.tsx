import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Tr,
  Td,
  Badge,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaPencilAlt, FaPrint, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/time";
import { AxiosError } from "axios";
import useApiClient from "../../hooks/useApiClient";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { Ticket } from "../../interfaces/app/Ticket";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";

interface TicketRow {
  index: number;
  id: string;
  fullName: string;
  reason: string;
  serviceNumber: string;
  status: string;
  createdAt: string;
  priority: number;
  fetchTickets: () => void;
}

function TicketRow({
  index,
  id,
  fullName,
  reason,
  serviceNumber,
  status,
  createdAt,
  priority,
  fetchTickets,
}: TicketRow) {
  console.log(status);

  const api = useApiClient();
  const toast = useToast();

  const deleteTicket = async (ticketId: string) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        api
          .remove<ApiResponse<Ticket>>(`/tickets/delete/${ticketId}`)
          .then((response) => {
            toast({
              description: `Ticket eliminado exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            fetchTickets();
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log("catched error!");
            if (error.response && error.response.data) {
              console.log(error.response.data);
              const message = (error.response.data as ErrorResponseData)
                .message;
              console.log(`error is ` + message);
              toast({
                title: "Error",
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          });
      }, timeout);
    });
  };

  return (
    <Tr>
      <Td>{`${id.padStart(6, "0")}`}</Td>
      <Td>{fullName}</Td>
      <Td>{reason}</Td>
      <Td>{serviceNumber}</Td>
      <Td>
        {status === "Abierto" ? (
          <Badge size={"xl"} colorScheme={"green"} p={2}>
            ABIERTO
          </Badge>
        ) : status === "En Proceso" ? (
          <Badge size={"xl"} colorScheme={"yellow"} p={2}>
            EN PROCESO
          </Badge>
        ) : status === "Cerrado" ? (
          <Badge size={"xl"} colorScheme={"red"} p={2}>
            CERRADO
          </Badge>
        ) : (
          ""
        )}
      </Td>
      <Td>{timeAgo(createdAt)}</Td>
      <Td>
        {priority === 1 ? (
          <Badge size={"xl"} colorScheme={"green"} p={2}>
            BAJA
          </Badge>
        ) : priority === 2 ? (
          <Badge size={"xl"} colorScheme={"yellow"} p={2}>
            MEDIA
          </Badge>
        ) : priority === 3 ? (
          <Badge size={"xl"} colorScheme={"red"} p={2}>
            ALTA
          </Badge>
        ) : (
          ""
        )}
      </Td>
      <Td>
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"full"}>
            Acción
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={`view/${id}`} icon={<FaEye />}>
              Ver más información del Ticket
            </MenuItem>
            {/*             <MenuItem as={Link} to={`update/${id}`} icon={<FaPencilAlt />}>
              Editar información del Ticket
            </MenuItem>
            <MenuItem as={Link} to={`update/${id}`} icon={<FaPrint />}>
              Imprimir información del Ticket
            </MenuItem> */}
            <MenuItem icon={<FaTrash />} onClick={() => deleteTicket(id)}>
              Eliminar Ticket
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default TicketRow;
