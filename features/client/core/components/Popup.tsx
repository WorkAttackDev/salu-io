import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

type Props = {
  texts: string[];
  isOpen: boolean;
  onClose: () => void;
};

const Popup = ({ isOpen, onClose, texts }: Props) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='flex flex-col-reverse items-center fixed inset-0 z-30 overflow-y-auto'
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed  inset-0 bg-black/50 ' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-full'
          enterTo='opacity-100 translate-y-0 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-full'
        >
          <div className='relative items-start flex p-6 rounded-t-base z-10 bg-white shadow-xl before:absolute before:bg-red-600 before:left-0 before:bottom-0 before:w-full before:h-4'>
            <ul>
              {texts.map((text, index) => (
                <li
                  key={index}
                  className='flex justify-between items-start w-full max-w-xl p-4  overflow-hidden text-left align-middle transition-all transform text-red-600 border-b-2 last:border-0'
                >
                  <Dialog.Title
                    as='h4'
                    className='text-2xl font-medium leading-6 '
                  >
                    {text}
                  </Dialog.Title>
                </li>
              ))}
            </ul>
            <button className='ml-4' onClick={onClose}>
              <XCircleIcon className='w-9 h-9 duration-200 text-brand-gray-2 hover:text-red-600 focus:text-red-600' />
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Popup;
