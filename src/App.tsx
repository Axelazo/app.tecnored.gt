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
              {isAdmin ? (
                <Route path="/home" element={<Dashboard />} />
              ) : (
                <Route
                  path="/home"
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
                </Route>
              )}
              <Route path="*" element={<Navigate to="/home" />} />
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
