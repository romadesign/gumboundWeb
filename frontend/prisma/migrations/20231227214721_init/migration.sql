/*
  Warnings:

  - Added the required column `facebook_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `facebook_id` INTEGER NOT NULL;
