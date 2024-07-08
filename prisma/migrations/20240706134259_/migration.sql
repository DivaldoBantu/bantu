-- CreateEnum
CREATE TYPE "EmpresaType" AS ENUM ('SEDE', 'FILIAL');

-- CreateEnum
CREATE TYPE "RegimeIva" AS ENUM ('NAO_SUJEITO', 'SIMPLIFICADO', 'GERAL');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVER');

-- CreateEnum
CREATE TYPE "Familia" AS ENUM ('PRODUTO', 'SERVICO');

-- CreateEnum
CREATE TYPE "Area" AS ENUM ('COMERCIO_GERAL', 'RESTAURANTE', 'HOTELARIA', 'OFICINA');

-- CreateEnum
CREATE TYPE "TipoEntidade" AS ENUM ('SINGULAR', 'COLECTIVO');

-- CreateEnum
CREATE TYPE "TipoIdentificacao" AS ENUM ('NIF', 'BI', 'CARTAO_DE_RESIDENTE', 'PASSAPORTE');

-- CreateEnum
CREATE TYPE "TipoDesconto" AS ENUM ('COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVO', 'REMOVIDO');

-- CreateEnum
CREATE TYPE "DescontoType" AS ENUM ('COMERCIAL', 'FINANCEIRO', 'DIVERSO', 'NENHUM');

-- CreateEnum
CREATE TYPE "ClasseEstado" AS ENUM ('ACTIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "TipoAGT" AS ENUM ('IVA', 'IS', 'NS');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "avatar" TEXT,
    "password" TEXT NOT NULL DEFAULT '000000',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "prazo_senha" TIMESTAMP(3),
    "reset_sentAt" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "code" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "role_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id","code")
);

-- CreateTable
CREATE TABLE "Artigo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imagem" TEXT,
    "categoryId" INTEGER,
    "subCategoryId" INTEGER,
    "unidadeId" INTEGER,
    "stock_min" DOUBLE PRECISION,
    "stock_max" DOUBLE PRECISION,
    "familia" "Familia" NOT NULL,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaArtigo" (
    "id" SERIAL NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "area" "Area" NOT NULL,

    CONSTRAINT "AreaArtigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtigoCodigoBarra" (
    "id" SERIAL NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "forncedorId" INTEGER NOT NULL,
    "codigoBarra" TEXT NOT NULL,

    CONSTRAINT "ArtigoCodigoBarra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provincias" (
    "id" SERIAL NOT NULL,
    "countrieCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provincias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EmpresaType" NOT NULL,
    "avatar" TEXT,
    "countryCode" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "telefone" TEXT NOT NULL,
    "telefone1" TEXT,
    "email" TEXT,
    "nif" TEXT NOT NULL,
    "cae" TEXT,
    "numero_de_alvara" TEXT,
    "regime_iva" "RegimeIva" NOT NULL,
    "indicador_factura" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidade" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImpostType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" "TipoAGT" NOT NULL,

    CONSTRAINT "ImpostType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImpostTax" (
    "id" SERIAL NOT NULL,
    "impostId" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImpostTax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER NOT NULL,
    "countryCode" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "endereco" TEXT,
    "email" TEXT,
    "subAccountId" INTEGER NOT NULL,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntidadeTerceiros" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" "TipoEntidade" NOT NULL,
    "identificacao" TEXT NOT NULL,
    "tipodeIdentificacao" "TipoIdentificacao" NOT NULL,

    CONSTRAINT "EntidadeTerceiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "entidadeId" INTEGER NOT NULL,
    "countryCode" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,
    "whatsapp" TEXT,
    "endereco" TEXT,
    "email" TEXT,
    "sub_accountId" INTEGER NOT NULL,
    "tipo_desconto" "TipoDesconto" NOT NULL,
    "valor_desconto" DOUBLE PRECISION,
    "percentagem_desconto" DOUBLE PRECISION,
    "efectua_retencao" BOOLEAN NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "limiteSaldo" DOUBLE PRECISION NOT NULL,
    "limiteCredito" DOUBLE PRECISION NOT NULL,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtigoBarCode" (
    "id" SERIAL NOT NULL,
    "artigoId" INTEGER NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    "barCode" TEXT NOT NULL,

    CONSTRAINT "ArtigoBarCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armazem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "description" TEXT,
    "localidade" TEXT,
    "bloqueioEntrada" BOOLEAN NOT NULL,
    "bloqueioSaida" BOOLEAN NOT NULL,

    CONSTRAINT "Armazem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identificacao" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "telefone2" TEXT,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "estado" "ClasseEstado" NOT NULL,

    CONSTRAINT "Classe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "classeId" INTEGER NOT NULL,
    "estado" "ClasseEstado" NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "accountId" INTEGER,
    "estado" TEXT NOT NULL,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Isencao" (
    "id" SERIAL NOT NULL,
    "codIsencao" TEXT NOT NULL,
    "mencaoConstarDoc" TEXT NOT NULL,
    "normaAplicavel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "regimeGeral" BOOLEAN NOT NULL,
    "regimeTransitorio" BOOLEAN NOT NULL,
    "regimeNaoSujeicao" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Isencao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_code_key" ON "tokens"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_slug_key" ON "permissions"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_codigo_key" ON "organizations"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_telefone_key" ON "organizations"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_telefone1_key" ON "organizations"("telefone1");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_nif_key" ON "organizations"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Unidade_name_key" ON "Unidade"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_entidadeId_key" ON "Cliente"("entidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_numero_key" ON "SubAccount"("numero");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artigo" ADD CONSTRAINT "Artigo_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaArtigo" ADD CONSTRAINT "AreaArtigo_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "Artigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoCodigoBarra" ADD CONSTRAINT "ArtigoCodigoBarra_forncedorId_fkey" FOREIGN KEY ("forncedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoCodigoBarra" ADD CONSTRAINT "ArtigoCodigoBarra_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "Artigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provincias" ADD CONSTRAINT "provincias_countrieCode_fkey" FOREIGN KEY ("countrieCode") REFERENCES "countries"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpostTax" ADD CONSTRAINT "ImpostTax_impostId_fkey" FOREIGN KEY ("impostId") REFERENCES "ImpostType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_sub_accountId_fkey" FOREIGN KEY ("sub_accountId") REFERENCES "SubAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "EntidadeTerceiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoBarCode" ADD CONSTRAINT "ArtigoBarCode_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtigoBarCode" ADD CONSTRAINT "ArtigoBarCode_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "Artigo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Armazem" ADD CONSTRAINT "Armazem_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loja" ADD CONSTRAINT "Loja_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "provincias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
