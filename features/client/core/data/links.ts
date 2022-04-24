import { BriefcaseIcon, HomeIcon, UserIcon } from "@heroicons/react/outline";
import { isProduction } from "../../../shared/utils";

export const linksObj = {
  dashboard: { url: "/", label: "Dashboard", Icon: HomeIcon },
  projects: { url: "/projects", label: "Projetos", Icon: BriefcaseIcon },
  users: { url: "/users", label: "Usuários", Icon: UserIcon },
  project: {
    url: (id: number) => `/projects/${id}`,
    label: (projName: string) => projName,
  },
  settings: { url: "/settings", label: "Configurações" },
  editProject: { url: "/edit-project", label: "Editar Projeto" },
  // user
  forgotPassword: {
    url: "/auth/forgot-password",
    label: "Esqueceu a password?",
  },
  login: { url: "/auth", label: "Iniciar Sessão" },
  signup: { url: "/auth", label: "Criar Conta" },
  profile: { url: "/profile", label: "Profile" },
  resetPassword: { url: "/auth/reset-password", label: "Redefinir Password" },
  logout: { url: "/auth/logout", label: "Sair" },
};

export const navLinks = isProduction
  ? [linksObj.dashboard, linksObj.projects]
  : [linksObj.dashboard, linksObj.projects, linksObj.users];
