import { Card, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Employees() {
  return (
    <Card w={"full"}>
      <Flex
        flexDir={"row"}
        flexGrow={1}
        alignContent={"center"}
        alignItems={"center"}
        p={6}
      >
        <Outlet />
      </Flex>
    </Card>
  );
}

export default Employees;
