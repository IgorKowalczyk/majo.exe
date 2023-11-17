/*
  Warnings:

  - You are about to drop the column `created_at` on the `CommandCategories` table. All the data in the column will be lost.
  - The primary key for the `commands` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `commands` table. All the data in the column will be lost.
  - Made the column `category_name` on table `commands` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "guild_disabled_commands" DROP CONSTRAINT "guild_disabled_commands_command_id_fkey";

-- DropIndex
DROP INDEX "commands_name_key";

-- AlterTable
ALTER TABLE "CommandCategories" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "commands" DROP CONSTRAINT "commands_pkey",
DROP COLUMN "id",
ALTER COLUMN "category_name" SET NOT NULL,
ADD CONSTRAINT "commands_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "guild_disabled_commands" ADD CONSTRAINT "guild_disabled_commands_command_id_fkey" FOREIGN KEY ("command_id") REFERENCES "commands"("name") ON DELETE CASCADE ON UPDATE CASCADE;
