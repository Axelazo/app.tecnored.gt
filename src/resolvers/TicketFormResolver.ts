import { TicketFormValues } from "../formValues/TicketFormValues";
import { Resolver } from "react-hook-form";

export const TicketFormResolver: Resolver<TicketFormValues> = (
  values: TicketFormValues
) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.clientId) {
    errors.clientId = {
      type: "required",
      message: "El Cliente es requerido!",
    };
  }

  if (!values.serviceId) {
    errors.serviceId = {
      type: "required",
      message: "El Servicio es requerido!",
    };
  }

  if (!values.reasonId) {
    errors.reasonId = {
      type: "required",
      message: "El Asunto / Razón es requerido!",
    };
  }

  if (values.reasonId == 999 && !values.customReason) {
    errors.customReason = {
      type: "required",
      message: "La Razón Personalizada es requerida!",
    };
  }

  if (!values.employeeId) {
    errors.employeeId = {
      type: "required",
      message: "El Empleado es requerido!",
    };
  }

  if (!values.estimatedStart) {
    errors.estimatedStart = {
      type: "required",
      message: "La Fecha de Inicio Estimada es requerida!",
    };
  }

  if (!values.estimatedFinish) {
    errors.estimatedFinish = {
      type: "required",
      message: "La Fecha de Finalizacion Estimada es requerida!",
    };
  }

  if (!values.priority) {
    errors.priority = {
      type: "required",
      message: "La Prioridad es requerida!",
    };
  }

  return {
    values,
    errors,
  };
};
