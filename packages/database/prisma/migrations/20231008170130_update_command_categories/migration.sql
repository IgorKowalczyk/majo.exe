/*
  Warnings:

  - The primary key for the `CommandCategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CommandCategories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `commands` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `guild_disabled_categories` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `guild_disabled_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commands" DROP CONSTRAINT "commands_category_id_fkey";

-- DropForeignKey
ALTER TABLE "guild_disabled_categories" DROP CONSTRAINT "guild_disabled_categories_category_id_fkey";

-- DropIndex
DROP INDEX "CommandCategories_name_key";

-- AlterTable
ALTER TABLE "CommandCategories" DROP CONSTRAINT "CommandCategories_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CommandCategories_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "commands" DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT;

-- AlterTable
ALTER TABLE "guild_disabled_categories" DROP COLUMN "category_id",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "commands" ADD CONSTRAINT "commands_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "CommandCategories"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guild_disabled_categories" ADD CONSTRAINT "guild_disabled_categories_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "CommandCategories"("name") ON DELETE CASCADE ON UPDATE CASCADE;
