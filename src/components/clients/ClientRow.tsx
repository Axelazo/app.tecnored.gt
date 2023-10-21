import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt, FaPowerOff } from "react-icons/fa";
import useApiClient from "../../hooks/useApiClient";
import { Client } from "../../interfaces/app/Client";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";

interface DeleteClientModalProps {
  clientId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  fetchClients: () => void;
}

function DeleteClientModal({
  isOpen,
  onClose,
  clientId,
  fetchClients,
}: DeleteClientModalProps) {
  const toast = useToast();
  const api = useApiClient();

  const deleteClient = async (clientId: number) => {
    return new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .remove<ApiResponse<Client>>(`/clients/delete/${clientId}`)
          .then((response) => {
            console.log(response.status);
            toast({
              title: "Funcionó!",
              description:
                "El cliente solicitado ha sido eliminado exitosamente",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            onClose();
            fetchClients();
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
        <ModalHeader>Solicitar eliminación de un Cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Eliminar un cliente es una tarea compleja que involucra no solo
            muchas operaciones en este sistema, si no que ademas involucra
            muchas actividades (recogida de equipos, eliminación de accesos,
            liquidaciónn de saldos pendiente) que no están contempladas en este
            mismo.
            <br /> <br />
            Si desea solicitar la eliminación de un cliente, deberá contactar al
            desarrollador.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteClient(clientId);
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

interface ClientRow {
  id?: number;
  index: number;
  firstNames: string;
  lastNames: string;
  fetchClients: () => void;
}

function ClientRow({
  id,
  index,
  firstNames,
  lastNames,
  fetchClients,
}: ClientRow) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
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
              <MenuItem icon={<FaPowerOff />} onClick={onOpen}>
                Eliminar Cliente
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <DeleteClientModal
        isOpen={isOpen}
        onClose={onClose}
        clientId={id}
        fetchClients={fetchClients}
      />
    </>
  );
}

export default ClientRow;
