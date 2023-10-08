/*
  Warnings:

  - Made the column `default_member_permissions` on table `commands` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "commands" ALTER COLUMN "default_member_permissions" SET NOT NULL;
