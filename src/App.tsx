import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";

//Components
import Sidebar from "./components/Sidebar";

import ClientsList from "./components/clients/ClientsList";
import CreateClient from "./components/clients/CreateClient";
import UpdateClient from "./components/clients/UpdateClient";
import ViewClient from "./components/clients/ViewClient";

import EmployeesList from "./components/employees/EmployeesList";
import CreateEmployee from "./components/employees/CreateEmployee";
import ViewEmployee from "./components/employees/ViewEmployee";

//Pages
import { Login } from "./pages/login/Login";
import Profile from "./pages/Profile";
import Clients from "./pages/clients/Clients";
import Employees from "./pages/employees/Employees";
import Reports from "./pages/reports/Reports";
import Monitoring from "./pages/monitoring/Monitoring";
import Dummy from "./pages/dummy/Dummy";
import CreateService from "./pages/services/CreateService";

//Hooks
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Configuration from "./pages/config/Configuration";
import { Plans } from "./components/config/Plans";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import { Support } from "./pages/support/Support";
import TicketsList from "./components/support/TicketsList";
import CreateTicket from "./components/support/CreateTicket";
import { EstablishmentsManagement } from "./components/config/Establishments";
import ViewTicket from "./components/support/ViewTicket";
import { Payroll } from "./pages/payroll/Payroll";
import PayrollList from "./components/payroll/PayrollList";
import MyPortal from "./pages/my-portal/MyPortal";
import { Alert, AlertIcon } from "@chakra-ui/react";

function App() {
  const { user } = useAuth();

  // Define an array of roles that can access specific routes
  //const allRoles = ["admin", "operator", "technician", "worker", "user"];
  const userRoutes = ["admin", "user"];
  const workerRoutes = ["admin", "worker"];
  const operatorRoutes = ["admin", "operator"];
  const adminRoutes = ["admin"];

  // Filter the roles of the user to determine which routes to create
  const userRoles = user ? user.roles.map((role) => role.roleName) : [];

  const isOperator = operatorRoutes.some((role) => userRoles.includes(role));
  const isAdmin = adminRoutes.some((role) => userRoles.includes(role));
  const isWorker = workerRoutes.some((role) => userRoles.includes(role));

  console.log(user?.employeeId);

  return (
    <Router>
      <Routes>
        {user ? (
          <Route element={<Sidebar />}>
            <Route element={<PrivateRoute />}>
              {isWorker ? (
                <>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-portal/:id" element={<MyPortal />} />

                  <Route
                    path="*"
                    element={<Navigate to={`/my-portal/${user.employeeId}`} />}
                  />
                </>
              ) : (
                <Route path={`/my-portal/${user.id}`} element={<MyPortal />} />
              )}

              {isAdmin ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/configuration" element={<Configuration />}>
                    <Route path="plans" element={<Plans />} />
                    <Route
                      path="establishments"
                      element={<EstablishmentsManagement />}
                    />
                  </Route>
                </>
              ) : (
                <Route path={`/my-portal/${user.id}`} element={<MyPortal />} />
              )}
              {/*! Operator routes*/}
              {isOperator && (
                <>
                  <Route path="/clients" element={<Clients />}>
                    <Route path="" element={<ClientsList />} />
                    <Route path="create" element={<CreateClient />} />
                    <Route path="view/:id" element={<ViewClient />} />
                    <Route path="update/:id" element={<UpdateClient />} />
                    <Route
                      path="view/:id/services/create"
                      element={<CreateService />}
                    />
                  </Route>
                  <Route path="/employees" element={<Employees />}>
                    <Route path="" element={<EmployeesList />} />
                    <Route path="create" element={<CreateEmployee />} />
                    <Route path="view/:id" element={<ViewEmployee />} />
                    <Route path="update/:id" element={<UpdateEmployee />} />
                  </Route>
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/support" element={<Support />}>
                    <Route path="" element={<TicketsList />} />
                    <Route
                      path="create/:clientId?/:serviceId?"
                      element={<CreateTicket />}
                    />
                    <Route path="view/:ticketId" element={<ViewTicket />} />
                  </Route>
                  <Route path="/payroll" element={<Payroll />}>
                    <Route path="" element={<PayrollList />} />
                  </Route>
                </>
              )}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          </Route>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
