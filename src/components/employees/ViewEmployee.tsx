import {
  Spinner,
  Text,
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  HStack,
  Tag,
  Box,
  Image,
  VStack,
  SimpleGrid,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import PageHeader from "../common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  MdAdd,
  MdAddCircle,
  MdAttachMoney,
  MdEdit,
  MdMonetizationOn,
  MdPrint,
  MdRemove,
  MdRemoveCircle,
} from "react-icons/md";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { AddIcon, ChevronDownIcon, MinusIcon } from "@chakra-ui/icons";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Employee } from "../../interfaces/app/Employee";
import { ageAtDate } from "../../helpers/time";
import { Bar, Line } from "react-chartjs-2";

function ViewEmployee() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams();

  const api = useApiClient();
  const employeeId = id ? parseInt(id) : undefined;

  useEffect(() => {
    const employeeResponse = async () => {
      return new Promise<Employee>((resolve, reject) => {
        const timeout = Math.floor(Math.random() * 1); // Random wait time between 1-3 seconds
        setTimeout(() => {
          api
            .get<ApiResponse<Employee>>(`/employees/${employeeId}`)
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

    employeeResponse()
      .then((employee) => {
        setEmployee(employee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!employee) {
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

  const options = {
    responsive: true,
    layout: {
      padding: 5,
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === "number") {
              return `Q. ${value}`;
            }
            return value;
          },
          min: 3000,
          max: 9000,
        },
        centerLabel: true, // To center the data points on the line chart
      },
    },
  };

  return (
    <Stack w={"full"}>
      <PageHeader title="Ver información del empleado" size={"2xl"}>
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
          to={`/employees/update/${employeeId}`}
          relative="path"
        >
          Editar información del empleado
        </Button>
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="orange"
          variant="solid"
          as={NavLink}
          to={"/employees"}
          relative="path"
        >
          Regresar a la Lista de Empleados
        </Button>
      </PageHeader>
      <Stack>
        <Stack w={"full"}>
          <Stack
            alignItems={{ base: "center", md: "start" }}
            direction={{ base: "column", md: "row" }}
            alignContent={"center"}
          >
            <Stack>
              <Image
                src={employee.profileUrl}
                objectFit={"contain"}
                maxW={256}
                p={4}
              />
              <Stack justifyContent={"center"} w={"full"}>
                <Box textAlign={"center"}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    {`${employee.person.firstNames.split(" ")[0]} ${
                      employee.person.lastNames.split(" ")[0]
                    }`}
                  </Text>
                  <Text fontSize={"xl"} fontWeight={"light"}>
                    {`${employee.position.name}`}
                  </Text>
                </Box>
              </Stack>
            </Stack>
            <Stack w={"full"} pt={4}>
              <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }}>
                <List spacing={4}>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Nombres
                    </Text>
                    <Text fontWeight={"bold"}>
                      {employee.person.firstNames}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Apellidos
                    </Text>
                    <Text fontWeight={"bold"}>{employee.person.lastNames}</Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Número de DPI:
                    </Text>
                    <Text fontWeight={"bold"}>
                      {employee.person.dpi.number}
                    </Text>
                  </ListItem>
                </List>
                <List spacing={4}>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Número de NIT:{" "}
                    </Text>
                    <Text fontWeight={"bold"}>{employee.person.nitNumber}</Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Fecha de Nacimiento:{" "}
                    </Text>
                    <Text fontWeight={"bold"}>
                      {ageAtDate(employee.person.birthday)}
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Dirección:{" "}
                    </Text>
                    <Text fontWeight={"bold"}>
                      {`${employee.person.address.street}, ${employee.person.address.locality}, ${employee.person.address.municipality.name}, ${employee.person.address.department.name}`}
                    </Text>
                  </ListItem>
                </List>
                <List spacing={4}>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Teléfonos:{" "}
                    </Text>
                    {employee.person.phones.map((phone, index) => {
                      return (
                        <Text key={index} fontWeight={"bold"}>
                          {phone.number}
                        </Text>
                      );
                    })}
                  </ListItem>
                  <ListItem>
                    <Text
                      textTransform={"uppercase"}
                      fontSize={"sm"}
                      fontWeight={"light"}
                    >
                      Correo electrónico:
                    </Text>
                    <Text fontWeight={"bold"}>{employee.person.email}</Text>
                  </ListItem>
                </List>
              </SimpleGrid>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          w={"full"}
          pt={4}
          direction={{ base: "column", lg: "row" }}
          spacing={8}
        >
          <Stack w={{ base: "full", md: "50%" }}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                Historial de Sueldos
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<MdMonetizationOn />}
                  rightIcon={<ChevronDownIcon />}
                >
                  Iniciar Proceso
                </MenuButton>
                <Portal>
                  <MenuList w={"full"}>
                    <MenuItem icon={<MdAddCircle />}>Aumentar Sueldo</MenuItem>
                    <MenuItem icon={<MdRemoveCircle />}>
                      Disminuir Sueldo
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>

            <Line
              height={"150px"}
              data={{
                labels: employee.salaries.map((salary) => {
                  return salary.start.toString().split("T")[0];
                }),
                datasets: [
                  {
                    label: "Sueldo",
                    data: employee.salaries.map((salary) => {
                      return salary.amount;
                    }),
                  },
                ],
              }}
              options={options}
            />
          </Stack>
          <Stack w={{ base: "full", md: "50%" }}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                Bonificaciones / Penalizaciones (mes)
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<MdEdit />}
                  rightIcon={<ChevronDownIcon />}
                >
                  Iniciar Proceso
                </MenuButton>
                <Portal>
                  <MenuList w={"full"}>
                    <MenuItem icon={<MdAddCircle />}>
                      Agregar bonificación
                    </MenuItem>
                    <MenuItem icon={<MdRemoveCircle />}>
                      Agregar penalización
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>

            <TableContainer maxH={"350px"} overflowY={"scroll"}>
              <Table variant="simple">
                <TableCaption>
                  Bonificaciones consignadas durante el mes actual, para ver más
                  elabore un reporte
                </TableCaption>
                <Thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    background: "white",
                  }}
                >
                  <Tr>
                    <Th>Descripción</Th>
                    <Th isNumeric>Monto</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Instalación</Td>
                    <Td isNumeric>
                      <Tag size={"md"} colorScheme="red">
                        <TagLeftIcon boxSize="12px" as={MinusIcon} />
                        <TagLabel>Q 25.00</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Instalación</Td>
                    <Td isNumeric>
                      <Tag size={"md"} colorScheme="green">
                        <TagLeftIcon boxSize="12px" as={AddIcon} />
                        <TagLabel>Q 25.00</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Instalación</Td>
                    <Td isNumeric>
                      <Tag size={"md"} colorScheme="green">
                        <TagLeftIcon boxSize="12px" as={AddIcon} />
                        <TagLabel>Q 25.00</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Instalación</Td>
                    <Td isNumeric>
                      <Tag size={"md"} colorScheme="green">
                        <TagLeftIcon boxSize="12px" as={AddIcon} />
                        <TagLabel>Q 25.00</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ViewEmployee;
