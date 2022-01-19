import { CalendarIcon } from "@heroicons/react/outline";
import { Project } from "@prisma/client";
import React from "react";
import Button from "../../core/components/Button";
import day from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import Link from "next/link";
import { linksObj } from "../../core/data/links";
import OptionDropdown, {
  OptionDropdownItem,
} from "../../core/components/OptionDropdown";
import { useRouter } from "next/router";
import useApi from "../../core/hooks/use_api";
import { deleteProjectClient } from "../clientApi/deleteProjectClient";
import { useAuthStore } from "../../core/stores/authStore";
import { useProjectStore } from "../stores/useProductsStore";
import shallow from "zustand/shallow";
import Loading from "../../core/components/Loading";

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

  const cardActions: OptionDropdownItem[] = [
    {
      label: "Editar",
      value: "edit",
      onClick: () => push(`/edit-project/${id}`),
    },
    {
      label: "Excluir",
      value: "delete",
      onClick: () => handleDeleteProject(),
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
        <p className='text-lg'>{"Termina " + day(endDate).to(day())}</p>
      </span>
      <Link href={linksObj.project.url(id)}>
        <a>
          <Button>Entrar</Button>
        </a>
      </Link>
      <Loading isLoading={deleteProjectMutation.loading} />
    </li>
  );
};

export default ProjectCard;
