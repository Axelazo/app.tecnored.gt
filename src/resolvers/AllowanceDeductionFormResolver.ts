import { AllowanceDeductionFormValues } from "../formValues/AllowanceDeductionFormValues";
import { Resolver } from "react-hook-form";

export const AllowanceDeductionFormResolver: Resolver<
  AllowanceDeductionFormValues
> = (values: AllowanceDeductionFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.reasonId) {
    errors.reasonId = {
      type: "required",
      message: "La razón es requerida!",
    };
  }

  if (!values.amount) {
    errors.amount = {
      type: "required",
      message: "El monto es requerido!",
    };
  }

  return {
    values,
    errors,
  };
};
