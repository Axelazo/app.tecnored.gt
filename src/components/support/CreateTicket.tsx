import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  Textarea,
  VStack,
  Input,
  Flex,
  Box,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import DualSideDivider from "../common/DualSideDivider";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TicketFormValues } from "../../formValues/TicketFormValues";
import { TicketFormResolver } from "../../resolvers/TicketFormResolver";
import ValidatableInput from "../ValidatableInput";
import { Employee } from "../../interfaces/app/Employee";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { AxiosError } from "axios";
import useApiClient from "../../hooks/useApiClient";
import { Client } from "../../interfaces/app/Client";
import { ServiceRow } from "../services/ServiceRow";
import SearchableSelect from "../common/SearchableSelect";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { Ticket } from "../../interfaces/app/Ticket";

interface Option {
  label: string;
  value: number;
}

function CreateTicket() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showCustomSubject, setShowCustomSubject] = useState<boolean>(false);
  const { register, handleSubmit, formState, clearErrors, getValues, control } =
    useForm<TicketFormValues>({
      resolver: TicketFormResolver,
    });

  const [client, setClient] = useState<string | null | undefined>("");
  const [employee, setEmployee] = useState<number | null | undefined>(0);
  const [clients, setClients] = useState<Option[] | null>(null);
  const [employees, setEmployees] = useState<Option[] | null>(null);
  const [services, setServices] = useState<ServiceRow[] | null>(null);

  const api = useApiClient();

  const getEmployeesWithPosition = async (positionName: string) => {
    return new Promise<Employee[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Employee[]>>(`/employees/positions/${positionName}`)
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

  const clientsResponse = async () => {
    return new Promise<Client[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
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

  const servicesResponse = async (clientId: number | null | undefined) => {
    return new Promise<ServiceRow[]>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1) + 500; // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<ServiceRow[]>>(`/services/client/${clientId}`)
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

  const onSubmit = handleSubmit(async (ticketData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        api
          .post<Ticket>("/tickets/create", ticketData)
          .then((response) => {
            toast({
              description: `Ticket creado exitosamente!`,
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            setTimeout(() => {
              navigate({ pathname: `/support/view/${response.id}` });
            }, 3000);
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log("catched error!");
            if (error.response && error.response.data) {
              console.log(error.response.data);
              const message = (error.response.data as ErrorResponseData)
                .message;
              console.log(`error is ` + message);
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

  useEffect(() => {
    getEmployeesWithPosition("Asesor")
      .then((employees) => {
        if (employees) {
          const formattedEmployees = employees.map((employee) => {
            return {
              label: `${employee.person.firstNames} ${employee.person.lastNames}`,
              value: employee.id,
            };
          });
          setEmployees(formattedEmployees);
        } else {
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    clientsResponse()
      .then((clients) => {
        if (clients) {
          const formattedClients = clients.map((client) => {
            return {
              label: `${client.person.firstNames} ${client.person.lastNames}`,
              value: client.id,
            };
          });

          setClients(formattedClients);
        } else {
          setClients([]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.code);
      });
  }, []);

  useEffect(() => {
    if (client !== 0 || client === null) {
      servicesResponse(client)
        .then((services) => {
          if (services) {
            setServices(services);
          } else {
            setServices([]);
          }
        })
        .catch((error: AxiosError) => {
          console.log(error.code);
        });
    }
  }, [client]);

  return (
    <Stack w={"full"}>
      <PageHeader title="Crear Ticket">
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="green"
          variant="solid"
          as={NavLink}
          to={"/support"}
          relative="path"
        >
          Regresar a la Lista de Tickets
        </Button>
      </PageHeader>
      <form onSubmit={onSubmit} noValidate={true}>
        <DualSideDivider
          text={"Información del Cliente y Servicio"}
          width={16}
        />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <SearchableSelect
              label="Cliente"
              control={control}
              options={clients}
              name="clientId"
              selectedValue={client}
              setSelectedValue={setClient}
            />
            <FormControl isRequired isInvalid={!!formState.errors.serviceId}>
              <FormLabel>Servicio</FormLabel>
              <Select
                placeholder="Seleccionar Servicio"
                {...register("serviceId")}
              >
                {services?.map((service, index) => {
                  return (
                    <option
                      key={index}
                      value={service.id}
                    >{`#${service.serviceNumber} - ${service.ipAddress} - ${service.planName} - ${service.planSpeed} mbps - Q.${service.planPrice}`}</option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.serviceId?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
        </VStack>

        <VStack spacing={4} mt={6}>
          <HStack spacing={8} w={"full"}>
            <FormControl isRequired isInvalid={!!formState.errors.reasonId}>
              <FormLabel>Asunto / Razón</FormLabel>
              <Select
                placeholder="Seleccionar Asunto / Razón"
                {...register("reasonId")}
                onChange={(e) => {
                  if (parseInt(e.target.value) === 999) {
                    setShowCustomSubject(true);
                  } else {
                    setShowCustomSubject(false);
                  }
                }}
              >
                <option value={1}>No tiene Internet</option>
                <option value={2}>Internet Lento</option>
                <option value={3}>Recolección de Equipos</option>
                <option value={4}>Cambio de Contraseña</option>
                <option value={5}>Cambio de Domicilio</option>
                <option value={999}>Otro</option>
              </Select>
              <FormErrorMessage>
                {formState.errors.reasonId?.message}
              </FormErrorMessage>
            </FormControl>
            <SearchableSelect
              label="Técnico"
              control={control}
              options={employees}
              name="employeeId"
              setSelectedValue={setEmployee}
            />
          </HStack>
          {showCustomSubject ? (
            <ValidatableInput
              id={"customReason"}
              type={"text"}
              label={"Asunto / Razón personalizada"}
              register={register("customReason")}
              error={formState.errors.customReason}
              required={true}
            />
          ) : (
            ""
          )}
        </VStack>
        <VStack spacing={4} mt={6}>
          <HStack spacing={8} w={"full"}>
            <FormControl
              isRequired
              isInvalid={!!formState.errors.estimatedStart}
            >
              <FormLabel>Fecha estimada de inicio</FormLabel>
              <Input type={"date"} {...register("estimatedStart")}></Input>
              <FormErrorMessage>
                {formState.errors.estimatedStart?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!formState.errors.estimatedFinish}
            >
              <FormLabel>Fecha estimada de finalización</FormLabel>
              <Input
                type={"date"}
                {...register("estimatedFinish")}
              ></Input>{" "}
              <FormErrorMessage>
                {formState.errors.estimatedFinish?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
        </VStack>
        <FormControl mt={6}>
          <FormLabel>Comentario</FormLabel>
          <Textarea {...register("description")}></Textarea>
        </FormControl>
        <Flex pt={4} justifyContent={"end"}>
          <HStack alignItems={"end"}>
            <FormControl isRequired isInvalid={!!formState.errors.priority}>
              <FormLabel>Prioridad</FormLabel>
              <Select
                placeholder="Seleccionar Prioridad"
                {...register("priority")}
              >
                <option value={1}>Baja</option>
                <option value={2}>Media</option>
                <option value={2}>Alta</option>
              </Select>
              <FormErrorMessage>
                {formState.errors.priority?.message}
              </FormErrorMessage>
            </FormControl>
            <Box>
              <Button
                isLoading={formState.isSubmitting}
                colorScheme={"green"}
                type={"submit"}
                onClick={() => {
                  console.log(getValues());
                  setTimeout(() => {
                    clearErrors();
                  }, 3000);
                }}
              >
                Crear Ticket
              </Button>
            </Box>
          </HStack>
        </Flex>
      </form>
    </Stack>
  );
}

export default CreateTicket;
