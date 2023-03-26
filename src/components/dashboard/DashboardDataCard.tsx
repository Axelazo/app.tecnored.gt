import {
  GridItem,
  Card,
  Heading,
  Stat,
  useColorModeValue,
  Flex,
  StatLabel,
  StatNumber,
  Icon,
  Box,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaUsers } from "react-icons/fa";
import { HiUsers, HiUserAdd } from "react-icons/hi";

interface DataCardProperty {
  label: string;
  total: number;
  icon: IconType;
}

interface DashboardDataCardInterface {
  heading: string;
  property1?: DataCardProperty | null;
  property2?: DataCardProperty | null;
  property3?: DataCardProperty | null;
}

export function DashboardDataCard({
  heading,
  property1,
  property2,
  property3,
}: DashboardDataCardInterface) {
  return (
    <GridItem>
      <Card w={"full"}>
        <Heading px={"4"} pt={"2"} fontSize={"2xl"}>
          {heading}
        </Heading>
        <Stat
          py={"2"}
          pr={{ base: 2, md: 4 }}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          rounded={"lg"}
        >
          <Flex justifyContent={"space-between"}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight={"medium"} isTruncated>
                {property1?.label}
              </StatLabel>
              <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {property1?.total}
              </StatNumber>
            </Box>
            <Box
              my={"auto"}
              color={useColorModeValue("gray.800", "gray.200")}
              alignContent={"center"}
            >
              <Icon as={property1?.icon} boxSize={5} />
            </Box>
          </Flex>
        </Stat>
        <Stat
          py={"2"}
          pr={{ base: 2, md: 4 }}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          rounded={"lg"}
        >
          <Flex justifyContent={"space-between"}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight={"medium"} isTruncated>
                {property2?.label}
              </StatLabel>
              <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {property2?.total}
              </StatNumber>
            </Box>
            <Box
              my={"auto"}
              color={useColorModeValue("gray.800", "gray.200")}
              alignContent={"center"}
            >
              <Icon as={property2?.icon} boxSize={5} />
            </Box>
          </Flex>
        </Stat>
        <Stat
          py={"2"}
          pr={{ base: 2, md: 4 }}
          borderColor={useColorModeValue("gray.800", "gray.500")}
          rounded={"lg"}
        >
          <Flex justifyContent={"space-between"}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel fontWeight={"medium"} isTruncated>
                {property3?.label}
              </StatLabel>
              <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                {property3?.total}
              </StatNumber>
            </Box>
            <Box
              my={"auto"}
              color={useColorModeValue("gray.800", "gray.200")}
              alignContent={"center"}
            >
              <Icon as={property3?.icon} boxSize={5} />
            </Box>
          </Flex>
        </Stat>
      </Card>
    </GridItem>
  );
}
