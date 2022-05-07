import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { MyTask } from "../../../../shared/models/myTask";
import { MyTaskTodoSchemaParams } from "../../../../shared/models/MyTaskTodo";
import { useErrorStore } from "../../../core/stores/errorStore";
import {
  DeleteTaskTodoParams,
  useDeleteTaskTodoMutation,
} from "../clientApi/deleteTaskTodoClient";
import { useTaskTodosQuery } from "../clientApi/getTaskTodosClient";
import { useUpsertTaskTodosMutation } from "../clientApi/upsertTaskTodoClient";

type Props = {
  task: MyTask;
};

const useTaskTodo = ({ task }: Props) => {
  const {
    data: todosData,
    refetch,

    isLoading,
    // queryKey: getTaskTodosQueryKey,
  } = useTaskTodosQuery({ taskId: task.id });

  const upsertTodoMutation = useUpsertTaskTodosMutation();

  const deleteTodoMutation = useDeleteTaskTodoMutation();

  // const queryClient = useQueryClient();

  const { setIsOpen, setErrors } = useErrorStore();

  useEffect(() => {
    refetch();
  }, []);

  const handleUpsertTodo = async (
    data: MyTaskTodoSchemaParams,
    onSuccess?: () => void
  ) => {
    if (todosData && todosData.length >= 50) {
      setErrors(["Não é possível adicionar mais de 50 todos para uma tarefa"]);
      setIsOpen(true);
      return;
    }

    const res = await upsertTodoMutation.mutateAsync(data);
    if (!res.id) return;

    await refetch();

    onSuccess?.();
  };

  const handleDeleteTodo = async (data: DeleteTaskTodoParams) => {
    await deleteTodoMutation.mutateAsync(data);
    await refetch();
  };

  const calcProgress = (): number => {
    if (!todosData) return 0;

    const total = todosData.length;
    const completed = todosData.filter((todo) => todo.done).length;

    return (completed / total) * 100;
  };

  return {
    todos: todosData || [],
    isLoading: isLoading,
    isUpserting: upsertTodoMutation.isLoading,
    isDeleteing: deleteTodoMutation.isLoading,
    handleUpsertTodo,
    handleDeleteTodo,
    calcProgress,
  };
};

export default useTaskTodo;
