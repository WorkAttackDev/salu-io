import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import useApi from "../../features/client/core/hooks/use_api";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import {
  loginClient,
  loginWithGoogleClient,
} from "../../features/client/user/client";
import { AuthForm } from "../../features/client/user/components/AuthForm";
import {
  loginValidation,
  LoginValidationParams,
  loginWithGoogleValidation,
  LoginWithGoogleValidationParams,
} from "../../features/shared/lib/validation";

const LoginPage: NextPage = () => {
  const loginMutation = useApi<typeof loginClient>();
  const loginWithGoogleMutation = useApi<typeof loginWithGoogleClient>();

  const { replace } = useRouter();

  const { setToken, setUser } = useAuthStore();

  const { setErrors, setIsOpen } = useErrorStore();

  useEffect(() => {
    if (loginMutation.error) {
      setErrors(loginMutation.error);
      setIsOpen(true);
      return;
    }
  }, [loginMutation.error]);

  const handleOnSubmit: SubmitHandler<LoginValidationParams> = async (data) => {
    try {
      const formData = loginValidation(data);
      const resData = await loginMutation.request(loginClient(formData));

      if (!resData) return;

      setUser(resData.user);
      setToken(resData.token);
      replace("/");
    } catch (error) {
      setErrors(handleClientError(error));
      setIsOpen(true);
    }
  };

  // const handleLoginWithGoogle = async (
  //   data: LoginWithGoogleValidationParams
  // ) => {
  //   try {
  //     const googleData = loginWithGoogleValidation(data);
  //     const resData = await loginWithGoogleMutation.request(
  //       loginWithGoogleClient(googleData)
  //     );

  //     if (!resData) return;
  //     setUser(resData.user);
  //     setToken(resData.token);
  //     replace("/");
  //   } catch (error) {
  //     setErrors(handleClientError(error));
  //     setIsOpen(true);
  //   }
  // };

  return (
    <MainLayout className='flex w-full justify-center align-center '>
      <Loading
        className='h-full'
        isLoading={loginMutation.loading || loginWithGoogleMutation.loading}
      />
      <AuthForm
        submitText='iniciar sessão'
        type='login'
        onSubmit={handleOnSubmit}
      />
    </MainLayout>
  );
};

export default LoginPage;
