import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useRadio,
  useRadioGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import { Establishment } from "../../interfaces/app/Establishment";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Area } from "../../interfaces/app/Area";
import { Position } from "../../interfaces/app/Position";

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w={"full"}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        /*         _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }} */
        bg={props.selected ? "teal.600" : ""}
        color={props.selected ? "white" : ""}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function EstablishmentsRadioButtonsGroup({
  establishments,
  handleEstablishmentChange,
}: {
  establishments: Establishment[] | null;
  handleEstablishmentChange: (id: number) => void;
}) {
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: "Establishments",
    defaultValue: "Dolores",
    onChange: (value) => {
      handleEstablishmentChange(parseInt(value));
    },
  });

  const group = getRootProps();

  return (
    <VStack {...group} w={"full"}>
      {establishments?.map((establishment) => {
        const radio = getRadioProps({ value: establishment.id });
        const selected = value == establishment.id;

        const props = {
          selected,
          ...radio,
        };

        return (
          <RadioCard key={establishment.id} {...props}>
            {establishment.name}
          </RadioCard>
        );
      })}
    </VStack>
  );
}

function Areas({
  currentEstablishment,
}: {
  currentEstablishment: number | null;
}) {
  const client = useApiClient();
  const [areas, setAreas] = useState<Area[] | null>(null);
  const [establishmentAreas, setEstablishmentAreas] = useState<Area[] | null>(
    null
  );
  const [currentSelectedArea, setCurrentSelectedArea] = useState<number | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  const fetchAreas = async () => {
    client.get<ApiResponse<Area[]>>("/areas").then((response) => {
      if (response.data) {
        setAreas(response.data);
      } else {
        setAreas([]);
      }
    });
  };

  const fetchEstablishmentAreas = async () => {
    client
      .get<ApiResponse<Area[]>>(`/establishments/${currentEstablishment}/areas`)
      .then((response) => {
        if (response.data) {
          setEstablishmentAreas(response.data);
        } else {
          setEstablishmentAreas([]);
        }
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after data fetching
      });
  };

  useEffect(() => {
    fetchAreas();
    fetchEstablishmentAreas();
  }, [currentEstablishment]);

  return (
    <VStack
      w={{ base: "full", xl: "33%" }}
      justifyContent={"start"}
      height={"50vh"}
    >
      <Heading mb={4} alignSelf={"start"}>
        Areas
      </Heading>
      <Select
        placeholder="Elige una area"
        onChange={(e) => {
          setCurrentSelectedArea(parseInt(e.target.value));
        }}
      >
        {areas?.map((area) => {
          return (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          );
        })}
      </Select>
      <TableContainer w={"full"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Areas</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? ( // Show spinner while loading
              <Tr>
                <Td>
                  <Spinner size={"md"} />
                </Td>
              </Tr>
            ) : establishmentAreas && establishmentAreas.length > 0 ? (
              establishmentAreas.map((area) => {
                return (
                  <Tr key={area.id}>
                    <Td>{area.name}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={5}>
                  <Text w={"full"} textAlign={"center"}>
                    No se han encontrado areas
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        leftIcon={<FaPlus />}
        colorScheme="green"
        variant="solid"
        alignSelf={"flex-end"}
        mt={"auto"}
        onClick={() => {}}
      >
        Agregar Area
      </Button>
    </VStack>
  );
}

function Positions() {
  const client = useApiClient();
  const [positions, setPositions] = useState<Position[] | null>(null);
  const [defaultEstablishment, setDefaultEstablishment] = useState<string>("");

  const fetchAreas = async () => {
    client.get<ApiResponse<Position[]>>("/positions").then((response) => {
      if (response.data) {
        setPositions(response.data);
        setDefaultEstablishment(response.data[0].name);
      } else {
        setPositions([]);
      }
    });
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  return (
    <VStack
      w={{ base: "full", xl: "33%" }}
      justifyContent={"start"}
      height={"50vh"}
    >
      <Heading mb={4} alignSelf={"start"}>
        Posiciones
      </Heading>
      <Select placeholder="Elige una posicion">
        {positions?.map((position) => {
          return <option key={position.id}>{position.name}</option>;
        })}
      </Select>
      <TableContainer w={"full"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Posiciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Box as="label" w={"full"}>
              <Box
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                px={5}
                py={3}
              >
                Tecnico de Campo
              </Box>
            </Box>
          </Tbody>
        </Table>
      </TableContainer>
      <Button
        leftIcon={<FaPlus />}
        colorScheme="green"
        variant="solid"
        alignSelf={"flex-end"}
        mt={"auto"}
      >
        Agregar Area
      </Button>
    </VStack>
  );
}

function Establishments({
  establishments,
  handleEstablishmentChange,
}: {
  establishments: Establishment[] | null;
  handleEstablishmentChange: (id: number) => void;
}) {
  return (
    <VStack
      w={{ base: "full", xl: "33%" }}
      justifyContent={"start"}
      minHeight={"50vh"}
    >
      <Heading mb={4} alignSelf={"start"}>
        Establecimientos
      </Heading>
      <EstablishmentsRadioButtonsGroup
        establishments={establishments}
        handleEstablishmentChange={handleEstablishmentChange}
      />
      <Button
        leftIcon={<FaPlus />}
        colorScheme="green"
        variant="solid"
        alignSelf={"flex-end"}
        mt={"auto"}
      >
        Agregar Establecimiento
      </Button>
    </VStack>
  );
}

export function EstablishmentsManagement() {
  const client = useApiClient();
  const [establishments, setEstablishments] = useState<Establishment[] | null>(
    null
  );
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState<
    number | null
  >(null);

  const [currentEstablishment, setCurrentEstablishment] =
    useState<Establishment | null>(null);

  const fetchEstablishments = async () => {
    client
      .get<ApiResponse<Establishment[]>>("/establishments")
      .then((response) => {
        if (response.data) {
          setEstablishments(response.data);
          setCurrentEstablishment(response.data[0]);
        } else {
          setEstablishments([]);
        }
      });
  };

  useEffect(() => {
    fetchEstablishments();
  }, []);

  const handleEstablishmentChange = (newEstablishmentId: number) => {
    setSelectedEstablishmentId(newEstablishmentId);
  };

  return (
    <Stack w={"full"}>
      <Alert status="info" display={{ base: "none", md: "visible" }}>
        <AlertIcon />
        En este apartado podras encontrar los Establecimientos en la Izquierda y
        agregar las Areas y Posiciones que esten disponibles, seleccionando Area
        o Posicion que quieras agregar y luego presionas en Agregar
      </Alert>
      <Stack alignItems={"start"} direction={{ base: "column", lg: "row" }}>
        <Establishments
          establishments={establishments}
          handleEstablishmentChange={handleEstablishmentChange}
        />
        <Areas currentEstablishment={selectedEstablishmentId} />
        <Positions />
      </Stack>
    </Stack>
  );
}
