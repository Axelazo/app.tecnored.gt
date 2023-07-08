import {
  useToast,
  ColorModeScript,
  theme,
  ChakraProvider,
} from "@chakra-ui/react";
import { useEffect } from "react";
import App from "./App";
import { isTokenExpired } from "./helpers/encryption";
import { useAuth } from "./hooks/useAuth";

export function AppWrapper() {
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
      } else if (!user) {
        logout();
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
}

export default AppWrapper;
