/*
  Warnings:

  - You are about to drop the column `email` on the `suggestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "suggestions" DROP COLUMN "email",
ADD COLUMN     "guildId" TEXT;
