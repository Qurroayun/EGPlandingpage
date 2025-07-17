/*
  Warnings:

  - You are about to drop the column `slug` on the `BusinessCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `BusinessCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BusinessCategory_slug_key";

-- AlterTable
ALTER TABLE "BusinessCategory" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCategory_name_key" ON "BusinessCategory"("name");
