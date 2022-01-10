/*
  Warnings:

  - A unique constraint covering the columns `[userId,broaId,reactionType]` on the table `broa_reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `broa_reactions_userId_reactionType_key` ON `broa_reactions`;

-- CreateIndex
CREATE UNIQUE INDEX `broa_reactions_userId_broaId_reactionType_key` ON `broa_reactions`(`userId`, `broaId`, `reactionType`);
