/*
  Warnings:

  - A unique constraint covering the columns `[friend_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "spins" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "friend_code" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Promote" (
    "id" TEXT NOT NULL,
    "spin_id" TEXT NOT NULL,
    "promotion_type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Promote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_friend_code_key" ON "users"("friend_code");

-- AddForeignKey
ALTER TABLE "Promote" ADD CONSTRAINT "Promote_spin_id_fkey" FOREIGN KEY ("spin_id") REFERENCES "spins"("id") ON DELETE CASCADE ON UPDATE CASCADE;
