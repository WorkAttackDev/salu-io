import prisma from "@/client/core/config/prisma";
import { CreateTokenRepository } from "@workattackdev/wdk/lib/users/repositories";

const createRefreshTokenRepository: CreateTokenRepository<
  "REFRESH_TOKEN"
> = async (data) => {
  return await prisma.token.create({
    data,
  });
};

export default createRefreshTokenRepository;
