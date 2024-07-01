/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `SubAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_numero_key" ON "SubAccount"("numero");
