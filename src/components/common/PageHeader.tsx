import { ReactNode } from "react";
import { Box, Heading, Stack, TypographyProps } from "@chakra-ui/react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  size?: TypographyProps["fontSize"] | undefined;
}

function PageHeader({ title, children, size }: PageHeaderProps) {
  return (
    <Stack direction={{ base: "column", sm: "column", md: "row" }}>
      <Box flexGrow={1}>
        <Heading fontSize={size}>{title}</Heading>
      </Box>
      <Stack
        spacing={4}
        direction={{ base: "column", md: "column", sm: "column", lg: "row" }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

export default PageHeader;
