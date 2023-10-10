/*
  Warnings:

  - You are about to drop the column `status` on the `orderstable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderstable` DROP COLUMN `status`,
    ADD COLUMN `deliverystatus` BOOLEAN NOT NULL DEFAULT false;
