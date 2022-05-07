import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

// import { Container } from './styles';

type Props = {
  show: boolean;
  children: React.ReactNode;
};

const FadeTransition: React.FC<Props> = ({ show, children }) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      appear={true}
      enter='duration-500'
      enterFrom='opacity-0 scale-50'
      enterTo='opacity-100  scale-100'
      leave='duration-300  ease-in-out'
      leaveFrom='opacity-100 scale-100 '
      leaveTo='opacity-0 scale-95 '
    >
      {children}
    </Transition>
  );
};

export default FadeTransition;
