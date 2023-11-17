/*
  Warnings:

  - The primary key for the `guild_warns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `guild_warns` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "guild_warns" DROP CONSTRAINT "guild_warns_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "guild_warns_pkey" PRIMARY KEY ("id");
