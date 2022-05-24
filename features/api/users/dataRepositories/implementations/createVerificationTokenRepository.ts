import prisma from "@/client/core/config/prisma";
import { CreateTokenRepository } from "@workattackdev/wdk/lib/users/repositories";

const createVerificationTokenRepository: CreateTokenRepository<
  "VERIFICATION_TOKEN"
> = async ({ expiresAt, type, userId }) => {
  await prisma.token.deleteMany({ where: { userId, AND: { type } } });
  const newToken = await prisma.token.create({
    data: {
      type,
      userId,
      expiresAt,
    },
  });

  return newToken;
};

export default createVerificationTokenRepository;
