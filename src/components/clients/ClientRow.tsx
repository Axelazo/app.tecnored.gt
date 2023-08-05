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
import { FaEye, FaPencilAlt, FaPowerOff } from "react-icons/fa";

interface ClientRow {
  index: number;
  firstNames: string;
  lastNames: string;
}

function ClientRow({ index, firstNames, lastNames }: ClientRow) {
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
            <MenuItem icon={<FaPowerOff />}>Desactivar cliente</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default ClientRow;
