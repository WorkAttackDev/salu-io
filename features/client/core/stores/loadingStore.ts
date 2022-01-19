import create from "zustand";

type LoadingStoreType = {
  loading: boolean;
  setLoading: (Loading: boolean) => void;
};

export const useLoadingStore = create<LoadingStoreType>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
