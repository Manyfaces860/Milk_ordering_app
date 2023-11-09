/*
  Warnings:

  - You are about to drop the column `instock` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `vendorid` on the `inventory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Inventory_vendorid_key` ON `inventory`;

-- AlterTable
ALTER TABLE `inventory` DROP COLUMN `instock`,
    DROP COLUMN `vendorid`,
    ADD COLUMN `fat` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `price` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;
