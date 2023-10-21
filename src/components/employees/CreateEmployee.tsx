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
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import DualSideDivider from "../common/DualSideDivider";
import ImageDropzone from "../misc/ImageDropzone";
import PageHeader from "../common/PageHeader";
import ValidatableInput from "../ValidatableInput";
import { useEffect } from "react";
import { loadFile } from "../../helpers/files";
import { formDataToJson } from "../../helpers/conversion";
import { Establishment } from "../../interfaces/app/Establishment";
import { Area } from "../../interfaces/app/Area";
import { Position } from "../../interfaces/app/Position";
import { Bank } from "../../interfaces/app/Bank";
import { Employee } from "../../interfaces/app/Employee";
import { ApiResponse } from "../../interfaces/misc/ApiResponse";

import { EmployeeFormValues } from "../../formValues/EmployeeFormValues";
import { EmployeFormResolver } from "../../resolvers/EmployeeFormResolver";
import DepartmentMunicipalitySelect from "../misc/DepartmentMunicipalitySelect";
import useApiClient from "../../hooks/useApiClient";
import { ErrorResponseData } from "../../interfaces/app/ErrorResponseData";
import { AxiosError } from "axios";

function CreateEmployee() {
  const api = useApiClient();
  const [disabled, setDisabled] = useState(false);

  //Establishments, areas and positions
  const [establishment, setEstablishment] = useState(0);
  const [area, setArea] = useState(0);
  const [position, setPosition] = useState(0);

  const [establishments, setEstablishments] = useState<Establishment[] | null>(
    null
  );
  const [areas, setAreas] = useState<Area[] | null>(null);
  const [positions, setPositions] = useState<Position[] | null>(null);

  //Banks and accounts
  const [bank, setBank] = useState(1);

  const [banks, setBanks] = useState<Bank[] | null>(null);

  //! Images
  const [picture, setPicture] = useState<File | null>(null);
  const [dpiImageFront, setdpiImageFront] = useState<File | null>(null);
  const [dpiImageBack, setdpiImageBack] = useState<File | null>(null);

  const { register, handleSubmit, formState, getValues, clearErrors, reset } =
    useForm<EmployeeFormValues>({
      resolver: EmployeFormResolver,
    });
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (employeeData) => {
    const timeout = Math.floor(Math.random() * 2000) + 1000; // Random wait time between 1-3 seconds
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const formData = new FormData();

        const [dpiFront, dpiBack, profilePicture] = await Promise.all([
          loadFile(dpiImageFront),
          loadFile(dpiImageBack),
          loadFile(picture),
        ]);

        if (dpiFront && dpiBack && profilePicture) {
          formData.append("dpiFront", dpiFront, dpiImageFront?.name);
          formData.append("dpiBack", dpiBack, dpiImageBack?.name);
          formData.append("profilePicture", profilePicture, picture?.name);

          formData.append("employee[firstNames]", employeeData.firstNames);
          formData.append("employee[lastNames]", employeeData.lastNames);
          formData.append("address[street]", employeeData.address);
          formData.append("address[locality]", employeeData.locality);
          formData.append(
            "address[municipality]",
            employeeData.municipality.toString()
          );
          formData.append(
            "address[department]",
            employeeData.department.toString()
          );
          formData.append("dpi[number]", employeeData.dpiNumber);
          formData.append(
            "employee[establishment]",
            employeeData.establishment.toString()
          );
          formData.append("employee[area]", employeeData.area.toString());
          formData.append(
            "employee[position]",
            employeeData.position.toString()
          );
          formData.append("employee[salary]", employeeData.salary.toString());
          formData.append(
            "employee[birthday]",
            new Date(employeeData.birthday).toISOString()
          );
          formData.append(`employee[nitNumber]`, employeeData.nitNumber);

          if (employeeData.bank) {
            formData.append("employee[bank]", employeeData.bank.toString());
            formData.append(
              "employee[accountNumber]",
              employeeData.accountNumber
            );
          }

          if (employeeData.phone) {
            formData.append(`phones[0][type]`, "Teléfono");
            formData.append(`phones[0][number]`, employeeData.phone);
          }

          if (employeeData.email) {
            formData.append(`employee[email]`, employeeData.email);
          }
          if (employeeData.cellphone) {
            formData.append(`phones[1][type]`, "Celular");
            formData.append(`phones[1][number]`, employeeData.cellphone);
          }

          if (employeeData.zipCode) {
            formData.append("address[zipCode]", employeeData.zipCode);
          }

          if (employeeData.addressType) {
            formData.append(`address[type]`, employeeData.addressType);
          }

          console.log(formDataToJson(formData));

          api
            .post<Employee>("/employees/create", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              setDisabled(true);
              toast({
                description: `Empleado agregado exitosamente!`,
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              setTimeout(() => {
                navigate({ pathname: `/employees/view/${response.id}` });
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
  });

  useEffect(() => {
    api.get<ApiResponse<Bank[]>>("/banks").then((response) => {
      setBanks(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<ApiResponse<Establishment[]>>("/establishments")
      .then((response) => {
        setEstablishments(response.data);
      });
  }, []);

  useEffect(() => {
    api
      .get<ApiResponse<Area[]>>(`establishments/${establishment}/areas`)
      .then((response) => {
        setAreas(response.data);
      });
  }, [establishment]);

  useEffect(() => {
    console.log(`/establishments/${establishment}/area/${area}/positions`);
    if (area !== 0) {
      api
        .get<ApiResponse<Position[]>>(
          `establishments/${establishment}/areas/${area}/positions`
        )
        .then((response) => {
          setPositions(response.data);
        });
    } else if (area === 0) {
      setPositions(null);
    }
  }, [area]);

  return (
    <Stack w={"full"}>
      <PageHeader title="Agregar un nuevo empleado">
        <Button
          leftIcon={<IoMdArrowRoundBack />}
          colorScheme="green"
          variant="solid"
          as={NavLink}
          to={"/employees"}
          relative="path"
        >
          Regresar a la Lista de Empleados
        </Button>
      </PageHeader>
      <form onSubmit={onSubmit} noValidate={true}>
        <DualSideDivider text={"Datos personales"} width={10} />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <Box w={{ sm: "75%", md: "50%" }}>
              <ImageDropzone
                formSubmited={formState.isSubmitted}
                text={"Foto para carné"}
                image={picture}
                setImage={setPicture}
              />
            </Box>

            <VStack w={"full"}>
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
            </VStack>
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
              id={"birthday"}
              type={"date"}
              label={"Fecha de nacimiento"}
              register={register("birthday")}
              error={formState.errors.birthday}
              required={true}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <FormControl
              isInvalid={!!formState.errors.bank?.message}
              isRequired
            >
              <FormLabel>Banco</FormLabel>
              <Select
                placeholder="Seleccionar banco"
                {...register("bank")}
                onChange={(ev) => {
                  setBank(parseInt(ev.target.value));
                }}
                defaultValue={bank}
              >
                {banks?.map((bank) => {
                  return <option value={bank.id}>{bank.name}</option>;
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.bank?.message}
              </FormErrorMessage>
            </FormControl>
            <ValidatableInput
              type={"text"}
              label={"No. de Cuenta Bancaria"}
              register={register("accountNumber")}
              error={formState.errors.accountNumber}
              required={true}
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
        <DualSideDivider text={"Datos de contacto"} width={10} />
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
        <DualSideDivider
          text={"Datos sobre el trabajador dentro de la empresa"}
          width={32}
        />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <FormControl
              isInvalid={!!formState.errors.establishment?.message}
              isRequired
            >
              <FormLabel>Establecimiento</FormLabel>
              <Select
                placeholder="Seleccionar establecimiento"
                {...register("establishment")}
                onChange={(ev) => {
                  setEstablishment(parseInt(ev.target.value));
                  setArea(0);
                  setPosition(0);
                }}
                defaultValue={establishment}
              >
                {establishments?.map((establishment) => {
                  return (
                    <option value={establishment.id}>
                      {establishment.name}
                    </option>
                  );
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.establishment?.message}
              </FormErrorMessage>
            </FormControl>
            <ValidatableInput
              required={true}
              type={"text"}
              label={"Sueldo (mensual)"}
              register={register("salary")}
              error={formState.errors.salary}
              leftElement={<p>Q</p>}
            />
          </HStack>
          <HStack spacing={8} w={"full"}>
            <FormControl
              isInvalid={!!formState.errors.area?.message}
              isRequired
            >
              <FormLabel>Area</FormLabel>
              <Select
                placeholder="Seleccionar area"
                {...register("area")}
                onChange={(ev) => {
                  setArea(parseInt(ev.target.value));
                  console.log(ev.target.value);
                }}
                defaultValue={area}
                required={true}
              >
                {areas?.map((area) => {
                  return <option value={area.id}>{area.name}</option>;
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.area?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formState.errors.position?.message}
              isRequired
            >
              <FormLabel>Puesto</FormLabel>
              <Select
                placeholder="Seleccionar puesto"
                {...register("position")}
                onChange={(ev) => {
                  setPosition(parseInt(ev.target.value));
                  console.log(ev.target.value);
                }}
                defaultValue={position}
              >
                {positions?.map((position) => {
                  return <option value={position.id}>{position.name}</option>;
                })}
              </Select>
              <FormErrorMessage>
                {formState.errors.position?.message}
              </FormErrorMessage>
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
            Crear Empleado
          </Button>
        </Flex>
      </form>
    </Stack>
  );
}

export default CreateEmployee;
