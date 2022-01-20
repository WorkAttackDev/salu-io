import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import { linksObj } from "../../features/client/core/data/links";
import useApi from "../../features/client/core/hooks/use_api";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import { resetPasswordClient } from "../../features/client/user/client";
import { AuthForm } from "../../features/client/user/components/AuthForm";
import {
  ResetPasswordParams,
  resetPasswordValidate,
} from "../../features/shared/lib/validation";

type ResetPasswordType = Omit<ResetPasswordParams, "token">;

const ResetPasswordPage: NextPage = () => {
  const { query, replace } = useRouter();

  const resetPasswordMutation = useApi<typeof resetPasswordClient>();
  const token = useRef("");

  const { setErrors, setIsOpen } = useErrorStore();

  useEffect(() => {
    const qToken = query.token as string | undefined;

    if (!qToken) {
      return;
    }

    token.current = qToken;
  }, [query, replace]);

  useEffect(() => {
    if (resetPasswordMutation.error) {
      setErrors(resetPasswordMutation.error);
      setIsOpen(true);
    }
  }, [resetPasswordMutation.error]);

  const handleOnSubmit = async (data: ResetPasswordType) => {
    if (!token) {
      setErrors(["Código de verificação não encontrado"]);
      setIsOpen(true);
      return;
    }

    if (data.password !== data.verifyPassword) {
      setErrors(["As passwords são diferentes"]);
      setIsOpen(true);
      return;
    }

    try {
      const formData = resetPasswordValidate({
        ...data,
        token: token.current,
      });

      await resetPasswordMutation.request(resetPasswordClient(formData));

      if (!data) return;

      replace(linksObj.login.url);
    } catch (error) {
      setErrors(handleClientError(error));
      setIsOpen(true);
    }
  };

  return (
    <MainLayout className='flex justify-center align-center w-full'>
      <Loading className='h-full' isLoading={resetPasswordMutation.loading} />
      {token.current ? (
        <AuthForm
          submitText='salvar password'
          type='reset-password'
          onSubmit={(data) => handleOnSubmit(data as ResetPasswordType)}
        />
      ) : (
        <div>
          <SectionHeader
            title='Código de verificação inválido'
            className='mb-8'
          />
          <p className='text-xl text-brand-gray-1'>
            Não foi possível encontrar o código de verificação.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default ResetPasswordPage;
