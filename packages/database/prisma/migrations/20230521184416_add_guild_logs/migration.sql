-- CreateTable
CREATE TABLE "guild_logs" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_logs" ADD CONSTRAINT "guild_logs_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;
