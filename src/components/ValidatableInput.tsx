import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputLeftElement,
} from "@chakra-ui/react";
import { ValidatableInputProps } from "../interfaces/validation/ValidatableInputProps";
import { ChangeEvent } from "react";

const ValidatableInput = ({
  type,
  id,
  label,
  error,
  register,
  required,
  disabled,
  value,
  defaultValue,
  helperText,
  leftElement,
  readonly,
  variant,
  onChange, // New prop for the onChange event
}: ValidatableInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
      console.log("change!");
    }
  };
  return (
    <FormControl
      id={id}
      isInvalid={!!error}
      isRequired={required}
      isDisabled={disabled}
      isReadOnly={readonly}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        <Input
          type={type}
          {...register}
          defaultValue={defaultValue}
          value={value}
          variant={variant}
          onChange={handleChange} // Attach the handleChange function to onChange event
        />
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
      <FormHelperText>{helperText} </FormHelperText>
    </FormControl>
  );
};

export default ValidatableInput;
