import { useEffect, useState } from "react";
import { MyUserInfo } from "../../../shared/models/myUser";
import useApi from "../../core/hooks/use_api";
import { getUsersClient } from "../clientApi/getUsersClient";

// import { Container } from './styles';

const useUser = () => {
  const { request, loading } = useApi();
  const [users, setUsers] = useState<MyUserInfo[]>([]);

  const actions = {
    delete: {
      name: "Apagar",
    },
    edit: {
      name: "Editar",
    },
    block: {
      name: "Bloquear",
    },
  };

  const handleGetUsersInfo = async () => {
    const resUsers = await request<typeof getUsersClient>(getUsersClient());
    setUsers(resUsers || users);
    return resUsers;
  };

  useEffect(() => {
    handleGetUsersInfo();
  }, []);

  return {
    handleGetUsersInfo,
    loading,
    users,
    actions,
  };
};

export default useUser;
