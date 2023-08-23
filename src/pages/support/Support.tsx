import { Card, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Support = () => {
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
};
