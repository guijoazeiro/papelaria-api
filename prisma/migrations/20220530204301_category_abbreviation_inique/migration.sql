/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_abbreviation_key" ON "categories"("abbreviation");
