import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface ValidatableInputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  id?: string;
  label?: string;
  error?: FieldError | undefined;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  disabled?: boolean;
  helperText?: string;
  leftElement?: any;
}

export default ValidatableInputProps;
