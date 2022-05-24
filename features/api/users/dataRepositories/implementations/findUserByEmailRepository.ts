import prisma from "@/client/core/config/prisma";
import { FindUserByEmailRepository } from "@workattackdev/wdk/lib/users/repositories";

const findUserByEmailRepository: FindUserByEmailRepository = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export default findUserByEmailRepository;
