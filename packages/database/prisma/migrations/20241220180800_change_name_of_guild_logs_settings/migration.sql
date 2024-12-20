/*
  Warnings:

  - You are about to drop the column `channel` on the `guild_logs_settings` table. All the data in the column will be lost.
  - Added the required column `channel_id` to the `guild_logs_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guild_logs_settings" DROP COLUMN "channel",
ADD COLUMN     "channel_id" TEXT NOT NULL;
