import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
  Spinner,
  Td,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Ticket } from "../../interfaces/app/Ticket";
import TicketRow from "./TicketRow";
import { formatDate } from "../../helpers/time";

function TicketsTable() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApiClient();

  async function fetchTickets() {
    setIsLoading(true);
    try {
      const response = await api.get<ApiResponse<Ticket[]>>("/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No. de Ticket</Th>
            <Th>Cliente</Th>
            <Th>Asunto</Th>
            <Th>No. Servicio</Th>
            <Th>Estado</Th>
            <Th>Fecha de Creación</Th>
            <Th>Prioridad</Th>
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
          ) : tickets && tickets.length > 0 ? (
            tickets.map((ticket, index) => {
              console.log(ticket);

              return (
                <TicketRow
                  key={index}
                  index={index}
                  fullName={`${ticket.service?.owners[0].client.person.firstNames} ${ticket.service?.owners[0].client.person.lastNames}`}
                  reason={ticket.reason.name}
                  serviceNumber={ticket.service.serviceNumber}
                  priority={ticket.priority}
                  id={`${ticket.id}`}
                  status={ticket.ticketStatuses[0].status.name}
                  createdAt={ticket.createdAt}
                  fetchTickets={fetchTickets}
                />
              );
            })
          ) : (
            <Tr>
              <Td colSpan={9} h={"64vh"}>
                <Text w={"full"} textAlign={"center"}>
                  No se han encontrado tickets
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TicketsTable;
