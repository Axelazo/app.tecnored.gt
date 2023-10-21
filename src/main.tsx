import ReactDOM from "react-dom/client";
import AuthProvider from "./providers/AuthProvider.tsx";
import AppWrapper from "./AppWrapper.tsx";
import { Alert, AlertIcon } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AppWrapper />
  </AuthProvider>
);
