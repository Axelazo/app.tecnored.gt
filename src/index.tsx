import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript, useToast } from "@chakra-ui/react";
import theme from "./theme/theme";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthProvider, {
  isTokenExpired,
  useAuth,
} from "./providers/AuthProvider";

const AppWrapper = () => {
  const { user, logout } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleTokenExpiration = () => {
      if (user && isTokenExpired(user.token)) {
        logout();
        toast({
          title: "Sesión inválida",
          description: "La sesión ha expirado, por favor, inicie sesión",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleTokenExpiration);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleTokenExpiration);
    };
  }, [user, toast, logout]);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
