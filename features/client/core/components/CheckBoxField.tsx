import { CheckIcon } from "@heroicons/react/outline";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { labelText: string; wrapperClassName?: string };

const CheckBoxField = ({
  wrapperClassName,
  labelText,
  id,
  ...props
}: Props) => {
  return (
    <div className={`relative flex items-start ${wrapperClassName}`}>
      <input
        {...props}
        className='appearance-none h-5 w-5 border border-brand-gray-1 rounded-sm bg-white checked:bg-brand checked:border-brand focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
        type='checkbox'
        id={id}
      />
      <CheckIcon className='absolute pointer-events-none w-5 h-5 left-[.05rem] top-[.2rem]' />
      <label className='text-xl text-brand-gray-1' htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
};

export default CheckBoxField;
