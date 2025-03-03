/*
  Warnings:

  - You are about to drop the column `opeinAi` on the `APIsTokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "APIsTokens" DROP COLUMN "opeinAi",
ADD COLUMN     "openAi" TEXT;
