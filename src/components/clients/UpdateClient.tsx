import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Spinner,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useApiClient from "../../hooks/useApiClient";
import { AxiosError } from "axios";
import PageHeader from "../common/PageHeader";
import DualSideDivider from "../common/DualSideDivider";
import ValidatableInput from "../ValidatableInput";
import ImageDropzone from "../misc/ImageDropzone";
import { DownloadImageAsFile, loadFile } from "../../helpers/files";
import { Client } from "../../interfaces/app/Client";
import { ClientFormValues } from "../../formValues/ClientFormValues";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";
import {
  getDepartments,
  getMunicipalitiesFromDepartment,
} from "../../lib/index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ClientFormResolver } from "../../resolvers/ClientFormResolver";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";

const departments = getDepartments();

function UpdateClient() {
  const [disabled, setDisabled] = useState(false);

  // TODO: Replace with Department and Municipalities input
  const [municipalities, setMunicipalities] = useState(
    getMunicipalitiesFromDepartment(12)
  );
  const [department, setDepartment] = useState(12);
  const [municipality, setMunicipality] = useState(1);
  const [dpiImageFront, setdpiImageFront] = useState<File | null>(null);
  const [dpiImageBack, setdpiImageBack] = useState<File | null>(null);
  const { register, handleSubmit, formState, clearErrors, reset } =
    useForm<ClientFormValues>({
      resolver: ClientFormResolver,
    });
  const toast = useToast();
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(false);
  const { id } = useParams();
  const api = useApiClient();
  const clientId = id ? parseInt(id) : undefined;

  const [client, setClient] = useState<Client | null>(null);

  const onSubmit = handleSubmit(async (clientData) => {
    const formData = new FormData();
    const [dpiFront, dpiBack] = await Promise.all([
      loadFile(dpiImageFront),
      loadFile(dpiImageBack),
    ]);

    if (dpiFront && dpiBack) {
      formData.append("dpiFront", dpiFront, dpiImageFront?.name);
      formData.append("dpiBack", dpiBack, dpiImageBack?.name);
      formData.append("person[firstNames]", clientData.firstNames);
      formData.append("person[lastNames]", clientData.lastNames);
      formData.append("address[street]", clientData.address);
      formData.append("address[locality]", clientData.locality);
      formData.append(
        "address[municipality]",
        clientData.municipality.toString()
      );
      formData.append("address[department]", clientData.department.toString());
      formData.append("dpi[number]", clientData.dpiNumber);

      if (clientData.phone) {
        formData.append(`phones[0][type]`, "Teléfono");
        formData.append(`phones[0][number]`, clientData.phone);
      }

      // * Optional parameters
      if (clientData.birthday) {
        formData.append(
          "person[birthday]",
          new Date(clientData.birthday).toISOString()
        );
      }

      if (clientData.email) {
        formData.append(`person[email]`, clientData.email);
      }

      if (clientData.nitNumber) {
        formData.append(`person[nitNumber]`, clientData.nitNumber);
      }

      if (clientData.cellphone) {
        formData.append(`phones[1][type]`, "Celular");
        formData.append(`phones[1][number]`, clientData.cellphone);
      }

      if (clientData.zipCode) {
        formData.append("address[zipCode]", clientData.zipCode);
      }

      if (clientData.addressType) {
        formData.append(`address[type]`, clientData.addressType);
      }

      api
        .put<Client>(`/clients/update/${clientId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          setDisabled(true);
          toast({
            description: `Cliente actualizado exitosamente!`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate({ pathname: `/clients/view/${clientId}` });
          }, 3000);
        })
        .catch((error: AxiosError) => {
          if (error.response && error.response.data) {
            const message = (error.response.data as ErrorResponseData).message;
            toast({
              description: `${message}`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        });
    }
  });

  const clientResponse = async () => {
    return new Promise<Client>((resolve, reject) => {
      const timeout = Math.floor(Math.random() * 1); // Random wait time between 1-3 seconds
      setTimeout(() => {
        api
          .get<ApiResponse<Client>>(`/clients/${clientId}`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((reason: AxiosError) => {
            //addtoast
            reject(reason);
          });
      }, timeout);
    });
  };

  useEffect(() => {
    clientResponse()
      .then((client) => {
        //Set images on the DPI
        setClient(client);
      })
      .catch((error) => {
        setLoadError(true);
        console.error(`Query failed ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (!client) {
      return; // Client is not defined, so exit early
    }

    const loadDpiImages = async () => {
      const imageFront = await api.getImage(
        client.person.dpi.dpiFrontUrl,
        "front.png"
      );
      const imageBack = await api.getImage(
        client.person.dpi.dpiBackUrl,
        "back.png"
      );

      // Convert the Blobs to File objects
      const frontImageFile = new File([imageFront], "image" + imageFront.type);
      const backImageFile = new File([imageBack], "image" + imageBack.type);

      // Set the File objects in your state
      setdpiImageFront(frontImageFile);
      setdpiImageBack(backImageFile);
    };

    loadDpiImages();
  }, [client]);

  if (!client) {
    return (
      <Flex
        flexGrow={1}
        justifyContent={"center"}
        alignItems={"center"}
        minH={"68vh"}
      >
        {loadError ? (
          <>No se ha podido encontrar el usuario</>
        ) : (
          <Spinner size={"xl"} />
        )}
      </Flex>
    );
  }

  return (
    <Stack w={"full"}>
      <PageHeader title="Editar la información del cliente">
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="yellow"
          variant="solid"
          onClick={() => {
            navigate(-1);
          }}
        >
          Regresar
        </Button>
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="orange"
          variant="solid"
          as={NavLink}
          to={"/clients"}
          relative="path"
        >
          Regresar a la Lista de Clientes
        </Button>
      </PageHeader>
      <form onSubmit={onSubmit} noValidate={true}>
        <DualSideDivider text={"Datos personales"} width={10} />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              id={"firstNames"}
              type={"text"}
              label={"Nombres"}
              register={register("firstNames")}
              error={formState.errors.firstNames}
              required={true}
              defaultValue={client?.person.firstNames}
            />
            <ValidatableInput
              id={"lastNames"}
              type={"text"}
              label={"Apellidos"}
              register={register("lastNames")}
              error={formState.errors.lastNames}
              required={true}
              defaultValue={client?.person.lastNames}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              id={"dpiNumber"}
              type={"text"}
              label={"Número de Documento Personal de Identificación (DPI)"}
              register={register("dpiNumber")}
              error={formState.errors.dpiNumber}
              required={true}
              defaultValue={client?.person.dpi.number}
            />
            <ValidatableInput
              id={"nitNumber"}
              type={"text"}
              label={"Número de Identificación Tributaria (NIT)"}
              register={register("nitNumber")}
              defaultValue={client?.person.nitNumber}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              type={"text"}
              label={"Correo electrónico"}
              register={register("email")}
              error={formState.errors.email}
              defaultValue={client?.person.email}
            />
            <ValidatableInput
              type={"date"}
              label={"Fecha de nacimiento"}
              register={register("birthday")}
              defaultValue={
                client?.person.birthday
                  ? new Date(client.person.birthday).toISOString().split("T")[0]
                  : "1970-01-01"
              }
            />
          </HStack>

          <HStack spacing={8} w={"full"}>
            <ImageDropzone
              formSubmited={formState.isSubmitted}
              text={"DPI parte frontal"}
              image={dpiImageFront}
              setImage={setdpiImageFront}
            />
            <ImageDropzone
              formSubmited={formState.isSubmitted}
              text={"DPI parte posterior"}
              image={dpiImageBack}
              setImage={setdpiImageBack}
            />
          </HStack>
        </VStack>
        <DualSideDivider text={"Datos de facturación"} width={10} />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              type={"text"}
              label={"Teléfono"}
              register={register("phone")}
              error={formState.errors.phone}
              required={true}
              defaultValue={client?.person.phones[0].number}
            />
            <ValidatableInput
              type={"text"}
              label={"Celular"}
              register={register("cellphone")}
              defaultValue={
                client?.person.phones[1] ? client?.person.phones[1].number : ""
              }
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              id={"address"}
              type={"text"}
              label={"Dirección"}
              register={register("address")}
              error={formState.errors.address}
              required={true}
              defaultValue={client?.person.address.street}
            />
            <ValidatableInput
              id={"locality"}
              type={"text"}
              label={"Localidad / Aldea / Pueblo"}
              register={register("locality")}
              error={formState.errors.locality}
              required={true}
              defaultValue={client?.person.address.locality}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <FormControl
              isInvalid={!!formState.errors.municipality?.message}
              isRequired
            >
              <FormLabel>Municipio</FormLabel>
              <Select
                placeholder="Seleccionar municipio"
                {...register("municipality")}
                onChange={(ev) => {
                  setMunicipality(parseInt(ev.target.value));
                }}
                defaultValue={client?.person.address.municipality.id}
              >
                {municipalities.map((municipality) => {
                  return (
                    <option value={municipality.id}>
                      {municipality.title}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.municipality?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formState.errors.department?.message}
              isRequired
            >
              <FormLabel>Departamento</FormLabel>
              <Select
                placeholder="Seleccionar departamento"
                {...register("department")}
                onChange={(ev) => {
                  setDepartment(parseInt(ev.target.value));
                }}
                defaultValue={client?.person.address.department.id}
              >
                {departments.map((department) => {
                  return (
                    <option value={department.id}>{department.title}</option>
                  );
                })}
              </Select>{" "}
              <FormErrorMessage>
                {formState.errors.department?.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <HStack spacing={8} w={"full"}>
            <FormControl>
              <FormLabel>Codigo postal</FormLabel>
              <Input
                type="text"
                {...register("zipCode")}
                value={client?.person.address.zipCode}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tipo de dirección</FormLabel>
              <Select
                placeholder="Seleccionar tipo de dirección"
                {...register("addressType")}
                value={client?.person.address.type}
              >
                <option value={1}>Casa</option>
                <option value={2}>Trabajo</option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
        <Flex pt={4}>
          <Box flexGrow={1} />
          <Button
            isDisabled={disabled}
            isLoading={formState.isSubmitting}
            colorScheme={"green"}
            type={"submit"}
            onClick={() => {
              setTimeout(() => {
                clearErrors();
                reset({});
              }, 3000);
            }}
          >
            Actualizar información del cliente
          </Button>
        </Flex>
      </form>
    </Stack>
  );
}

export default UpdateClient;
