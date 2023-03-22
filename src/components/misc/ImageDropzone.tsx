import {
  FormControl,
  FormLabel,
  Button,
  Icon,
  Flex,
  Stack,
  Box,
  Text,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { MdDelete, MdCloudUpload } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface ImageDropzoneProps {
  text: string;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  formSubmited: boolean;
  disabled?: boolean;
}
const ImageDropzone = ({
  text,
  image,
  setImage,
  formSubmited,
  disabled,
}: ImageDropzoneProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (file: File) => {
    setImage(file);
  };

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);

    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  return (
    <FormControl
      tabIndex={-1}
      isInvalid={formSubmited && imagePreview === ""}
      isRequired
      isDisabled={disabled}
    >
      <FormLabel>{text}</FormLabel>
      {image ? (
        <Box position={"absolute"} top={0} right={0}>
          <Button
            isDisabled={disabled}
            colorScheme="red"
            rounded={"xl"}
            onClick={() => {
              setImage(null);
            }}
          >
            <Icon as={MdDelete} />
          </Button>
        </Box>
      ) : (
        ""
      )}
      <FileUploader
        disabled={disabled}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle="Suelta aquí!"
      >
        {image ? (
          <Flex rounded={"md"} h={"12rem"}>
            <Image
              src={imagePreview ? imagePreview : "no image"}
              style={disabled ? { filter: "saturate(0)" } : {}}
            ></Image>
          </Flex>
        ) : (
          <Flex
            borderColor={formSubmited && imagePreview === "" ? "red" : "grey"}
            borderWidth={"3px"}
            rounded={"md"}
            h={"12rem"}
            alignItems={"center"}
            justifyContent={"center"}
            borderStyle={"dotted"}
          >
            <Stack alignItems={"center"}>
              <Icon
                as={MdCloudUpload}
                boxSize={8}
                color={formSubmited && imagePreview === "" ? "red" : "grey"}
              />
              <Text
                color={formSubmited && imagePreview === "" ? "red" : "grey"}
              >
                Arrastra y suelta
              </Text>
            </Stack>
          </Flex>
        )}
      </FileUploader>
      <FormErrorMessage>{`${text} es requerido!`}</FormErrorMessage>
    </FormControl>
  );
};

export default ImageDropzone;
