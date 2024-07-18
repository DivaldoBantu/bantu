/*
  Warnings:

  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."organizations" DROP CONSTRAINT "organizations_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."organizations" DROP CONSTRAINT "organizations_provinciaId_fkey";

-- DropTable
DROP TABLE "public"."organizations";

-- CreateTable
CREATE TABLE "public"."Empresa" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."EmpresaType" NOT NULL,
    "avatar" TEXT,
    "countryId" INTEGER NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "telefone" TEXT NOT NULL,
    "telefone1" TEXT,
    "email" TEXT,
    "nif" TEXT NOT NULL,
    "cae" TEXT,
    "numero_de_alvara" TEXT,
    "regime_iva" "public"."RegimeIva" NOT NULL,
    "indicador_factura" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_codigo_key" ON "public"."Empresa"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_telefone_key" ON "public"."Empresa"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_telefone1_key" ON "public"."Empresa"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_nif_key" ON "public"."Empresa"("nif");

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "public"."provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Empresa" ADD CONSTRAINT "Empresa_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
