-- CreateTable
CREATE TABLE "GuildMessage" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messages" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GuildMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuildMessage" ADD CONSTRAINT "GuildMessage_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
