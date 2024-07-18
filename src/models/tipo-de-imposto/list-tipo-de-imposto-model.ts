import { prisma } from "@/lib/prisma";

export async function listTipoDeImpostoModel() {
    const list = await prisma.impostType.findMany()
    return list
}