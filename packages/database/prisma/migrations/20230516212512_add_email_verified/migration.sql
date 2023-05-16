-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verified" TIMESTAMP(3),
ALTER COLUMN "locale" DROP NOT NULL,
ALTER COLUMN "verified" DROP NOT NULL;
