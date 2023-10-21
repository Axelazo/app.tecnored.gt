import {
  Box,
  Card,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { EmployeeAllowancesAndDeductionsTable } from "../../components/employees/ViewEmployee";
import { useAuth } from "../../hooks/useAuth";
import { ageAtDate } from "../../helpers/time";
import useApiClient from "../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Employee } from "../../interfaces/app/Employee";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";

export default function MyPortal() {
  const [employee, setEmployee] = useState<Employee | null>(null);

  const api = useApiClient();
  const { user } = useAuth();

  const employeeResponse = async (employeeId: number | undefined) => {
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
    employeeResponse(user?.employeeId)
      .then((employee) => {
        setEmployee(employee);
        console.log(employee);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!employee) {
    return;
  }

  return (
    <Card w={"full"}>
      <Stack direction={{ base: "column" }}>
        <Box>
          <Stack w={"full"}>
            <Stack
              alignItems={{ base: "center", md: "start" }}
              direction={{ base: "row" }}
              alignContent={"center"}
              p={8}
            >
              <Stack w={"full"} pt={4}>
                <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }}>
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
                      <Text fontWeight={"bold"}>
                        {employee.person.lastNames}
                      </Text>
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
                    <ListItem>
                      <Text
                        textTransform={"uppercase"}
                        fontSize={"sm"}
                        fontWeight={"light"}
                      >
                        Correo electrónico corporativo:
                      </Text>
                      <Text fontWeight={"bold"}>
                        {`${employee.person.firstNames
                          .split(" ")[0]
                          .toLowerCase()}.${employee.person.lastNames
                          .split(" ")[0]
                          .toLowerCase()}@tecnored.gt`}
                      </Text>
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box p={4}>
          <Heading ml={4} size={"md"}>
            Tus bonificaciones y penalizaciones del mes
          </Heading>
          <EmployeeAllowancesAndDeductionsTable id={user?.employeeId} />
        </Box>
      </Stack>
    </Card>
  );
}
