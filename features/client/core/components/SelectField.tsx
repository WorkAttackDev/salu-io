import React, { forwardRef, useState } from "react";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  labelText: string;
};

const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ labelText, className = "", children, ...props }, ref) => {
    return (
      <label
        htmlFor={labelText}
        className='relative flex flex-col border-2 p-4 rounded-lg duration-300 border-brand-gray/20 focus-within:border-brand-gray-1'
      >
        <select
          ref={ref}
          id={labelText}
          className={`peer bg-transparent outline-none text-xl  ${className}`}
          {...props}
        >
          {children}
        </select>
        <p className='text-xl text-brand-gray-1 mb-2 -order-1 duration-300 peer-focus:text-brand-gray-2'>
          {labelText}
        </p>
      </label>
    );
  }
);

export default SelectField;
