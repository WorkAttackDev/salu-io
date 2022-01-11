import { CalendarIcon, PlusIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { getBroasClient } from "../features/client/broa/client";
import ListBroas from "../features/client/broa/components/ListBroas";
import { useBroasStore } from "../features/client/broa/stores/useBroasStore";
import Button from "../features/client/core/components/Button";
import HomeWelcome from "../features/client/core/components/HomeWelcome";
import MainLayout from "../features/client/core/components/MainLayout";
import { linksObj } from "../features/client/core/data/links";
import useApi from "../features/client/core/hooks/use_api";
import { useAuthStore } from "../features/client/core/stores/authStore";
import { useErrorStore } from "../features/client/core/stores/errorStore";
import AddProjectFloatButton from "../features/client/project/components/AddProjectFloatButton";
import ProjectCard from "../features/client/project/components/ProjectCard";
import { BroaSortBy } from "../features/shared/broas.types";

export const Home: NextPage = () => {
  // const user = useAuthStore((s) => s.user);
  // const { broas, broasPagination, broaFilter, setFilters } = useBroasStore();
  // const { setErrors, setIsOpen } = useErrorStore();

  // const getBroasApi = useApi<typeof getBroasClient>();

  // useEffect(() => {
  //   (async () => {
  //     // await handleGetBroas();
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (!getBroasApi.error) return;
  //   setErrors(getBroasApi.error);
  //   setIsOpen(true);
  // }, [getBroasApi.error]);

  // const handleGetBroas = async () => {
  //   await getBroasApi.request(getBroasClient());
  // };

  // const handleSearch = async (search: string) => {
  //   if (!search) {
  //     if (!broaFilter.wrongVersion) return;

  //     setFilters({ wrongVersion: undefined });
  //     await getBroasApi.request(getBroasClient());
  //     return;
  //   }

  //   setFilters({ wrongVersion: search });
  //   await getBroasApi.request(getBroasClient({ wrongVersion: search }));
  // };

  // const handleSortBy = async (sortBy: BroaSortBy) => {
  //   setFilters({ sortBy });

  //   await getBroasApi.request(getBroasClient({ sortBy }));
  // };

  // const handleGetNextBoas = async () => {
  //   const bp = broasPagination;
  //   const bfb = broaFilter;

  //   if (bp.page + 1 >= Math.ceil(bp.total / bp.limit)) return;
  //   await getBroasApi.request(
  //     getBroasClient({
  //       page: bp.page + 1,
  //       limit: bp.limit,
  //       wrongVersion: bfb.wrongVersion,
  //       sortBy: bfb.sortBy,
  //     })
  //   );
  // };

  // const handleGetPreviousBoas = async () => {
  //   const bp = broasPagination;
  //   const bfb = broaFilter;

  //   if (bp.page < 0) return;
  //   await getBroasApi.request(
  //     getBroasClient({
  //       page: bp.page - 1,
  //       limit: bp.limit,
  //       wrongVersion: bfb.wrongVersion,
  //       sortBy: bfb.sortBy,
  //     })
  //   );
  // };

  return (
    <MainLayout className='relative flex flex-col space-y-12 overflow-auto'>
      <HomeWelcome />

      <HomeRecentWorks />
      <AddProjectFloatButton />
    </MainLayout>
  );
};

export default Home;

const HomeRecentWorks = () => {
  return (
    <section className='flex flex-shrink-0 flex-col gap-8 pt-8 border-t border-brand-gray/10 overflow-x-auto'>
      <div className='flex justify-between items-center'>
        <h5 className='mr-4 text-3xl font-bold'>Projetos Recentes</h5>
        <Link href={linksObj.projects.url}>
          <a className='text-lg text-brand-gray/50 hover:text-brand-gray/80'>
            Ver todos
          </a>
        </Link>
      </div>
      <ul className='flex flex-shrink-0 space-x-8 pb-8 overflow-x-auto'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </ul>
    </section>
  );
};
