import create from "zustand";

type ErrorStoreType = {
  errors: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setErrors: (errors: string[]) => void;
};

export const useErrorStore = create<ErrorStoreType>((set) => ({
  errors: [],
  isOpen: false,
  setErrors: (errors: string[]) => set({ errors }),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
