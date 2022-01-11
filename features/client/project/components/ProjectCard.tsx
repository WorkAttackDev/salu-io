import { CalendarIcon } from "@heroicons/react/outline";
import React from "react";
import Button from "../../core/components/Button";

const ProjectCard: React.FC = () => {
  return (
    <li className='flex-shrink-0 grid gap-4 justify-items-start bg-brand-gray-2/50 rounded-lg p-8 min-w-[24rem] max-w-md'>
      <h6 className='font-semibold'>Sistema de gestão de projetos</h6>
      <p className='text-lg line-clamp-3'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
        officiis inventore deleniti dignissimos adipisci assumenda pariatur
        tenetur libero labore fugiat. Vel, distinctio illum? Pariatur officiis
        doloremque delectus, voluptatem ab incidunt.
      </p>
      <span className='flex items-start text-brand-gray-1 '>
        <CalendarIcon className='w-6 h-6 mr-4' />
        <p className='text-lg'>Maio 19, 2022 - Junho 20, 2022</p>
      </span>
      <Button>Entrar</Button>
    </li>
  );
};

export default ProjectCard;
