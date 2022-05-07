import React from "react";

// import { Container } from './styles';

type Props = {
  value: number;
  className?: string;
};

const ProgressBar = ({ value, className = "" }: Props) => {
  return (
    <div className={`flex items-center ${className}`}>
      <p className='text-base mr-4 font-medium text-brand-gray'>
        {isNaN(value) ? 0 : Math.ceil(value)}%
      </p>
      <div className='w-full bg-brand-gray-1 rounded-full'>
        <div
          className='bg-brand h-full  text-center p-1 leading-none rounded-full duration-300 ease-in-out'
          style={{ width: `${value || 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
