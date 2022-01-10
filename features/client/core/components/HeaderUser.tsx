import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { MyUser } from "../../../shared/models/my_user";
import { links } from "../data/links";
import Loading from "./Loading";

type Props = {
  user: MyUser | null;
  onLogout: () => void;
  isLoading?: boolean;
};

type MenuItemProps = {
  onClick?: () => void;
  text: string;
  Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
};

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ onClick, text, Icon = LogoutIcon }, ref) => (
    <Menu.Item
      as='li'
      className='whitespace-nowrap  cursor-pointer hover:bg-brand-gray rounded-2xl '
    >
      {({ active }) => (
        <a ref={ref} onClick={onClick} className='flex items-center px-8 py-4'>
          <Icon className='w-7 h-7 mr-4' />
          <p className={`leading-none`}>{text}</p>
        </a>
      )}
    </Menu.Item>
  )
);

const HeaderUser = ({ user, isLoading, onLogout }: Props) => {
  return (
    <>
      <Menu as='div' className='relative z-20'>
        <Menu.Button className='relative overflow-hidden z-10 rounded-full w-16 h-16 bg-brand-gray-1 text-white text-xl leading-none border-2 border-brand-gray-1'>
          {user?.picture ? (
            <Image
              width={50}
              height={50}
              layout='intrinsic'
              objectFit='cover'
              alt='user image'
              src={user.picture}
            />
          ) : (
            user?.userName.substring(0, 3) || "broa"
          )}
        </Menu.Button>
        <Transition
          appear={true}
          enter='transition duration-200 ease-out'
          enterFrom='-translate-y-16  opacity-0'
          enterTo='translate-y-0 opacity-100'
          leave='transition duration-200 ease-in-out'
          leaveFrom='translate-y-0 opacity-100'
          leaveTo='-translate-y-16 opacity-0'
        >
          <Menu.Items
            as='nav'
            className='absolute mt-8 list-none right-0 grid shadow-sm gap-4 p-4 rounded-2xl bg-white min-w-[10rem] text-xl '
          >
            {!!user && (
              <div className='grid gap-2 px-4 py-4'>
                <p className='text-2xl'>
                  {user?.userName || "nome de usuario"}
                </p>
                <p className='text-lg text-brand-gray-2'>
                  {user?.email || "e-mail"}
                </p>
              </div>
            )}
            {user ? (
              <>
                <Link href={links.profile} passHref>
                  <MenuItem text='ver perfil' Icon={UserIcon} />
                </Link>
                <MenuItem text='terminar sessão' onClick={onLogout} />
              </>
            ) : (
              <Link href='/auth' passHref>
                <MenuItem text='iniciar sessão' />
              </Link>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
      <Loading isLoading={isLoading} className='!fixed z-20' />
    </>
  );
};

export default HeaderUser;
