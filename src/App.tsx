import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Clients from "./pages/Clients";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/router/PrivateRoute";

import { useAuth } from "./providers/AuthProvider";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {user ? (
          <Route element={<Sidebar />}>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
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
