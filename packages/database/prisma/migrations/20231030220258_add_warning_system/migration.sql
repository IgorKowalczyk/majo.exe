-- AlterTable
ALTER TABLE "guilds" ADD COLUMN     "enable_warning_automation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "enable_warning_automation_last_changed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "guild_warns" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_warns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_warns" ADD CONSTRAINT "guild_warns_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_warns" ADD CONSTRAINT "guild_warns_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;
