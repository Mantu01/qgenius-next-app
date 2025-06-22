/*
  Warnings:

  - Added the required column `topic` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `QnA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QnA" ADD COLUMN     "level" TEXT NOT NULL;
