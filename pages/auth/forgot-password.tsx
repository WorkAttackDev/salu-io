import { NextPage } from "next";
import React, { FormEvent } from "react";
import { useForm } from "react-hook-form";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import Popup from "../../features/client/core/components/Popup";
import useApi from "../../features/client/core/hooks/use_api";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import { forgetPasswordClient } from "../../features/client/user/client";
import { AuthForm } from "../../features/client/user/components/AuthForm";
import {
  ForgetPasswordParams,
  forgetPasswordValidate,
} from "../../features/shared/lib/validation";

const ForgetPasswordPage: NextPage = () => {
  const forgetPasswordMutation = useApi<typeof forgetPasswordClient>();

  const handleOnSubmit = async (data: any) => {
    try {
      const formData = forgetPasswordValidate(data);
      const resData = await forgetPasswordMutation.request(
        forgetPasswordClient(formData)
      );

      if (!resData) return;
    } catch (error) {
      console.log(handleClientError(error));
    }
  };

  return (
    <MainLayout className='flex justify-center align-center'>
      <Loading className='h-full' isLoading={forgetPasswordMutation.loading} />
      <AuthForm
        submitText='redefinir password'
        type='forgot-password'
        onSubmit={handleOnSubmit}
      />
      <Popup
        isOpen={!!forgetPasswordMutation.error}
        texts={forgetPasswordMutation.error ?? []}
        onClose={forgetPasswordMutation.reset}
      />
    </MainLayout>
  );
};

export default ForgetPasswordPage;
