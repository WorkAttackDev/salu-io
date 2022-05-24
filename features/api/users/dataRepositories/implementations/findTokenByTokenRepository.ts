import prisma from "@/client/core/config/prisma";

export default async function findTokenByTokenRepository(token: string) {
  const data = await prisma.token.findUnique({
    where: { token },
    include: { owner: true },
  });

  return data;
}
