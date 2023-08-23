import { Stack, Button } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import TicketsTable from "./TicketsTable";

function TicketsList() {
  return (
    <>
      <Stack flexGrow={1}>
        <PageHeader title="Soporte Técnico">
          <Button
            leftIcon={<FaPlus />}
            colorScheme="green"
            variant="solid"
            as={NavLink}
            to={"create"}
            relative="path"
          >
            Agregar Ticket
          </Button>
        </PageHeader>
        <TicketsTable />
      </Stack>
    </>
  );
}

export default TicketsList;
