import { ValidationError } from "../../../shared/lib/validation";

export const handleClientValidationError = (err: any) => {
  const error = err as ValidationError;
  return error.errors.map((err) => err.message);
};
