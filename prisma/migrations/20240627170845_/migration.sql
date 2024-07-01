/*
  Warnings:

  - You are about to drop the column `localidade` on the `Armazem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Armazem" DROP COLUMN "localidade",
ADD COLUMN     "address" TEXT;
