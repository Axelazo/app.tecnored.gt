import { LoginFormValues } from "../formValues/LoginFormValues";
import { Resolver } from "react-hook-form";

export const LoginFormResolver: Resolver<LoginFormValues> = (
  values: LoginFormValues
) => {
  return {
    values: values.email && values.password ? values : {},
    errors: {
      ...(!values.email && {
        email: {
          type: "required",
          message: "El correo electrónico es requerido!",
        },
      }),
      ...(values.email &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && {
          email: {
            type: "invalid",
            message: "El correo electrónico debe ser válido!",
          },
        }),
      ...(!values.password && {
        password: {
          type: "required",
          message: "La contraseña es requerida!",
        },
      }),
    },
  };
};
