import { ReactNode } from "react";
import { Box, Heading, Stack, TypographyProps } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  size?: TypographyProps["fontSize"] | undefined;
}

function PageHeader({ title, children, size }: PageHeaderProps) {
  return (
    <Stack>
      <Stack direction={{ base: "column", md: "row" }}>
        <Box flexGrow={1}>
          <Heading fontSize={size}>{title}</Heading>
        </Box>
        <Stack
          spacing={4}
          direction={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "column",
            xl: "row",
          }}
        >
          {children}
        </Stack>
      </Stack>
      {/*       <Stack pt={4}>
        <Alert status="info">
          <AlertIcon />
          Asegúrate de ingresar la información de manera correcta. Respeta
          mayusculas y minusculas, ademas de signos de puntuación.
        </Alert>
      </Stack> */}
    </Stack>
  );
}

export default PageHeader;
