/*
  Warnings:

  - You are about to drop the column `anthropic` on the `APIsTokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "APIsTokens" DROP COLUMN "anthropic",
ADD COLUMN     "claude" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "creaditsLeft" SET DEFAULT 3;
