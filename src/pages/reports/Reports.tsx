import {
  Stack,
  Card,
  Flex,
  Input,
  FormControl,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface ClientReportData {
  startDate: string;
  endDate: string;
  clients: {
    date: string;
    count: number;
  }[];
}

interface ClientChartData {
  labels: string[];
  datasets: [
    {
      label: string;
      backgroundColor: string;
      borderColor: string;
      borderWidth: string;
      hoverBackgroundColor: string;
      hoverBorderColor: string;
      data: number[];
    }
  ];
}

function Reports() {
  const [clientChartData, setClientChartData] =
    useState<ClientChartData | null>(null);
  const [clientsReportData, setClientsReportData] =
    useState<ClientReportData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const api = useApiClient();

  useEffect(() => {
    if (startDate && endDate) {
      api
        .post<ClientReportData>("/clients/report", {
          startDate,
          endDate,
        })
        .then((data) => {
          setClientsReportData(data);
          console.log(data);
        });
      console.log(startDate, endDate);
    }
  }, [startDate, endDate]);

  return (
    <Stack pt={4}>
      <Card p={4}>
        <HStack>
          <FormControl>
            <FormLabel>Fecha de inicio</FormLabel>
            <Input
              type={"date"}
              onChange={(ev) => {
                setStartDate(new Date(ev.target.value));
              }}
            ></Input>
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Fecha de final</FormLabel>
            <Input
              type={"date"}
              onChange={(ev) => {
                setEndDate(new Date(ev.target.value));
              }}
            ></Input>
          </FormControl>
        </HStack>
        {clientsReportData ? (
          <Flex p={6} height={"35rem"}>
            <Bar
              data={{
                labels: clientsReportData.clients.map((client) => client.date),
                datasets: [
                  {
                    label: "Clientes",
                    data: clientsReportData.clients.map(
                      (client) => client.count
                    ),
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Flex>
        ) : (
          "No hay datos"
        )}
      </Card>
    </Stack>
  );
}
export default Reports;
