/*
  Warnings:

  - You are about to drop the `api_tokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `qna` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "qna" DROP CONSTRAINT "qna_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_apiTokensId_fkey";

-- DropTable
DROP TABLE "api_tokens";

-- DropTable
DROP TABLE "qna";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "creaditsLeft" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APIsTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gemini" TEXT,
    "opeinAi" TEXT,
    "anthropic" TEXT,
    "grok" TEXT,

    CONSTRAINT "APIsTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QnA" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QnA_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "APIsTokens_userId_key" ON "APIsTokens"("userId");

-- AddForeignKey
ALTER TABLE "APIsTokens" ADD CONSTRAINT "APIsTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QnA" ADD CONSTRAINT "QnA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
