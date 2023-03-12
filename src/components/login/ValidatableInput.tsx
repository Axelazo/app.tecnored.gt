import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface ValidatableInputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  id: string;
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const ValidatableInput = ({
  type,
  id,
  label,
  error,
  register,
}: ValidatableInputProps) => {
  return (
    <FormControl id={id} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={type} {...register} />
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ValidatableInput;
