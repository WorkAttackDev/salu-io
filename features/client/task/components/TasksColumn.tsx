import { ProjectStatus } from "@prisma/client";
import React from "react";
import { MyTask } from "../../../shared/models/myTask";
import Alert from "../../core/components/Alert";
import Loading from "../../core/components/Loading";
import Modal from "../../core/components/Modal";
import LabelManager from "../../label/components/LabelManager";
import useTask from "../hooks/useTask";
import EditTaskForm from "./EditTaskForm";
import TaskDetails from "./TaskDetails";
import TasksList from "./TasksList";

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
    handleDeleteTask,
    handleUpdateSubmit,
    setMode,
    mode,
    currTask,
    isModalOpen,
    deleteTaskMutation,
    editTaskMutation,
  } = useTask();

  const fixedModalModes = ["label", "edit"] as const;

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

      <Modal
        title={
          mode === "delete"
            ? "Excluir Tarefa"
            : mode === "label"
            ? "Gerenciador de Labels"
            : currTask?.name || ""
        }
        isOpen={isModalOpen}
        onClose={
          fixedModalModes.some((v) => v === mode) ? undefined : handleCloseModal
        }
      >
        {mode === "info" && currTask ? (
          <TaskDetails
            task={currTask}
            onClose={handleCloseModal}
            onConfirm={() => setMode("edit")}
            onDelete={() => setMode("delete")}
            onLabel={() => setMode("label")}
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
        ) : mode === "label" && currTask ? (
          <LabelManager onClose={() => setMode("info")} />
        ) : (
          <Loading isLoading={true} />
        )}
      </Modal>

      <Loading
        isLoading={editTaskMutation.loading || deleteTaskMutation.loading}
      />
    </article>
  );
};

export default TasksColumn;
