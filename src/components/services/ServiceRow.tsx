import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import {
  FaInfoCircle,
  FaPowerOff,
  FaFileInvoiceDollar,
  FaTicketAlt,
  FaMap,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { OnlineServiceIndicator } from "./OnlineServiceIndicator";
import { NavLink } from "react-router-dom";

export interface ServiceRow {
  index: number;
  id: number;
  serviceNumber: string;
  ipAddress: string;
  planName: string;
  planSpeed: string;
  planPrice: string;
  planStatus: string;
  establishmentName: string;
  serviceStatus: string;
}

export function ServiceRow({
  index,
  serviceNumber,
  ipAddress,
  planName,
  planPrice,
  planSpeed,
  planStatus,
  establishmentName,
  serviceStatus,
}: ServiceRow) {
  return (
    <Tr>
      <Td>{serviceNumber}</Td>
      <Td>{ipAddress}</Td>
      <Td>{planName}</Td>
      <Td>{`Q.${planPrice}.00`}</Td>
      <Td>{`${planSpeed} mbps`}</Td>
      <Td>{establishmentName}</Td>
      <Td>{planStatus}</Td>
      <Td>
        <OnlineServiceIndicator />
      </Td>
      <Td>
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"full"}>
            Acción
          </MenuButton>
          <MenuList>
            {/* <MenuItem icon={<FaInfoCircle />}>Ver más información</MenuItem>
                         <MenuItem icon={<MdEdit />}>Modificar servicio </MenuItem>
            <MenuItem icon={<FaPowerOff />}>Desactivar servicio</MenuItem>
            <MenuDivider />
            <MenuItem icon={<FaFileInvoiceDollar />}>Generar factura</MenuItem>
            <MenuItem icon={<FaFileInvoiceDollar />}>
              Historial de pagos
            </MenuItem>
            <MenuDivider /> */}

            <MenuItem
              icon={<FaTicketAlt />}
              as={NavLink}
              to={"/support/create"}
            >
              Crear un nuevo ticket de soporte
            </MenuItem>
            <MenuItem icon={<FaMap />}>Ver en el mapa</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
