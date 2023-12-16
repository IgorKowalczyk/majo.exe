/*
  Warnings:

  - You are about to drop the column `embed_last_changed` on the `guilds` table. All the data in the column will be lost.
  - You are about to drop the column `enable_warning_automation` on the `guilds` table. All the data in the column will be lost.
  - You are about to drop the column `enable_warning_automation_last_changed` on the `guilds` table. All the data in the column will be lost.
  - You are about to drop the column `public_page_last_changed` on the `guilds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guilds" DROP COLUMN "embed_last_changed",
DROP COLUMN "enable_warning_automation",
DROP COLUMN "enable_warning_automation_last_changed",
DROP COLUMN "public_page_last_changed",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
