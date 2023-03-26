import ApiClient from "../api/api";
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
import {
  User,
  UserLoginAPIResponse,
  UserLoginFormValues,
} from "interfaces/User";
import { Resolver, useForm } from "react-hook-form";
import PasswordInput from "components/login/PasswordInput";
import ValidatableInput from "components/login/ValidatableInput";

const api = ApiClient();

const resolver: Resolver<UserLoginFormValues> = async (
  values: UserLoginFormValues
) => {
  return {
    values: values.email && values.password ? values : {},
    errors: {
      ...(!values.email && {
        email: {
          type: "required",
          message: "El correo electrónico es requerido!",
        },
      }),
      ...(values.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && {
          email: {
            type: "invalid",
            message: "El correo electrónico debe ser válido!",
          },
        }),
      ...(!values.password && {
        password: {
          type: "required",
          message: "La contraseña es requerida!",
        },
      }),
    },
  };
};

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, formState, clearErrors } =
    useForm<UserLoginFormValues>({
      resolver,
    });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error);
    }
  });

  const login = async ({ email, password }: UserLoginFormValues) => {
    return new Promise<User>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
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
          .catch((reason) => {
            toast({
              description: "Nombre de usuario o contraseña incorrectos.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            reject(reason);
          });
      }, timeout);
    });
  };

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
            <form onSubmit={onSubmit} noValidate={true}>
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
