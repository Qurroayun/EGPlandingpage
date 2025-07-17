/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BusinessCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BusinessCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BusinessCategory_name_key";

-- AlterTable
ALTER TABLE "BusinessCategory" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_slug_key" ON "BusinessCategory"("slug");
