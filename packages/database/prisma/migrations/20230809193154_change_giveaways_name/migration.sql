/*
  Warnings:

  - You are about to drop the `Giveaway` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Giveaway" DROP CONSTRAINT "Giveaway_guild_id_fkey";

-- DropTable
DROP TABLE "Giveaway";

-- CreateTable
CREATE TABLE "Giveaways" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Giveaways_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Giveaways_message_id_key" ON "Giveaways"("message_id");

-- AddForeignKey
ALTER TABLE "Giveaways" ADD CONSTRAINT "Giveaways_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "guilds"("guild_id") ON DELETE CASCADE ON UPDATE CASCADE;
