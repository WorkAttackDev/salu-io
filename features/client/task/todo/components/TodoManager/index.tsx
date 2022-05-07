import Button from "@/client/core/components/Button";
import InputField from "@/client/core/components/InputField";
import ProgressBar from "@/client/core/components/ProgressBar";
import { MyTask } from "@/shared/models/myTask";
import { MyTaskTodo } from "@/shared/models/MyTaskTodo";
import {
  ClipboardListIcon,
  DotsVerticalIcon,
  PlusIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import React, { FormEventHandler, useRef } from "react";
import useTaskTodo from "../../hooks/useTaskTodo";

import TodoItem from "./TodoItem";

type Props = {
  task: MyTask;
};

const TodoManager = ({ task }: Props) => {
  const {
    todos,
    isLoading,
    isUpserting,
    isDeleteing,
    handleUpsertTodo,
    handleDeleteTodo,
    calcProgress,
  } = useTaskTodo({
    task,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleAddTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const text = formData.get("text");

    if (typeof text !== "string" || text.trim().length === 0) return;

    await handleUpsertTodo(
      {
        text,
        taskId: task.id,
      },
      () => {
        formRef.current?.reset();
      }
    );
  };

  const handleEditTodo = async (
    editedTodo: MyTaskTodo,
    onSuccess?: () => void
  ) => {
    await handleUpsertTodo(
      {
        taskId: task.id,
        todoId: editedTodo.id,
        text: editedTodo.text,
        done: editedTodo.done,
      },
      onSuccess
    );
  };

  const handleOnDeleteTodo = (todo: MyTaskTodo) => {
    handleDeleteTodo({
      taskId: task.id,
      todoId: todo.id,
    });
  };
  return (
    <section className='relative min-h-[10rem] rounded-lg'>
      <h5 className='flex items-center mb-8'>
        <ClipboardListIcon className='w-8 h-8 mr-2' />
        <p className='font-bold text-xl'>CheckList</p>
        <DotsVerticalIcon className='w-8 h-8 ml-auto' />
      </h5>
      {isLoading ? (
        <RefreshIcon className='w-8 h-8 text-brand animate-spin' />
      ) : (
        <>
          <ProgressBar className='mb-8' value={calcProgress()} />
          <div className='flex flex-col p-1 space-y-8'>
            {todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onEdit={handleEditTodo}
                onDelete={handleOnDeleteTodo}
              />
            ))}

            <form
              ref={formRef}
              className='flex items-center space-x-4'
              onSubmit={handleAddTodo}
            >
              <InputField
                name='text'
                key='new'
                labelText='novo'
                inline
                className='w-full'
              />
              {isUpserting || isDeleteing ? (
                <RefreshIcon className='w-6 h-6 animate-spin' />
              ) : (
                <Button
                  type='submit'
                  size='sm'
                  className='!p-2'
                  title='adicionar'
                >
                  <PlusIcon className='w-6 h-6' />
                </Button>
              )}
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default TodoManager;
