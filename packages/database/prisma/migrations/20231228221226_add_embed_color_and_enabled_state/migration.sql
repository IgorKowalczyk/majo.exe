-- AlterTable
ALTER TABLE "guild_leave_message" ADD COLUMN     "embed_color" TEXT NOT NULL DEFAULT '#5865F2',
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "guild_welcome_message" ADD COLUMN     "embed_color" TEXT NOT NULL DEFAULT '#5865F2',
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT false;
