import prisma from "@/client/core/config/prisma";
import { DeleteTokenRepository } from "@workattackdev/wdk/lib/users/repositories";

const deleteExpiredTokenRepository: DeleteTokenRepository = async (token) => {
  await prisma.token.deleteMany({
    where: {
      token,
      OR: {
        expiresAt: {
          lte: new Date(),
        },
      },
    },
  });
};

export default deleteExpiredTokenRepository;
