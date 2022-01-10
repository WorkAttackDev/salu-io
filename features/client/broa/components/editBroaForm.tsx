import { Broa } from "@prisma/client";
import React, { FormEvent, useState } from "react";
import { ValidationError } from "../../../shared/lib/validation";
import {
  editBroaValidate,
  EditBroaValidationParams,
} from "../../../shared/lib/validation/edit_broa_validator";
import Button from "../../core/components/Button";
import InputField from "../../core/components/InputField";
import TextAreaField from "../../core/components/TextAreaField";
import useForm from "../../core/hooks/use_form";

type Props = {
  onSubmit: (data: Omit<EditBroaValidationParams, "userId">) => void;
  onCancel?: () => void;
  className?: string;
  broa?: Broa;
};

const EditBroaForm = ({ onSubmit, onCancel, className = "", broa }: Props) => {
  const [errors, setErrors] = useState<string[]>([]);

  const { formValues: editBroaRef, handleChange } = useForm<
    Omit<EditBroaValidationParams, "userId">
  >({
    author: broa?.author || "",
    rightVersion: broa?.rightVersion || "",
    wrongVersion: broa?.wrongVersion || "",
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = editBroaValidate({ ...editBroaRef, userId: -1 });
      onSubmit(validatedData);
    } catch (err) {
      if ((err as ValidationError).errors) {
        const error = err as ValidationError;
        setErrors(error.errors.map((v) => v.message));
        return;
      }
      console.log(err);
    }
  };

  return (
    <form className={`grid gap-2 ${className}`} onSubmit={handleOnSubmit}>
      <TextAreaField
        labelText='versão da broa ✖'
        maxLength={250}
        defaultValue={editBroaRef.wrongVersion}
        onChange={(e) => handleChange(e, "wrongVersion")}
      />
      <TextAreaField
        labelText='versão correta ✔'
        defaultValue={editBroaRef.rightVersion}
        maxLength={250}
        onChange={(e) => handleChange(e, "rightVersion")}
      />
      <InputField
        defaultValue={editBroaRef.author}
        labelText='nome do autor'
        maxLength={50}
        onChange={(e) => handleChange(e, "author")}
      />

      {!!errors.length && (
        <ul className='my-2'>
          {errors.map((err) => (
            <li
              className='text-red-400 text-lg list-disc list-inside'
              key={err}
            >
              {err}
            </li>
          ))}
        </ul>
      )}

      <div className='flex items-center mt-4'>
        <Button size='md'>{broa ? "editar" : "criar"}</Button>
        {!!onCancel && (
          <>
            <span className='block w-4'></span>
            <Button
              type='button'
              size='md'
              theme='secondary'
              onClick={() => onCancel()}
            >
              voltar
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default EditBroaForm;
