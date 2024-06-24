/*
  Warnings:

  - You are about to drop the column `createdAt` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `score` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `score` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `difficulty` ENUM('facile', 'moyens', 'difficile') NOT NULL;
