/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `guild_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guild_logs" DROP COLUMN "avatar_url";

-- AddForeignKey
ALTER TABLE "guild_logs" ADD CONSTRAINT "guild_logs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("discordId") ON DELETE CASCADE ON UPDATE CASCADE;
