import { ProjectStatus } from "@prisma/client";
import React from "react";
import { MyTask } from "../../../../shared/models/myTask";
import Loading from "../../../core/components/Loading";
import useTask from "../../hooks/useTask";
import TasksList from "../TasksList";
import TasksColumnModal from "./TasksColumnModal";

type Props = {
  className?: string;
  title: string;
  tasks: MyTask[];
  status: ProjectStatus;
};

const TasksColumn = ({ className = "", title, tasks, status }: Props) => {
  const {
    handleCloseModal,
    handleMoveCard,
    handleSelectTask,
    isModalOpen,
    deleteTaskMutation,
    editTaskMutation,
  } = useTask();

  return (
    <article
      className={`flex flex-col snap-x snap-start border-2  rounded-lg border-brand-gray-2/30 min-w-[20rem] max-w-xl md:min-w-[30rem] ${className}`}
    >
      <header className='bg-transparent p-4 text-2xl font-semibold'>
        {title}
      </header>

      <TasksList
        tasks={tasks}
        onSelect={handleSelectTask}
        status={status}
        onMoveCard={handleMoveCard}
      />

      <TasksColumnModal isOpen={isModalOpen} onClose={handleCloseModal} />

      <Loading
        isLoading={editTaskMutation.loading || deleteTaskMutation.loading}
      />
    </article>
  );
};

export default TasksColumn;
