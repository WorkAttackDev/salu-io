import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";

type DropdownOptionType = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  defaultOption?: DropdownOptionType;
  options: DropdownOptionType[];
  onSelectOption?: (value: DropdownOptionType) => void;
};

const Dropdown = ({ title, options, defaultOption, onSelectOption }: Props) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='group  flex items-center justify-center text-xl font-medium text-brand-gray-2 hover:text-brand-gray-3 md:text-2xl'>
        {title}
        <ChevronDownIcon
          className='flex-shrink-0 -mr-1 ml-2 h-8 w-8 text-brand-gray-2 group-hover:text-brand-gray-3'
          aria-hidden='true'
        />
        {defaultOption && (
          <span className='text-sm bg-brand-gray-1 text-white py-1 px-2 ml-4 rounded-full'>
            {defaultOption.label}
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          as='ul'
          className='origin-top-right absolute right-0 mt-4  text-xl text-brand-gray-2  bg-white rounded-lg shadow-md'
        >
          {options.map((option) => (
            <Menu.Item
              as='li'
              key={option.label}
              className={`p-4 whitespace-nowrap  cursor-pointer hover:bg-brand-gray ${
                defaultOption?.value === option.value
                  ? "font-bold text-brand-gray-3"
                  : ""
              }`}
              onClick={() => onSelectOption?.(option)}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
