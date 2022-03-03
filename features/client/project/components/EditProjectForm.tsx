import { Project, ProjectStatus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EditProjectValidationParams } from "../../../shared/lib/validation/editProjectValidator";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import SelectField from "../../core/components/SelectField";
import TextAreaField from "../../core/components/TextAreaField";
import { convertToValidDateTime } from "../../core/utils";

const statusOptions = [
  { label: "Em carteira", value: ProjectStatus.TODO },
  { label: "Em andamento", value: ProjectStatus.IN_PROGRESS },
  { label: "Concluído", value: ProjectStatus.DONE },
];

type Props = {
  onSubmit: (data: EditProjectValidationParams) => void;
  isLoading?: boolean;
  project?: Project;
  mode?: "create" | "edit";
};

const EditProjectForm = ({
  onSubmit,
  isLoading,
  project,
  mode = "create",
}: Props) => {
  const { register, handleSubmit, watch } =
    useForm<EditProjectValidationParams>();

  const { back } = useRouter();

  const startDateValue = watch("startDate");

  return (
    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-flow-row gap-8 sm:grid-flow-col'>
        <InputField
          labelText='Nome'
          defaultValue={project?.name || ""}
          wrapperClassName='col-span-2'
          {...register("name")}
          autoComplete='on'
        />
        <SelectField
          defaultValue={project?.status}
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
        defaultValue={project?.description || ""}
        labelText='Descrição'
        {...register("description")}
      />
      <div className='grid grid-flow-row gap-8 sm:grid-flow-col'>
        <InputField
          min='2022-01-01T00:00:00'
          defaultValue={
            project?.startDate ? convertToValidDateTime(project.startDate) : ""
          }
          labelText='Data Início'
          type='datetime-local'
          wrapperClassName=''
          {...register("startDate")}
        />
        <InputField
          min={startDateValue || "2022-01-01T00:00"}
          defaultValue={
            project?.endDate ? convertToValidDateTime(project.endDate) : ""
          }
          labelText='Data Termino'
          type='datetime-local'
          wrapperClassName=''
          {...register("endDate")}
        />
      </div>
      <div className='flex items-center space-x-8'>
        <Button isLoading={isLoading}>{`${
          mode === "create" ? "Criar" : "Editar"
        } Projeto`}</Button>

        <Button theme='secondary' type='button' onClick={back}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default EditProjectForm;
