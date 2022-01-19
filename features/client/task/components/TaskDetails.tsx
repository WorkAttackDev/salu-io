import { Task } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import Button from "../../core/components/Button";

type Props = {
  className?: string;
  task: Task;
  onClose: () => void;
  onDelete: () => void;
  onConfirm: () => void;
};

const TaskDetails = ({
  task,
  className = "",
  onClose,
  onConfirm,
  onDelete,
}: Props) => {
  return (
    <div className={`flex flex-col space-y-8 ${className}`}>
      <span className='flex flex-col items-baseline'>
        {task.startDate && (
          <p className='text-lg text-brand-gray-1'>
            Começou em {dayjs(task.startDate).format("MMMM DD, YYYY")}
          </p>
        )}
        {task.endDate && (
          <p className='text-lg text-brand-gray-1'>
            Termina em {dayjs(task.endDate).format("MMMM DD, YYYY")}
          </p>
        )}
      </span>
      <p className='text-xl text-brand-gray'>{task.description ?? ""}</p>
      <span className='flex items-center space-x-4'>
        <Button size='sm' onClick={onConfirm}>
          Editar
        </Button>
        <Button theme='secondary' size='sm' onClick={onClose}>
          Fechar
        </Button>
        <Button theme='danger' size='sm' onClick={onDelete}>
          Excluir
        </Button>
      </span>
    </div>
  );
};

export default TaskDetails;
