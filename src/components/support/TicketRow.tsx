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
} from "@chakra-ui/react";
import { FaEye, FaPencilAlt, FaPrint, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/time";
import parseISO from "date-fns/parseISO";

interface TicketRow {
  index: number;
  id: string;
  fullName: string;
  reason: string;
  serviceNumber: string;
  status: string;
  createdAt: string;
  priority: number;
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
}: TicketRow) {
  console.log(status);
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
            <MenuItem as={Link} to={`update/${id}`} icon={<FaPencilAlt />}>
              Editar información del Ticket
            </MenuItem>
            <MenuItem as={Link} to={`update/${id}`} icon={<FaPrint />}>
              Imprimir información del Ticket
            </MenuItem>
            <MenuItem icon={<FaTrash />}>Eliminar Ticket</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default TicketRow;
