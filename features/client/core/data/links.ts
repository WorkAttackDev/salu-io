export const linksObj = {
  dashboard: { url: "/", label: "Dashboard" },
  projects: { url: "/projects", label: "Projetos" },
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

export const navLinks = [
  linksObj.dashboard,
  linksObj.projects,
  linksObj.settings,
];
