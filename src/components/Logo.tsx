import { useColorModeValue, Image, useBreakpointValue } from "@chakra-ui/react";
import logoWhite from "../logo-color.svg";
import logoDark from "../logo-white.svg";
import { useEffect, useRef } from "react";

export const Logo = () => {
  const logo = useColorModeValue(logoWhite, logoDark);

  return <Image src={logo} width={{ base: "20vh" }}></Image>;
};
