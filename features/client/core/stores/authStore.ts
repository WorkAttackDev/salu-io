import create from "zustand";
import { MyUser } from "../../../shared/models/my_user";

type AuthStoreType = {
  token: string;
  user: MyUser | null;
  setToken: (token: string) => void;
  setUser: (user: MyUser | null) => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  token: "",
  user: null,
  setToken: (token: string) => set((state) => ({ ...state, token })),
  setUser: (user: MyUser | null) => set((state) => ({ ...state, user })),
}));

export const globalSetToken = (token: string) =>
  useAuthStore.setState((state) => ({ ...state, token: token }));
