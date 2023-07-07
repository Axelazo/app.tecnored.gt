import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import DualSideDivider from "components/DualSideDivider";
import ImageDropzone from "components/misc/ImageDropzone";
import { ClientFormValues } from "interfaces/Client";
import PageHeader from "components/common/PageHeader";
import { Client } from "interfaces/app/Client";
import { ClientFormResolver } from "resolvers/ClientFormResolver";
import ValidatableInput from "components/login/ValidatableInput";
import { AxiosError } from "axios";
import { loadFile } from "helpers/files";
import { formDataToJson } from "helpers/conversion";
import DepartmentMunicipalitySelect from "components/misc/DepartmentMunicipalitySelect";
import useApiClient from "api/apiHook";
import { ErrorResponseData } from "interfaces/app/ErrorResponseData";

function CreateClient() {
  const [dpiImageFront, setdpiImageFront] = useState<File | null>(null);
  const [dpiImageBack, setdpiImageBack] = useState<File | null>(null);
  const { register, handleSubmit, formState, clearErrors, reset } =
    useForm<ClientFormValues>({
      resolver: ClientFormResolver,
    });
  const toast = useToast();
  const navigate = useNavigate();

  const api = useApiClient();

  /*   const onSubmit = handleSubmit(async (clientData) => {
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

      console.log(formDataToJson(formData));

      api
        .post<Client>("/clients/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          toast({
            description: `Cliente agregado exitosamente!`,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate({ pathname: `/clients/view/${response.id}` });
          }, 3000);
        })
        .catch((error: AxiosError) => {
          console.log("catched error!");
          if (error.response && error.response.data) {
            console.log(error.response.data);
            const message = (error.response.data as ErrorResponseData).message;
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
    }
  }); */

  function onSubmit(clientData: ClientFormValues) {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
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
          formData.append(
            "address[department]",
            clientData.department.toString()
          );
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
            .post<Client>("/clients/create", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              toast({
                description: `Cliente agregado exitosamente!`,
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
        }
      }, timeout);
    });
  }

  return (
    <Stack w={"full"}>
      <PageHeader title="Agregar un nuevo cliente">
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="green"
          variant="solid"
          as={NavLink}
          to={"/clients"}
          relative="path"
        >
          Regresar a la Lista de Clientes
        </Button>
      </PageHeader>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
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
            />
            <ValidatableInput
              id={"lastNames"}
              type={"text"}
              label={"Apellidos"}
              register={register("lastNames")}
              error={formState.errors.lastNames}
              required={true}
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
            />
            <ValidatableInput
              id={"nitNumber"}
              type={"text"}
              label={"Número de Identificación Tributaria (NIT)"}
              register={register("nitNumber")}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <ValidatableInput
              type={"text"}
              label={"Correo electrónico"}
              register={register("email")}
              error={formState.errors.email}
            />
            <ValidatableInput
              type={"date"}
              label={"Fecha de nacimiento"}
              register={register("birthday")}
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
            />
            <ValidatableInput
              type={"text"}
              label={"Celular"}
              register={register("cellphone")}
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
            />
            <ValidatableInput
              id={"locality"}
              type={"text"}
              label={"Localidad / Aldea / Pueblo"}
              register={register("locality")}
              error={formState.errors.locality}
              required={true}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <DepartmentMunicipalitySelect
              formState={formState}
              register={register("municipality")}
              register1={register("department")}
            ></DepartmentMunicipalitySelect>
          </HStack>
          <HStack spacing={8} w={"full"}>
            <FormControl>
              <FormLabel>Codigo postal</FormLabel>
              <Input type="text" {...register("zipCode")} />
            </FormControl>
            <FormControl>
              <FormLabel>Tipo de dirección</FormLabel>
              <Select
                placeholder="Seleccionar tipo de dirección"
                {...register("addressType")}
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
            Crear cliente
          </Button>
        </Flex>
      </form>
    </Stack>
  );
}

export default CreateClient;
