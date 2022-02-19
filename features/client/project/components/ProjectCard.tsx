import { CalendarIcon } from "@heroicons/react/outline";
import { Project } from "@prisma/client";
import day from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Alert from "../../core/components/Alert";
import Button from "../../core/components/Button";
import Loading from "../../core/components/Loading";
import Modal from "../../core/components/Modal";
import OptionDropdown, {
  OptionDropdownItem,
} from "../../core/components/OptionDropdown";
import { linksObj } from "../../core/data/links";
import useApi from "../../core/hooks/use_api";
import { useAuthStore } from "../../core/stores/authStore";
import { calculateRemainTime } from "../../core/utils";
import { deleteProjectClient } from "../clientApi/deleteProjectClient";
import { useProjectStore } from "../stores/useProductsStore";

day.extend(relativeTime);
day.locale("pt-br");

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  const { id, name, description, startDate, endDate } = project;
  const { push } = useRouter();
  const user = useAuthStore((state) => state.user);

  const { setProjects, projects } = useProjectStore((s) => ({
    setProjects: s.setProjects,
    projects: s.projects,
  }));

  const deleteProjectMutation = useApi<typeof deleteProjectClient>();

  const [showAlert, setShowAlert] = useState(false);

  const cardActions: OptionDropdownItem[] = [
    {
      label: "Editar",
      value: "edit",
      onClick: () => push(`/edit-project/${id}`),
    },
    {
      label: "Excluir",
      value: "delete",
      onClick: () => setShowAlert(true),
    },
  ];

  const handleDeleteProject = async () => {
    if (!user) return;

    const isDeleted = await deleteProjectMutation.request(
      deleteProjectClient(id, user.id)
    );

    if (!isDeleted) return;

    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <li className='flex-shrink-0 grid gap-4 justify-items-start bg-brand-gray-2/50 rounded-lg p-8 min-w-[20rem] max-w-md'>
      <header className='flex w-full justify-between items-start'>
        <h6 className='font-semibold'>{name}</h6>
        <OptionDropdown className='flex-shrink-0' items={cardActions} />
      </header>
      <p className='text-lg line-clamp-3'>{description}</p>
      <span className='flex items-start text-brand-gray-1 '>
        <CalendarIcon className='w-6 h-6 mr-4' />
        <p className='text-lg'>{calculateRemainTime({ endDate, startDate })}</p>
      </span>
      <Link href={linksObj.project.url(id)}>
        <a>
          <Button>Entrar</Button>
        </a>
      </Link>
      <Modal isOpen={showAlert} title='Apagar projeto'>
        <Alert
          onClose={() => setShowAlert(false)}
          onResolve={handleDeleteProject}
          description='Ao apagar este projeto perderá todos os dados e tarefas relacionados com o mesmo!'
        />
      </Modal>
      <Loading isLoading={deleteProjectMutation.loading} />
    </li>
  );
};

export default ProjectCard;
