import { Flex, Divider, Text } from "@chakra-ui/react";

interface DualSideDividerProps {
  text: string;
  width: Number;
}

function DualSideDivider({ text, width }: DualSideDividerProps) {
  return (
    <Flex align="center">
      <Divider />
      <Text
        my={5}
        pt={5}
        padding="2"
        wordBreak={"keep-all"}
        minW={`${width}rem`}
        textAlign={"center"}
        fontWeight={"light"}
      >
        {text}
      </Text>
      <Divider />
    </Flex>
  );
}

export default DualSideDivider;
