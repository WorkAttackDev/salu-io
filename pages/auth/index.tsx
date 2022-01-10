import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect } from "react";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import Popup from "../../features/client/core/components/Popup";
import useApi from "../../features/client/core/hooks/use_api";
import useForm from "../../features/client/core/hooks/use_form";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { handleClientValidationError } from "../../features/client/core/utils/client_errors";
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

  const [showPopup, setShowPopup] = React.useState(false);

  const { formValues, handleChange } = useForm<LoginValidationParams>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginMutation.error || loginWithGoogleMutation.error) {
      setShowPopup(true);
    }
  }, [loginMutation.error, loginWithGoogleMutation.error]);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = loginValidation(formValues);
      const data = await loginMutation.request(loginClient(formData));

      if (!data) return;
      setUser(data.user);
      setToken(data.token);
      replace("/");
    } catch (error) {
      console.log(handleClientValidationError(error));
    }
  };

  const handleLoginWithGoogle = async (
    data: LoginWithGoogleValidationParams
  ) => {
    try {
      const googleData = loginWithGoogleValidation(data);
      const resData = await loginWithGoogleMutation.request(
        loginWithGoogleClient(googleData)
      );

      if (!resData) return;
      setUser(resData.user);
      setToken(resData.token);
      replace("/");
    } catch (error) {
      console.log(handleClientValidationError(error));
    }
  };

  return (
    <MainLayout className='flex justify-center align-center '>
      <Loading
        className='h-full'
        isLoading={loginMutation.loading || loginWithGoogleMutation.loading}
      />
      <AuthForm
        handleChange={handleChange}
        submitText='iniciar sessão'
        type='login'
        onSubmit={handleOnSubmit}
        onLoginWithGoogle={handleLoginWithGoogle}
      />

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        texts={[
          ...(loginMutation.error || []),
          ...(loginWithGoogleMutation.error || []),
        ]}
      />
    </MainLayout>
  );
};

export default LoginPage;
