import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  className?: string;
  titleClassName?: string;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({
  children,
  isOpen,
  onClose,
  title,
  titleClassName = "",
  className = "",
}) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={onClose}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-80' />
            </Transition.Child>

            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='relative z-10 inline-block w-full max-w-2xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-brand-dark border-2 rounded-lg border-brand-gray-2/30'>
                <Dialog.Title
                  as='h3'
                  className={`text-3xl font-medium leading-10 text-white ${titleClassName}`}
                >
                  {title}
                </Dialog.Title>
                <div className={`mt-8 ${className}`}>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
