import {
  Stack,
  Button,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Spinner,
  VStack,
  Box,
  List,
  ListItem,
  Tag,
  TagCloseButton,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import PageHeader from "../../components/common/PageHeader";
import { Client } from "../../interfaces/app/Client";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import ValidatableInput from "../../components/ValidatableInput";
import Map from "../../components/misc/Map";
import { Plan } from "../../interfaces/app/Plan";
import { Router } from "../../interfaces/app/Router";
import { ServicesFormValues } from "../../formValues/ServicesFormValues";
import { ServicesFormResolver } from "../../resolvers/ServicesFormResolver";
import { useForm } from "react-hook-form";
import { resolve } from "chart.js/helpers";
import { Service } from "../../interfaces/app/Service";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";

function CreateService() {
  // Form Validation
  const { register, handleSubmit, formState, getValues, clearErrors, reset } =
    useForm<ServicesFormValues>({
      resolver: ServicesFormResolver,
    });
  const toast = useToast();
  const navigate = useNavigate();

  // Page State
  const { id } = useParams();
  const [clients, setClients] = useState<Client[] | null>(null);
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [routers, setRouters] = useState<Router[] | null>(null);
  const [selectedRouter, setSelectedRouter] = useState<Router | null>(null);
  const [location, setLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  // API
  const api = useApiClient();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTLAIUGQcxfCfTIB3ax80mMMT_YuHRQLc",
  });

  // Form submission
  const onSubmit = handleSubmit(async (serviceData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds

    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/require-await
      setTimeout(async () => {
        api
          .post<Service>("/services/create", serviceData)
          .then((response) => {
            toast({
              description: `Empleado agregado exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setTimeout(() => {
              navigate({ pathname: `/clients/view/${response.id}` });
            }, 3000);
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log("catched error!");
            if (error.response && error.response.data) {
              console.log(error.response.data);
              const message = (error.response.data as ErrorResponseData)
                .message;
              console.log(`error is ${message}`);
              toast({
                title: "Error",
                description: `${message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          });
      }, timeout);
    });
  });

  const clientsResponse = async () => {
    return new Promise<Client[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500;
      setTimeout(() => {
        api
          .get<ApiResponse<Client[]>>("/clients")
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            //addtoast
            reject(reason);
          });
      }, timeout);
    });
  };

  const plansResponse = async () => {
    return new Promise<Plan[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Plan[]>>("/plans")
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            reject(reason);
          });
      }, timeout);
    });
  };

  const routersResponse = async () => {
    return new Promise<Router[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Router[]>>("/routers")
          .then((response) => {
            if (response.status === 204) {
              resolve([]);
            } else {
              resolve(response.data);
            }
          })
          .catch((reason: AxiosError) => {
            reject(reason);
          });
      }, timeout);
    });
  };

  useEffect(() => {
    clientsResponse()
      .then((clients) => {
        if (clients) {
          setClients(clients);
        } else {
          setClients([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });

    plansResponse()
      .then((plans) => {
        if (plans) {
          setPlans(plans);
        } else {
          setPlans([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });

    routersResponse()
      .then((routers) => {
        if (routers) {
          setRouters(routers);
        } else {
          setRouters([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });
  }, []);

  if (!clients) {
    return (
      <Flex flexGrow={1} justifyContent={"center"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  const markers: string[] = [];

  return (
    <>
      <Stack flexGrow={1}>
        <PageHeader title="Agregar servicio">
          <Button
            leftIcon={<IoMdArrowRoundBack />}
            colorScheme="orange"
            variant="solid"
            as={NavLink}
            to={`/clients/view/${id}`}
          >
            Regresar a la información del cliente
          </Button>
        </PageHeader>
        <form onSubmit={onSubmit} noValidate={true}>
          <VStack spacing={4}>
            <Stack
              spacing={8}
              w={"full"}
              alignItems={"start"}
              direction={{ base: "column", md: "row" }}
            >
              <Flex flex={1} flexDirection={"column"} w={"full"}>
                <VStack w={"full"}>
                  {/*                   <FormControl
                    isRequired
                    isInvalid={!!formState.errors.clientId?.message}
                  >
                    <FormLabel>Cliente seleccionado</FormLabel>
                    <Select
                      //value={id}
                      placeholder="Selecciona un cliente"
                      {...register("clientId")}
                    >
                      {clients?.map((client, index) => {
                        return (
                          <option
                            key={index}
                            value={client.id}
                          >{`${client.person.firstNames} ${client.person.lastNames}`}</option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {formState.errors.clientId?.message}
                    </FormErrorMessage>
                  </FormControl> */}
                  <FormControl
                    isInvalid={!!formState.errors.clientId?.message}
                    isRequired
                  >
                    <FormLabel>Puesto</FormLabel>
                    <Select
                      {...register("clientId")}
                      /*                 onChange={(ev) => {
                  setPosition(parseInt(ev.target.value));
                  console.log(ev.target.value);
                }} */
                      defaultValue={"null"}
                    >
                      {clients?.map((client) => {
                        return (
                          <option value={client.id}>
                            {client.person.firstNames}
                          </option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {formState.errors.clientId?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formState.errors.planId} isRequired>
                    <FormLabel>Plan</FormLabel>
                    <Select
                      placeholder="Selecciona un plan"
                      {...register("planId")}
                    >
                      {plans?.map((plan, index) => {
                        return (
                          <option
                            key={index}
                            value={plan.id}
                          >{`${plan.name} - Q.${plan.price}`}</option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {formState.errors.planId?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!formState.errors.routerId}
                    isRequired
                  >
                    <FormLabel>Router</FormLabel>
                    <Select
                      placeholder="Selecciona un router"
                      {...register("routerId")}
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        const selectedRouter = routers?.find(
                          (router) => router.id === parseInt(selectedValue)
                        );
                        setSelectedRouter(selectedRouter || null);
                      }}
                    >
                      {routers?.map((router, index) => {
                        return (
                          <option
                            key={index}
                            value={router.id}
                          >{`${router.name} - ${router.ipAddress}`}</option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {formState.errors.routerId?.message}
                    </FormErrorMessage>
                  </FormControl>
                  {selectedRouter && (
                    <Text>
                      {`Ubicación seleccionada: ` +
                        selectedRouter?.establishment.name ?? ""}
                    </Text>
                  )}
                  <ValidatableInput
                    required={true}
                    type={"text"}
                    label={"Direccion IP"}
                    register={register("ipAddress")}
                    error={formState.errors.ipAddress}
                  />
                  <ValidatableInput
                    type={"date"}
                    label={"Fecha de inicio"}
                    helperText={
                      "Para clientes existentes especifica la fecha de creación, el valor por defecto será la fecha de hoy"
                    }
                    defaultValue={new Date().toISOString().split("T")[0]}
                    register={register("start")}
                    error={formState.errors.start}
                  />
                </VStack>
              </Flex>
              <Flex flex={1} w={"full"} flexDir={"column"} gap={4}>
                <ValidatableInput
                  type={"text"}
                  label={"Coordenadas"}
                  helperText={
                    "Pega las coordenadas aquí o marca una ubicación en el mapa"
                  }
                  required={true}
                  /*                   onChange={(locationString) => {

                  }} */
                  register={register("latlng")}
                  value={`${
                    location ? location.toString() : "latitud, longitud"
                  }`}
                  error={
                    formState.errors.latitude || formState.errors.longitude
                  }
                />
                {isLoaded ? (
                  <Map
                    location={location}
                    setLocation={setLocation}
                    formSubmited={formState.isSubmitted}
                  />
                ) : (
                  <Spinner />
                )}
              </Flex>
            </Stack>
          </VStack>
          <Flex pt={4}>
            <Box flexGrow={1} />
            <Button
              isLoading={formState.isSubmitting}
              colorScheme={"green"}
              type={"submit"}
              onClick={() => {
                console.log(formState.errors);
                //console.log(getValues());
                setTimeout(() => {
                  clearErrors();
                  reset({});
                }, 3000);
              }}
            >
              Crear servicio
            </Button>
          </Flex>
        </form>
      </Stack>
    </>
  );
}
export default CreateService;
