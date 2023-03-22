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
  id?: string;
  label?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string | number | readonly string[] | undefined;
  disabled?: boolean;
}

const ValidatableInput = ({
  type,
  id,
  label,
  error,
  register,
  required,
  value,
  disabled,
}: ValidatableInputProps) => {
  return (
    <FormControl
      id={id}
      isInvalid={!!error}
      isRequired={required}
      isDisabled={disabled}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={type} {...register} value={value} />
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ValidatableInput;
