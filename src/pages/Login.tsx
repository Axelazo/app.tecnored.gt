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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useAuth } from "../providers/AuthProvider";
import { UserLoginAPIResponse, UserLoginFormValues } from "interfaces/User";
import { useForm } from "react-hook-form";
import PasswordInput from "components/login/PasswordInput";
import ValidatableInput from "components/login/ValidatableInput";
import useApiClient from "api/apiHook";
import { AxiosError } from "axios";
import { useState } from "react";
import { UserLoginFormResolver } from "resolvers/LoginFormResolver";
import { ErrorResponseData } from "interfaces/app/ErrorResponseData";

export default function Login() {
  const api = useApiClient();

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, formState, reset } =
    useForm<UserLoginFormValues>({
      resolver: UserLoginFormResolver,
    });

  function onSubmit({ email, password }: UserLoginFormValues) {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
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
              console.log(error.response.data);
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
              <ValidatableInput
                label="Correo electrónico"
                id="email"
                register={register("email")}
                type={"email"}
                error={formState.errors.email}
              />
              <PasswordInput
                label="Contraseña"
                register={register("password")}
                error={formState.errors.password}
              />
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
