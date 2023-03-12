import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  HStack,
  Divider,
  Flex,
  Text,
  Box,
  Avatar,
  AvatarBadge,
  Icon,
} from "@chakra-ui/react";
import { FaEyeSlash, FaEye, FaPencilAlt } from "react-icons/fa";
import { useAuth } from "../providers/AuthProvider";

function Profile() {
  const { user } = useAuth();

  return (
    <Card w={{ base: "100%", sm: "100%", md: "100%", lg: "4xl" }}>
      <Stack py={6} px={6}>
        <HStack spacing={4} pb={4}>
          <Stack px={4}>
            <Avatar
              size="2xl"
              src="https://bit.ly/broken-link"
              name={`${user?.firstNames.split(" ")[0]} ${
                user?.lastNames.split(" ")[0]
              }`}
            >
              <AvatarBadge
                borderWidth={2}
                bg="blue.500"
                as={Button}
                padding={2}
              >
                <Icon as={FaPencilAlt} boxSize={"1em"}></Icon>
              </AvatarBadge>
            </Avatar>
          </Stack>
          <Stack flexGrow={1}>
            <FormControl>
              <FormLabel>Nombres</FormLabel>
              <Input
                type="text"
                disabled={true}
                value={user?.firstNames}
                readOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>Apellidos</FormLabel>
              <Input
                type="text"
                disabled={true}
                value={user?.lastNames}
                readOnly
              />
            </FormControl>
          </Stack>
        </HStack>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" value={user?.email} />
          </FormControl>
          <Flex align="center">
            <Divider />
            <Text padding="2" w={"sm"} textAlign={"center"}>
              Cambiar contraseña
            </Text>
            <Divider />
          </Flex>
          <FormControl id="oldPassword">
            <FormLabel>Contraseña anterior</FormLabel>
            <Input type={"password"} />
          </FormControl>
          <FormControl id="newPassword">
            <FormLabel>Nueva contraseña</FormLabel>
            <InputGroup>
              <Input type={true ? "text" : "password"} />
              <InputRightElement>
                <Button h="1.75rem" size="sm">
                  {true ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="confirmNewPassword">
            <FormLabel>Confirmar nueva contraseña</FormLabel>
            <InputGroup>
              <Input type={true ? "text" : "password"} />
              <InputRightElement>
                <Button h="1.75rem" size="sm">
                  {true ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <Box pt={4} alignSelf={"end"}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

export default Profile;
