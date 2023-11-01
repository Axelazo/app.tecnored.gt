import { Stack } from "@chakra-ui/react";
import PageHeader from "../common/PageHeader";
import PayrollsTable from "./PayrollTable";

function PayrollList() {
  return (
    <>
      <Stack flexGrow={1} maxW={"full"}>
        <PageHeader title="Planilla"></PageHeader>
        <PayrollsTable />
      </Stack>
    </>
  );
}

export default PayrollList;
