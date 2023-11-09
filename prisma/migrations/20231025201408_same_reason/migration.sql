/*
  Warnings:

  - You are about to drop the column `deliverydoneby` on the `orderdelivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderdelivery` DROP COLUMN `deliverydoneby`,
    ADD COLUMN `deliveryboyemail` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `deliveryboyname` VARCHAR(191) NOT NULL DEFAULT '';
