import { ProjectStatus } from "@prisma/client";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import useApi from "../../features/client/core/hooks/use_api";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import { getProjectByIdClient } from "../../features/client/project/clientApi/getProjectByIdClient";
import { useProjectStore } from "../../features/client/project/stores/useProductsStore";
import AddTaskFloatButton from "../../features/client/task/components/AddTaskFloatButton";
import TasksColumn from "../../features/client/task/components/TasksColumn";
import { MyProjectTasks } from "../../features/shared/models/myProjectTasks";

type Props = { project: MyProjectTasks };

const ProjectDescriptionSection = ({ project }: Props) => {
  return (
    <section className='flex flex-col space-y-4 !mt-4'>
      <span className='flex items-baseline space-x-4'>
        <p className='text-lg text-brand-gray-1'>
          Começou em {dayjs(project.startDate).format("MMMM DD, YYYY")}
        </p>
        <p>{" - "}</p>
        <p className='text-lg text-brand-gray-1'>
          Termina em {dayjs(project.endDate).format("MMMM DD, YYYY")}
        </p>
      </span>
      <p className='text-xl text-brand-gray'>{project.description}</p>
    </section>
  );
};

let isInitial = true;

const columns = [
  { label: "Em Carteira", status: ProjectStatus.TODO },
  { label: "Em Progresso", status: ProjectStatus.IN_PROGRESS },
  { label: "Concluído", status: ProjectStatus.DONE },
];

const ProjectPage: NextPage = () => {
  const { query, pathname } = useRouter();
  const { request, loading } = useApi<typeof getProjectByIdClient>();

  const { setErrors, setIsOpen } = useErrorStore();

  // console.log(pathname);

  const { project, setProject } = useProjectStore((state) => ({
    project: state.selectedProject,
    setProject: state.setSelectedProject,
  }));

  useEffect(() => {
    const id = query.id as string;

    if (!id) return;

    (async () => {
      if (isInitial) isInitial = false;

      try {
        const resData = await request(getProjectByIdClient(id));

        if (!resData) return;

        setProject(resData);
      } catch (error) {
        setErrors(handleClientError(error));
        setIsOpen(true);
      }
    })();
  }, [query]);

  return (
    <MainLayout className='flex flex-col space-y-12 overflow-auto'>
      <Loading isLoading={loading || isInitial} />
      <SectionHeader title={project?.name ?? "Desconhecido"} />

      {project ? (
        <>
          <ProjectDescriptionSection project={project} />
          <section
            className={`grid grid-flow-col justify-start items-start gap-8 overflow-auto snap-mandatory snap-x  pb-8`}
          >
            {columns.map((column) => (
              <TasksColumn
                key={column.status}
                title={column.label}
                status={column.status}
                tasks={
                  project.tasks?.filter((v) => v.status === column.status) || []
                }
              />
            ))}
          </section>
          <AddTaskFloatButton />
        </>
      ) : (
        <p>Projeto não encontrado</p>
      )}
    </MainLayout>
  );
};

export default React.memo(ProjectPage);
