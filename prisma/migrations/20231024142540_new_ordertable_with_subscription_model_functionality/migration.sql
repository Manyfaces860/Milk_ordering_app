/*
  Warnings:

  - You are about to drop the column `orderedat` on the `orderstable` table. All the data in the column will be lost.
  - You are about to drop the column `vendorid` on the `orderstable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderstable` DROP COLUMN `orderedat`,
    DROP COLUMN `vendorid`,
    ADD COLUMN `planendat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `planstartat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
