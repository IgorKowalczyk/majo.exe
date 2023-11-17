/*
  Warnings:

  - You are about to drop the column `accent_color` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `banner_color` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `mfa_enabled` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `premium_type` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discordId,global_name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discordId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `global_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nitro` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `discriminator` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `flags` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locale` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public_flags` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `verified` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accent_color",
DROP COLUMN "banner",
DROP COLUMN "banner_color",
DROP COLUMN "created_at",
DROP COLUMN "email_verified",
DROP COLUMN "image",
DROP COLUMN "image_url",
DROP COLUMN "mfa_enabled",
DROP COLUMN "premium_type",
DROP COLUMN "updated_at",
DROP COLUMN "username",
ADD COLUMN     "discordId" TEXT NOT NULL,
ADD COLUMN     "global_name" TEXT NOT NULL,
ADD COLUMN     "nitro" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "discriminator" SET NOT NULL,
ALTER COLUMN "flags" SET NOT NULL,
ALTER COLUMN "locale" SET NOT NULL,
ALTER COLUMN "public_flags" SET NOT NULL,
ALTER COLUMN "verified" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_discordId_global_name_key" ON "users"("discordId", "global_name");
