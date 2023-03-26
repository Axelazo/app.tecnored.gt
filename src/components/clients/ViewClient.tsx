import {
  Spinner,
  Text,
  Flex,
  Stack,
  Button,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Td,
  Select,
  HStack,
  Tag,
  Box,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ApiClient from "api/api";
import PageHeader from "components/common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAdd, MdEdit, MdPrint } from "react-icons/md";
import {
  FaFileInvoiceDollar,
  FaInfoCircle,
  FaMap,
  FaPowerOff,
  FaTicketAlt,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { formatDistanceToNow, parseISO } from "date-fns";
import es from "date-fns/locale/es";
import { Client } from "interfaces/app/Client";
import { ApiResponse } from "interfaces/types/ApiResponse";
import {
  getDepartment,
  getMunicipalitiesFromDepartment,
  getMunicipalityFromDepartment,
} from "lib/guatemala-picker";

function timeAgo(date: Date) {
  const formatedDate = parseISO(date.toString());
  const timeAgo = formatDistanceToNow(formatedDate, {
    addSuffix: true,
    locale: es,
  });
  return timeAgo;
}

function ViewClient() {
  const [client, setClient] = useState<Client | null>(null);
  const { id } = useParams();

  const api = ApiClient();
  const clientId = id ? parseInt(id) : undefined;

  useEffect(() => {
    const clientResponse = async () => {
      return new Promise<Client>((resolve, reject) => {
        const timeout = Math.floor(Math.random() * 1); // Random wait time between 1-3 seconds
        setTimeout(() => {
          api
            .get<ApiResponse<Client>>(`/clients/${clientId}`)
            .then((response) => {
              resolve(response.data);
            })
            .catch((reason: AxiosError) => {
              //addtoast
              reject(reason);
            });
        }, timeout);
      });
    };

    clientResponse()
      .then((client) => {
        setClient(client);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!client) {
    return (
      <Flex
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        minH={"67vh"}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <Stack w={"full"}>
      <PageHeader title="Ver información del cliente" size={"2xl"}>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<MdPrint />}
            rightIcon={<ChevronDownIcon />}
          >
            Imprimir información
          </MenuButton>
          <Portal>
            <MenuList w={"full"}>
              <MenuItem icon={<FaFilePdf />}>Formato PDF (.pdf)</MenuItem>
              <MenuItem icon={<FaFileExcel />}>Formato Excel (.xlsx)</MenuItem>
            </MenuList>
          </Portal>
        </Menu>

        <Button
          leftIcon={<MdEdit />}
          colorScheme="teal"
          variant="solid"
          as={NavLink}
          to={`/clients/update/${clientId}`}
          relative="path"
        >
          Editar información del cliente
        </Button>
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="orange"
          variant="solid"
          as={NavLink}
          to={"/clients"}
          relative="path"
        >
          Regresar a la Lista de Clientes
        </Button>
      </PageHeader>
      <Flex>
        <Stack w={"full"}>
          <Box>
            <HStack justifyContent={{ base: "center", md: "start" }}>
              <HStack>
                <Text fontWeight={"bold"}>Número de Cliente: </Text>
                <Tag colorScheme={"blue"}>{client.clientNumber}</Tag>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"}>Servicios: </Text>
                <Tag colorScheme={"blue"}>2</Tag>
              </HStack>
              <HStack>
                <Text fontWeight={"bold"}>Cliente desde: </Text>
                <Tag colorScheme={"blue"}>{`${timeAgo(client.createdAt)}`}</Tag>
              </HStack>
            </HStack>
          </Box>
          <Box py={4}>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Nombres</Text>
                <Text>{client.person.firstNames}</Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Apellidos</Text>
                <Text>{client.person.lastNames}</Text>
              </Box>
            </Stack>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Número de DPI:</Text>
                <Text>{client.person.dpi.number}</Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Número de NIT: </Text>
                <Text>{client.person.nitNumber}</Text>
              </Box>
            </Stack>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Correo electrónico</Text>
                <Text>{client.person.email}</Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Teléfonos</Text>
                {client.person.phones.map((phone, index) => {
                  return <Text key={index}>{phone.number}</Text>;
                })}
              </Box>
            </Stack>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Dirección: </Text>
                <Text>{client.person.address.street}</Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Localidad:</Text>
                <Text>{client.person.address.locality}</Text>
              </Box>
            </Stack>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Municipio: </Text>
                <Text>{client.person.address.municipality.name}</Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Departamento:</Text>
                <Text>{client.person.address.department.name}</Text>
              </Box>
            </Stack>
            <Stack w={"full"} direction={{ base: "row" }}>
              <Box w={"full"}>
                <Text fontWeight={"bold"}>Código postal: </Text>
                <Text>{client.person.address.zipCode}</Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Flex w={"full"} display={{ base: "none", md: "block" }}>
          <HStack w={"full"}>
            <Flex w={"full"} maxH={"15rem"}>
              <Image
                src={client.person.dpi.dpiFrontUrl}
                objectFit={"contain"}
              />
            </Flex>
            <Flex w={"full"} maxH={"15rem"}>
              <Image src={client.person.dpi.dpiBackUrl} objectFit={"contain"} />
            </Flex>
          </HStack>
        </Flex>
      </Flex>

      <HStack flexGrow={1}>
        <Flex
          flexGrow={1}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Heading fontSize={"2xl"}>Servicios asociados:</Heading>
          <Button leftIcon={<MdAdd />} colorScheme="green" variant="solid">
            Agregar un nuevo servicio
          </Button>
        </Flex>
      </HStack>
      <HStack>
        <Flex w={"full"}>
          <Text>Mostrando los servicios asociados al cliente en:</Text>
        </Flex>
        <Select defaultValue={1}>
          <option value={1}>Todas partes</option>
          <option value={2}>Machaquila</option>
          <option value={2}>Dolores</option>
          <option value={2}>Calzada Mopán</option>
        </Select>
      </HStack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No. de Servicio</Th>
              <Th>Dirección IP</Th>
              <Th>Plan</Th>
              <Th>Velocidad</Th>
              <Th>Ubicación</Th>
              <Th>Estado</Th>
              <Th>Conectividad</Th>
              <Th>Administrar</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>55375929</Td>
              <Td>192.168.3.20</Td>
              <Td>Plan básico</Td>
              <Td>5 mbps</Td>
              <Td>Machaquila</Td>
              <Td>Activo</Td>
              <Td>Conectado</Td>
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
                    <MenuItem icon={<FaInfoCircle />}>
                      Ver más información
                    </MenuItem>
                    <MenuItem icon={<MdEdit />}>Modificar servicio </MenuItem>
                    <MenuItem icon={<FaPowerOff />}>
                      Desactivar servicio
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<FaFileInvoiceDollar />}>
                      Generar factura
                    </MenuItem>
                    <MenuItem icon={<FaFileInvoiceDollar />}>
                      Historial de pagos
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem icon={<FaTicketAlt />}>
                      Crear un nuevo ticket de soporte
                    </MenuItem>
                    <MenuItem icon={<FaMap />}>Ver en el mapa</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ViewClient;
