import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import ApiClient from "../api/api";
import { Logo } from "../components/Logo";
import { useAuth, User } from "../providers/AuthProvider";

const api = new ApiClient();

interface LoginErrors {
  email: string;
  password: string;
}

interface LoginApiResponse {
  status: number;
  data: User;
}

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const resetLoginWarnings = () => {
    setTimeout(() => {
      setIsLoading(false);

      setIsEmailError(false);
      setIsPasswordError(false);
    }, 3000);
  };

  const handleLogin = () => {
    setIsEmailError(false);
    setIsPasswordError(false);
    setIsLoading(true);

    setTimeout(() => {
      let updatedErrors = {
        email: "",
        password: "",
      };

      if (!email) {
        updatedErrors.email = "Ingrese su correo electrónico";
        setErrors((errors) => ({
          ...errors,
          ...updatedErrors,
        }));
        setIsEmailError(true);
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        updatedErrors.email = "El correo electrónico no es valido";
        setErrors((errors) => ({
          ...errors,
          ...updatedErrors,
        }));
        setIsEmailError(true);
      }

      if (!password) {
        setIsPasswordError(true);
      }

      if (!password || !email) {
        setIsEmailError(true);
        setIsPasswordError(true);
      } else {
        api
          .post<LoginApiResponse>("/signin", {
            email: email,
            password: password,
          })
          .then((response) => {
            setIsLoading(true);
            const userResponse = response.data;
            setUser?.(userResponse);
            toast({
              description: `Bienvenido ${
                response.data.firstNames.split(" ")[0]
              }`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate({ pathname: "/dashboard" });
          })
          .catch((error) => {
            setIsLoading(false);
            toast({
              description: "Nombre de usuario o contraseña incorrectos.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }

      resetLoginWarnings();
    }, Math.random() * 1000);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sistema Administrativo</Heading>

          <Logo />
          <Text fontSize={"lg"} color={"gray.600"}>
            Inicia sesión en tu cuenta, si no tienes una
            <Link color={"blue.400"}> haz click aquí!</Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={isEmailError}>
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              {!isEmailError ? (
                ""
              ) : (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={isPasswordError}>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!isPasswordError ? (
                ""
              ) : (
                <FormErrorMessage>Ingrese su contraseña.</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Recordarme</Checkbox>
                <Link color={"blue.400"}>Olvidaste tu contraseña?</Link>
              </Stack>
              <Button
                isLoading={isLoading}
                onClick={handleLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
