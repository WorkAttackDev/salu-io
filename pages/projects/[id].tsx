import { Label, ProjectStatus } from "@prisma/client";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import Modal from "../../features/client/core/components/Modal";
import OptionDropdown from "../../features/client/core/components/OptionDropdown";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import useApi from "../../features/client/core/hooks/use_api";
import LabelList from "../../features/client/label/components/LabelList";
import { getProjectByIdClient } from "../../features/client/project/clientApi/getProjectByIdClient";
import AddParticipantsSection from "../../features/client/project/components/AddParticipantsSection";
import ProjectParticipantsSection from "../../features/client/project/components/ProjectParticipantsSection";
import useProject from "../../features/client/project/hooks/useProject";
import { useProjectStore } from "../../features/client/project/stores/useProductsStore";
import AddTaskFloatButton from "../../features/client/task/components/AddTaskFloatButton";
import TasksColumn from "../../features/client/task/components/TasksColumn";
import { getUsersClient } from "../../features/client/user/clientApi/getUsersClient";
import useUser from "../../features/client/user/hooks/useUser";
import { MyProject } from "../../features/shared/models/myProjectTasks";
import { MyTask } from "../../features/shared/models/myTask";
import { MyUserInfo } from "../../features/shared/models/myUser";

type Props = { project: MyProject; owner?: MyUserInfo };

const ProjectDescriptionSection = ({ project, owner }: Props) => {
  return (
    <section className='flex flex-col space-y-2 !mt-4'>
      {owner && (
        <p className='text-lg text-brand-gray-1'>Criado por {owner.name}</p>
      )}
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
  const { query, push } = useRouter();

  const { users, loading } = useUser();

  const [filterLabel, setFilterLabel] = useState<Label | undefined>(undefined);
  const [filteredTasks, setFilteredTasks] = useState<MyTask[] | undefined>();

  const { localGetProjectById, loading: projectLoading } = useProject();

  const [showAddParticipantModal, setShowAddParticipantModal] = useState<{
    isOpen: boolean;
    mode?: "add" | "delete";
  }>({
    isOpen: false,
  });

  const dropdownOptions = [
    // {
    //   label: "Editar Projeto",
    //   value: "edit-project",
    //   onclick: () =>
    //     project && push(`${linksObj.editProject.url}/${project.id}`),
    // },
    {
      label: "Add participantes",
      value: "add-participants",
      onClick: () => setShowAddParticipantModal({ isOpen: true, mode: "add" }),
    },
    {
      label: "Excluir participantes",
      value: "delete-participants",
      onClick: () =>
        setShowAddParticipantModal({ isOpen: true, mode: "delete" }),
    },
  ];

  const { project } = useProjectStore((state) => ({
    project: state.selectedProject,
  }));

  useEffect(() => {
    const id = query.id as string;

    if (!id) return;

    (async () => {
      if (isInitial) isInitial = false;

      await localGetProjectById(id);
    })();
  }, [query]);

  useEffect(() => {
    if (!filterLabel) {
      return setFilteredTasks(undefined);
    }

    setFilteredTasks(
      project?.tasks?.filter((task) =>
        task.labels?.some((label) => label.id === filterLabel.id)
      )
    );
  }, [filterLabel]);

  return (
    <MainLayout className='flex flex-col space-y-8 overflow-auto h-max'>
      <Loading isLoading={loading || projectLoading || isInitial} />
      <SectionHeader title={project?.name ?? "Desconhecido"}>
        <OptionDropdown items={dropdownOptions} />
      </SectionHeader>

      {project ? (
        <>
          <ProjectDescriptionSection
            project={project}
            owner={users.find((u) => u.id === project.ownerId)}
          />
          {!!project.participants?.length && (
            <ProjectParticipantsSection participants={project.participants} />
          )}
          <LabelList load onClick={setFilterLabel} currLabel={filterLabel} />
          <section
            className={`grid grid-flow-col justify-start items-start gap-8 overflow-x-auto snap-mandatory snap-x pb-8 sm:snap-none`}
          >
            {columns.map((column) => (
              <TasksColumn
                key={column.status}
                title={column.label}
                status={column.status}
                tasks={
                  (filteredTasks || project.tasks)?.filter(
                    (v) => v.status === column.status
                  ) || []
                }
              />
            ))}
          </section>
          <AddTaskFloatButton />
          <Modal
            isOpen={showAddParticipantModal.isOpen}
            title={
              showAddParticipantModal.mode === "add"
                ? "Adicionar Participantes"
                : "Excluir Participantes"
            }
          >
            <AddParticipantsSection
              mode={showAddParticipantModal.mode}
              onConclude={() => localGetProjectById(query.id as string)}
              project={project}
              usersInfo={users || []}
              onReject={() => setShowAddParticipantModal({ isOpen: false })}
            />
          </Modal>
        </>
      ) : (
        <p>Projeto não encontrado</p>
      )}
    </MainLayout>
  );
};

export default React.memo(ProjectPage);
