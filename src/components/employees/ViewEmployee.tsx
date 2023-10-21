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
  SimpleGrid,
  List,
  ListItem,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagLabel,
  TagLeftIcon,
  useDisclosure,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useApiClient from "../../hooks/useApiClient";
import PageHeader from "../common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  MdAddCircle,
  MdEdit,
  MdMonetizationOn,
  MdPrint,
  MdRemoveCircle,
} from "react-icons/md";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { AddIcon, ChevronDownIcon, MinusIcon } from "@chakra-ui/icons";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Employee } from "../../interfaces/app/Employee";
import { ageAtDate, formatDate, timeAgo } from "../../helpers/time";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Timestamps } from "../../interfaces/misc/Timestamps";
import { AddAllowanceModal, AddDeductionModal } from "./Modals";

ChartJS.register(CategoryScale);

interface EmployeeAllowancesAndDeductions extends Timestamps {
  id: number;
  amount: number;
  description: string;
  type: "allowance" | "deduction";
}

export interface EmployeeAllowancesAndDeductionsTableProps {
  id: string;
  random: number;
}

export function EmployeeAllowancesAndDeductionsTable({
  id,
  random,
}: EmployeeAllowancesAndDeductionsTableProps) {
  const api = useApiClient();
  const [employeeAllowancesAndDeductions, setEmployeeAllowancesAndDeductions] =
    useState<EmployeeAllowancesAndDeductions[]>([]);

  const fetchAllowances = () => {
    api
      .get<ApiResponse<EmployeeAllowancesAndDeductions[]>>(
        `/allowances/employees/${id}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          updateEmployeeAllowancesAndDeductions([]);
          updateEmployeeAllowancesAndDeductions(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDeductions = () => {
    api
      .get<ApiResponse<EmployeeAllowancesAndDeductions[]>>(
        `/deductions/employees/${id}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          updateEmployeeAllowancesAndDeductions([]);
          updateEmployeeAllowancesAndDeductions(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEmployeeAllowancesAndDeductions = (
    newDeductions: EmployeeAllowancesAndDeductions[]
  ) => {
    // Merge the new deductions with existing allowances and sort by creation date

    setEmployeeAllowancesAndDeductions((previousState) => {
      const updatedData = [...previousState, ...newDeductions];
      return updatedData;
    });
  };

  useEffect(() => {
    const empty: EmployeeAllowancesAndDeductions[] = [];
    setEmployeeAllowancesAndDeductions(empty);

    try {
      fetchAllowances();
    } catch (error) {
      console.log(error);
    }

    try {
      fetchDeductions();
    } catch (error) {
      console.log(error);
    }
  }, [random]);

  return (
    <TableContainer maxH={"350px"} overflowY={"scroll"}>
      <Table variant="simple">
        <TableCaption>
          Bonificaciones consignadas durante el mes actual, para ver más elabore
          un reporte
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
            <Th>Fecha</Th>
            <Th isNumeric>Monto</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employeeAllowancesAndDeductions?.map(
            (employeeAllowancesAndDeduction) => {
              return (
                <Tr key={employeeAllowancesAndDeduction.id}>
                  <Td>{employeeAllowancesAndDeduction.description}</Td>
                  <Td>
                    {formatDate(employeeAllowancesAndDeduction.createdAt)}
                  </Td>
                  <Td isNumeric>
                    <Tag
                      size={"md"}
                      colorScheme={
                        employeeAllowancesAndDeduction.type === "allowance"
                          ? "green"
                          : "red"
                      }
                    >
                      <TagLeftIcon
                        boxSize="12px"
                        as={
                          employeeAllowancesAndDeduction.type === "allowance"
                            ? AddIcon
                            : MinusIcon
                        }
                      />
                      <TagLabel>{`Q.${employeeAllowancesAndDeduction.amount}.00`}</TagLabel>
                    </Tag>
                  </Td>
                </Tr>
              );
            }
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function ViewEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeductionOpen,
    onOpen: onDeductionOpen,
    onClose: onDeductionClose,
  } = useDisclosure();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams();
  const [random, setRandom] = useState(0);
  const api = useApiClient();
  const employeeId = id ? parseInt(id) : undefined;

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

  useEffect(() => {
    employeeResponse()
      .then((employee) => {
        setEmployee(employee);
        console.log(employee);
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
          {/*           <MenuButton
            as={Button}
            leftIcon={<MdPrint />}
            rightIcon={<ChevronDownIcon />}
          >
            Imprimir información
          </MenuButton> */}
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
            {/*             <Stack>
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
                    {`${employee.employeePositionMapping[0].position.name}`}
                  </Text>
                </Box>
              </Stack>
            </Stack> */}
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
              {/*               <Menu>
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
              </Menu> */}
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
                    <MenuItem
                      icon={<MdAddCircle />}
                      onClick={() => {
                        onOpen();
                      }}
                    >
                      Agregar bonificación
                    </MenuItem>
                    <MenuItem
                      icon={<MdRemoveCircle />}
                      onClick={onDeductionOpen}
                    >
                      Agregar penalización
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </HStack>
            <EmployeeAllowancesAndDeductionsTable id={id} random={random} />
          </Stack>
        </Stack>
      </Stack>
      <AddAllowanceModal
        isOpen={isOpen}
        onClose={onClose}
        employeeId={employeeId}
        fetchAllowancesAndDeductions={() => {
          setRandom(Math.random());
        }}
      />
      <AddDeductionModal
        isOpen={isDeductionOpen}
        onClose={onDeductionClose}
        employeeId={employeeId}
        fetchAllowancesAndDeductions={() => {
          setRandom(Math.random());
        }}
      />
    </Stack>
  );
}

export default ViewEmployee;
