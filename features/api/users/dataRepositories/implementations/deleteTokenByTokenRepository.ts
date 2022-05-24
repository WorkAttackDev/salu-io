import prisma from "@/client/core/config/prisma";

const deleteTokenByTokenRepository = async (token: string) => {
  await prisma.token.delete({
    where: { token },
  });
};

export default deleteTokenByTokenRepository;
