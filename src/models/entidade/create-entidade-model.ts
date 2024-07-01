import { prisma } from '@/lib/prisma'
import type { entidade } from '@/types/global'

interface props {
  entidade: entidade
}
export async function createEntidadeModel({
  entidade: { identificacao, name, tipo, tipodeIdentificacao },
}: props) {
  const entidade = await prisma.entidadeTerceiros.create({
    data: {
      identificacao,
      name,
      tipo,
      tipodeIdentificacao,
    },
  })
  return entidade
}
