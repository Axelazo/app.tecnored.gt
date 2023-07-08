import { FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import EmployeesTable from "./EmployeesTable";

function EmployeesList() {
  return (
    <>
      <Stack flexGrow={1}>
        <PageHeader title="Lista de empleados">
          <Button
            leftIcon={<FaPlus />}
            colorScheme="green"
            variant="solid"
            as={NavLink}
            to={"create"}
            relative="path"
          >
            Agregar empleado
          </Button>
        </PageHeader>
        <FormControl>
          <FormLabel>Buscar empleado...</FormLabel>
          <Input type="text" placeholder="Nombres, apellidos..." />
        </FormControl>
        <EmployeesTable />
      </Stack>
    </>
  );
}

export default EmployeesList;
