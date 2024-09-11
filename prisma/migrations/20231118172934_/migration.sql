/*
  Warnings:

  - You are about to drop the column `firstname` on the `usertable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usertable` DROP COLUMN `firstname`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';
