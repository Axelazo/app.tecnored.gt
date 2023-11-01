import { FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ClientsTable from "./ClientsTable";

function ClientList() {
  return (
    <>
      <Stack flexGrow={1} maxW={"full"}>
        <PageHeader title="Lista de clientes">
          <Button
            leftIcon={<FaPlus />}
            colorScheme="green"
            variant="solid"
            as={NavLink}
            to={"create"}
            relative="path"
          >
            Agregar cliente
          </Button>
        </PageHeader>
        <FormControl>
          <FormLabel>Buscar cliente...</FormLabel>
          <Input type="text" placeholder="Nombres, apellidos..." />
        </FormControl>
        <ClientsTable />
      </Stack>
    </>
  );
}

export default ClientList;
