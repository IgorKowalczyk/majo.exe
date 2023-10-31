/*
  Warnings:

  - The primary key for the `guild_warns` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `warn_id` to the `guild_warns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guild_warns" DROP CONSTRAINT "guild_warns_pkey",
ADD COLUMN     "warn_id" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "guild_warns_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "guild_warns_id_seq";
