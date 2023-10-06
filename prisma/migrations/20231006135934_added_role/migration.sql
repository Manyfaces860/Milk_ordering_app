-- AlterTable
ALTER TABLE `account` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `session` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `verificationtoken` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
