-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,
    "profanity_level" INTEGER NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guilds_discord_id_key" ON "guilds"("discord_id");
