/*
  Warnings:

  - You are about to drop the column `command` on the `commands` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `commands` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `default_member_permissions` to the `commands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `commands` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guild_disabled_commands" DROP CONSTRAINT "guild_disabled_commands_command_id_fkey";

-- DropIndex
DROP INDEX "commands_command_key";

-- AlterTable
ALTER TABLE "commands" DROP COLUMN "command",
ADD COLUMN     "default_member_permissions" BIGINT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "commands_name_key" ON "commands"("name");

-- AddForeignKey
ALTER TABLE "guild_disabled_commands" ADD CONSTRAINT "guild_disabled_commands_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
