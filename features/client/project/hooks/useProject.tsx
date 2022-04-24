import React from "react";
import useApi from "../../core/hooks/use_api";
import { getProjectByIdClient } from "../clientApi/getProjectByIdClient";
import { useProjectStore } from "../stores/useProductsStore";

// import { Container } from './styles';

const useProject = () => {
  const { request, loading } = useApi();
  const { setSelectedProject } = useProjectStore();

  const localGetProjectById = async (id: string) => {
    if (!id) return;

    const resData = await request<typeof getProjectByIdClient>(
      getProjectByIdClient(id)
    );

    if (!resData) return;

    setSelectedProject(resData);
  };
  return {
    localGetProjectById,
    loading,
  };
};

export default useProject;
