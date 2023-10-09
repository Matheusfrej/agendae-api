-- AlterTable
ALTER TABLE "spins" ADD COLUMN     "has_end_time" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_start_time" BOOLEAN NOT NULL DEFAULT false;
