import { Project } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import HomeWelcome from "../features/client/core/components/HomeWelcome";
import Loading from "../features/client/core/components/Loading";
import MainLayout from "../features/client/core/components/MainLayout";
import { linksObj } from "../features/client/core/data/links";
import useApi from "../features/client/core/hooks/use_api";
import { getProjectsClient } from "../features/client/project/clientApi/getProjectsClient";
import AddProjectFloatButton from "../features/client/project/components/AddProjectFloatButton";
import ProjectCard from "../features/client/project/components/ProjectCard";
import { useProjectStore } from "../features/client/project/stores/useProductsStore";

type Props = { projects: Project[] };

export const Home: NextPage<Props> = () => {
  const { request, loading } = useApi<typeof getProjectsClient>();

  const { projects, setProjects } = useProjectStore((s) => ({
    projects: s.projects,
    setProjects: s.setProjects,
  }));

  useEffect(() => {
    (async () => {
      const resProjects = await request(getProjectsClient());
      setProjects(resProjects || []);
    })();
  }, []);

  return (
    <MainLayout className='relative flex flex-col space-y-12 overflow-auto'>
      <HomeWelcome />

      <HomeRecentWorks projects={projects} />
      <AddProjectFloatButton />
      <Loading isLoading={loading} />
    </MainLayout>
  );
};

export default Home;

const HomeRecentWorks = ({ projects }: Props) => {
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </section>
  );
};
