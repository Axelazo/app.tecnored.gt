import { NavLink, Outlet, useLocation } from "react-router-dom";
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
  AlertIcon,
  Alert,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import {
  FaBell,
  FaHome,
  FaUserTag,
  FaToolbox,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";
import { TbHeartRateMonitor } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { TfiMenu } from "react-icons/tfi";
import { IconType } from "react-icons";
import { DarkModeSwitcher } from "./DarkModeSwitcher";
import { Logo } from "./Logo";
import { useAuth } from "../hooks/useAuth";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  path?: string;
  icon: IconType;
  role: string;
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Portal de Trabajador",
    icon: FaHome,
    path: "/my-portal",
    role: "worker",
  },
  { name: "Dashboard", icon: FaHome, path: "/dashboard", role: "operator" },
  { name: "Clientes", icon: FaUserTag, path: "/clients", role: "operator" },
  {
    name: "Soporte Técnico",
    icon: FaToolbox,
    path: "/support",
    role: "operator",
  },
  {
    name: "Empleados",
    icon: FaUserTie,
    path: "/employees",
    role: "operator",
  },
  {
    name: "Planilla",
    icon: FaMoneyBillWave,
    role: "operator",
    path: "/payroll",
  },
  {
    name: "Monitoreo",
    icon: TbHeartRateMonitor,
    path: "/monitoring",
    role: "operator",
  },
];

export default function Sidebar(/* { children }: { children: ReactNode } */) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Alert
        status="warning"
        justifyContent={"center"}
        position={"sticky"}
        zIndex={10}
        top={0}
      >
        <AlertIcon />
        Esta es una aplicación actualmente en desarrollo, la estabilidad de la
        misma no está garantizada.
      </Alert>
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
      <Text
        position={"fixed"}
        bottom={0}
        zIndex={1000}
        display={{ base: "none", md: "visible" }}
      >
        TecnoRedMS! - Alpha v0.2.1
      </Text>

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
  const { user } = useAuth();
  let filteredLinkItems;

  // Filter the roles of the user to determine which routes to create
  const userRoles = user ? user.roles.map((role) => role.roleName) : [];

  if (userRoles.includes("admin")) {
    // If user is an admin, return the entire LinkItems array
    const removeWorkPortal = LinkItems.filter(
      (link) => link.name !== "Portal de Trabajador"
    );
    filteredLinkItems = removeWorkPortal;
  } else {
    // Otherwise, filter the LinkItems array based on the user's roles
    filteredLinkItems = LinkItems.filter((link) =>
      userRoles.includes(link.role)
    );
  }

  return (
    <Flex
      zIndex={6}
      bg={useColorModeValue("#24344b", "#2d3748")}
      borderRight="2px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      className="testtst"
      direction={"column"}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        my={{ base: "8", md: "0" }}
        justifyContent="space-between"
        direction={"row"}
      >
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {filteredLinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
      <Box alignSelf={"end"}>
        <Text
          textAlign={"center"}
          position={"absolute"}
          bottom={0}
          ml={8}
          mb={14}
          color={useColorModeValue("white", "black")}
        >
          TecnoRedMS - v0.7.1
        </Text>
      </Box>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path?: string;
  children: ReactText;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  const location = useLocation();
  let isActive;
  if (path)
    isActive =
      location.pathname.startsWith(path) && location.pathname.length > 2;
  return (
    <NavLink to={path ?? "/"} style={{ textDecoration: "none" }}>
      <Flex
        bg={isActive ? "cyan.400" : "transparent"} // Set bgColor based on isActive
        color={"white"}
        align="center"
        p="4"
        mx="4"
        mt={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
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

  const userType = () => {
    const types: string[] = [];
    user?.roles.forEach((role) => {
      switch (role.roleName) {
        case "user":
          types.push("Usuario");
          break;
        case "worker":
          types.push("Empleado");
          break;
        case "technician":
          types.push("Técnico");
          break;
        case "operator":
          types.push("Operador");
          break;
        case "admin":
          types.push("Administrador");
          break;
        default:
          break;
      }
    });
    return types;
  };

  const types = userType();

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
      bg={useColorModeValue("white", "#2d3748")}
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
          {user ? (
            <Menu>
              <MenuButton py={2} _focus={{ boxShadow: "none" }}>
                <HStack>
                  <Avatar
                    size={"sm"}
                    name={`${user.firstNames.split(" ")[0]} ${
                      user.lastNames.split(" ")[0]
                    }`}
                  />

                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {user.firstNames.split(" ")[0]}{" "}
                      {user.lastNames.split(" ")[0]}
                    </Text>
                    {types.map((role, index) => {
                      return (
                        <Text key={index} fontSize="xs" color="gray.600">
                          {role}
                        </Text>
                      );
                    })}
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                {/*                 <MenuItem as={NavLink} to={"/profile"}>
                  Perfil
                </MenuItem> */}
                <MenuItem closeOnSelect={false}>
                  <DarkModeSwitcher />
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            ""
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};
