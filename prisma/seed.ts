// @ts-ignore
const { PrismaClient } = require(".prisma/client");
const bcrypt = require("bcrypt");

const hash = async (value: string) => {
  return await bcrypt.hash(value, 10);
};

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;

  const hashedPassword = await hash("qwerty1234");

  await prisma.user.createMany({
    data: [
      {
        email: "denilson@workattackangola.com",
        name: "Denilson",
        userName: "denilson",
        role: "ADMIN",
        emailVerified: true,
        password: hashedPassword,
      },
      {
        email: "alcrecio@workattackangola.com",
        name: "Alcrecio Numa Luma",
        userName: "numa",
        role: "ADMIN",
        emailVerified: true,
        password: hashedPassword,
      },
      {
        email: "pivanio@workattackangola.com",
        name: "Pedro",
        userName: "pivanio",
        role: "ADMIN",
        emailVerified: true,
        password: hashedPassword,
      },
      {
        email: "abner@workattackangola.com",
        name: "Abner Popi",
        userName: "abner",
        role: "ADMIN",
        emailVerified: true,
        password: hashedPassword,
      },
    ],
  });
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
