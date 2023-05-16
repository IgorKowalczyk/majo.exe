/*
  Warnings:

  - A unique constraint covering the columns `[discordId,global_name,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_discordId_global_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_global_name_email_key" ON "users"("discordId", "global_name", "email");
