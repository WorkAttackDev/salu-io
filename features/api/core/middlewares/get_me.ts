import { MyUser } from "../../../shared/models/myUser";

export const getMe = async (): Promise<MyUser> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
    method: "GET",
  });

  return await res.json();
};
