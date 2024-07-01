import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function listArmazemModel() {
  try {
    return await prisma.armazem.findMany()
  } catch (error) {
    throw new BadRequestError('Armazem não encontrado')
  }
}
