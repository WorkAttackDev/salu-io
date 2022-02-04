import { Project } from ".prisma/client";
import create from "zustand";
import { MyProject } from "../../../shared/models/myProjectTasks";

import { PaginationType, SortBy } from "../../../shared/types";

type ProjectFilterType = {
  name?: string;
  sortBy?: SortBy;
};

type ProjectStoreType = {
  projects: Project[];
  selectedProject?: MyProject;
  pagination: PaginationType;
  filter: ProjectFilterType;

  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project?: MyProject) => void;
  setFilters: (filter: ProjectFilterType) => void;
  addProject: (project: Project) => void;
};

export const PAGINATION_LIMIT = 20;

export const useProjectStore = create<ProjectStoreType>((set) => ({
  projects: [],
  selectedProject: undefined,
  pagination: { page: 0, limit: PAGINATION_LIMIT, total: 0 },
  filter: { sortBy: "recent" },
  setProjects: (projects) => set({ projects: projects }),

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  setFilters: (filter) => set({ filter: filter }),
  setSelectedProject: (project) => set({ selectedProject: project }),
}));

export const globalSetProjectPaginated = (
  projects: Project[],
  pagination: PaginationType
) =>
  useProjectStore.setState((state) => ({
    ...state,
    projects: projects,
    broasPagination: pagination,
  }));
