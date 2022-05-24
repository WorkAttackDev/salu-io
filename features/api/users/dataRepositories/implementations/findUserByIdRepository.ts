import prisma from "@/client/core/config/prisma";
import { User } from "@prisma/client";
import { FindByIdRepository } from "@workattackdev/wdk/lib/core/data/repositories";

const findUserByIdRepository: FindByIdRepository<User> = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export default findUserByIdRepository;
