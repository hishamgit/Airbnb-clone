-- AlterTable
ALTER TABLE "Home" ADD COLUMN     "addedCategory" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "addedDescriptio" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "addedLocation" BOOLEAN NOT NULL DEFAULT false;
