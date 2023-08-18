import {
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Th,
  Td,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ServiceRow } from "./ServiceRow";

function ServicesTable() {
  const [services, setServices] = useState<ServiceRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApiClient();
  const { id } = useParams();

  const servicesResponse = async () => {
    return new Promise<ServiceRow[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<ServiceRow[]>>(`/services/client/${id}`)
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              console.log(response.data);
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

  useEffect(() => {
    servicesResponse()
      .then((services) => {
        if (services) {
          setServices(services);
        } else {
          setServices([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after data fetching
      });
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No. de Servicio</Th>
            <Th>Dirección IP</Th>
            <Th>Plan</Th>
            <Th>Precio</Th>
            <Th>Velocidad</Th>
            <Th>Ubicación</Th>
            <Th>Estado</Th>
            <Th>Conectividad</Th>
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
          ) : services && services.length > 0 ? (
            services.map((service, index) => {
              return (
                <ServiceRow
                  key={index}
                  index={service.index}
                  serviceNumber={service.serviceNumber}
                  ipAddress={service.ipAddress}
                  planName={service.planName}
                  planSpeed={service.planSpeed}
                  planPrice={service.planPrice}
                  planStatus="ACTIVO"
                  establishmentName={service.establishmentName}
                  serviceStatus={service.serviceStatus}
                />
              );
            })
          ) : (
            <Tr>
              <Td colSpan={8}>
                <Text w={"full"} textAlign={"center"}>
                  No se han encontrado servicios
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
export default ServicesTable;
