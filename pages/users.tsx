import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MainLayout from "../features/client/core/components/MainLayout";
import useUser from "../features/client/user/hooks/useUser";
import { MyUserInfo } from "../features/shared/models/myUser";
import { isProduction } from "../features/shared/utils";

const UsersPage = () => {
  const { users } = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    isProduction ? replace("/") : null;
  });

  const columns: {
    header: string;
    key: keyof MyUserInfo;
  }[] = [
    {
      header: "Nome",
      key: "name",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Função",
      key: "role",
    },
  ];

  return (
    <MainLayout>
      <div className='grid grid-flow-col justify-start gap-8 '>
        {columns.map((item) => (
          <span key={item.key}>
            <h6 className='mb-4'>{item.header}</h6>
            {users.map((user) => {
              return (
                <p key={user.id} className='text-xl'>
                  {user[item.key]}
                </p>
              );
            })}
          </span>
        ))}
      </div>
    </MainLayout>
  );
};

export default UsersPage;
