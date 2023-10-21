import {
  Flex,
  Box,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useAuth } from "../../hooks/useAuth";
import {
  UserLoginAPIResponse,
  UserLoginFormValues,
} from "../../interfaces/User";
import { FieldError, useForm } from "react-hook-form";
import PasswordInput from "../../components/PasswordInput";
import ValidatableInput from "../../components/ValidatableInput";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import { LoginFormResolver } from "../../resolvers/LoginFormResolver";
import { LoginFormValues } from "../../formValues/LoginFormValues";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";

export function Login() {
  const api = useApiClient();

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, formState, reset } = useForm<LoginFormValues>(
    {
      resolver: LoginFormResolver,
    }
  );

  function onSubmit({ email, password }: UserLoginFormValues) {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        api
          .post<UserLoginAPIResponse>("/signin", {
            email,
            password,
          })
          .then((response) => {
            setUser?.(response.data);
            navigate({ pathname: "/dashboard" });
            toast({
              title: "Inicio de Sesión exitoso!",
              description: `Bienvenido ${
                response.data.firstNames.split(" ")[0]
              }`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate({ pathname: "/dashboard" });
            resolve(response.data);
          })
          .catch((error: AxiosError) => {
            if (error.response && error.response.data) {
              const message = (error.response.data as ErrorResponseData)
                .message;
              toast({
                title: `Error`,
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          })
          .finally(() => {
            reset({ email, password });
          });
      }, timeout);
    });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      direction={"column"}
    >
      <Alert
        status="warning"
        justifyContent={"center"}
        position={"absolute"}
        top={0}
      >
        <AlertIcon />
        Esta es una aplicación actualmente en desarrollo, la estabilidad de la
        misma no está garantizada.
      </Alert>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Logo />
          <Heading fontSize={"4xl"}>Sistema Administrativo</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form
              onSubmit={(event) => void handleSubmit(onSubmit)(event)} // https://stackoverflow.com/questions/74190256/eslint-promise-returning-function-provided-to-attribute-where-a-void-return-was
              noValidate={true}
            >
              <ValidatableInput
                label="Correo electrónico"
                id="email"
                register={register("email")}
                type={"email"}
                error={formState.errors.email as FieldError}
              />
              <PasswordInput
                label="Contraseña"
                register={register("password")}
                error={formState.errors.password as FieldError}
              />
              <Stack spacing={10}>
                {/*                 <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                  pt={4}
                >
                  <Checkbox>Recordarme</Checkbox>
                  <Link color={"blue.400"}>Olvidaste tu contraseña?</Link>
                </Stack> */}
                <Button
                  mt={4}
                  isLoading={formState.isSubmitting}
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Iniciar Sesión
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
