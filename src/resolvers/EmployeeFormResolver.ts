import { EmployeeFormValues } from "../formValues/EmployeeFormValues";
import { PersonFormResolver } from "./PersonFormResolver";
import { Resolver } from "react-hook-form";

export const EmployeFormResolver: Resolver<EmployeeFormValues> = async (
  values: EmployeeFormValues,
  _context,
  _options
) => {
  const baseResolverResult = await PersonFormResolver(values, _context, {
    fields: {},
    shouldUseNativeValidation: false,
  });

  const employeeErrors = {
    ...(!values.accountNumber && {
      accountNumber: {
        type: "required",
        message: "El numero de cuenta bancaria es requerido!",
      },
    }),
    ...(!values.bank && {
      bank: {
        type: "required",
        message: "El banco es requerido!",
      },
    }),
    ...(!values.establishment && {
      establishment: {
        type: "required",
        message: "El establecimiento asignado es requerido!",
      },
    }),
    ...(!values.area && {
      area: {
        type: "required",
        message: "El area asignada es requerida!",
      },
    }),
    ...(!values.position && {
      position: {
        type: "required",
        message: "La posicion asignada es requerida!",
      },
    }),
    ...(!values.salary && {
      salary: {
        type: "required",
        message: "El salario es requerido!",
      },
    }),
    ...(values.salary &&
      values.salary <= 0 && {
        salary: {
          type: "invalid",
          message: "El salario no puede ser menor o igual a 0!",
        },
      }),
    ...(values.salary &&
      values.salary >= 99999 && {
        salary: {
          type: "invalid",
          message: "El salario no puede ser menor o igual a Q.99,999!",
        },
      }),
  };

  // Merge base resolver errors and Employee-specific errors
  const errors = {
    ...baseResolverResult.errors,
    /*     ...bankErrors,
    ...accountNumberErrors,
    ...establishmentErrors,
    ...areaErrors,
    ...positionErrors,
    ...salaryErrors,
    ...birthdayErrors, */
    ...employeeErrors,
  };

  const allValues = {
    ...baseResolverResult.values,
    ...values,
  };

  return { values: allValues, errors };
};
