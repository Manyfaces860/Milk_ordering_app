/*
  Warnings:

  - You are about to drop the column `name` on the `usertable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usertable` DROP COLUMN `name`,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT '';
