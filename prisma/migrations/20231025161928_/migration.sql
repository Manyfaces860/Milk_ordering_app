-- CreateTable
CREATE TABLE `OrderDelivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` INTEGER NOT NULL,
    `deliverydate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliverystatus` BOOLEAN NOT NULL DEFAULT false,
    `orderstableId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderDelivery` ADD CONSTRAINT `OrderDelivery_orderstableId_fkey` FOREIGN KEY (`orderstableId`) REFERENCES `Orderstable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
