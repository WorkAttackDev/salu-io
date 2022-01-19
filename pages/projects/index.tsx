import { Project } from "@prisma/client";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import useApi from "../../features/client/core/hooks/use_api";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { getProjectsClient } from "../../features/client/project/clientApi/getProjectsClient";
import AddProjectFloatButton from "../../features/client/project/components/AddProjectFloatButton";
import ProjectCard from "../../features/client/project/components/ProjectCard";
import { useProjectStore } from "../../features/client/project/stores/useProductsStore";

type Props = { projects: Project[] };

const ProjectsPage: NextPage<Props> = ({}) => {
  const { request, loading, error } = useApi<typeof getProjectsClient>();

  const { setErrors, setIsOpen } = useErrorStore();

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

  useEffect(() => {
    if (!error) return;
    setErrors(error);
    setIsOpen(true);
  }, [error]);

  return (
    <MainLayout className='relative w-full overflow-y-auto'>
      <SectionHeader title='Projetos' className='mb-12' />
      <section className='flex justify-center'>
        {projects && (
          <ul className='grid  gap-8 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        )}
      </section>
      <AddProjectFloatButton />
      <Loading isLoading={loading} />
    </MainLayout>
  );
};

export default ProjectsPage;
