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
  Td,
  Text,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaTicketAlt, FaMap, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { OnlineServiceIndicator } from "./OnlineServiceIndicator";
import { NavLink } from "react-router-dom";
import { AxiosError } from "axios";
import useApiClient from "../../hooks/useApiClient";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { Service } from "../../interfaces/app/Service";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";

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
  fetchServices: () => void;
}

interface DeleteServiceModalProps {
  serviceId: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  fetchServices: () => void;
}

function DeleteServiceModal({
  serviceId,
  isOpen,
  onClose,
  fetchServices,
}: DeleteServiceModalProps) {
  const toast = useToast();
  const api = useApiClient();

  const deleteService = async (serviceId: number) => {
    return new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .remove<ApiResponse<Service>>(`/services/delete/${serviceId}`)
          .then((response) => {
            console.log(response.status);
            toast({
              title: "Funcionó!",
              description: "El servicio ha sido eliminado exitosamente",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            resolve(response.data);
            onClose();
            fetchServices();
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
        <ModalHeader>Solicitar Eliminación de un Servicio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Eliminar un servicio es una tarea compleja que involucra no solo
            muchas operaciones en este sistema, si no que ademas involucra
            muchas actividades (recogida de equipos, eliminación de Routerboard,
            etc) que no están contempladas en este mismo.
            <br /> <br />
            Si desea solicitar la eliminación de un Servicio, deberá contactar
            al desarollador.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => {
              deleteService(serviceId);
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

export function ServiceRow({
  id,
  index,
  serviceNumber,
  ipAddress,
  planName,
  planPrice,
  planSpeed,
  planStatus,
  establishmentName,
  serviceStatus,
  fetchServices,
}: ServiceRow) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
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
              <MenuItem icon={<FaMap />} as={NavLink} to={"/monitoring"}>
                Ver en el mapa
              </MenuItem>
              <MenuItem icon={<FaTrash />} onClick={onOpen}>
                Eliminar servicio
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <DeleteServiceModal
        isOpen={isOpen}
        onClose={onClose}
        serviceId={id}
        fetchServices={fetchServices}
      />
    </>
  );
}
