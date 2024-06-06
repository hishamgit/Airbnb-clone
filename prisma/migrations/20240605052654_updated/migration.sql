/*
  Warnings:

  - You are about to drop the column `addedDescriptio` on the `Home` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "addedDescriptio",
ADD COLUMN     "addedDescription" BOOLEAN NOT NULL DEFAULT false;
