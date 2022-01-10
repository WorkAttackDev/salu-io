/*
  Warnings:

  - A unique constraint covering the columns `[userId,reactionType]` on the table `broa_reactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `broa_reactions_userId_reactionType_key` ON `broa_reactions`(`userId`, `reactionType`);
