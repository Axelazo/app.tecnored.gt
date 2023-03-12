import { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const PasswordInput = ({ label, error, register }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <FormControl id="password" isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={showPassword ? "text" : "password"} {...register} />
        <InputRightElement>
          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
