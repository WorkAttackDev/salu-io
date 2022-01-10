import React, { useState } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
};

const InputField = ({
  labelText,
  className = "",
  maxLength,
  onInput,
  ...props
}: Props) => {
  const [leftChars, setLeftChars] = useState(0);

  const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
    maxLength && setLeftChars(e.currentTarget.value.length);
    onInput?.(e);
  };

  return (
    <label className='grid'>
      <p className='text-xl text-brand-gray-2 mb-2'>{labelText}</p>
      <input
        onInput={handleOnInput}
        maxLength={maxLength}
        className={`bg-brand-gray rounded-lg text-xl p-4 ${className}`}
        {...props}
      />
      {maxLength && (
        <p className='ml-auto mt-2 text-base text-brand-gray-1'>{`restam ${
          maxLength - leftChars
        } caracteres`}</p>
      )}
    </label>
  );
};

export default InputField;
