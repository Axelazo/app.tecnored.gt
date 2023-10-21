import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Spinner,
  Text,
  Flex,
  Td,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import { Employee } from "../../interfaces/app/Employee";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { useEffect, useState } from "react";
import EmployeesRow from "./EmployeesRow";

function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApiClient();

  const clientsResponse = async () => {
    return new Promise<Employee[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Employee[]>>("/employees")
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            //addtoast
            reject(reason);
          });
      }, timeout);
    });
  };

  const fetchEmployees = async () => {
    await clientsResponse()
      .then((clients) => {
        if (clients) {
          setEmployees(clients);
        } else {
          setEmployees([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after data fetching
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Foto</Th>
            <Th>Nombres</Th>
            <Th>Apellidos</Th>
            <Th>Estado</Th>
            <Th>Administrar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? ( // Show spinner while loading
            <Tr>
              <Td colSpan={8}>
                <Flex
                  flexGrow={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Spinner size={"sm"} />
                </Flex>
              </Td>
            </Tr>
          ) : employees && employees.length > 0 ? (
            employees.map((employee, index) => {
              return (
                <EmployeesRow
                  id={employee.id}
                  key={index}
                  index={employee.id}
                  image={employee.profileUrl}
                  firstNames={employee.person.firstNames}
                  lastNames={employee.person.lastNames}
                  fetchEmployees={fetchEmployees}
                />
              );
            })
          ) : (
            <Tr>
              <Td colSpan={5} h={"64vh"}>
                <Text w={"full"} textAlign={"center"}>
                  No se han encontrado empleados
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesTable;
