/*
  Warnings:

  - A unique constraint covering the columns `[guild_id,type]` on the table `guild_logs_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guild_logs_settings_guild_id_type_key" ON "guild_logs_settings"("guild_id", "type");
