import { EditUserValidationParams } from "../../../shared/lib/validation/edit_user_validator";
import { MyUser } from "../../../shared/models/my_user";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import useForm from "../../core/hooks/use_form";

type EditUserFormProps = {
  isLoading?: boolean;
  user: MyUser | null;
  onSubmit: (formData: Omit<EditUserValidationParams, "id">) => void;
};

const EditUserForm = ({ user, onSubmit, isLoading }: EditUserFormProps) => {
  const { formValues, handleChange } = useForm<
    Omit<EditUserValidationParams, "id">
  >({
    userName: user?.userName || "",
    name: user?.name || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className='grid gap-8' onSubmit={handleSubmit}>
      <InputField
        labelText='nome completo'
        defaultValue={formValues.name}
        onChange={(e) => handleChange(e, "name")}
        maxLength={200}
      />
      <InputField
        labelText='nome de usuário'
        defaultValue={formValues.userName}
        onChange={(e) => handleChange(e, "userName")}
        maxLength={200}
      />
      <Button className='mr-0' isLoading={isLoading}>
        editar usuário
      </Button>
    </form>
  );
};

export default EditUserForm;
