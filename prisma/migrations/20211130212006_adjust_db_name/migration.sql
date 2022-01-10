/*
  Warnings:

  - You are about to drop the `Broas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Broas`;

-- CreateTable
CREATE TABLE `broas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wrongVersion` VARCHAR(255) NOT NULL,
    `rightVersion` VARCHAR(255) NOT NULL,
    `author` VARCHAR(100) NOT NULL DEFAULT 'Desconhecido',
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
