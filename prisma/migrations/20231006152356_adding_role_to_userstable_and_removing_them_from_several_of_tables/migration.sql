/*
  Warnings:

  - You are about to drop the column `role` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `verificationtoken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `usertable` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `verificationtoken` DROP COLUMN `role`;
