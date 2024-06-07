/*
  Warnings:

  - You are about to drop the column `userid` on the `Favourite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,homeId]` on the table `Favourite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_userid_fkey";

-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_userId_homeId_key" ON "Favourite"("userId", "homeId");

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
