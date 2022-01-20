import { ProjectStatus, Task } from "@prisma/client";
import dayjs from "dayjs";
import React, { DragEvent } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import useDnD, { DnDItemType } from "../../core/hooks/useDnD";
import { useProjectStore } from "../../project/stores/useProductsStore";
import shallow from "zustand/shallow";
import TaskCard from "./TaskCard";
import { MyTask } from "../../../shared/models/myTask";

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
      className={`grid gap-4 items-start p-4 h-full overflow-y-auto bg-brand-gray-2/50 ${className}`}
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