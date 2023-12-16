-- CreateTable
CREATE TABLE "guild_welcome_message" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_welcome_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_leave_message" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_leave_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guild_welcome_message_guild_id_key" ON "guild_welcome_message"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "guild_leave_message_guild_id_key" ON "guild_leave_message"("guild_id");

-- AddForeignKey
ALTER TABLE "guild_welcome_message" ADD CONSTRAINT "guild_welcome_message_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_leave_message" ADD CONSTRAINT "guild_leave_message_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
