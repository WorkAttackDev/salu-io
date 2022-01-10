import { MyUser } from "../../../shared/models/my_user";

export const getMe = async (): Promise<MyUser> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
    method: "GET",
  });

  return await res.json();
};
