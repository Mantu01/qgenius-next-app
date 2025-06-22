/*
  Warnings:

  - You are about to drop the column `userId` on the `QnA` table. All the data in the column will be lost.
  - Added the required column `noteId` to the `QnA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QnA" DROP CONSTRAINT "QnA_userId_fkey";

-- AlterTable
ALTER TABLE "QnA" DROP COLUMN "userId",
ADD COLUMN     "noteId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QnA" ADD CONSTRAINT "QnA_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
