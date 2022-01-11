import { LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { linksObj } from "../../core/data/links";
import useApi from "../../core/hooks/use_api";
import { useAuthStore } from "../../core/stores/authStore";
import { useErrorStore } from "../../core/stores/errorStore";
import { logoutClient } from "../client";

type Props = {
  className?: string;
};

const UserCard = ({ className = "" }: Props) => {
  const { user, setUser, setToken } = useAuthStore();
  const { replace } = useRouter();

  const { setErrors, setIsOpen } = useErrorStore();

  const { request } = useApi<typeof logoutClient>();

  const handleLogout = async () => {
    try {
      const resData = await request(logoutClient());
      if (!resData) return;
      setUser(null);
      replace("/");
    } catch (error) {
      const err = error as AxiosError;
      setErrors(err.response?.data.error || [err.message]);
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`grid grid-flow-col rounded-lg bg-brand-gray-2/50 overflow-hidden ${className}`}
    >
      <span className='grid gap-4 grid-flow-col items-center p-4'>
        <span className='w-16 h-16 bg-brand-gray rounded-lg'>
          {user?.picture && (
            <Image
              width={50}
              height={50}
              objectFit='cover'
              layout='responsive'
              src={user?.picture}
            />
          )}
        </span>
        <p className='text-xl'>{user?.name || "Iniciar Sessão"}</p>
      </span>
      {user ? (
        <button
          title='terminar sessão'
          onClick={handleLogout}
          className='flex items-center justify-center bg-brand-gray-1/50 p-4'
        >
          <LogoutIcon className='w-6 h-6' />
        </button>
      ) : (
        <Link href={linksObj.login.url}>
          <a
            className='flex items-center justify-center bg-brand-gray-1/50 p-4'
            title='iniciar sessão'
          >
            <LoginIcon className='w-6 h-6' />
          </a>
        </Link>
      )}
    </div>
  );
};

export default UserCard;
