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
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt, FaPowerOff } from "react-icons/fa";
import { Employee } from "../../interfaces/app/Employee";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import useApiClient from "../../hooks/useApiClient";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { AxiosError } from "axios";

interface ClientRow {
  id: number;
  image: string;
  index: number;
  firstNames: string;
  lastNames: string;
  fetchEmployees: () => void;
}

interface DeleteEmployeeModalProps {
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
  fetchEmployees: () => void;
}

function DeleteEmployeeModal({
  employeeId,
  isOpen,
  onClose,
  fetchEmployees,
}: DeleteEmployeeModalProps) {
  const toast = useToast();
  const api = useApiClient();

  const deleteEmployee = async (employeeId: number) => {
    return new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .remove<ApiResponse<Employee>>(`/employees/delete/${employeeId}`)
          .then((response) => {
            console.log(response.status);
            toast({
              title: "Funcionó!",
              description: "El empleado ha sido eliminado exitosamente",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            resolve(response.data);
            onClose();
            fetchEmployees();
          })
          .catch((error: AxiosError) => {
            if (error.response && error.response.data) {
              console.log(error.response.data);
              const message = (error.response.data as ErrorResponseData)
                .message;
              toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
            reject(error);
          });
      }, timeout);
    });
  };

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
            al desarollador.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteEmployee(employeeId);
            }}
            mr={2}
          >
            Eliminar de todos modos
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function EmployeeRow({
  id,
  index,
  firstNames,
  lastNames,
  image,
  fetchEmployees,
}: ClientRow) {
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
      <DeleteEmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        employeeId={id}
        fetchEmployees={fetchEmployees}
      />
    </Tr>
  );
}

export default EmployeeRow;
