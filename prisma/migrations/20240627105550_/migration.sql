/*
  Warnings:

  - You are about to drop the column `entityId` on the `Fornecedor` table. All the data in the column will be lost.
  - Made the column `entidadeId` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `entidadeId` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_entidadeId_fkey";

-- DropForeignKey
ALTER TABLE "Fornecedor" DROP CONSTRAINT "Fornecedor_entityId_fkey";

-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "entidadeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Fornecedor" DROP COLUMN "entityId",
ADD COLUMN     "entidadeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
