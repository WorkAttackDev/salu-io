import React, { forwardRef, useState } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
  inline?: boolean;
  wrapperClassName?: string;
};

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      labelText,
      className = "",
      wrapperClassName = "",
      inline = false,
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
        className={`relative flex    rounded-lg duration-300 border-brand-gray/20 focus-within:border-brand-gray-1 ${
          inline
            ? "flex-row items-center px-4 py-2 border flex-1"
            : "border-2 flex-col p-4"
        } ${wrapperClassName}`}
      >
        <input
          ref={ref}
          onInput={handleOnInput}
          maxLength={maxLength}
          className={`peer bg-transparent outline-none text-xl w-full ${className}`}
          {...props}
        />
        <p
          className={`text-xl text-brand-gray-1 -order-1 duration-300 peer-focus:text-brand-gray-2 ${
            inline ? "mr-4 font-bold" : "mb-2"
          } `}
        >
          {labelText}
        </p>

        {maxLength && !inline && (
          <p className='ml-auto mt-2 text-base text-brand-gray-1'>{`restam ${
            maxLength - leftChars
          } caracteres`}</p>
        )}
      </label>
    );
  }
);

export default InputField;
