import type { TipoAGT } from '@prisma/client'

import { prisma } from '@/lib/prisma'

const impost = [
  {
    name: 'Imposto Sobre o Valor Acrescentado',
    type: 'IVA',
    tax: [
      { value: 0, createdAt: '2019-12-30', type: 'ISE' },
      {
        value: 14,
        createdAt: '2019-12-30',
        type: 'NOR',
      },
    ],
  },
  {
    name: 'Imposto de Selo',
    type: 'IS',
    tax: [
      {
        value: 7,
        createdAt: '2019-12-30',
        type: 'NOR',
      },
    ],
  },
  {
    name: 'Não Sujeito a IVA ou IS',
    type: 'NS',
    tax: [
      {
        value: 0.0,
        createdAt: '2019-12-29',
        type: 'NS',
      },
    ],
  },
]

export async function seedImpost() {
  const mapImpostTax = await prisma.impostTax.findMany()
  const mapImpostType = await prisma.impostType.findMany()

  if (mapImpostTax.length === 0 && mapImpostType.length === 0) {
    for (const imp of impost) {
      await prisma.impostType.create({
        data: {
          name: imp.name,
          tipo: imp.type as TipoAGT,
          tax: {
            createMany: {
              data: imp.tax.map((e) => ({
                value: e.value,
                type: e.type,
                createdAt: new Date(e.createdAt).toISOString(),
              })),
            },
          },
        },
      })
    }
  }
}
