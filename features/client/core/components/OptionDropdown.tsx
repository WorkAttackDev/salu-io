import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

export type OptionDropdownItem = {
  label: string;
  value: string;
  onClick?: () => void;
};

type Props = {
  className?: string;
  items: OptionDropdownItem[];
};

const OptionDropdown = ({ className = "", items }: Props) => {
  return (
    <Menu as='div' className={`relative ${className}`}>
      <Menu.Button>
        <DotsVerticalIcon className='w-8 h-8' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='duration-300 ease-out'
        enterFrom='scale-95 opacity-0'
        enterTo='scale-100 opacity-100'
        leave='duration-100 ease-out'
        leaveFrom='scale-100 opacity-100'
        leaveTo='scale-95 opacity-0'
      >
        <Menu.Items
          as='div'
          className='absolute right-0 bg-brand-gray-1 rounded-lg text-xl text-brand-dark px-2 py-3'
        >
          {items.map((item) => (
            <Menu.Item
              as='button'
              key={item.value}
              onClick={item.onClick}
              className='flex items-center p-2 font-semibold text-lg rounded-lg cursor-pointer hover:bg-brand-gray'
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default OptionDropdown;
