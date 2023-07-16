-- CreateTable
CREATE TABLE "guild_joins" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "guild_joins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_leaves" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaves" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "guild_leaves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guild_joins" ADD CONSTRAINT "guild_joins_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_leaves" ADD CONSTRAINT "guild_leaves_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
