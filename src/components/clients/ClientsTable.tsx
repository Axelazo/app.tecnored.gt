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
import ApiClient from "api/api";
import { AxiosError } from "axios";
import { Client } from "interfaces/app/Client";
import { ApiResponse } from "interfaces/types/ApiResponse";
import { useEffect, useState } from "react";
import ClientRow from "./ClientRow";

function ClientsTable() {
  const [clients, setClients] = useState<Client[] | null>(null);

  const api = ApiClient();

  useEffect(() => {
    const clientsResponse = async () => {
      return new Promise<Client[]>((resolve, reject) => {
        const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
        setTimeout(() => {
          api
            .get<ApiResponse<Client[]>>("/clients")
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

    clientsResponse()
      .then((clients) => {
        if (clients) {
          setClients(clients);
        } else {
          setClients([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });
  }, []);

  if (!clients) {
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
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombres</Th>
            <Th>Apellidos</Th>
            <Th>Estado</Th>
            <Th>Administrar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.length > 0 ? (
            clients?.map((client, index) => {
              return (
                <ClientRow
                  key={index}
                  index={client.id}
                  firstNames={client.person.firstNames}
                  lastNames={client.person.lastNames}
                />
              );
            })
          ) : (
            <Tr>
              <Td colSpan={5} h={"64vh"}>
                <Text w={"full"} textAlign={"center"}>
                  No se han encontrado clientes
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ClientsTable;
