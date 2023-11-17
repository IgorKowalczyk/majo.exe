/*
  Warnings:

  - You are about to drop the column `message` on the `guild_logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `guild_logs` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `guild_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `guild_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guild_logs" DROP CONSTRAINT "guild_logs_guildId_fkey";

-- AlterTable
ALTER TABLE "guild_logs" DROP COLUMN "message",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "guild_logs" ADD CONSTRAINT "guild_logs_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;
