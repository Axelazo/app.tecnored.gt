import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputLeftElement,
} from "@chakra-ui/react";
import ValidatableInputProps from "interfaces/validation/ValidatableInputProps";

const ValidatableInput = ({
  type,
  id,
  label,
  error,
  register,
  required,
  value,
  disabled,
  defaultValue,
  helperText,
  leftElement,
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
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        <Input type={type} {...register} defaultValue={defaultValue} />
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
      <FormHelperText>{helperText} </FormHelperText>
    </FormControl>
  );
};

export default ValidatableInput;
