import { ProjectStatus, Task } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { EditTaskValidationParams } from "../../../shared/lib/validation/editTaskValidator";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import SelectField from "../../core/components/SelectField";
import TextAreaField from "../../core/components/TextAreaField";

const statusOptions = [
  { label: "Em carteira", value: ProjectStatus.TODO },
  { label: "Em andamento", value: ProjectStatus.IN_PROGRESS },
  { label: "Concluído", value: ProjectStatus.DONE },
];

type Props = {
  onSubmit: (data: EditTaskValidationParams) => void;
  onBack?: () => void;
  isLoading?: boolean;
  task?: Task;
  mode?: "create" | "edit";
};

const EditTaskForm = ({
  onSubmit,
  onBack,
  isLoading,
  task,
  mode = "create",
}: Props) => {
  const { register, handleSubmit, watch } = useForm<EditTaskValidationParams>();

  // const startDateValue = watch("startDate");

  return (
    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-flow-row gap-8 sm:grid-flow-col'>
        <InputField
          labelText='Nome'
          wrapperClassName='col-span-2'
          {...register("name")}
          autoComplete='on'
          defaultValue={task?.name}
        />
        <SelectField
          defaultValue={task?.status}
          labelText='Estado'
          {...register("status")}
        >
          {statusOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className='bg-brand-dark text-xl'
            >
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField
        defaultValue={task?.description || ""}
        labelText='Descrição'
        {...register("description")}
      />
      <div className='grid grid-flow-row gap-8 sm:grid-flow-col'>
        <InputField
          labelText='Data Início'
          type='datetime-local'
          {...register("startDate")}
          defaultValue={
            task?.startDate
              ? dayjs(task.startDate).toISOString().replaceAll(".000Z", "")
              : ""
          }
        />
        <InputField
          labelText='Data Termino'
          type='datetime-local'
          {...register("endDate")}
          defaultValue={
            task?.endDate
              ? dayjs(task.endDate).toISOString().replaceAll(".000Z", "")
              : ""
          }
        />
      </div>
      <div className='flex space-x-8'>
        {onBack && (
          <Button
            type='button'
            onClick={onBack}
            isLoading={isLoading}
            theme='secondary'
          >
            Voltar
          </Button>
        )}
        <Button isLoading={isLoading}>
          {mode === "create" ? "Criar" : "Editar"} Tarefa
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
