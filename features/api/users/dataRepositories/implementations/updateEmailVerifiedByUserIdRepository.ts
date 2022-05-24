import prisma from "@/client/core/config/prisma";

export default async function updateEmailVerifiedByUserIdRepository(
  userId: string
) {
  return await prisma.user.update({
    where: { id: userId },
    data: { emailVerified: true },
  });
}
