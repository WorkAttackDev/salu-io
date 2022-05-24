import React, { MouseEvent, useCallback, useState } from "react";
import shallow from "zustand/shallow";
import {
  editTaskValidate,
  EditTaskValidationParams,
} from "../../../shared/lib/validation/editTaskValidator";
import { MyTask } from "../../../shared/models/myTask";
import { DnDItemType } from "../../core/hooks/useDnD";
import useApi from "../../core/hooks/use_api";
import { useErrorStore } from "../../core/stores/errorStore";
import useProject from "../../project/hooks/useProject";
import { useProjectStore } from "../../project/stores/useProductsStore";
// import { editTaskClient } from "../clientApi/createTaskClient";
import { deleteTaskClient } from "../clientApi/deleteTaskClient";
import { useTaskStore } from "../stores/useTaskStore";

// import { Container } from './styles';

const useTask = () => {
  const { setTask: setCurrTask, task: currTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<
    "edit" | "delete" | "info" | "label" | undefined
  >("info");

  const deleteTaskMutation = useApi<typeof deleteTaskClient>();

  const { project, setProject } = useProjectStore(
    (state) => ({
      project: state.selectedProject,
      setProject: state.setSelectedProject,
    }),
    shallow
  );

  const handleSelectTask = useCallback(
    (task: MyTask) => {
      setCurrTask(task);
      setIsModalOpen(true);
    },
    [isModalOpen]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMode(undefined);

    setTimeout(() => {
      setMode("info");
      setCurrTask(undefined);
    }, 300);
  };

  const handleDeleteTask = async () => {
    if (!currTask) return;

    const wasDeleted = await deleteTaskMutation.request(
      deleteTaskClient(currTask.id)
    );

    if (!wasDeleted) return;

    if (!project?.tasks) return;

    project.tasks = project.tasks.filter((t) => t.id !== currTask.id);

    setProject(project);
    setIsModalOpen(false);
    setMode("info");
  };

  const handleOnLabel = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    setMode("label");
    setIsModalOpen(true);
  };
  return {
    mode,
    isModalOpen,
    currTask,
    deleteTaskMutation,
    handleCloseModal,
    handleSelectTask,
    setMode,
    setCurrTask,
    handleDeleteTask,
    handleOnLabel,
  };
};

export default useTask;
