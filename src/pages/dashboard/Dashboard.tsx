import { Card, Flex, Grid, Skeleton, Stack } from "@chakra-ui/react";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { DashboardDataCard } from "../../components/common/DashboardDataCard";
import { useEffect, useState } from "react";
import { HiUserGroup, HiUsers, HiUserAdd } from "react-icons/hi";

import useApiClient from "../../hooks/useApiClient";
import { useAuth } from "../../hooks/useAuth";

interface DashboardData {
  clients: {
    totalClients: number;
    totalOfNewClientsCreatedThisMonth: number;
    totalOfNewClientsCreatedToday: number;
  };
}

ChartJS.register(CategoryScale);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Pagos",
        backgroundColor: "#3182CE",
        borderColor: "#3182CE",
        borderWidth: 1,
        hoverBackgroundColor: "#63B3ED",
        hoverBorderColor: "#63B3ED",
        data: Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * 5000) + 10000
        ),
      },
    ],
  };

  const api = useApiClient();

  useEffect(() => {
    api.get<DashboardData>("/dashboard").then((data) => {
      setDashboardData(data);
      setLoading(false);
    });
  }, []);

  return (
    <Stack flexDir={"column"} alignContent={"center"}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={{ base: 4, md: 4 }}
      >
        <Skeleton isLoaded={!loading}>
          <DashboardDataCard
            heading="Clientes"
            property1={{
              label: "Total de clientes",
              total: dashboardData?.clients.totalClients
                ? dashboardData?.clients.totalClients
                : 0,
              icon: HiUserGroup,
            }}
            property2={{
              label: "Total de clientes agregados en el mes",
              total: dashboardData?.clients.totalOfNewClientsCreatedThisMonth
                ? dashboardData?.clients.totalOfNewClientsCreatedThisMonth
                : 0,
              icon: HiUsers,
            }}
            property3={{
              label: "Total de clientes agregados hoy",
              total: dashboardData?.clients.totalOfNewClientsCreatedToday
                ? dashboardData?.clients.totalOfNewClientsCreatedToday
                : 0,
              icon: HiUserAdd,
            }}
          />
        </Skeleton>
      </Grid>

      <Stack pt={4}>
        <Card>
          <Flex p={6} height={"35rem"}>
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </Flex>
        </Card>
      </Stack>
    </Stack>
  );
}

export default Dashboard;
