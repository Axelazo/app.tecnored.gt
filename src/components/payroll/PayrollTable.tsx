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
  Button,
  SimpleGrid,
  Stack,
  chakra,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Ticket } from "../../interfaces/app/Ticket";
import TicketRow from "../../components/support/TicketRow";
import { bg } from "date-fns/locale";
import React from "react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaEye, FaPencilAlt, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

function PayrollsTable() {
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

  const header = [
    "Planilla",
    "Periodo",
    "Trabajadores",
    "Monto Total",
    "Estado",
    "Accion",
  ];

  const data: { [key: string]: string | number }[] = [
    {
      name: "Planilla",
      period: "1 de septiembre al 31 de septiembre",
      employees: 22,
      amount: 33800,
      status: "En Proceso",
    },
  ];
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      alignItems="center"
      justifyContent="center"
    >
      <Table
        w="full"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        display={{
          base: "block",
          md: "table",
        }}
        sx={{
          "@media print": {
            display: "table",
          },
        }}
      >
        <Thead
          display={{
            base: "none",
            md: "table-header-group",
          }}
          sx={{
            "@media print": {
              display: "table-header-group",
            },
          }}
        >
          <Tr>
            {header.map((x) => (
              <Th key={x}>{x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          display={{
            base: "block",
            sm: "table-row-group",
          }}
          sx={{
            "@media print": {
              display: "table-row-group",
            },
          }}
        >
          {data.map((token, tid) => {
            return (
              <Tr
                key={tid}
                display={{
                  base: "grid",
                  md: "table-row",
                }}
                sx={{
                  "@media print": {
                    display: "table-row",
                  },
                  gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                  gridGap: "10px",
                }}
              >
                {Object.keys(token).map((x) => {
                  return (
                    <React.Fragment key={`${tid}${x}`}>
                      <Td
                        display={{
                          base: "table-cell",
                          md: "none",
                        }}
                        sx={{
                          "@media print": {
                            display: "none",
                          },
                          textTransform: "uppercase",
                          color: color1,
                          fontSize: "xs",
                          fontWeight: "bold",
                          letterSpacing: "wider",
                          fontFamily: "heading",
                        }}
                      >
                        {x}
                      </Td>
                      <Td
                        color={"gray.500"}
                        fontSize="md"
                        fontWeight="hairline"
                      >
                        {token[x]}
                      </Td>
                    </React.Fragment>
                  );
                })}
                <Td
                  display={{
                    base: "table-cell",
                    md: "none",
                  }}
                  sx={{
                    "@media print": {
                      display: "none",
                    },
                    textTransform: "uppercase",
                    color: color2,
                    fontSize: "xs",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    fontFamily: "heading",
                  }}
                >
                  Actions
                </Td>
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
                      <MenuItem as={Link} to={`view/${1}`} icon={<FaEye />}>
                        Ver más información
                      </MenuItem>
                      <MenuItem
                        as={Link}
                        to={`update/${1}`}
                        icon={<FaPencilAlt />}
                      >
                        Editar información
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}

export default PayrollsTable;
