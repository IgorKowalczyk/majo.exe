/*
  Warnings:

  - You are about to drop the column `profanity_level` on the `guilds` table. All the data in the column will be lost.
  - Made the column `embed_last_changed` on table `guilds` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "guilds" DROP COLUMN "profanity_level",
ADD COLUMN     "enable_xp" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "enable_xp_last_changed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sent_level_messages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sent_level_messages_last_changed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "embed_last_changed" SET NOT NULL;
