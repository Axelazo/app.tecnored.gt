import { ClientFormValues } from "interfaces/Client";
import { Resolver } from "react-hook-form";

export const ClientFormResolver: Resolver<ClientFormValues> = async (
  values: ClientFormValues
) => {
  return {
    values: values.firstNames ? values : {},
    errors: {
      ...(values.dpiNumber &&
        values.dpiNumber.length !== 13 && {
          dpiNumber: {
            type: "invalid",
            message: "El DPI debe tener 13 dígitos",
          },
        }),
      ...(values.phone &&
        values.phone.length !== 8 && {
          phone: {
            type: "invalid",
            message: "El telefono debe tener 8 dígitos",
          },
        }),
      ...(!values.firstNames && {
        firstNames: {
          type: "required",
          message: "Los nombres son requeridos!",
        },
      }),
      ...(!values.lastNames && {
        lastNames: {
          type: "required",
          message: "Los apellidos son requeridos!",
        },
      }),
      ...(!values.dpiNumber && {
        dpiNumber: {
          type: "required",
          message: "El DPI es requerido!",
        },
      }),
      ...(!values.address && {
        address: {
          type: "required",
          message: "La dirección es requerido!",
        },
      }),
      ...(!values.locality && {
        locality: {
          type: "required",
          message: "La Localidad / Aldea / Pueblo es requerido!",
        },
      }),
      ...(!values.municipality && {
        municipality: {
          type: "required",
          message: "El municipio es requerido!",
        },
      }),
      ...(!values.department && {
        department: {
          type: "required",
          message: "El departamento es requerido!",
        },
      }),

      ...(!values.phone && {
        phone: {
          type: "required",
          message: "El telefono es requerido!",
        },
      }),
    },
  };
};
