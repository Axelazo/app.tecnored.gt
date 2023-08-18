import { ResponsiveValue, ThemingProps } from "@chakra-ui/react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export interface ValidatableInputProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  id?: string;
  label?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  required?: boolean;
  readonly?: boolean;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  disabled?: boolean | undefined;
  helperText?: string | undefined;
  leftElement?: JSX.Element;
  variant?:
    | ResponsiveValue<"outline" | "unstyled" | "filled" | "flushed">
    | undefined;
  onChange?: (newValue: string) => void; // Added onChange prop with type definition
}
