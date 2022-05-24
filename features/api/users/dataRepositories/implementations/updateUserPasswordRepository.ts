import prisma from "@/client/core/config/prisma";
import { User } from "@prisma/client";
import { UpdateUserPasswordRepository } from "@workattackdev/wdk/lib/users/repositories";

const updateUserPasswordRepository: UpdateUserPasswordRepository<User> = async (
  data
) => {
  const user = await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      password: data.hashedPassword,
    },
  });

  return user;
};

export default updateUserPasswordRepository;
