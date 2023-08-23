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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import DualSideDivider from "../common/DualSideDivider";
import { useState } from "react";

function CreateTicket() {
  const [showCustomSubject, setShowCustomSubject] = useState<boolean>(false);

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
      <form noValidate={true}>
        <DualSideDivider
          text={"Información del Cliente y Servicio"}
          width={16}
        />
        <VStack spacing={4}>
          <HStack spacing={8} w={"full"}>
            <FormControl isRequired>
              <FormLabel>Cliente</FormLabel>
              <Select placeholder="Seleccionar Cliente">
                <option value={1}>Juan Perez Poc</option>
                <option value={2}>Joselin Barrientos de Aguilar</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Servicio</FormLabel>
              <Select placeholder="Seleccionar Servicio">
                <option value={1}>
                  #12346678 - 192.168.5.2 - Plan Estandar - Router Machaquila
                </option>
                <option value={2}>
                  #98764321 - 192.168.2.67 - Plan Avanzado - Router Poptun
                </option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>

        <VStack spacing={4} mt={6}>
          <HStack spacing={8} w={"full"}>
            <FormControl isRequired>
              <FormLabel>Asunto / Razón</FormLabel>
              <Select
                placeholder="Seleccionar Asunto / Razón"
                onChange={(e) => {
                  if (parseInt(e.target.value) === 0) {
                    setShowCustomSubject(true);
                  } else {
                    setShowCustomSubject(false);
                  }
                }}
              >
                <option>No tiene Internet</option>
                <option>Internet Lento</option>
                <option>Recolección de Equipos</option>
                <option>Cambio de Contraseña</option>
                <option>Cambio de Domicilio</option>
                <option value={0}>Otro</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Técnico</FormLabel>
              <Select placeholder="Seleccionar Técnico">
                <option>Anthony Barrientos</option>
                <option>Melvin</option>
              </Select>
            </FormControl>
          </HStack>
          {showCustomSubject ? (
            <FormControl isRequired>
              <FormLabel>Asunto / Razón personalizada</FormLabel>
              <Input type={"text"}></Input>
            </FormControl>
          ) : (
            ""
          )}
        </VStack>
        <VStack spacing={4} mt={6}>
          <HStack spacing={8} w={"full"}>
            <FormControl isRequired>
              <FormLabel>Fecha estimada de inicio</FormLabel>
              <Input type={"date"}></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Fecha estimada de finalización</FormLabel>
              <Input type={"date"}></Input>
            </FormControl>
          </HStack>
        </VStack>
        <FormControl mt={6}>
          <FormLabel>Comentario</FormLabel>
          <Textarea></Textarea>
        </FormControl>
      </form>
    </Stack>
  );
}

export default CreateTicket;
