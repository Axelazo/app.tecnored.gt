import { useColorModeValue, Image } from "@chakra-ui/react";
import logoWhite from "../logo-color.svg";
import logoDark from "../logo-white.svg";

export const Logo = () => {
  const logo = useColorModeValue(logoWhite, logoDark);

  return <Image src={logo}></Image>;
};
