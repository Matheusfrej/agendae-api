/*
  Warnings:

  - You are about to drop the `_UserBlocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserBlocks" DROP CONSTRAINT "_UserBlocks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBlocks" DROP CONSTRAINT "_UserBlocks_B_fkey";

-- DropTable
DROP TABLE "_UserBlocks";

-- CreateTable
CREATE TABLE "block" (
    "blocker_id" TEXT NOT NULL,
    "blocked_id" TEXT NOT NULL,

    CONSTRAINT "block_pkey" PRIMARY KEY ("blocker_id","blocked_id")
);

-- AddForeignKey
ALTER TABLE "block" ADD CONSTRAINT "block_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block" ADD CONSTRAINT "block_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
