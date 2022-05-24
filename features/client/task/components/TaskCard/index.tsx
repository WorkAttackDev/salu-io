import { ProjectStatus } from "@prisma/client";
import React from "react";
import shallow from "zustand/shallow";
import { MyTask } from "../../../../shared/models/myTask";
import useDnD, { DnDItemType } from "../../../core/hooks/useDnD";
import { calculateRemainTime } from "../../../core/utils";
import { useProjectStore } from "../../../project/stores/useProductsStore";
import TaskCardTodoInfo from "./TaskCardTodoInfo";

type Props = {
  className?: string;
  task: MyTask;
  onSelect: (task: MyTask) => void;
  onMoveCard: (data: DnDItemType) => void;
};

const TaskCard = ({ task, onSelect, onMoveCard }: Props) => {
  const { selectedProject, setSelectedProject } = useProjectStore(
    (state) => ({
      selectedProject: state.selectedProject,
      setSelectedProject: state.setSelectedProject,
    }),
    shallow
  );

  const {
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
    handleDrop,
  } = useDnD(
    selectedProject?.tasks?.map((t) => ({ ...t, order: t.status })) || [],
    (tasks) => setTasks(tasks)
  );

  const setTasks = (tasks: Array<MyTask & { order: string }>) => {
    if (!selectedProject) return;

    selectedProject.tasks = tasks.map((t) => {
      const { order, ...task } = t;
      return { ...task, status: order as ProjectStatus };
    });

    setSelectedProject(selectedProject);
  };

  const handleOnDrop = ([dragged]:
    | [DnDItemType]
    | [DnDItemType, DnDItemType]) => {
    onMoveCard(dragged);
  };

  return (
    <li
      onClick={() => onSelect(task)}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, task.id, (data) => handleOnDrop(data))}
      className='grid gap-4 text-xl bg-brand-dark border rounded-lg border-brand-gray-2/30 p-4'
    >
      <h6 className='text-xl'>{task.name}</h6>

      <p className='text-base text-brand-gray-1'>
        {calculateRemainTime({
          endDate: task.endDate,
          startDate: task.endDate,
        })}
      </p>
      <p className='text-xl'>{task.description}</p>
      <TaskCardTodoInfo />
    </li>
  );
};

export default TaskCard;
