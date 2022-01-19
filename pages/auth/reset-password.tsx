import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import Popup from "../../features/client/core/components/Popup";
import useApi from "../../features/client/core/hooks/use_api";
import { resetPasswordClient } from "../../features/client/user/client";
import { AuthForm } from "../../features/client/user/components/AuthForm";
import { ResetPasswordParams } from "../../features/shared/lib/validation";

const ResetPasswordPage: NextPage = () => {
  const { query, replace } = useRouter();

  const [showPopup, setShowPopup] = useState(false);

  const resetPasswordMutation = useApi<typeof resetPasswordClient>();
  const token = useRef("");

  const { register, handleSubmit } = useForm<ResetPasswordParams>();

  useEffect(() => {
    const qToken = query.token as string | undefined;

    if (!qToken) {
      replace("/404");
      return;
    }

    token.current = qToken;
  }, [query, replace]);

  useEffect(() => {
    if (resetPasswordMutation.error) setShowPopup(true);
  }, [resetPasswordMutation.error]);

  const handleOnSubmit = async () => {
    if (!token) return;

    // if (formValues.password !== formValues.againPassword) {
    //   return resetPasswordMutation.setError(["passwords são diferentes"]);
    // }

    // try {
    //   // const formData = resetPasswordValidate({
    //   //   ...formValues,
    //   //   token: token.current,
    //   // });

    //   const data = await resetPasswordMutation.request(
    //     resetPasswordClient(formData)
    //   );

    //   if (!data) return;
    //   replace(links.login);
    // } catch (error) {
    //   resetPasswordMutation.setError(handleClientError(error));
    // }
  };

  return (
    <MainLayout className='flex justify-center align-center'>
      <Loading className='h-full' isLoading={resetPasswordMutation.loading} />
      <AuthForm
        submitText='salvar password'
        type='reset-password'
        onSubmit={handleOnSubmit}
      />
      <Popup
        isOpen={showPopup}
        texts={resetPasswordMutation.error || []}
        onClose={() => setShowPopup(false)}
      />
    </MainLayout>
  );
};

export default ResetPasswordPage;
