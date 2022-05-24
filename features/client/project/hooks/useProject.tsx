import React from "react";
import useApi from "../../core/hooks/use_api";
import { useProjectStore } from "../stores/useProductsStore";

// import { Container } from './styles';

const useProject = () => {
  const { request, loading } = useApi();
  const { setSelectedProject } = useProjectStore();

  return {
    loading,
  };
};

export default useProject;
