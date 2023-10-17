/*
  Warnings:

  - You are about to drop the `Promote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promote" DROP CONSTRAINT "Promote_spin_id_fkey";

-- AlterTable
ALTER TABLE "spins" ADD COLUMN     "paid_status" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "promotion_status" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Promote";
