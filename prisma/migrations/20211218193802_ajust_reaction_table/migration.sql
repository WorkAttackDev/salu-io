/*
  Warnings:

  - You are about to drop the column `BroaId` on the `broa_reactions` table. All the data in the column will be lost.
  - Added the required column `broaId` to the `broa_reactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `broa_reactions` DROP COLUMN `BroaId`,
    ADD COLUMN `broaId` INTEGER NOT NULL;
