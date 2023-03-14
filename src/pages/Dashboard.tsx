import {
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiUsers, HiUserAdd } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";

function Dashboard() {
  return (
    <Stack flexGrow={1} flexDir={"column"} alignContent={"start"}>
      <HStack
        spacing={4}
        flexGrow={1}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Card flexGrow={1}>
          <Heading px={"4"} pt={"2"} fontSize={"2xl"}>
            Clientes
          </Heading>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Total de clientes
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  500
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={FaUsers} boxSize={5} />
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
                  Total de clientes nuevos en el mes:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  23
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUsers} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Total de clientes nuevos hoy:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  1
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUserAdd} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
        </Card>
        <Card flexGrow={1}>
          <Heading px={"4"} pt={"2"} fontSize={"2xl"}>
            Pagos
          </Heading>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Total de pagos en el mes
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  <HStack>
                    <Text>Q.2560</Text> <Text fontSize={"xs"}>(11 pagos)</Text>
                  </HStack>
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={FaUsers} boxSize={5} />
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
                  Total de pagos pendientes:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  <HStack>
                    <Text>Q.9820</Text> <Text fontSize={"xs"}>(32 pagos)</Text>
                  </HStack>
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUsers} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Total de pagos de hoy:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  <HStack>
                    <Text>Q.400</Text> <Text fontSize={"xs"}>(2 pagos)</Text>
                  </HStack>
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUserAdd} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
        </Card>
        <Card flexGrow={1}>
          <Heading px={"4"} pt={"2"} fontSize={"2xl"}>
            Tickets
          </Heading>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Total de tickets
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  500
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={FaUsers} boxSize={5} />
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
                  Total de tickets pendientes:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  23
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUsers} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
          <Stat
            pr={{ base: 2, md: 4 }}
            py={"2"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
          >
            <Flex justifyContent={"space-between"}>
              <Box pl={{ base: 2, md: 4 }}>
                <StatLabel fontWeight={"medium"} isTruncated>
                  Tickets generados hoy:
                </StatLabel>
                <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
                  1
                </StatNumber>
              </Box>
              <Box
                my={"auto"}
                color={useColorModeValue("gray.800", "gray.200")}
                alignContent={"center"}
              >
                <Icon as={HiUserAdd} boxSize={5} />
              </Box>
            </Flex>
          </Stat>
        </Card>
      </HStack>
      <Stack pt={4}>
        <Card>Grafica</Card>
      </Stack>
    </Stack>
  );
}

export default Dashboard;
