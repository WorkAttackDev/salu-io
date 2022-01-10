import React, { useState } from "react";

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  labelText: string;
};

const TextAreaField = ({
  labelText,
  className = "",
  maxLength,
  rows,
  onInput,
  ...props
}: Props) => {
  const [leftChars, setLeftChars] = useState(0);

  const handleOnInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    maxLength && setLeftChars(e.currentTarget.value.length);
    onInput?.(e);
  };

  return (
    <label className='grid'>
      <p className='text-xl text-brand-gray-2 mb-2'>{labelText}</p>
      <textarea
        onInput={handleOnInput}
        rows={rows || 3}
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

export default TextAreaField;
