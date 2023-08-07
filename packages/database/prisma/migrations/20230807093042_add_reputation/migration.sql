-- CreateTable
CREATE TABLE "reputation" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reputation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reputation" ADD CONSTRAINT "reputation_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reputation" ADD CONSTRAINT "reputation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("discord_id") ON DELETE CASCADE ON UPDATE CASCADE;
