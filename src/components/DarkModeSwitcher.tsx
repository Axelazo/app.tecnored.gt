import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("oscuro", "claro");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Flex w={"100%"} alignItems="center">
      {`Modo ${text} `}
      <Spacer />
      <IconButton
        fontSize="lg"
        aria-label={`Switch to ${text} mode`}
        color="current"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        zIndex={2}
      />
    </Flex>
  );
};
