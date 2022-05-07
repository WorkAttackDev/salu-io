import InputField from "@/client/core/components/InputField";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { TaskTodo } from "@prisma/client";
import Button from "@/client/core/components/Button";
import React, { useRef, useState } from "react";

type Props = {
  todo: TaskTodo;
  onEdit: (editedTodo: TaskTodo, onSuccess?: () => void) => void;
  onDelete: (todo: TaskTodo) => void;
};

const TodoItem = ({ todo, onEdit, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const mouseDownRef = useRef<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const newText = formData.get("text");
    if (typeof newText !== "string" || newText.trim().length === 0) return;

    onEdit({ ...todo, text: newText }, () => {
      setIsEditing(false);
    });
  };

  const handleDelete = async () => {
    mouseDownRef.current = true;
    await onDelete(todo);
    setIsEditing(false);
  };
  return (
    <span className=' w-full flex justify-start items-center text-lg text-brand-gray-1'>
      <input
        type='checkbox'
        className='accent-brand'
        name='isDone'
        defaultChecked={todo.done}
        onChange={(e) => {
          e.stopPropagation();
          onEdit({ ...todo, done: e.currentTarget.checked });
        }}
      />
      {isEditing ? (
        <>
          <form
            onSubmit={handleSubmit}
            className='flex flex-1 mx-4 items-center'
          >
            <InputField
              inline
              labelText='Editar'
              autoFocus
              defaultValue={todo.text}
              maxLength={200}
              wrapperClassName='mr-4'
              onBlur={() =>
                setTimeout(
                  () =>
                    mouseDownRef.current
                      ? (mouseDownRef.current = false)
                      : setIsEditing(false),
                  200
                )
              }
              name='text'
            />
            <Button
              type='submit'
              size='sm'
              className='!p-2'
              title='adicionar'
              onClick={() => (mouseDownRef.current = true)}
            >
              <PencilIcon className='w-4 h-4' />
            </Button>
          </form>
          <Button
            theme='danger'
            size='sm'
            className='!p-2'
            title='Apagar'
            onClick={handleDelete}
          >
            <TrashIcon className=' w-4 h-4 text-red-600' />
          </Button>
        </>
      ) : (
        <p
          title={todo.text}
          className={`text-xl text-brand-gray-1 leading-[1] cursor-pointer flex-1 mx-4 ${
            todo.done ? "line-through" : ""
          }`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </p>
      )}
    </span>
  );
};

export default TodoItem;
