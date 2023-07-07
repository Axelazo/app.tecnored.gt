import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaPencilAlt,
  FaPowerOff,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

interface ClientRow {
  index: Number;
  firstNames: string;
  lastNames: string;
}

function EmployeeRow({ index, firstNames, lastNames }: ClientRow) {
  return (
    <Tr>
      <Td>{firstNames}</Td>
      <Td>{lastNames}</Td>
      <Td>
        <Tag size={"lg"} variant="subtle" colorScheme="green">
          <TagLabel>Activo</TagLabel>
        </Tag>
      </Td>
      <Td>
        <Menu isLazy>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"full"}>
            Acción
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={`view/${index}`} icon={<FaEye />}>
              Ver más información
            </MenuItem>
            <MenuItem as={Link} to={`update/${index}`} icon={<FaPencilAlt />}>
              Editar información
            </MenuItem>
            <MenuItem icon={<FaPlusCircle />}>
              Ver bonificaciones del mes
            </MenuItem>
            <MenuItem icon={<FaMinusCircle />}>
              Ver penalizaciones del mes
            </MenuItem>
            <MenuItem icon={<FaPowerOff />}>
              Iniciar proceso de despido
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default EmployeeRow;
