-- CreateTable
CREATE TABLE `Inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(191) NOT NULL DEFAULT 'milk',
    `instock` INTEGER NOT NULL,
    `vendorid` INTEGER NOT NULL,

    UNIQUE INDEX `Inventory_vendorid_key`(`vendorid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
