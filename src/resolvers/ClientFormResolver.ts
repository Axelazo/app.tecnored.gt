import { PersonFormResolver } from "./PersonFormResolver";
import { Resolver } from "react-hook-form";
import { ClientFormValues } from "../formValues/ClientFormValues";

export const ClientFormResolver: Resolver<ClientFormValues> = async (
  values: ClientFormValues,
  _context,
  _options
) => {
  const baseResolverResult = await PersonFormResolver(values, _context, {
    fields: {},
    shouldUseNativeValidation: false,
  });

  // Merge base resolver errors and Employee-specific errors
  const errors = {
    ...baseResolverResult.errors,
  };

  const allValues = {
    ...baseResolverResult.values,
    ...values,
  };

  return { values: allValues, errors };
};
