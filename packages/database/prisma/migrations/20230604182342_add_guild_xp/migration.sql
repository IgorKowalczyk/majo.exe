-- CreateTable
CREATE TABLE "guild_xp" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_xp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_xp" ADD CONSTRAINT "guild_xp_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_xp" ADD CONSTRAINT "guild_xp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("discordId") ON DELETE CASCADE ON UPDATE CASCADE;
