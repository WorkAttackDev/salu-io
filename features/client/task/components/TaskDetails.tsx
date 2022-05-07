import { BookmarkIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import React from "react";
import { MyTask } from "../../../shared/models/myTask";
import Button from "../../core/components/Button";
import LabelList from "../../label/components/LabelList";
import TodoManager from "../todo/components/TodoManager";
import useTaskTodo from "../todo/hooks/useTaskTodo";

type Props = {
  className?: string;
  task: MyTask;
  onClose: () => void;
  onDelete: () => void;
  onConfirm: () => void;
  onLabel: () => void;
};

const TaskDetails = ({
  task,
  className = "",
  onClose,
  onConfirm,
  onDelete,
  onLabel,
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
      <pre className='text-xl text-brand-gray whitespace-pre-line'>
        {task.description ?? ""}
      </pre>
      {task.labels && <LabelList labels={task.labels} />}
      <TodoManager task={task} />
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
        <button
          className='!ml-auto hover:text-brand'
          onClick={onLabel}
          title='labels'
        >
          <BookmarkIcon className='w-8 h-8 ' />
        </button>
      </span>
    </div>
  );
};

export default TaskDetails;
