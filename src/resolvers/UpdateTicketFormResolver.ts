import { UpdateTicketStatusFormValues } from "../formValues/UpdateTicketStatusFormValues";
import { Resolver } from "react-hook-form";

export const UpdateTicketStatusFormResolver: Resolver<
  UpdateTicketStatusFormValues
> = (values: UpdateTicketStatusFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.statusId) {
    errors.statusId = {
      type: "required",
      message: "El estado es requerido!",
    };
  }

  return {
    values,
    errors,
  };
};
