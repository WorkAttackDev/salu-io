import { ColorSwatchIcon } from "@heroicons/react/solid";
import React from "react";
import { useForm } from "react-hook-form";
import { AddOrCreateLabelValidationParams } from "../../../../shared/lib/validation/label/addOrCreateLabel";
import Button from "../../../core/components/Button";
import useTask from "../../../task/hooks/useTask";
import useLabel from "../../hooks/useLabel";

// import { Container } from './styles';

type FormDataType = Omit<
  AddOrCreateLabelValidationParams,
  "projectOrTaskId" | "id" | "type"
>;

type Props = {
  onClose: () => void;
};

const LabelForm = ({ onClose }: Props) => {
  const { currTask: task } = useTask();

  const {
    handleAddOrCreateLabel,
    handleEditLabel,
    loading,
    editLabel,
    setEditLabel,
  } = useLabel();

  const { handleSubmit, register, watch, reset } = useForm<FormDataType>();

  const color = watch("color");

  const myHandleSubmit = async (data: FormDataType) => {
    if (!task) return;
    !editLabel
      ? await handleAddOrCreateLabel({
          ...data,
          projectOrTaskId: task.id,
          type: "Task",
        })
      : await handleEditLabel({
          ...data,
          id: editLabel.id,
        });

    reset();
  };

  const handleOnClose = () => {
    setEditLabel();
    onClose();
  };

  return (
    <form className='space-y-8' onSubmit={handleSubmit(myHandleSubmit)}>
      <span className='flex items-center space-x-2'>
        <input
          {...register("name")}
          defaultValue={editLabel?.name}
          maxLength={25}
          placeholder='Nome do Label'
          className='flex-1 rounded-lg bg-transparent duration-150 text-xl border-2 border-brand-gray/20 outline-none focus:border-brand-gray-3 p-2'
        />
        <label className='relative' title='escolher cor'>
          <ColorSwatchIcon
            role='button'
            className='w-10 h-10 stroke-brand-gray-2 stroke-1'
            style={{ color: color }}
          />
          <input
            type='color'
            defaultValue={editLabel?.color || "#ff811c"}
            {...register("color")}
            className='absolute opacity-0 top-0 left-0 w-0 h-0  bg-transparent appearance-none'
          />
        </label>
      </span>
      <span className='flex space-x-4 flex-wrap'>
        <Button size='sm' type='submit' isLoading={loading}>
          {editLabel ? "Editar" : "Adicionar"}
        </Button>
        <Button
          size='sm'
          type='button'
          theme='danger'
          onClick={handleOnClose}
          disabled={loading}
        >
          Fechar
        </Button>
      </span>
    </form>
  );
};

export default LabelForm;
