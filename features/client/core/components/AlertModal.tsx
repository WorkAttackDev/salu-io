import React from "react";
import Button from "./Button";
import Modal from "./Modal";

type Props = {
  description: string;
  onClose: () => void;
  onResolve: () => void;
};

const Alert = ({ onClose, onResolve, description }: Props) => {
  return (
    <div className='flex flex-col space-y-4'>
      <p className='text-lg text-brand-gray-1'>{description}</p>
      <span className='flex'>
        <Button className='mr-8' theme='secondary' size='sm' onClick={onClose}>
          Fechar
        </Button>
        <Button theme='danger' size='sm' onClick={onResolve}>
          Excluir
        </Button>
      </span>
    </div>
  );
};

export default Alert;
