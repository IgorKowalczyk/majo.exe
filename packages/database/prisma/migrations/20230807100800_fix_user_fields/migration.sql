-- AlterTable
ALTER TABLE "users" ALTER COLUMN "flags" DROP NOT NULL,
ALTER COLUMN "public_flags" DROP NOT NULL;
