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
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import PageHeader from "../../components/common/PageHeader";
import { Client } from "../../interfaces/app/Client";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import ValidatableInput from "../../components/ValidatableInput";
import Map from "../../components/misc/Map";

function CreateService() {
  const { id } = useParams();
  const [clients, setClients] = useState<Client[] | null>(null);
  const [location, setLocation] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral | null
  >(null);

  const api = useApiClient();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTLAIUGQcxfCfTIB3ax80mMMT_YuHRQLc",
  });

  useEffect(() => {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          noValidate={true}
        >
          <VStack spacing={4}>
            <Stack
              spacing={8}
              w={"full"}
              alignItems={"start"}
              direction={{ base: "column", md: "row" }}
            >
              <Flex flex={1} flexDirection={"column"} w={"full"}>
                <VStack w={"full"}>
                  <FormControl>
                    <FormLabel>Cliente seleccionado</FormLabel>
                    <Select value={id} disabled>
                      {clients?.map((client, index) => {
                        return (
                          <option
                            key={index}
                            value={client.id}
                          >{`${client.person.firstNames} ${client.person.lastNames}`}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Plan</FormLabel>
                    <Select placeholder="Selecciona un plan">
                      <option key={1} value={1}>
                        20 mbps - Q.250.00
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Router</FormLabel>
                    <Select>
                      <option key={1} value={1}>
                        Dolores - 192.168.3.1
                      </option>
                      <option key={2} value={2}>
                        Machaquila, Poxte, Santo Domingo
                      </option>
                    </Select>
                  </FormControl>
                  <ValidatableInput
                    type={"text"}
                    label={"Direccion IP"}
                    required={true}
                  />
                  <ValidatableInput
                    type={"date"}
                    label={"Fecha de inicio"}
                    helperText={
                      "Para clientes existentes especifica la fecha de creación, el valor por defecto será la fecha de hoy"
                    }
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                  <FormControl>
                    <Flex>
                      <FormLabel>Dispositivos</FormLabel>
                      <Box flexGrow={1} />
                      <Button
                        colorScheme={"green"}
                        type={"submit"}
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Trigger popup!");
                        }}
                      >
                        Agregar equipo
                      </Button>
                    </Flex>
                    <List spacing={2}>
                      <ListItem>
                        <Tag colorScheme={"green"} variant="solid" size={"lg"}>
                          OTT - MAC: 249596969
                          <TagCloseButton />
                        </Tag>
                      </ListItem>
                      <ListItem>
                        <Tag colorScheme={"orange"} variant="solid" size={"lg"}>
                          Router - MAC: 11246487555
                          <TagCloseButton />
                        </Tag>
                      </ListItem>
                    </List>
                  </FormControl>
                </VStack>
              </Flex>
              <Flex flex={1} w={"full"}>
                {isLoaded ? (
                  <Map
                    location={location}
                    setLocation={setLocation}
                    formSubmited={true}
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
              colorScheme={"green"}
              type={"submit"}
              onClick={() => {
                setTimeout(() => {
                  console.log(`Waiting!`);
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
