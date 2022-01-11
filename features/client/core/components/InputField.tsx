import React, { forwardRef, useState } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
  wrapperClassName?: string;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      labelText,
      className = "",
      wrapperClassName = "",
      maxLength,
      onInput,
      ...props
    },
    ref
  ) => {
    const [leftChars, setLeftChars] = useState(0);

    const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
      maxLength && setLeftChars(e.currentTarget.value.length);
      onInput?.(e);
    };

    return (
      <label
        className={`relative flex flex-col border-2 p-4 rounded-lg duration-300 border-brand-gray/20 focus-within:border-brand-gray-1 ${wrapperClassName}`}
      >
        <input
          ref={ref}
          onInput={handleOnInput}
          maxLength={maxLength}
          className={`peer bg-transparent outline-none text-xl ${className}`}
          {...props}
        />
        <p className='text-xl text-brand-gray-1 mb-2 -order-1 duration-300 peer-focus:text-brand-gray-2'>
          {labelText}
        </p>

        {maxLength && (
          <p className='ml-auto mt-2 text-base text-brand-gray-1'>{`restam ${
            maxLength - leftChars
          } caracteres`}</p>
        )}
      </label>
    );
  }
);

export default InputField;
