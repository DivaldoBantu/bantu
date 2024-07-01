import { prisma } from "@/lib/prisma";

export async function listPermissions() {
    return await prisma.permission.findMany()
}