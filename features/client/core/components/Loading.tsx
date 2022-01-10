import { Transition } from "@headlessui/react";
import { DetailedHTMLProps, Fragment, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { isLoading?: boolean };

const Loading = ({ isLoading, className = "", ...props }: Props) => (
  <Transition
    show={isLoading}
    as={Fragment}
    enter='ease-out duration-300'
    enterFrom='opacity-0'
    enterTo='opacity-100'
    leave='ease-in duration-200'
    leaveFrom='opacity-100'
    leaveTo='opacity-0'
  >
    <div
      {...props}
      className={`absolute z-50 inset-0 flex flex-col justify-center items-center bg-white ${className}`}
    >
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary'></div>
      <p className='mt-8 text-xl text-brand-primary-dark'>Carregando...</p>
    </div>
  </Transition>
);

export default Loading;
