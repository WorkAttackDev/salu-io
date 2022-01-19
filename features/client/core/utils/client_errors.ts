import { AxiosError } from "axios";
import { ZodError } from "zod";
import { ValidationError } from "../../../shared/lib/validation";

export const handleClientError = (err: any): string[] => {
  if (err instanceof ZodError) {
    const error = err as ValidationError;

    return error.errors.map((err) => err.message);
  }

  if ("response" in err) {
    const error = err as AxiosError<{ errors: string[] }>;
    return (
      error.response?.data?.errors || [
        "Ocorreu um erro (axios) ao processar a requisição",
      ]
    );
  }

  return [err.message];
};
