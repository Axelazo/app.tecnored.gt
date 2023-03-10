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
} from "@chakra-ui/react";
import { FileUploader } from "react-drag-drop-files";
import { MdDelete, MdCloudUpload } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface ImageDropzoneProps {
  text: string;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
}
const ImageDropzone = ({ text, image, setImage }: ImageDropzoneProps) => {
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
    <FormControl>
      <FormLabel>{text}</FormLabel>
      {image ? (
        <Box position={"absolute"} top={0} right={0}>
          <Button
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
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        hoverTitle="Suelta aquí!"
      >
        {image ? (
          <Flex rounded={"md"} h={"12rem"}>
            <Image src={imagePreview ? imagePreview : "no image"}></Image>
          </Flex>
        ) : (
          <Flex
            borderWidth={"3px"}
            rounded={"md"}
            h={"12rem"}
            alignItems={"center"}
            justifyContent={"center"}
            borderStyle={"dotted"}
          >
            <Stack alignItems={"center"}>
              <Icon as={MdCloudUpload} boxSize={8} />
              <Text>Arrastra y suelta</Text>
            </Stack>
          </Flex>
        )}
      </FileUploader>
    </FormControl>
  );
};

export default ImageDropzone;
