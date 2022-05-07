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
import { editTaskClient } from "../clientApi/createTaskClient";
import { deleteTaskClient } from "../clientApi/deleteTaskClient";
import { useTaskStore } from "../stores/useTaskStore";

// import { Container } from './styles';

const useTask = () => {
  const { setTask: setCurrTask, task: currTask } = useTaskStore();
  const { localGetProjectById } = useProject();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<
    "edit" | "delete" | "info" | "label" | undefined
  >("info");

  const editTaskMutation = useApi<typeof editTaskClient>();

  const deleteTaskMutation = useApi<typeof deleteTaskClient>();

  const { handleError } = useErrorStore();

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

  const handleUpdateSubmit = async (data: EditTaskValidationParams) => {
    if (!currTask && !data.id) return;

    const adjustedData: EditTaskValidationParams & { id?: number } = {
      ...data,
      projectId: data.projectId || currTask!.projectId,
      id: data.id || currTask!.id,
    };

    console.log(adjustedData);

    try {
      const ValidatedData = editTaskValidate(adjustedData);
      const task = await editTaskMutation.request(
        editTaskClient(ValidatedData)
      );

      if (!task) return;
      if (!project?.tasks) return;

      // project.tasks = project.tasks.map((t) => (t.id === task.id ? task : t));

      // setProject(project);
      localGetProjectById(project.id + "");
      setIsModalOpen(false);
    } catch (error) {
      handleError(error);
    }
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

  const handleMoveCard = async (data: DnDItemType) => {
    const movedTask = project?.tasks?.find((task) => task.id === data.id);

    if (!movedTask) return;

    const adjustedData: EditTaskValidationParams & { id?: number } = {
      ...movedTask,
      description: movedTask.description!,
      startDate: movedTask.startDate as string | undefined,
      endDate: movedTask.endDate as string | undefined,
    };

    await handleUpdateSubmit(adjustedData);
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
    editTaskMutation,
    deleteTaskMutation,
    handleCloseModal,
    handleSelectTask,
    handleMoveCard,
    setMode,
    setCurrTask,
    handleUpdateSubmit,
    handleDeleteTask,
    handleOnLabel,
  };
};

export default useTask;
