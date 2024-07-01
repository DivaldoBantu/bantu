import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { handlePrismaError } from '@/utils/error-utils'
import { getErrorMessage } from '@/utils/get-error-message'

async function createPermission() {
  const permissionData = {
    slug: createSlug('create fornecedor'),
    description: 'create fornecedor',
  }

  try {
    const result = await prisma.permission.create({
      data: permissionData,
    })
    return result
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const { message, details } = handlePrismaError(err, permissionData)
      return { message, details }
    } else {
      return {
        message: getErrorMessage(err),
      }
    }
  }
}

// Chama a função
console.log(await createPermission())
