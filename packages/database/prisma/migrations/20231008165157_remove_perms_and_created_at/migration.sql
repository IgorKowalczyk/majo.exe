/*
  Warnings:

  - You are about to drop the column `created_at` on the `commands` table. All the data in the column will be lost.
  - You are about to drop the column `default_member_permissions` on the `commands` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commands" DROP COLUMN "created_at",
DROP COLUMN "default_member_permissions";
