import { Project } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Loading from "../../features/client/core/components/Loading";
import MainLayout from "../../features/client/core/components/MainLayout";
import SectionHeader from "../../features/client/core/components/SectionHeader";
import useApi from "../../features/client/core/hooks/use_api";
import { useAuthStore } from "../../features/client/core/stores/authStore";
import { useErrorStore } from "../../features/client/core/stores/errorStore";
import { handleClientError } from "../../features/client/core/utils/client_errors";
import { getProjectByIdClient } from "../../features/client/project/clientApi/getProjectByIdClient";
import { updateProjectClient } from "../../features/client/project/clientApi/updateProjectClient";
import EditProjectForm from "../../features/client/project/components/EditProjectForm";
import { useProjectStore } from "../../features/client/project/stores/useProductsStore";
import {
  editProjectValidate,
  EditProjectValidationParams,
} from "../../features/shared/lib/validation/editProjectValidator";

const EditProjectByIdPage: NextPage = () => {
  const { setErrors, setIsOpen } = useErrorStore();
  const user = useAuthStore((state) => state.user);

  const [project, setProject] = useState<Project | undefined>();

  const { query, push } = useRouter();

  const { request, loading } = useApi<typeof updateProjectClient>();
  const getProjectByIdQuery = useApi<typeof getProjectByIdClient>();

  useEffect(() => {
    const { id } = query;
    if (!id || typeof id !== "string") return;

    (async () => {
      const resProject = await getProjectByIdQuery.request(
        getProjectByIdClient(id)
      );

      if (!resProject) return;

      setProject(resProject);
    })();
  }, [query]);

  const onSubmitHandler: SubmitHandler<EditProjectValidationParams> = async (
    data
  ) => {
    if (!user || !project) return;

    const adjustedData: EditProjectValidationParams = {
      ...data,
      ownerId: user?.id,
    };

    try {
      const ValidatedData = editProjectValidate(adjustedData);
      const updatedProject = await request(
        updateProjectClient(project.id, ValidatedData)
      );

      if (!updatedProject) return;

      push(`/projects/${updatedProject.id}`);
    } catch (error) {
      setErrors(handleClientError(error));
      setIsOpen(true);
    }
  };

  return (
    <MainLayout className='w-full max-w-6xl mx-auto'>
      <SectionHeader title='Editar Projeto' className='mb-12' />
      {project && (
        <EditProjectForm
          onSubmit={onSubmitHandler}
          project={project}
          mode='edit'
        />
      )}
      <Loading isLoading={getProjectByIdQuery.loading || loading} />
    </MainLayout>
  );
};

export default EditProjectByIdPage;
