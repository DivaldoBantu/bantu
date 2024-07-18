import { prisma } from "@/lib/prisma";

export async function listIsencaoModel() {
    const list = await prisma.isencao.findMany()
    return list
    
}