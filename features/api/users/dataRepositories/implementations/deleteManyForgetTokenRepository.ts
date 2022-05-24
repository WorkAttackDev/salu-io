import prisma from "@/client/core/config/prisma";
import { DeleteManyByIdRepository } from "@workattackdev/wdk/lib/core/data/repositories";

const deleteManyForgetTokenRepository: DeleteManyByIdRepository = async (
  userId
) => {
  await prisma.token.deleteMany({
    where: {
      type: "FORGET_TOKEN",
      AND: {
        userId,
      },
      OR: {
        expiresAt: {
          lte: new Date(),
        },
      },
    },
  });
};

export default deleteManyForgetTokenRepository;
