/*
  Warnings:

  - Added the required column `assigningtime` to the `OrderDelivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderdelivery` ADD COLUMN `assigningtime` DATETIME(3) NOT NULL;
