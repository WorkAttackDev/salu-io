import type { NextPage } from "next";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import ListBroas from "../features/client/broa/components/ListBroas";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import MainLayout from "../features/client/core/components/MainLayout";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import { BroaSortBy } from "../features/shared/broas.types";

// TODO: Add page by broa
// TODO: Add share to facebook
// TODO: sync broas when user like a broa
// TODO: Add Meme
// TODO: Add Image support
// TODO: Add reset search (90%)

export const Home: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { broas, broasPagination, broaFilter, setFilters } = useBroasStore();
  const { setErrors, setIsOpen } = useErrorStore();

  const getBroasApi = useApi<typeof getBroasClient>();

  useEffect(() => {
    (async () => {
      await handleGetBroas();
    })();
  }, []);

  useEffect(() => {
    if (!getBroasApi.error) return;
    setErrors(getBroasApi.error);
    setIsOpen(true);
  }, [getBroasApi.error]);

  const handleGetBroas = async () => {
    await getBroasApi.request(getBroasClient());
  };

  const handleSearch = async (search: string) => {
    if (!search) {
      if (!broaFilter.wrongVersion) return;

      setFilters({ wrongVersion: undefined });
      await getBroasApi.request(getBroasClient());
      return;
    }

    setFilters({ wrongVersion: search });
    await getBroasApi.request(getBroasClient({ wrongVersion: search }));
  };

  const handleSortBy = async (sortBy: BroaSortBy) => {
    setFilters({ sortBy });

    await getBroasApi.request(getBroasClient({ sortBy }));
  };

  const handleGetNextBoas = async () => {
    const bp = broasPagination;
    const bfb = broaFilter;

    if (bp.page + 1 >= Math.ceil(bp.total / bp.limit)) return;
    await getBroasApi.request(
      getBroasClient({
        page: bp.page + 1,
        limit: bp.limit,
        wrongVersion: bfb.wrongVersion,
        sortBy: bfb.sortBy,
      })
    );
  };

  const handleGetPreviousBoas = async () => {
    const bp = broasPagination;
    const bfb = broaFilter;

    if (bp.page < 0) return;
    await getBroasApi.request(
      getBroasClient({
        page: bp.page - 1,
        limit: bp.limit,
        wrongVersion: bfb.wrongVersion,
        sortBy: bfb.sortBy,
      })
    );
  };

  return (
    <MainLayout>
      <ListBroas
        user={user}
        broas={broas}
        onNextPage={handleGetNextBoas}
        onPrevPage={handleGetPreviousBoas}
        pagination={broasPagination}
        onSearch={handleSearch}
        onSortBy={handleSortBy}
        isLoading={getBroasApi.loading}
      />

      {/* <Loading isLoading={} /> */}
    </MainLayout>
  );
};

export default Home;
