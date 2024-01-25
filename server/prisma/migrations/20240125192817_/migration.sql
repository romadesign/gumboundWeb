/*
  Warnings:

  - Added the required column `description` to the `Server` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technology` to the `Server` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Server` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `language` ENUM('Javascript', 'Python', 'Php', 'TypeScript', 'Javas', 'Ruby') NOT NULL DEFAULT 'Javascript',
    ADD COLUMN `level` ENUM('JUNIOR', 'MID', 'SENIOR') NOT NULL DEFAULT 'JUNIOR',
    ADD COLUMN `technology` VARCHAR(191) NOT NULL;
