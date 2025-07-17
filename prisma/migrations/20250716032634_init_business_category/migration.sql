/*
  Warnings:

  - Added the required column `updatedAt` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BusinessCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BusinessCategory" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
