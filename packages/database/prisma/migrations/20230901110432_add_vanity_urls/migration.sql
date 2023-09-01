/*
  Warnings:

  - A unique constraint covering the columns `[vanity]` on the table `guilds` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "guilds" ADD COLUMN     "public_page" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "public_page_last_changed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vanity" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "guilds_vanity_key" ON "guilds"("vanity");
