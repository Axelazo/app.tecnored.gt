import {
  useToast,
  ColorModeScript,
  ChakraProvider,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect } from "react";
import App from "./App";
import { isTokenExpired } from "./helpers/encryption";
import { useAuth } from "./hooks/useAuth";
import theme from "./theme/theme";

export function AppWrapper() {
  const { logout } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleTokenExpiration = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && isTokenExpired(parsedUser.token)) {
          logout();
          toast({
            title: "Sesión inválida",
            description: "La sesión ha expirado, por favor, inicie sesión",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleTokenExpiration);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleTokenExpiration);
    };
  }, [toast, logout]);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </>
  );
}

export default AppWrapper;
