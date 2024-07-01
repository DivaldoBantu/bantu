import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

export async function getArmazemModel(id: number) {
  const armazem = await prisma.armazem.findUnique({
    where: {
      id,
    },
  })
  if (!armazem) throw new BadRequestError('Armazem não encontrado')
  return armazem
}
