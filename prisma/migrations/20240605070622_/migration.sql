/*
  Warnings:

  - You are about to drop the column `category` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Home` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "category",
DROP COLUMN "location",
ADD COLUMN     "categoryName" TEXT,
ADD COLUMN     "locationName" TEXT;
