import React from "react";
import {
  HStack,
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Stack,
  Card,
  CardHeader,
  Heading,
  CardBody,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface StatData {
  id: number;
  label: string;
  value: number;
  icon: IconType;
  percentage: string;
  prefix?: string;
}

function Stat({ data }: { data: StatData }) {
  return (
    <Stack
      direction="column"
      rounded="md"
      boxShadow={useColorModeValue(
        "0 4px 6px rgba(160, 174, 192, 0.6)",
        "2px 4px 6px rgba(9, 17, 28, 0.9)"
      )}
      w="100%"
      textAlign="left"
      align="start"
      spacing={0}
      role="group"
      overflow="hidden"
    >
      <HStack
        py={6}
        px={5}
        spacing={4}
        w="100%"
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        <Flex
          justify="center"
          alignItems="center"
          rounded="lg"
          p={2}
          bg="blue.400"
          position="relative"
          w={12}
          h={12}
          overflow="hidden"
          lineHeight={0}
          boxShadow={"sm"}
        >
          <Icon as={data.icon} w={8} h={8} color="white" />
        </Flex>
        <VStack spacing={0} align="start" maxW="lg" h="100%">
          <Text as="h3" fontSize="md" noOfLines={2} color="gray.400">
            {data.label}
          </Text>
          <HStack spacing={2}>
            <Text as="h2" fontSize="lg" fontWeight="extrabold">
              {data.prefix ? `${data.prefix}${data.value}` : `${data.value}`}
            </Text>
            {/*             <Flex>
              {Number(data.score) > 100 ? (
                <Icon as={BsArrowUpShort} w={6} h={6} color="green.400" />
              ) : (
                <Icon as={BsArrowDownShort} w={6} h={6} color="red.400" />
              )}
              <Text as="h2" fontSize="md">
                {data.percentage}
              </Text>
            </Flex> */}
          </HStack>
        </VStack>
      </HStack>
    </Stack>
  );
}

interface DashboardCardProps {
  title: string;
  stats: StatData[];
}

function DashboardCard({ title, stats }: DashboardCardProps) {
  return (
    <Card
      flexGrow={1}
      maxW={{ base: "full", xl: "33%" }}
      bg={useColorModeValue("white", "gray.800")}
    >
      <CardHeader>
        <Heading>{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={4}>
          {stats.map((data, index) => (
            <Stat key={index} data={data} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default DashboardCard;
