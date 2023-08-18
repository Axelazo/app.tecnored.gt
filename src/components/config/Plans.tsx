import {
  Flex,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Plan } from "../../interfaces/app/Plan";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEye, FaPencilAlt, FaPowerOff } from "react-icons/fa";

export function Plans() {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const toast = useToast();
  const api = useApiClient();

  const fetchPlans = () => {
    plansResponse()
      .then((plans) => {
        if (plans) {
          setPlans(plans);
        } else {
          setPlans([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });
  };

  const deletePlan = async (id: number) => {
    return new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .remove<ApiResponse<Plan>>(`/plans/delete/${id}`)
          .then((response) => {
            console.log(response.status);
            toast({
              title: "Funcionó!",
              description: "El plan solicitado ha sido eliminado exitosamente",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            fetchPlans();
          })
          .catch((reason: AxiosError) => {
            toast({
              title: "Error",
              description: "El plan solicitado no ha sido encontrado",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            reject(reason);
          });
      }, timeout);
    });
  };

  const plansResponse = async () => {
    return new Promise<Plan[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Plan[]>>("/plans")
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            reject(reason);
          });
      }, timeout);
    });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (!plans) {
    return (
      <Flex
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        minH={"68vh"}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  return (
    <Stack w={"full"}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre del plan</Th>
              <Th>Precio</Th>
              <Th>Velocidad</Th>
              <Th>Administrar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {plans.length > 0 ? (
              plans?.map((plan, index) => {
                return (
                  <Tr key={index}>
                    <Td>{plan.name}</Td>
                    <Td>{`Q.${plan.price}`}</Td>
                    <Td>{`${plan.speed} mbps`}</Td>
                    <Td>
                      {" "}
                      <Menu isLazy>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          w={"full"}
                        >
                          Acción
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            as={Link}
                            to={`view/${index}`}
                            icon={<FaEye />}
                          >
                            Ver más información
                          </MenuItem>
                          <MenuItem
                            as={Link}
                            to={`update/${index}`}
                            icon={<FaPencilAlt />}
                          >
                            Editar información
                          </MenuItem>
                          <MenuItem
                            icon={<FaPowerOff />}
                            onClick={() => deletePlan(plan.id)}
                          >
                            Eliminar plan
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={5} h={"55vh"}>
                  <Text w={"full"} textAlign={"center"}>
                    No se han encontrado planes
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
