/*
  Warnings:

  - You are about to drop the column `category` on the `QnA` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "header" TEXT NOT NULL DEFAULT 'Untitled';

-- AlterTable
ALTER TABLE "QnA" DROP COLUMN "category";
