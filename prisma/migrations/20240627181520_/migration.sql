/*
  Warnings:

  - You are about to drop the column `address` on the `Armazem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Armazem" DROP COLUMN "address",
ADD COLUMN     "localidade" TEXT;
