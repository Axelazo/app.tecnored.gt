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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import DualSideDivider from "../common/DualSideDivider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TicketFormValues } from "../../formValues/TicketFormValues";
import { TicketFormResolver } from "../../resolvers/TicketFormResolver";
import ValidatableInput from "../ValidatableInput";

function CreateTicket() {
  const [showCustomSubject, setShowCustomSubject] = useState<boolean>(false);
  const { register, handleSubmit, formState, clearErrors, reset, getValues } =
    useForm<TicketFormValues>({
      resolver: TicketFormResolver,
    });

  const onSubmit = (ticketData: TicketFormValues) => {
    console.log("submit works!");
  };

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
        <DualSideDivider
          text={"Información del Cliente y Servicio"}
          width={16}
        />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <FormControl isRequired isInvalid={!!formState.errors.clientId}>
              <FormLabel>Cliente</FormLabel>
              <Select
                placeholder="Seleccionar Cliente"
                {...register("clientId")}
              >
                <option value={1}>Juan Perez Poc</option>
                <option value={2}>Joselin Barrientos de Aguilar</option>
              </Select>
              <FormErrorMessage>
                {formState.errors.clientId?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!formState.errors.serviceId}>
              <FormLabel>Servicio</FormLabel>
              <Select
                placeholder="Seleccionar Servicio"
                {...register("serviceId")}
              >
                <option value={1}>
                  #12346678 - 192.168.5.2 - Plan Estandar - Router Machaquila
                </option>
                <option value={2}>
                  #98764321 - 192.168.2.67 - Plan Avanzado - Router Poptun
                </option>
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
            <FormControl isRequired isInvalid={!!formState.errors.employeeId}>
              <FormLabel>Técnico</FormLabel>
              <Select
                placeholder="Seleccionar Técnico"
                {...register("employeeId")}
              >
                <option value={1}>Anthony Barrientos</option>
                <option value={2}>Melvin</option>
              </Select>
              <FormErrorMessage>
                {formState.errors.employeeId?.message}
              </FormErrorMessage>
            </FormControl>
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
          <Textarea></Textarea>
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
                  getValues();
                  setTimeout(() => {
                    clearErrors();
                    reset({});
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
