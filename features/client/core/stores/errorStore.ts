import { AxiosError } from "axios";
import { ZodError } from "zod";
import create, { SetState } from "zustand";

type ErrorStoreType = {
  errors: string[];
  isOpen: boolean;
  handleError: (err: any, silent?: boolean) => string[];
  setIsOpen: (isOpen: boolean) => void;
  setErrors: (errors: string[]) => void;
};

const handleErrorImpl = (
  set: SetState<ErrorStoreType>,
  err: any,
  silent?: boolean
): string[] => {
  if (err instanceof ZodError) {
    const error = err as ZodError;

    const errList = error.errors.map((err) => err.message);
    !silent && set({ errors: errList, isOpen: true });
    return errList;
  }

  if ("response" in err) {
    const error = err as AxiosError<{ errors: string[] }>;

    const errList = error.response?.data?.errors || [
      "Ocorreu um erro no servidor ao processar a requisição",
    ];

    !silent && set({ errors: errList, isOpen: true });

    return errList;
  }

  !silent && set({ errors: [err.message], isOpen: true });
  return [err.message];
};

export const useErrorStore = create<ErrorStoreType>((set) => ({
  errors: [],
  isOpen: false,
  handleError: (err: any, silent?: boolean) =>
    handleErrorImpl(set, err, silent),
  setErrors: (errors: string[]) => set({ errors }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
