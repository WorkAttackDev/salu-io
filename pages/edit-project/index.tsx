import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import useApi from "../../features/client/core/hooks/use_api";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import { createProjectClient } from "../../features/client/project/clientApi/createProjectClient";
import EditProjectForm from "../../features/client/project/components/EditProjectForm";
import {
  editProjectValidate,
  EditProjectValidationParams,
} from "../../features/shared/lib/validation/editProjectValidator";

const EditProjectPage: NextPage = () => {
  const { setErrors, setIsOpen } = useErrorStore();
  const user = useAuthStore((state) => state.user);

  const { push } = useRouter();

  const { request, loading } = useApi<typeof createProjectClient>();

  const onSubmitHandler: SubmitHandler<EditProjectValidationParams> = async (
    data
  ) => {
    if (!user) return;

    const adjustedData: EditProjectValidationParams = {
      ...data,
      ownerId: user?.id,
    };

    try {
      const ValidatedData = editProjectValidate(adjustedData);
      console.log(ValidatedData);
      const newProject = await request(createProjectClient(ValidatedData));
      if (!newProject) return;

      push(`/projects/${newProject.id}`);
    } catch (error) {
      setErrors(handleClientError(error));
      setIsOpen(true);
    }
  };

  return (
    <MainLayout className='w-full max-w-6xl mx-auto overflow-y-auto'>
      <SectionHeader title='Criar Projeto' className='mb-12' />
      <EditProjectForm onSubmit={onSubmitHandler} isLoading={loading} />
    </MainLayout>
  );
};

export default EditProjectPage;
