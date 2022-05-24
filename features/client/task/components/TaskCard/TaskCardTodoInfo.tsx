import { ClipboardCheckIcon } from "@heroicons/react/outline";
import React from "react";

const TaskCardTodoInfo = () => {
  return (
    <span className='flex space-x-2'>
      <ClipboardCheckIcon className='w-6 h-6' />
      <p className='text-lg text-brand-gray-1'> 10/9</p>
    </span>
  );
};

export default TaskCardTodoInfo;
