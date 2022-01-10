import { ChangeEvent, useRef } from "react";

type FormFields<K extends string | number | symbol> = Record<K, string>;

const useForm = <K extends Object>(initialValue: FormFields<keyof K>) => {
  const formValues = useRef(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    key: keyof FormFields<keyof K>
  ) => {
    formValues.current[key] = e.currentTarget.value;
  };

  return {
    handleChange,
    formValues: formValues.current,
  };
};

export default useForm;
