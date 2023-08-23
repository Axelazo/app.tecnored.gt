import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaEye,
  FaPencilAlt,
  FaPowerOff,
  FaPrint,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function TicketsTable() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No. de Ticket</Th>
            <Th>Cliente</Th>
            <Th>Asunto</Th>
            <Th>No. Servicio</Th>
            <Th>Estado</Th>
            <Th>Fecha de Creación</Th>
            <Th>Prioridad</Th>
            <Th>Administrar</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>000001</Td>
            <Td>Julian Perez Poc</Td>
            <Td>Corte de Internet</Td>
            <Td>23234689</Td>
            <Td>
              <Badge size={"xl"} colorScheme={"green"} p={2}>
                NUEVO
              </Badge>
            </Td>
            <Td>Joselin</Td>
            <Td>
              <Badge size={"xl"} colorScheme={"red"} p={2}>
                URGENTE
              </Badge>
            </Td>
            <Td>
              <Menu isLazy>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  w={"full"}
                >
                  Acción
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to={`view/${1}`} icon={<FaEye />}>
                    Ver más información del Ticket
                  </MenuItem>
                  <MenuItem as={Link} to={`update/${1}`} icon={<FaPencilAlt />}>
                    Editar información del Ticket
                  </MenuItem>
                  <MenuItem as={Link} to={`update/${1}`} icon={<FaPrint />}>
                    Imprimir información del Ticket
                  </MenuItem>
                  <MenuItem icon={<FaTrash />}>Eliminar Ticket</MenuItem>
                </MenuList>
              </Menu>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TicketsTable;
