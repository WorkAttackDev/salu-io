import { ProjectStatus } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { DragEvent, MouseEvent } from "react";
import shallow from "zustand/shallow";
import { MyTask } from "../../../shared/models/myTask";
import { DnDItemType } from "../../core/hooks/useDnD";
import { useProjectStore } from "../../project/stores/useProductsStore";
import TaskCard from "./TaskCard";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

type Props = {
  className?: string;
  tasks: MyTask[];
  onSelect: (task: MyTask) => void;
  status: ProjectStatus;
  onMoveCard: (data: DnDItemType) => void;
};

const TasksList = ({
  tasks,
  className = "",
  onSelect,
  onMoveCard,
  status,
}: Props) => {
  const { selectedProject, setSelectedProject } = useProjectStore(
    (state) => ({
      selectedProject: state.selectedProject,
      setSelectedProject: state.setSelectedProject,
    }),
    shallow
  );

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault?.();
    return false;
  };

  const handleDropTask = (e: DragEvent<HTMLElement>) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    const newDragId = +e.dataTransfer.getData("text/plain");
    if (!selectedProject?.tasks || newDragId === undefined) return;

    selectedProject.tasks = selectedProject.tasks.map((task) => {
      if (task.id === newDragId) {
        task.status = status;
      }
      return task;
    });

    setSelectedProject(selectedProject);
    onMoveCard({
      id: newDragId,
      order: status,
    });
  };

  return !tasks.length ? (
    <small
      draggable={true}
      className='w-full p-4 text-lg text-center text-brand-gray-1 mb-4
      '
      onDrop={handleDropTask}
      onDragOver={handleDragOver}
    >
      Sem tarefas
    </small>
  ) : (
    <ul
      className={`grid gap-4 items-start content-start p-4 max-h-[50vh] overflow-y-auto bg-brand-gray-2/50 ${className}`}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          onSelect={onSelect}
          task={task}
          onMoveCard={onMoveCard}
        />
      ))}
    </ul>
  );
};

export default TasksList;
