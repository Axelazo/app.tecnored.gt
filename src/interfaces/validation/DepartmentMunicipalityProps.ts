import { GenericFormValues } from "interfaces/formValues/GenericFormValues";
import {
  FieldError,
  FieldValues,
  FormState,
  UseFormRegisterReturn,
} from "react-hook-form";
import ValidatableInputProps from "./ValidatableInputProps";

interface DepartmentMunicipalityProps<T extends FieldValues>
  extends ValidatableInputProps {
  defaultMunicipalityIndex?: number;
  defaultDepartmentIndex?: number;
  error1?: FieldError;
  register1?: UseFormRegisterReturn;
  required1?: boolean;
  value1?: string | number | readonly string[] | undefined;
  defaultValue1?: string | number | readonly string[] | undefined;
  disabled1?: boolean;
  helperText1?: string;
  formState: FormState<GenericFormValues>;
}

export default DepartmentMunicipalityProps;
