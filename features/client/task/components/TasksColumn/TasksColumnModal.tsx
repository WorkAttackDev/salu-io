import Alert from "@/client/core/components/Alert";
import Modal from "@/client/core/components/Modal";
import LabelManager from "@/client/label/components/LabelManager";
import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import useTask from "../../hooks/useTask";
import EditTaskForm from "../EditTaskForm";
import TaskDetails from "../TaskDetails";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TasksColumnModal = ({ isOpen, onClose }: Props) => {
  const { handleDeleteTask, handleUpdateSubmit, setMode, mode, currTask } =
    useTask();

  const fixedModalModes = ["label", "edit"] as const;

  return (
    <Modal
      title={
        mode === "delete"
          ? "Excluir Tarefa"
          : mode === "label"
          ? "Gerenciador de Labels"
          : currTask?.name || ""
      }
      isOpen={isOpen}
      onClose={fixedModalModes.some((v) => v === mode) ? undefined : onClose}
    >
      {mode === "info" && currTask ? (
        <TaskDetails
          task={currTask}
          onClose={onClose}
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
        <RefreshIcon className='w-16 h-16 mx-auto text-brand animate-spin' />
      )}
    </Modal>
  );
};

export default TasksColumnModal;
