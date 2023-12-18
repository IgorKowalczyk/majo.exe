-- AlterTable
ALTER TABLE "guild_leave_message" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '> We''re sorry to see you go!',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '👋 Goodbye {user}!';

-- AlterTable
ALTER TABLE "guild_welcome_message" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '> Welcome to **{guild}** We hope you enjoy your stay here!',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '🎉 Welcome to the server {user}!';
