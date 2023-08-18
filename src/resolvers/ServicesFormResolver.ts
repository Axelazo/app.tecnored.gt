import { ServicesFormValues } from "../formValues/ServicesFormValues";
import { Resolver } from "react-hook-form";

export const ServicesFormResolver: Resolver<ServicesFormValues> = (
  values: ServicesFormValues
) => {
  const { latlng, ...otherValues } = values;

  if (latlng) {
    const latlngWithoutEmptySpaces = latlng.replace(/\s/g, "");
    const latlngWithoutParenthesis = latlngWithoutEmptySpaces.replace(
      /[()]/g,
      ""
    );

    const [latitude, longitude] = latlngWithoutParenthesis
      .split(",")
      .map(parseFloat);

    const clampedLatitude = latitude.toFixed(6);
    const clampedLongitude = longitude.toFixed(6);

    otherValues.latitude = clampedLatitude;
    otherValues.longitude = clampedLongitude;

    const location = {
      latitude,
      longitude,
    };

    otherValues.location = location;

    console.log(otherValues.latitude, otherValues.longitude);
  } else {
    otherValues.latitude = "";
    otherValues.longitude = "";
  }

  const errors = {
    ...(!values.clientId && {
      clientId: {
        type: "required",
        message: "El cliente es requerido!",
      },
    }),
    ...(!values.planId && {
      planId: {
        type: "required",
        message: "El plan es requerido!",
      },
    }),
    ...(!values.routerId && {
      routerId: {
        type: "required",
        message: "El router es requerido!",
      },
    }),
    ...(!values.ipAddress && {
      ipAddress: {
        type: "required",
        message: "La dirección IP es requerida!",
      },
    }),
    ...(!otherValues.latitude && {
      latitude: {
        type: "required",
        message: "La latitud es requerida!",
      },
    }),
    ...(!otherValues.longitude && {
      longitude: {
        type: "required",
        message: "La longitud es requerida!",
      },
    }),
    ...(!values.start && {
      start: {
        type: "required",
        message: "La longitud es requerida!",
      },
    }),
  };

  console.log(otherValues);

  return {
    values: { ...otherValues },
    errors,
  };
};
