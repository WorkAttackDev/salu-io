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
import { editTaskClient } from "../clientApi/createTaskClient";
import EditTaskForm from "./EditTaskForm";

const AddTaskFloatButton = () => {
  const user = useAuthStore((state) => state.user);
  const { setErrors, setIsOpen } = useErrorStore();

  const [open, setOpen] = useState(false);

  const { request, loading, error } = useApi<typeof editTaskClient>();

  const { project, setProject } = useProjectStore(
    (state) => ({
      project: state.selectedProject,
      setProject: state.setSelectedProject,
    }),
    shallow
  );

  useEffect(() => {
    if (!error) return;
    setErrors(error);
    setIsOpen(true);
  }, [error]);

  const handleSubmit = async (
    data: EditTaskValidationParams,
    close: () => void
  ) => {
    if (!user || !project) return;

    const adjustedData: EditTaskValidationParams = {
      ...data,
      projectId: project.id,
    };

    const ValidatedData = editTaskValidate(adjustedData);
    const newTask = await request(editTaskClient(ValidatedData));
    if (!newTask) return;

    project?.tasks?.push(newTask);
    setProject(project);

    close();
  };

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

          <EditTaskForm
            onSubmit={(d) => handleSubmit(d, () => setOpen(false))}
            isLoading={loading}
          />
        </div>
      </Transition>
    </div>
  );
};

export default AddTaskFloatButton;
