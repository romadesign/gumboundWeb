/*
  Warnings:

  - Made the column `ip` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Account` MODIFY `ip` INTEGER NOT NULL DEFAULT 0;
