import { NavLink, Outlet } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FaBell,
  FaHome,
  FaUserTag,
  FaToolbox,
  FaBuilding,
  FaUserTie,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { TbHeartRateMonitor } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { TfiMenu } from "react-icons/tfi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { Logo } from "./Logo";
import { useAuth } from "../providers/AuthProvider";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FaHome, path: "/" },
  { name: "Clientes", icon: FaUserTag, path: "/clients" },
  { name: "Soporte Técnico", icon: FaToolbox },
  { name: "Empleados", icon: FaUserTie },
  { name: "Planilla", icon: FaMoneyBillWave },
  { name: "Monitoreo", icon: TbHeartRateMonitor },
  { name: "Establecimientos", icon: FaBuilding },
  { name: "Inventario", icon: MdInventory },
  { name: "Configuracion", icon: FaCog },
];

export default function Sidebar(/* { children }: { children: ReactNode } */) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Box mt={20}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      zIndex={6}
      bg={useColorModeValue("white", "gray.900")}
      borderRight="2px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        my={{ base: "8", md: "0" }}
        justifyContent="space-between"
      >
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path?: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <NavLink to={path ?? "/"} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Flex
      w={"full"}
      px={5}
      zIndex={5}
      position={"fixed"}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<TfiMenu />}
      />

      <Box display={{ base: "flex", md: "none" }}>
        <Logo />
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FaBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar
                  size={"sm"}
                  name={`${user?.firstNames.split(" ")[0]} ${
                    user?.lastNames.split(" ")[0]
                  }`}
                  src="https://bit.ly/broken-link"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user?.firstNames.split(" ")[0]}{" "}
                    {user?.lastNames.split(" ")[0]}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.roles[0].roleName}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={NavLink} to={"/profile"}>
                Perfil
              </MenuItem>
              <MenuItem>Configuración</MenuItem>
              <MenuItem closeOnSelect={false}>
                <DarkModeSwitcher />
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
