/*
  Warnings:

  - You are about to drop the column `authorId` on the `guild_logs` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `guild_logs` table. All the data in the column will be lost.
  - You are about to drop the column `guildId` on the `guild_xp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `guild_xp` table. All the data in the column will be lost.
  - You are about to drop the column `discord_id` on the `guilds` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guild_id]` on the table `guilds` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discord_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `guild_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `guild_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `guild_xp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `guild_xp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guild_id` to the `guilds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guild_logs" DROP CONSTRAINT "guild_logs_authorId_fkey";

-- DropForeignKey
ALTER TABLE "guild_logs" DROP CONSTRAINT "guild_logs_guildId_fkey";

-- DropForeignKey
ALTER TABLE "guild_xp" DROP CONSTRAINT "guild_xp_guildId_fkey";

-- DropForeignKey
ALTER TABLE "guild_xp" DROP CONSTRAINT "guild_xp_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropIndex
DROP INDEX "guilds_discord_id_key";

-- DropIndex
DROP INDEX "sessions_sessionToken_key";

-- DropIndex
DROP INDEX "users_discordId_key";

-- AlterTable
ALTER TABLE "guild_logs" DROP COLUMN "authorId",
DROP COLUMN "guildId",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "guild_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "guild_xp" DROP COLUMN "guildId",
DROP COLUMN "userId",
ADD COLUMN     "guild_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "guilds" DROP COLUMN "discord_id",
ADD COLUMN     "guild_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "sessionToken",
DROP COLUMN "userId",
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "discordId",
ADD COLUMN     "discord_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "guilds_guild_id_key" ON "guilds"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_discord_id_key" ON "users"("discord_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_logs" ADD CONSTRAINT "guild_logs_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_logs" ADD CONSTRAINT "guild_logs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_xp" ADD CONSTRAINT "guild_xp_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_xp" ADD CONSTRAINT "guild_xp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;
