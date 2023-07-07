import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./components/router/PrivateRoute";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Profile from "pages/Profile";
import Sidebar from "./components/Sidebar";
import Clients from "pages/clients/Clients";
import ClientList from "components/clients/ClientsList";
import CreateClient from "components/clients/CreateClient";

import { useAuth } from "providers/AuthProvider";
import ViewClient from "components/clients/ViewClient";
import UpdateClient from "components/clients/UpdateClient";
import Dummy from "pages/Dummy";
import Reports from "pages/Reports";
import CreateService from "components/services/CreateService";
import Monitoring from "pages/monitoring/Monitoring";
import Employees from "pages/employees/Employees";
import EmployeesList from "components/employees/EmployeesList";
import CreateEmployee from "components/employees/CreateEmployee";
import ViewEmployee from "components/employees/ViewEmployee";

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

  return (
    <Router>
      <Routes>
        {user ? (
          <Route element={<Sidebar />}>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/reports" element={<Reports />} />

              {isAdmin ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route
                  path="/dashboard"
                  element={<Dummy data={"Portal Usuario"} />}
                />
              )}
              {/*! Operator routes*/}
              {isOperator && (
                <Route path="/clients" element={<Clients />}>
                  <Route path="" element={<ClientList />} />
                  <Route path="create" element={<CreateClient />} />
                  <Route path="view/:id" element={<ViewClient />} />
                  <Route path="update/:id" element={<UpdateClient />} />
                  <Route
                    path="view/:id/services/create"
                    element={<CreateService />}
                  />
                </Route>
              )}
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/employees" element={<Employees />}>
                <Route path="" element={<EmployeesList />} />
                <Route path="create" element={<CreateEmployee />} />
                <Route path="view/:id" element={<ViewEmployee />} />
              </Route>
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
