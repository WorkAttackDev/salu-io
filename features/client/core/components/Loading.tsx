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
      className={`fixed !m-0 z-50 inset-0 w-full h-full flex flex-col justify-center items-center bg-brand-dark ${className}`}
    >
      <div className='animate-spin flex-shrink-0 p-4 rounded-full h-32 w-32 border-b-2 border-brand'></div>
      <p className='mt-8 text-xl text-brand'>Carregando...</p>
    </div>
  </Transition>
);

export default Loading;
