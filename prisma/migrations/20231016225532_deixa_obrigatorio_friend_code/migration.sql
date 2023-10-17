/*
  Warnings:

  - Made the column `friend_code` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "friend_code" SET NOT NULL;
