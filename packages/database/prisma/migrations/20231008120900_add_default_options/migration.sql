-- AlterTable
ALTER TABLE "commands" ALTER COLUMN "options" SET DEFAULT ARRAY[]::JSONB[];
