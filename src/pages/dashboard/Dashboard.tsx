import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import DashboardCard from "./DashboardCard";
import { FaCalendar, FaCalendarDay, FaUsers } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

// Get the current date
const currentDate = new Date();

const startOfDay = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDay()
);

const endOfDay = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDay() + 1
);

endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1);

// Calculate the first day of the current month
const firstDayOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);

// Calculate the last day of the current month
const lastDayOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);

lastDayOfMonth.setMilliseconds(lastDayOfMonth.getMilliseconds() - 1);

const dayInterval = {
  from: startOfDay.toISOString(),
  to: endOfDay.toISOString(),
};

const monthInterval = {
  from: firstDayOfMonth.toISOString(),
  to: lastDayOfMonth.toISOString(),
};

function Dashboard() {
  const [allowancesAmount, setAllowancesAmount] = useState(0);
  const [deductionsAmount, setDeductionsAmount] = useState(0);
  // Clients
  const [totalClientsCount, setTotalClientsCount] = useState(0);
  const [newClientsDuringDay, setNewClientsDuringDay] = useState(0);
  const [newClientsDuringMonth, setNewClientsDuringMonth] = useState(0);

  const api = useApiClient();

  const fetchAllClientsCount = () => {
    api
      .get<{ count: number }>("/dashboard/clients/count")
      .then((response) => {
        setTotalClientsCount(response.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNewClientsCountDuringDay = () => {
    api
      .get<{ count: number }>("/dashboard/clients/count", {
        params: dayInterval,
      })
      .then((response) => {
        console.log(`response was ${JSON.stringify(response)}`);
        setNewClientsDuringMonth(response.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNewClientsCountDuringMonth = () => {
    api
      .get<{ count: number }>("/dashboard/clients/count", {
        params: monthInterval,
      })
      .then((response) => {
        console.log(`response was ${JSON.stringify(response)}`);
        setNewClientsDuringMonth(response.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllowancesAmount = () => {
    api
      .get<{ amount: number }>("/dashboard/employees/allowances/amount", {
        params: monthInterval,
      })
      .then((response) => {
        setAllowancesAmount(response.amount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDeductionsAmount = () => {
    api
      .get<{ amount: number }>("/dashboard/employees/deductions/amount", {
        params: monthInterval,
      })
      .then((response) => {
        setDeductionsAmount(response.amount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clientsData: StatData[] = [
    {
      id: 1,
      label: "Total de Clientes ",
      value: totalClientsCount,
      icon: FaUsers,
      percentage: "10%",
    },
    {
      id: 2,
      label: "Total de Clientes Nuevos (hoy)",
      value: newClientsDuringDay,
      icon: FaCalendarDay,
      percentage: "30%",
    },
    {
      id: 3,
      label: "Total de Clientes Nuevos (mes)",
      value: newClientsDuringMonth,
      icon: FaCalendar,
      percentage: "30%",
    },
  ];

  const employeeAllowancesDeductionsData: StatData[] = [
    {
      id: 1,
      label: "Total de Bonificaciones por Pagar (mes) ",
      value: allowancesAmount,
      prefix: "Q",
      icon: GiPayMoney,
    },
    {
      id: 2,
      label: "Total de Penalizaciones por Cobrar (mes)",
      value: deductionsAmount,
      prefix: "Q",
      icon: GiReceiveMoney,
    },
  ];

  useEffect(() => {
    try {
      fetchAllClientsCount();
      fetchNewClientsCountDuringDay();
      fetchNewClientsCountDuringMonth();
      fetchAllowancesAmount();
      fetchDeductionsAmount();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Stack flexDir={{ base: "column", lg: "row" }} alignContent={"center"}>
      <DashboardCard title="Clientes" stats={clientsData} />
      <DashboardCard
        title="Bonos / Cobros"
        stats={employeeAllowancesDeductionsData}
      />
    </Stack>
  );
}

export default Dashboard;
