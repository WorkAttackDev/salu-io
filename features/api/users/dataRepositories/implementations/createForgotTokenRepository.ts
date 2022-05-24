import prisma from "@/client/core/config/prisma";
import { CreateTokenRepository } from "@workattackdev/wdk/lib/users/repositories";

const createForgotTokenRepository: CreateTokenRepository<
  "FORGET_TOKEN"
> = async (data) => {
  return await prisma.token.create({
    data,
  });
};

export default createForgotTokenRepository;
