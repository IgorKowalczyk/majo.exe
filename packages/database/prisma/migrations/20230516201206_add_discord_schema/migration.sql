-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accent_color" INTEGER,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "banner_color" TEXT,
ADD COLUMN     "discriminator" TEXT,
ADD COLUMN     "flags" INTEGER,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "mfa_enabled" BOOLEAN,
ADD COLUMN     "premium_type" INTEGER,
ADD COLUMN     "public_flags" INTEGER,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "verified" BOOLEAN;
