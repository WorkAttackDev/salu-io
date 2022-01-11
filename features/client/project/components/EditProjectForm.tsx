import { ProjectStatus } from "@prisma/client";
import { useForm } from "react-hook-form";
import { EditProjectValidationParams } from "../../../shared/lib/validation/editProjectValidator";
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
  onSubmit: (data: EditProjectValidationParams) => void;
  isLoading?: boolean;
};

const EditProjectForm = ({ onSubmit, isLoading }: Props) => {
  const { register, handleSubmit } = useForm<EditProjectValidationParams>();

  return (
    <form
      className='flex flex-col space-y-12'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex space-x-8'>
        <InputField
          labelText='Nome'
          wrapperClassName='w-2/3'
          {...register("name")}
          autoComplete='on'
        />
        <SelectField labelText='Estado' {...register("status")}>
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
      <TextAreaField labelText='Descrição' {...register("description")} />
      <div className='flex space-x-8'>
        <InputField
          labelText='Data Início'
          type='datetime-local'
          wrapperClassName='w-1/2'
          {...register("startDate")}
        />
        <InputField
          labelText='Data Termino'
          type='datetime-local'
          wrapperClassName='w-1/2'
          {...register("endDate")}
        />
      </div>
      <div className='flex space-x-8'>
        <Button isLoading={isLoading}>Criar Projeto</Button>
        <Button theme='secondary' type='button'>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default EditProjectForm;
