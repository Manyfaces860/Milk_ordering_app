/*
  Warnings:

  - You are about to drop the column `planendat` on the `orderstable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderstable` DROP COLUMN `planendat`,
    ADD COLUMN `actualplanendat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `extramilkfulfillment` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `extramilkordertotaldays` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `extramilkquantity` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `orignallyplanendat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `ExtraMilkRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` DOUBLE NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `deliverystatus` BOOLEAN NOT NULL DEFAULT false,
    `usertableId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExtraMilkRecord` ADD CONSTRAINT `ExtraMilkRecord_usertableId_fkey` FOREIGN KEY (`usertableId`) REFERENCES `Usertable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
