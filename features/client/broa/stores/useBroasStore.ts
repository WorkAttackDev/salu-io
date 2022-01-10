import { Broa } from ".prisma/client";
import create from "zustand";
import { BroaSortBy } from "../../../shared/broas.types";
import { MyBroaReactions } from "../../../shared/models/my_broa_reactions";
import { PaginationType } from "../../../shared/types";

type BroaFilterType = {
  wrongVersion?: string;
  sortBy?: BroaSortBy;
};

type BroaStoreType = {
  broas: Broa[] | MyBroaReactions[];
  broasPagination: PaginationType;
  broaFilter: BroaFilterType;

  setBroas: (broas: Broa[] | MyBroaReactions[]) => void;
  setFilters: (filter: BroaFilterType) => void;
  addBroa: (broa: Broa | MyBroaReactions) => void;
};

export const PAGINATION_LIMIT = 20;

export const useBroasStore = create<BroaStoreType>((set) => ({
  broas: [],
  broasPagination: { page: 0, limit: PAGINATION_LIMIT, total: 0 },
  broaFilter: { sortBy: "recent" },
  setBroas: (broas) => set((state) => ({ broas })),

  addBroa: (broa) => set((state) => ({ broas: [...state.broas, broa] })),

  setFilters: (filter) => set((state) => ({ broaFilter: filter })),
}));

export const globalSetBroaPaginated = (
  broas: Broa[] | MyBroaReactions[],
  pagination: PaginationType
) =>
  useBroasStore.setState((state) => ({
    ...state,
    broas,
    broasPagination: pagination,
  }));
