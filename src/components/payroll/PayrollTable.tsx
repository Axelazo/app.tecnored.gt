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
  Badge,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Payroll } from "../../interfaces/app/Payroll";
import { format, getMonth, getYear } from "date-fns";
import { es } from "date-fns/locale";
import { MdAttachEmail, MdDownload } from "react-icons/md";

interface PayrollStatusProps {
  status: number;
}

function PayrollStatus({ status }: PayrollStatusProps) {
  return status === 1 ? (
    <Badge colorScheme="red" size={"xl"}>
      EN PROCESO
    </Badge>
  ) : status === 2 ? (
    <Badge colorScheme="green" size={"xl"}>
      PROCESADA
    </Badge>
  ) : (
    <Badge colorScheme="grey" size={"xl"}>
      FINALIZADA
    </Badge>
  );
}

function PayrollsTable() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApiClient();

  async function fetchPayrolls() {
    setIsLoading(true);
    try {
      const response = await api.get<ApiResponse<Payroll[]>>("/payrolls");
      setPayrolls(response.data);
    } catch (error) {
      console.error("Error fetching payroll:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPDF(id: number, fileName: string) {
    try {
      await api.getFile(`/payrolls/generate/${id}`, fileName, {});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Periodo</Th>
            <Th>Estado</Th>
            <Th>Neto</Th>
            <Th>Bonificaciones</Th>
            <Th>Penalizaciones</Th>
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
          ) : payrolls && payrolls.length > 0 ? (
            payrolls.map((payroll, index) => {
              return (
                <Tr>
                  <Td>{`${format(new Date(payroll.from), "dd MMMM", {
                    locale: es,
                  })} al ${format(new Date(payroll.to), "dd MMMM", {
                    locale: es,
                  })}`}</Td>
                  <Td>{<PayrollStatus status={payroll.status} />}</Td>
                  <Td>{`Q${payroll.net}`}</Td>
                  <Td>{`Q${payroll.allowances}`}</Td>
                  <Td>{`Q${payroll.deductions}`}</Td>
                  <Td>
                    <Button
                      leftIcon={<MdDownload />}
                      onClick={() => {
                        fetchPDF(
                          payroll.id,
                          `TecnoRed - Planilla Mensual - ${format(
                            new Date(payroll.from),
                            "MMMM",
                            {
                              locale: es,
                            }
                          )} - ${getYear(new Date(payroll.from))}`
                        );
                      }}
                    >
                      Descargar PDF
                    </Button>
                    {/*                     <Button
                      leftIcon={<MdAttachEmail />}
                      ml="2"
                      colorScheme="green"
                      onClick={() => {
                        fetchPDF(
                          payroll.id,
                          `TecnoRed - Planilla Mensual - ${format(
                            new Date(payroll.from),
                            "MMMM",
                            {
                              locale: es,
                            }
                          )} - ${getYear(new Date(payroll.from))}`
                        );
                      }}
                    >
                      Enviar PDF al correo
                    </Button> */}
                  </Td>
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td colSpan={9} h={"64vh"}>
                <Text w={"full"} textAlign={"center"}>
                  No se han encontrado planillas
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PayrollsTable;
