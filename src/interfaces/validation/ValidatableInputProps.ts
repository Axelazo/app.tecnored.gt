import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface ValidatableInputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  id?: string;
  label?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  required?: boolean;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  disabled?: boolean | undefined;
  helperText?: string | undefined;
  leftElement?: JSX.Element;
}
