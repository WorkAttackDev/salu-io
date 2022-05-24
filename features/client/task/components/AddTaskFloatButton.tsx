import { Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import shallow from "zustand/shallow";
import {
  editTaskValidate,
  EditTaskValidationParams,
} from "../../../shared/lib/validation/editTaskValidator";
import SectionHeader from "../../core/components/SectionHeader";
import useApi from "../../core/hooks/use_api";
import { useAuthStore } from "../../core/stores/authStore";
import { useErrorStore } from "../../core/stores/errorStore";
import { useProjectStore } from "../../project/stores/useProductsStore";
import useEditTask from "../hooks/useEditTask";
import EditTaskForm from "./EditTaskForm";

const AddTaskFloatButton = () => {
  const { handleEditTask, isLoading } = useEditTask();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((prev) => !prev)}
        title='Adicionar tarefa'
        className={`group fixed bottom-12 right-12 flex p-6  rounded-xl duration-300 shadow-[0_0_2rem_transparent] bg-brand hover:shadow-brand/40  ${
          open ? "rotate-[135deg]" : ""
        }`}
      >
        <PlusIcon className='w-8 h-8 duration-300' />
      </button>

      <Transition
        show={open}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0 translate-y-12'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-12'
      >
        <div className='absolute top-8 right-12 bottom-40 overflow-y-auto bg-brand-dark border-2 rounded-lg border-brand-gray-2/30 p-8'>
          <SectionHeader title='Adicionar Tarefa' className='mb-12' />

          <EditTaskForm onSubmit={handleEditTask} isLoading={isLoading} />
        </div>
      </Transition>
    </div>
  );
};

export default AddTaskFloatButton;
