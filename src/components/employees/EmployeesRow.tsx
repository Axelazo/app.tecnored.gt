import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  Td,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
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
  image: string;
  index: number;
  firstNames: string;
  lastNames: string;
}

interface DeleteEmployeeModalProps {
  employeeId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  fetchAllowancesAndDeductions: () => void;
}

function DeleteEmployeeModal({ isOpen, onClose }: DeleteEmployeeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Solicitar Eliminación de un Empleado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Eliminar un empleado es una tarea compleja que involucra no solo
            muchas operaciones en este sistema, si no que ademas involucra
            muchas actividades (IGSS, accessos, etc) que no están contempladas
            en este mismo.
            <br /> <br />
            Si desea solicitar la eliminación de un empleado, deberá contactar
            al administrador.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function EmployeeRow({ index, firstNames, lastNames, image }: ClientRow) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Tr>
      <Td>
        <Avatar src={image} />
      </Td>
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
            {/*             <MenuItem icon={<FaPlusCircle />}>
              Ver bonificaciones del mes
            </MenuItem>
            <MenuItem icon={<FaMinusCircle />}>
              Ver penalizaciones del mes
            </MenuItem> */}
            <MenuItem icon={<FaPowerOff />} onClick={() => onOpen()}>
              Eliminar empleado
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
      <DeleteEmployeeModal isOpen={isOpen} onClose={onClose} />
    </Tr>
  );
}

export default EmployeeRow;
