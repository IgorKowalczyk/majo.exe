-- CreateTable
CREATE TABLE "guild_logs_settings" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "type" "GuildLogType" NOT NULL DEFAULT 'Unknown',
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "channel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_logs_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_logs_settings" ADD CONSTRAINT "guild_logs_settings_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
