import { ProjectStatus } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import {
  editTaskValidate,
  EditTaskValidationParams,
} from "../../../shared/lib/validation/editTaskValidator";
import { MyTask } from "../../../shared/models/myTask";
import Alert from "../../core/components/Alert";
import Loading from "../../core/components/Loading";
import Modal from "../../core/components/Modal";
import { DnDItemType } from "../../core/hooks/useDnD";
import useApi from "../../core/hooks/use_api";
import { useErrorStore } from "../../core/stores/errorStore";
import { handleClientError } from "../../core/utils/client_errors";
import { useProjectStore } from "../../project/stores/useProductsStore";
import { editTaskClient } from "../clientApi/createTaskClient";
import { deleteTaskClient } from "../clientApi/deleteTaskClient";
import EditTaskForm from "./EditTaskForm";
import TaskDetails from "./TaskDetails";
import TasksList from "./TasksList";

// import { Container } from './styles';

type Props = {
  className?: string;
  title: string;
  tasks: MyTask[];
  status: ProjectStatus;
};

const TasksColumn = ({ className = "", title, tasks, status }: Props) => {
  const [currTask, setCurrTask] = useState<MyTask | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "delete" | "info">("info");

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

  const handleSelectTask = useCallback((task: MyTask) => {
    setCurrTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setMode("info");
    }, 1000);
  };

  const handleUpdateSubmit = async (data: EditTaskValidationParams) => {
    if (!currTask && !data.id) return;

    const adjustedData: EditTaskValidationParams & { id?: number } = {
      ...data,
      projectId: data.projectId || currTask!.projectId,
      id: data.id || currTask!.id,
    };

    try {
      const ValidatedData = editTaskValidate(adjustedData);
      const task = await editTaskMutation.request(
        editTaskClient(ValidatedData)
      );

      if (!task) return;
      if (!project?.tasks) return;

      project.tasks = project.tasks.map((t) => (t.id === task.id ? task : t));

      setProject(project);
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

    console.log(movedTask);

    if (!movedTask) return;

    const adjustedData: EditTaskValidationParams & { id?: number } = {
      ...movedTask,
      description: movedTask.description!,
      startDate: movedTask.startDate as string | undefined,
      endDate: movedTask.endDate as string | undefined,
    };

    await handleUpdateSubmit(adjustedData);
  };

  return (
    <article
      className={`flex flex-col snap-x snap-start border-2  rounded-lg border-brand-gray-2/30 overflow-hidden min-w-[20rem] max-w-xl md:min-w-[30rem] ${className}`}
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

      <Modal
        title={mode === "delete" ? "Excluir Tarefa" : currTask?.name || ""}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        {mode === "info" && currTask ? (
          <TaskDetails
            task={currTask}
            onClose={handleCloseModal}
            onConfirm={() => setMode("edit")}
            onDelete={() => setMode("delete")}
          />
        ) : mode === "edit" ? (
          <EditTaskForm
            mode='edit'
            task={currTask}
            onSubmit={handleUpdateSubmit}
            onBack={() => setMode("info")}
          />
        ) : mode === "delete" ? (
          <Alert
            onClose={() => setMode("info")}
            onResolve={handleDeleteTask}
            description={`Deseja excluir a tarefa '${currTask?.name}' ?`}
          />
        ) : null}
      </Modal>

      <Loading
        isLoading={editTaskMutation.loading || deleteTaskMutation.loading}
      />
    </article>
  );
};

export default TasksColumn;
