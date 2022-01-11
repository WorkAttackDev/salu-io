import { NextPage } from "next";
import React from "react";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import AddProjectFloatButton from "../../features/client/project/components/AddProjectFloatButton";
import ProjectCard from "../../features/client/project/components/ProjectCard";

const ProjectsPage: NextPage = () => {
  return (
    <MainLayout className='relative w-full overflow-y-auto'>
      <SectionHeader title='Projetos' className='mb-12' />
      <section className='flex justify-center'>
        <ul className='grid  gap-8 overflow-y-auto md:grid-cols-2 lg:grid-cols-3'>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </ul>
      </section>
      <AddProjectFloatButton />
    </MainLayout>
  );
};

export default ProjectsPage;
